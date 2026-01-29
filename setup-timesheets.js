
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const { Client } = pg;

const setupTimesheets = async () => {
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

        const sql = fs.readFileSync(join(__dirname, 'create_timesheets.sql'), 'utf8');
        console.log('Executing SQL from create_timesheets.sql...');
        await client.query(sql);

        console.log('\n✅ TIMESHEETS TABLE SETUP COMPLETE!');

    } catch (err) {
        console.error('\n❌ TIMESHEETS SETUP FAILED');
        console.error('Error:', err.message);
    } finally {
        await client.end();
        process.exit(0);
    }
};

setupTimesheets();
