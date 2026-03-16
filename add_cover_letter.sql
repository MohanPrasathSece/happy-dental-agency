
-- Run this in Supabase SQL Editor to add the missing column
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS cover_letter text;
