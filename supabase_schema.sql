
-- 1. Create Jobs Table
CREATE TABLE IF NOT EXISTS public.jobs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    location text NOT NULL,
    type text NOT NULL,
    salary text,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS for JOBS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies for JOBS
DROP POLICY IF EXISTS "Public jobs are viewable by everyone" ON public.jobs;
CREATE POLICY "Public jobs are viewable by everyone"
ON public.jobs FOR SELECT
USING ( true );

DROP POLICY IF EXISTS "Admins can insert jobs" ON public.jobs;
CREATE POLICY "Admins can insert jobs"
ON public.jobs FOR INSERT
WITH CHECK ( auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Admins can update jobs" ON public.jobs;
CREATE POLICY "Admins can update jobs"
ON public.jobs FOR UPDATE
USING ( auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Admins can delete jobs" ON public.jobs;
CREATE POLICY "Admins can delete jobs"
ON public.jobs FOR DELETE
USING ( auth.role() = 'authenticated' );

-- 4. Create Applications Table
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

-- 4.1 Create Nurse Registrations Table
CREATE TABLE IF NOT EXISTS public.nurse_registrations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    location text NOT NULL,
    nurse_status text NOT NULL, -- 'qualified' or 'trainee'
    gdc_number text,
    work_preference text NOT NULL,
    hep_b_vaccination text NOT NULL,
    message text,
    cv_url text,
    hep_b_url text,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4.2 Enable RLS for nurse_registrations
ALTER TABLE public.nurse_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert registrations" ON public.nurse_registrations;
CREATE POLICY "Public can insert registrations"
ON public.nurse_registrations FOR INSERT
WITH CHECK ( true );

DROP POLICY IF EXISTS "Admins can view registrations" ON public.nurse_registrations;
CREATE POLICY "Admins can view registrations"
ON public.nurse_registrations FOR SELECT
USING ( auth.role() = 'authenticated' );

DROP POLICY IF EXISTS "Admins can update registrations" ON public.nurse_registrations;
CREATE POLICY "Admins can update registrations"
ON public.nurse_registrations FOR UPDATE
USING ( auth.role() = 'authenticated' );

-- 5. Enable RLS for APPLICATIONS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 6. Policies for APPLICATIONS
DROP POLICY IF EXISTS "Public can insert applications" ON public.applications;
CREATE POLICY "Public can insert applications"
ON public.applications FOR INSERT
WITH CHECK ( true );

DROP POLICY IF EXISTS "Admins can view applications" ON public.applications;
CREATE POLICY "Admins can view applications"
ON public.applications FOR SELECT
USING ( auth.role() = 'authenticated' );

-- 7. Create Page Views Table (Analytics)
CREATE TABLE IF NOT EXISTS public.page_views (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    path text NOT NULL,
    user_agent text,
    ip_hash text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Enable RLS for PAGE_VIEWS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- 9. Policies for PAGE_VIEWS
DROP POLICY IF EXISTS "Public can insert page views" ON public.page_views;
CREATE POLICY "Public can insert page views"
ON public.page_views FOR INSERT
WITH CHECK ( true );

DROP POLICY IF EXISTS "Admins can view analytics" ON public.page_views;
CREATE POLICY "Admins can view analytics"
ON public.page_views FOR SELECT
USING ( auth.role() = 'authenticated' );
-- 10. Storage Configuration (Buckets)
-- Note: Run these in the Supabase SQL Editor if buckets don't exist
-- INSERT INTO storage.buckets (id, name, public) VALUES ('applications', 'applications', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('registrations', 'registrations', true);

-- 11. Storage Policies for 'applications' bucket
-- Allow public uploads
CREATE POLICY "Public Upload Applications"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'applications');

-- Allow public read
CREATE POLICY "Public View Applications"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'applications');

-- 12. Storage Policies for 'registrations' bucket
-- Allow public uploads
CREATE POLICY "Public Upload Registrations"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'registrations');

-- Allow public read
CREATE POLICY "Public View Registrations"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'registrations');
