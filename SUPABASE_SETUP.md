# Supabase Database Setup for TongueConnect

## Issue Diagnosis

**Problem**: After login, users see the same page without profile/authenticated features.

**Root Cause**: The Supabase database doesn't have the required `profiles` table set up. When you create an account:
1. Supabase creates the user in `auth.users`
2. The app tries to load the profile from `profiles` table
3. This fails because the table doesn't exist
4. The auth state doesn't update properly

## Solution: Set Up Database Tables

### Step 1: Create Profiles Table

Go to your Supabase dashboard → SQL Editor → New Query and run:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  photo TEXT,
  bio TEXT,
  is_teacher BOOLEAN DEFAULT false,
  languages TEXT[],
  native_language TEXT,
  city TEXT,
  points INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, photo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'photo', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

### Step 2: Create Experiences Table (Optional - for full functionality)

```sql
-- Create experiences table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  city TEXT NOT NULL,
  skill_level TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  max_capacity INTEGER NOT NULL,
  booked_spots INTEGER DEFAULT 0,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  duration DECIMAL(3,1) NOT NULL,
  location TEXT NOT NULL,
  photo TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Experiences are viewable by everyone"
  ON public.experiences FOR SELECT
  USING (true);

CREATE POLICY "Teachers can insert their own experiences"
  ON public.experiences FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update their own experiences"
  ON public.experiences FOR UPDATE
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete their own experiences"
  ON public.experiences FOR DELETE
  USING (auth.uid() = teacher_id);
```

### Step 3: Create Notifications Table (Optional)

```sql
-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);
```

### Step 4: Create Contact Messages Table (Optional)

```sql
-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view (you'll need to add admin check)
CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);
```

### Step 5: Enable Email Confirmation (Optional)

In Supabase Dashboard → Authentication → Settings:

**Option 1: Disable Email Confirmation** (for development)
- Uncheck "Enable email confirmations"
- Users can login immediately after signup

**Option 2: Enable Email Confirmation** (for production)
- Keep "Enable email confirmations" checked
- Configure email templates
- Users must confirm email before login

## Testing Authentication

### 1. Clear Browser Data
- Open DevTools (F12)
- Application tab → Clear site data
- Refresh the page

### 2. Create New Account
1. Go to `/signup`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!@#
3. Click "Create Account"

### 3. Verify Login
After successful signup/login, you should see:
- ✅ User avatar in header (top right)
- ✅ Notification bell icon
- ✅ User dropdown menu when clicking avatar
- ✅ "My Profile" and "Sign Out" options
- ✅ If teacher: "Teacher Dashboard" option

### 4. Test Features
- Click avatar → "My Profile" → Should see profile page
- Click notification bell → Should see dropdown
- Click "Explore" → Should see experiences

## Common Issues & Fixes

### Issue: "Missing Supabase environment variables"
**Fix**: Restart the dev server after adding .env file:
```bash
npm run dev
```

### Issue: "relation 'profiles' does not exist"
**Fix**: Run Step 1 SQL in Supabase dashboard

### Issue: "Row Level Security policy violation"
**Fix**: Ensure RLS policies are created (Step 1)

### Issue: Can't see user menu after login
**Fix**:
1. Check browser console for errors
2. Verify profiles table exists
3. Check that trigger is created
4. Try signing out and back in

### Issue: Email not confirmed
**Fix**: Either:
- Disable email confirmation (Settings → Auth)
- Check spam folder for confirmation email
- Use Supabase dashboard → Authentication → Users → manually confirm email

## Verify Database Setup

Run this query in Supabase SQL Editor to verify:

```sql
-- Check if tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'experiences', 'notifications');

-- Check if trigger exists
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'profiles';
```

Expected output:
- 3 tables (or 1 minimum: profiles)
- 1 trigger: on_auth_user_created
- rowsecurity: true

## Next Steps

After database setup:
1. Restart dev server: `npm run dev`
2. Clear browser cache
3. Sign up with a new account
4. Test all authenticated features
5. Check PROJECT_COMPLETION_CHECKLIST.md for remaining tasks
