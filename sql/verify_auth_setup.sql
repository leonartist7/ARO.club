-- COMPREHENSIVE AUTHENTICATION TEST & SETUP
-- Run this in Supabase SQL Editor to verify and fix everything

-- ====================
-- PART 1: VERIFY TABLES
-- ====================
SELECT
  'Tables Check' as test,
  CASE
    WHEN COUNT(*) = 3 THEN '✅ PASS: All tables exist'
    ELSE '❌ FAIL: Missing tables'
  END as result
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'experiences', 'notifications');

-- ====================
-- PART 2: VERIFY TRIGGER
-- ====================
SELECT
  'Trigger Check' as test,
  CASE
    WHEN COUNT(*) = 1 THEN '✅ PASS: Auto-profile trigger exists'
    ELSE '❌ FAIL: Trigger missing'
  END as result
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- ====================
-- PART 3: VERIFY RLS
-- ====================
SELECT
  'RLS Check' as test,
  CASE
    WHEN rowsecurity = true THEN '✅ PASS: RLS enabled on profiles'
    ELSE '❌ FAIL: RLS not enabled'
  END as result
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'profiles';

-- ====================
-- PART 4: VERIFY POLICIES
-- ====================
SELECT
  'Policies Check' as test,
  COUNT(*) || ' policies found on profiles' as result
FROM pg_policies
WHERE tablename = 'profiles';

-- ====================
-- PART 5: CHECK EXISTING USERS
-- ====================
SELECT
  'Existing Users' as test,
  COUNT(*) || ' users in auth.users' as result
FROM auth.users;

SELECT
  'Existing Profiles' as test,
  COUNT(*) || ' profiles in profiles table' as result
FROM public.profiles;

-- ====================
-- PART 6: TEST DATA - Create a test teacher profile
-- ====================
-- First, check if test user exists
DO $$
BEGIN
  -- This will show you if there's a mismatch between auth.users and profiles
  RAISE NOTICE 'Users without profiles: %',
    (SELECT COUNT(*) FROM auth.users u
     LEFT JOIN public.profiles p ON u.id = p.id
     WHERE p.id IS NULL);
END $$;

-- ====================
-- PART 7: FIX MISSING PROFILES
-- If you have users but no profiles, run this:
-- ====================
INSERT INTO public.profiles (id, name, email, photo, is_teacher)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  u.email,
  COALESCE(u.raw_user_meta_data->>'photo', ''),
  false
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- ====================
-- PART 8: VERIFY EMAIL CONFIRMATION SETTING
-- ====================
-- Check current auth settings
SELECT
  'Email Confirmation' as test,
  CASE
    WHEN (SELECT raw_app_meta_data->>'email_confirmed_at' IS NOT NULL FROM auth.users LIMIT 1)
    THEN '✅ Users have confirmed emails'
    ELSE 'ℹ️ Email confirmation may be required'
  END as result;

-- ====================
-- PART 9: SHOW ALL PROFILES
-- ====================
SELECT
  p.id,
  p.name,
  p.email,
  p.is_teacher,
  p.created_at,
  u.email_confirmed_at
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
ORDER BY p.created_at DESC;

-- ====================
-- SUCCESS INDICATORS
-- ====================
-- You should see:
-- ✅ All tables exist (3 tables)
-- ✅ Trigger exists
-- ✅ RLS enabled
-- ✅ At least 3 policies on profiles
-- ✅ Number of auth.users = number of profiles
