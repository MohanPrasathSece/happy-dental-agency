
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

const { Client } = pg;

const checkPolicies = async () => {
    const client = new Client({
        user: 'postgres',
        host: 'db.cglcvpokthzuslwulyyr.supabase.co',
        database: 'postgres',
        password: process.env.SUPABASE_DB_PASSWORD,
        port: 5432,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();
        console.log('--- RLS Status ---');
        const rlsStatus = await client.query(`
            SELECT tablename, rowsecurity 
            FROM pg_tables 
            WHERE schemaname = 'public' AND tablename = 'nurse_registrations';
        `);
        console.table(rlsStatus.rows);

        console.log('--- Policies for nurse_registrations ---');
        const policies = await client.query(`
            SELECT policyname, roles, cmd, qual, with_check 
            FROM pg_policies 
            WHERE tablename = 'nurse_registrations';
        `);
        console.table(policies.rows);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
};

checkPolicies();
