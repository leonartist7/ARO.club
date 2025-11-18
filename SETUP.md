# Conversa MVP - Setup Guide

This guide will help you complete the setup of your Conversa MVP with Supabase authentication and database.

## ✅ Completed

The following has been set up for you:

- **Environment Variables**: `.env` file with your Supabase credentials
- **Supabase Client**: Configured in `src/lib/supabase.js`
- **Authentication System**: Complete auth context with login, signup, password reset
- **Auth Pages**: Login, Signup, Forgot Password, OAuth Callback pages
- **Protected Routes**: Profile and Dashboard pages are now protected
- **Header Updates**: User dropdown menu with logout functionality
- **Database Schema**: Complete SQL schema file ready to run

## 🚀 Next Steps (Manual Setup Required)

### Step 1: Run Database Schema in Supabase

1. **Go to your Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project: `ybhecubqnhukgpvchjay`

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query" button

3. **Copy and Run Schema**
   - Open the file: `supabase/schema.sql`
   - Copy the entire contents (all 400+ lines)
   - Paste into the SQL Editor
   - Click the "Run" button (or press Ctrl/Cmd + Enter)

4. **Verify Tables Created**
   - Click "Table Editor" in the left sidebar
   - You should see 6 tables:
     - `profiles` (extends auth.users)
     - `teachers` (teacher information)
     - `experiences` (language experiences)
     - `bookings` (student bookings)
     - `reviews` (experience reviews)
     - `user_badges` (gamification badges)

5. **Check Row Level Security (RLS)**
   - Each table should show "RLS Enabled" badge
   - This ensures users can only access their own data

### Step 2: Enable Google OAuth (Optional)

If you want to enable "Sign in with Google":

1. **Go to Supabase Dashboard → Authentication → Providers**
2. **Find Google Provider**
3. **Enable it and add your OAuth credentials**
   - Get credentials from: https://console.cloud.google.com/
   - Follow Supabase's guide: https://supabase.com/docs/guides/auth/social-login/auth-google

### Step 3: Test Authentication Flow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Signup**
   - Navigate to `/signup`
   - Create a test account with email/password
   - Check that you're redirected to `/explore`
   - Verify profile is created in Supabase Table Editor

3. **Test Login**
   - Sign out using the user dropdown menu
   - Navigate to `/login`
   - Sign in with your test credentials
   - Verify you're authenticated

4. **Test Protected Routes**
   - While signed out, try accessing `/profile`
   - You should be redirected to `/login`
   - After signing in, you should access the profile page

5. **Test Password Reset**
   - Sign out
   - Go to `/forgot-password`
   - Enter your email
   - Check your email inbox for reset link

## 📊 What's Next After Setup

Once authentication is working, you can:

### Phase 1: Data Migration (Recommended Next)
- [ ] Seed database with mock data from `/src/data/` JSON files
- [ ] Update components to fetch from Supabase instead of JSON imports
- [ ] Test CRUD operations (Create, Read, Update, Delete)

### Phase 2: Booking Flow
- [ ] Integrate Stripe for payments
- [ ] Build booking checkout flow
- [ ] Add email confirmations (using Supabase Email Templates)
- [ ] Implement booking status updates

### Phase 3: Teacher Features
- [ ] Build experience creation form (already in TeacherDashboardPage)
- [ ] Add image upload with Cloudinary or Supabase Storage
- [ ] Teacher verification system
- [ ] Earnings dashboard

### Phase 4: Advanced Features
- [ ] Real-time chat between students and teachers
- [ ] Google Maps integration for location display
- [ ] Review system with image uploads
- [ ] Gamification: badge unlocking system
- [ ] Notifications (email + in-app)

### Phase 5: Production Deployment
- [ ] Deploy to Vercel or Netlify
- [ ] Set up custom domain
- [ ] Configure production environment variables
- [ ] Set up monitoring and analytics
- [ ] Test on real devices

## 🔐 Security Notes

- **NEVER commit `.env` file** - It's already in `.gitignore`
- **Service Role Key** is stored in `.env` but should NEVER be used in frontend code
- **Row Level Security (RLS)** is enabled on all tables
- All user passwords are hashed by Supabase Auth
- API keys in frontend are safe (they're anon keys with RLS)

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Check that `.env` file exists in project root
- Restart dev server after creating `.env`

### "Row Level Security policy violation"
- Make sure you ran the complete schema.sql
- Check that RLS policies were created in Supabase dashboard

### Google OAuth not working
- Verify you've added OAuth credentials in Supabase dashboard
- Check that callback URL matches: `http://localhost:5173/auth/callback`

### Email not sending
- Check Supabase dashboard → Settings → Auth → Email Templates
- For production, configure SMTP settings

## 📝 Important Files

- **`.env`** - Environment variables (DO NOT COMMIT)
- **`supabase/schema.sql`** - Database schema (run this in Supabase)
- **`src/lib/supabase.js`** - Supabase client configuration
- **`src/contexts/AuthContext.jsx`** - Authentication context and methods
- **`src/components/auth/ProtectedRoute.jsx`** - Route protection wrapper

## 🎯 Current Architecture

```
Frontend (React + Vite)
    ↓
Supabase Auth (handles login/signup/oauth)
    ↓
PostgreSQL Database (with RLS policies)
    ↓
Data flows through AuthContext
    ↓
Protected routes check authentication
```

## 📚 Helpful Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [React + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

---

**Need Help?**
- Check the Supabase documentation
- Review the code comments in AuthContext.jsx
- Test authentication in browser DevTools → Application → Local Storage
