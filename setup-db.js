
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const { Client } = pg;

const password = encodeURIComponent(process.env.SUPABASE_DB_PASSWORD);
const connectionString = `postgresql://postgres:${password}@db.cglcvpokthzuslwulyyr.supabase.co:5432/postgres`;

console.log('Connecting to Supabase...');

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const setupDatabase = async () => {
    try {
        await client.connect();
        console.log('✅ Connected to database.');

        // 0. Ensure pgcrypto for password hashing
        await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');

        // 1. Create Jobs Table
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
        console.log('✅ Jobs table verified.');

        // 2. Enable RLS
        await client.query(`ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;`);

        // 3. Create Policies (Drop first to avoid errors)
        await client.query(`DROP POLICY IF EXISTS "Public jobs are viewable by everyone" ON public.jobs;`);
        await client.query(`
            CREATE POLICY "Public jobs are viewable by everyone"
            ON public.jobs FOR SELECT
            USING ( true );
        `);

        await client.query(`DROP POLICY IF EXISTS "Admins can insert jobs" ON public.jobs;`);
        await client.query(`
            CREATE POLICY "Admins can insert jobs"
            ON public.jobs FOR INSERT
            WITH CHECK ( auth.role() = 'authenticated' );
        `);

        await client.query(`DROP POLICY IF EXISTS "Admins can update jobs" ON public.jobs;`);
        await client.query(`
            CREATE POLICY "Admins can update jobs"
            ON public.jobs FOR UPDATE
            USING ( auth.role() = 'authenticated' );
        `);

        await client.query(`DROP POLICY IF EXISTS "Admins can delete jobs" ON public.jobs;`);
        await client.query(`
            CREATE POLICY "Admins can delete jobs"
            ON public.jobs FOR DELETE
            USING ( auth.role() = 'authenticated' );
        `);
        console.log('✅ Policies applied.');

        // 4. Create Admin User
        const adminEmail = 'admin@happydental.com';
        const adminPassword = 'HappyAdmin123!'; // We will hash this

        // Check if user exists
        const userCheck = await client.query("SELECT id FROM auth.users WHERE email = $1", [adminEmail]);

        if (userCheck.rows.length === 0) {
            console.log('Creating admin user...');
            await client.query(`
                INSERT INTO auth.users (
                    instance_id,
                    id,
                    aud,
                    role,
                    email,
                    encrypted_password,
                    email_confirmed_at,
                    raw_app_meta_data,
                    raw_user_meta_data,
                    created_at,
                    updated_at,
                    confirmation_token,
                    email_change,
                    email_change_token_new,
                    recovery_token
                ) VALUES (
                    '00000000-0000-0000-0000-000000000000',
                    gen_random_uuid(),
                    'authenticated',
                    'authenticated',
                    $1,
                    crypt($2, gen_salt('bf')),
                    now(),
                    '{"provider":"email","providers":["email"]}',
                    '{}',
                    now(),
                    now(),
                    '',
                    '',
                    '',
                    ''
                );
            `, [adminEmail, adminPassword]);

            // Also add to public.users or profiles if you had that, but for now Supabase Auth is enough
            console.log(`✅ Admin user created: ${adminEmail}`);
            console.log(`✅ Password: ${adminPassword}`);
        } else {
            console.log('ℹ️ Admin user already exists.');
            // Optionally update password if needed, but safer to skip
        }

        // 5. Create Applications Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.applications (
                id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                job_id uuid REFERENCES public.jobs(id),
                job_title text,
                name text NOT NULL,
                email text NOT NULL,
                phone text,
                gdc_number text,
                status text DEFAULT 'pending',
                created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
            );
        `);
        console.log('✅ Applications table verified.');

        // 6. Enable RLS for Applications
        await client.query(`ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;`);

        await client.query(`DROP POLICY IF EXISTS "Public can insert applications" ON public.applications;`);
        await client.query(`
            CREATE POLICY "Public can insert applications"
            ON public.applications FOR INSERT
            WITH CHECK ( true );
        `);

        await client.query(`DROP POLICY IF EXISTS "Admins can view applications" ON public.applications;`);
        await client.query(`
            CREATE POLICY "Admins can view applications"
            ON public.applications FOR SELECT
            USING ( auth.role() = 'authenticated' );
        `);

        console.log('✅ Application policies applied.');

        // 7. Create Analytics/Page Views Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.page_views (
                id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                path text NOT NULL,
                user_agent text,
                ip_hash text,
                created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
            );
        `);
        console.log('✅ Analytics table verified.');

        // 8. Enable RLS for Analytics
        await client.query(`ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;`);

        await client.query(`DROP POLICY IF EXISTS "Public can insert page views" ON public.page_views;`);
        await client.query(`
            CREATE POLICY "Public can insert page views"
            ON public.page_views FOR INSERT
            WITH CHECK ( true );
        `);

        await client.query(`DROP POLICY IF EXISTS "Admins can view analytics" ON public.page_views;`);
        await client.query(`
            CREATE POLICY "Admins can view analytics"
            ON public.page_views FOR SELECT
            USING ( auth.role() = 'authenticated' );
        `);

        console.log('✅ Analytics policies applied.');

        console.log('\n🎉 ALL DONE! You can now log in at /admin/login');

    } catch (err) {
        console.error('❌ Error setting up database:', err);
    } finally {
        await client.end();
        process.exit(0);
    }
};

setupDatabase();
