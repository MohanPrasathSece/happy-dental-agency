# Update Supabase Policies for Nurse Registrations

## Issue
Nurse registrations are not showing in the admin panel because the database policies need to be updated.

## Solution
You need to run the following SQL command in your Supabase SQL Editor to allow admins to update nurse registration statuses:

```sql
DROP POLICY IF EXISTS "Admins can update registrations" ON public.nurse_registrations;
CREATE POLICY "Admins can update registrations"
ON public.nurse_registrations FOR UPDATE
USING ( auth.role() = 'authenticated' );
```

## Steps to Apply

1. **Go to your Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the SQL Command**
   - Copy and paste the SQL command above
   - Click "Run" or press `Ctrl+Enter`

4. **Verify the Policy**
   - Go to "Database" → "Policies" in the left sidebar
   - Find the `nurse_registrations` table
   - You should see the new "Admins can update registrations" policy

## What This Does

This policy allows authenticated admin users to:
- **View** nurse registrations (already working)
- **Update** nurse registration statuses (newly added)

## Testing

After applying the policy:
1. Log in to the admin panel
2. Navigate to "Registrations" in the sidebar
3. You should now see all nurse registrations
4. You should be able to update their status (pending → reviewed)

## Additional Notes

- The full database schema is available in `supabase_schema.sql`
- If you need to recreate all tables and policies, run the entire `supabase_schema.sql` file
- Make sure you're logged in as an admin to see the registrations
