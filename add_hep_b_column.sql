
-- Run this in Supabase SQL Editor to add the Hepatitis B column
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS hep_b_status text;
