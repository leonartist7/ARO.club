-- EMERGENCY FIX: Enable Email Authentication in Supabase
-- This fixes "Email signups are disabled" error

-- This is a dashboard setting, not SQL
-- But we can verify your auth configuration

-- ====================
-- VERIFY CURRENT AUTH SETTINGS
-- ====================
SELECT
  'Auth Check' as test,
  'Check Supabase Dashboard → Authentication → Providers' as action;

-- ====================
-- CHECK EXISTING USERS
-- ====================
SELECT
  'Existing Users' as info,
  COUNT(*) || ' users already exist' as status
FROM auth.users;

-- ====================
-- MANUAL FIX REQUIRED
-- ====================
-- You MUST do this in Supabase Dashboard:
--
-- 1. Go to: Authentication → Providers (left sidebar)
-- 2. Find "Email" provider
-- 3. Click "Enable"
-- 4. Uncheck "Confirm email" (for development)
-- 5. Click "Save"
--
-- If you don't see the UI option, contact Supabase support
-- ====================
