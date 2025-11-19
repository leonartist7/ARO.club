# Supabase Database Setup for Langgie

## Overview
This directory contains SQL scripts to set up the Langgie database with all required tables, RLS policies, and seed data.

## Files

1. **clean-schema.sql** - Base schema (profiles, teachers, experiences, bookings, reviews)
2. **langgie-extensions.sql** - Gamification features (chat, games, shop, achievements)
3. **seed-data.sql** - Sample data (questions, shop items, achievements)

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to the **SQL Editor** (left sidebar)
3. Create a new query
4. Copy and paste **clean-schema.sql** → Click **Run**
5. Create another new query
6. Copy and paste **langgie-extensions.sql** → Click **Run**
7. Create another new query
8. Copy and paste **seed-data.sql** → Click **Run**

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Option 3: Using psql command line

```bash
# Get your database connection string from Supabase dashboard
# Settings → Database → Connection String

psql "your-connection-string" < supabase/clean-schema.sql
psql "your-connection-string" < supabase/langgie-extensions.sql
psql "your-connection-string" < supabase/seed-data.sql
```

## Database Schema

### Core Tables
- **profiles** - User profiles with gamification fields
- **teachers** - Teacher profiles and information
- **experiences** - Language learning experiences
- **bookings** - Experience bookings
- **reviews** - Experience reviews

### Gamification Tables
- **conversations** - Chat conversations between students/teachers
- **messages** - Individual chat messages
- **game_sessions** - Game play history
- **questions** - Quiz questions for mini games
- **shop_items** - Marketplace items (avatar & home decor)
- **user_inventory** - Items purchased by users
- **achievements** - Achievement definitions
- **user_achievements** - Achievements earned by users
- **user_badges** - User badge collection

## Verification

After running all scripts, verify the setup:

```sql
-- Check tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Check row counts
SELECT
  (SELECT COUNT(*) FROM achievements) as achievements_count,
  (SELECT COUNT(*) FROM shop_items) as shop_items_count,
  (SELECT COUNT(*) FROM questions) as questions_count;
```

Expected results:
- 15+ achievements
- 40+ shop items
- 60+ questions

## Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Users can only see/edit their own data
- Public data (experiences, teachers, shop) is readable by all
- Private data (bookings, messages, inventory) is protected

## Troubleshooting

### Error: "relation already exists"
The clean-schema.sql drops existing tables. If you get errors, try running just the extensions and seed files.

### Error: "permission denied"
Make sure you're using the Supabase dashboard or CLI with proper authentication.

### Missing data after seed
Check if seed-data.sql ran completely. Some inserts use `ON CONFLICT DO NOTHING` which is safe to re-run.

## Next Steps

After setting up the database:
1. Verify Supabase credentials in `.env`
2. Test authentication signup/login
3. Check if profiles are auto-created on signup
4. Test querying data from the frontend
