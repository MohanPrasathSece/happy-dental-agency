
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const { Client } = pg;

const setupDatabase = async () => {
    const client = new Client({
        user: 'postgres',
        host: 'db.cglcvpokthzuslwulyyr.supabase.co',
        database: 'postgres',
        password: process.env.SUPABASE_DB_PASSWORD,
        port: 5432,
        ssl: { rejectUnauthorized: false },
    });

    try {
        console.log('⏳ Connecting to Supabase Postgres...');
        await client.connect();
        console.log('✅ Connected successfully!');

        // 1. Extensions
        await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');

        // 2. Jobs Table
        console.log('Creating jobs table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.jobs (
                id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                title text NOT NULL,
                location text NOT NULL,
                type text NOT NULL,
                salary text,
                description text,
                created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
            );
        `);

        // 3. Applications Table
        console.log('Creating applications table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.applications (
                id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                job_id uuid REFERENCES public.jobs(id),
                job_title text,
                name text NOT NULL,
                email text NOT NULL,
                phone text,
                gdc_number text,
                cover_letter text,
                hep_b_status text,
                resume_url text,
                hep_b_url text,
                status text DEFAULT 'pending',
                created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
            );
        `);

        // Ensure all columns exist (for existing tables)
        const appCols = ['cover_letter', 'hep_b_status', 'resume_url', 'hep_b_url'];
        for (const col of appCols) {
            await client.query(`ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS ${col} text`);
        }

        // 4. Registrations Table
        console.log('Creating registrations table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.nurse_registrations (
                id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                full_name text NOT NULL,
                email text NOT NULL,
                phone text NOT NULL,
                location text NOT NULL,
                nurse_status text NOT NULL,
                gdc_number text,
                work_preference text NOT NULL,
                hep_b_vaccination text NOT NULL,
                message text,
                cv_url text,
                hep_b_url text,
                status text DEFAULT 'pending',
                created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
            );
        `);

        // 5. Storage Buckets
        console.log('Setting up storage buckets...');
        await client.query(`
            INSERT INTO storage.buckets (id, name, public) 
            VALUES ('applications', 'applications', true) 
            ON CONFLICT (id) DO NOTHING
        `);
        await client.query(`
            INSERT INTO storage.buckets (id, name, public) 
            VALUES ('registrations', 'registrations', true) 
            ON CONFLICT (id) DO NOTHING
        `);

        // 6. RLS Policies (Table)
        console.log('Enabling RLS on tables...');
        await client.query('ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY');
        await client.query('ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY');
        await client.query('ALTER TABLE public.nurse_registrations ENABLE ROW LEVEL SECURITY');

        // Simple policies to allow public inserts (since it's a lead gen site)
        await client.query(`DROP POLICY IF EXISTS "Public can insert applications" ON public.applications`);
        await client.query(`CREATE POLICY "Public can insert applications" ON public.applications FOR INSERT WITH CHECK (true)`);

        await client.query(`DROP POLICY IF EXISTS "Public can insert registrations" ON public.nurse_registrations`);
        await client.query(`CREATE POLICY "Public can insert registrations" ON public.nurse_registrations FOR INSERT WITH CHECK (true)`);

        // --- Admin Policies (Fixed) ---
        // Nurse Registrations
        await client.query(`DROP POLICY IF EXISTS "Admins can view registrations" ON public.nurse_registrations`);
        await client.query(`CREATE POLICY "Admins can view registrations" ON public.nurse_registrations FOR SELECT USING (auth.role() = 'authenticated')`);

        await client.query(`DROP POLICY IF EXISTS "Admins can update registrations" ON public.nurse_registrations`);
        await client.query(`CREATE POLICY "Admins can update registrations" ON public.nurse_registrations FOR UPDATE USING (auth.role() = 'authenticated')`);

        await client.query(`DROP POLICY IF EXISTS "Admins can delete registrations" ON public.nurse_registrations`);
        await client.query(`CREATE POLICY "Admins can delete registrations" ON public.nurse_registrations FOR DELETE USING (auth.role() = 'authenticated')`);

        // Applications
        await client.query(`DROP POLICY IF EXISTS "Admins can view applications" ON public.applications`);
        await client.query(`CREATE POLICY "Admins can view applications" ON public.applications FOR SELECT USING (auth.role() = 'authenticated')`);

        await client.query(`DROP POLICY IF EXISTS "Admins can update applications" ON public.applications`);
        await client.query(`CREATE POLICY "Admins can update applications" ON public.applications FOR UPDATE USING (auth.role() = 'authenticated')`);

        await client.query(`DROP POLICY IF EXISTS "Admins can delete applications" ON public.applications`);
        await client.query(`CREATE POLICY "Admins can delete applications" ON public.applications FOR DELETE USING (auth.role() = 'authenticated')`);

        await client.query(`DROP POLICY IF EXISTS "Public can view jobs" ON public.jobs`);
        await client.query(`CREATE POLICY "Public can view jobs" ON public.jobs FOR SELECT USING (true)`);

        // 7. Storage Policies
        console.log('Setting up storage policies...');
        // Note: These use the storage schema
        await client.query(`
            DO $$
            BEGIN
              -- Policy for public read
              IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access' AND tablename = 'objects') THEN
                CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('applications', 'registrations'));
              END IF;

              -- Policy for public upload
              IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Upload' AND tablename = 'objects') THEN
                CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('applications', 'registrations'));
              END IF;
            END $$;
        `);

        console.log('\n✅ DATABASE SETUP COMPLETE!');
        console.log('You can now test the forms on the website.');

    } catch (err) {
        console.error('\n❌ DATABASE SETUP FAILED');
        console.error('Error:', err.message);
        if (err.detail) console.error('Detail:', err.detail);
        if (err.hint) console.error('Hint:', err.hint);
        if (err.message.includes('password authentication failed')) {
            console.log('\n💡 TIP: Check if SUPABASE_DB_PASSWORD in your .env is correct.');
        }
    } finally {
        await client.end();
        process.exit(0);
    }
};

setupDatabase();
