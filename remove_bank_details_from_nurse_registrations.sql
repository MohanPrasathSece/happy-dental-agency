
-- Remove NI Number and Bank Details from nurse_registrations table
ALTER TABLE public.nurse_registrations 
DROP COLUMN IF EXISTS ni_number,
DROP COLUMN IF EXISTS bank_name,
DROP COLUMN IF EXISTS account_number,
DROP COLUMN IF EXISTS sort_code;
