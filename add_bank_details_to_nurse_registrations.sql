
-- Add NI Number and Bank Details to nurse_registrations table
ALTER TABLE public.nurse_registrations ADD COLUMN IF NOT EXISTS ni_number text;
ALTER TABLE public.nurse_registrations ADD COLUMN IF NOT EXISTS bank_name text;
ALTER TABLE public.nurse_registrations ADD COLUMN IF NOT EXISTS account_number text;
ALTER TABLE public.nurse_registrations ADD COLUMN IF NOT EXISTS sort_code text;
