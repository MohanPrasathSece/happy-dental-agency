-- Create Timesheets Table
CREATE TABLE IF NOT EXISTS public.timesheets (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nurse_name text NOT NULL,
    nurse_email text NOT NULL,
    practice_name text NOT NULL,
    shift_date date NOT NULL,
    start_time text NOT NULL,
    end_time text NOT NULL,
    break_duration integer NOT NULL, -- minutes
    total_hours numeric(4,2) NOT NULL,
    verifier_name text NOT NULL,
    verifier_role text NOT NULL,
    feedback text,
    status text DEFAULT 'pending', -- pending, invoiced, paid
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public can insert (Nurses)
DROP POLICY IF EXISTS "Public can insert timesheets" ON public.timesheets;
CREATE POLICY "Public can insert timesheets"
ON public.timesheets FOR INSERT
WITH CHECK ( true );

-- Admins can view all
DROP POLICY IF EXISTS "Admins can view timesheets" ON public.timesheets;
CREATE POLICY "Admins can view timesheets"
ON public.timesheets FOR SELECT
USING ( auth.role() = 'authenticated' );

-- Admins can update
DROP POLICY IF EXISTS "Admins can update timesheets" ON public.timesheets;
CREATE POLICY "Admins can update timesheets"
ON public.timesheets FOR UPDATE
USING ( auth.role() = 'authenticated' );
