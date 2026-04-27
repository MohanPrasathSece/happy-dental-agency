-- Enable Realtime for specific tables
-- This adds the tables to the 'supabase_realtime' publication

-- 1. Check if the publication exists, if not create it (Supabase usually has it by default)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
END $$;

-- 2. Add tables to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_views;
ALTER PUBLICATION supabase_realtime ADD TABLE public.applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.nurse_registrations;

-- 3. Ensure the tables have replica identity set to DEFAULT or FULL for updates
-- For INSERT only, DEFAULT is enough
ALTER TABLE public.page_views REPLICA IDENTITY DEFAULT;
ALTER TABLE public.applications REPLICA IDENTITY DEFAULT;
ALTER TABLE public.nurse_registrations REPLICA IDENTITY DEFAULT;
