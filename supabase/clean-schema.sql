-- ============================================
-- Conversa Database Schema - CLEAN INSTALL
-- ============================================
-- This will DROP all existing tables and recreate them
-- WARNING: This will DELETE all data in these tables!
-- ============================================

-- Drop existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop existing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
DROP TRIGGER IF EXISTS update_experiences_updated_at ON experiences;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;

-- Drop existing functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends Supabase Auth)
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT NOT NULL,
  photo TEXT,
  bio TEXT,
  member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  level_name TEXT DEFAULT 'Beginner Explorer',
  badges TEXT[] DEFAULT '{}',
  languages_learning JSONB DEFAULT '[]',
  stats JSONB DEFAULT '{"totalExperiences": 0, "citiesVisited": 0, "teachersMet": 0, "reviewsWritten": 0}',
  upcoming_bookings TEXT[] DEFAULT '{}',
  past_bookings TEXT[] DEFAULT '{}',
  favorite_teachers TEXT[] DEFAULT '{}',
  is_teacher BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TEACHERS TABLE
-- ============================================
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  photo TEXT,
  email TEXT,
  languages JSONB NOT NULL DEFAULT '[]', -- [{code: 'fr', name: 'French', proficiency: 'native'}]
  specialties TEXT[] DEFAULT '{}',
  certifications JSONB DEFAULT '[]',
  bio TEXT,
  tagline TEXT,
  rating DECIMAL DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  years_teaching INTEGER DEFAULT 0,
  hourly_rate DECIMAL,
  verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- EXPERIENCES TABLE
-- ============================================
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  city TEXT NOT NULL,
  skill_level TEXT NOT NULL CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'all')),
  type TEXT NOT NULL,
  price DECIMAL NOT NULL,
  max_capacity INTEGER DEFAULT 6 CHECK (max_capacity >= 1 AND max_capacity <= 20),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  duration DECIMAL NOT NULL DEFAULT 2,
  location TEXT NOT NULL,
  image TEXT,
  what_included TEXT[] DEFAULT '{}',
  what_learn TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  booked_spots INTEGER DEFAULT 0,
  rating DECIMAL DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  num_people INTEGER DEFAULT 1 CHECK (num_people >= 1),
  is_couple BOOLEAN DEFAULT FALSE,
  total_price DECIMAL NOT NULL,
  original_price DECIMAL NOT NULL,
  discount_applied DECIMAL DEFAULT 0,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  stripe_payment_id TEXT,
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cancelled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  student_name TEXT,
  student_photo TEXT,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER BADGES TABLE
-- ============================================
CREATE TABLE user_badges (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX idx_experiences_teacher ON experiences(teacher_id);
CREATE INDEX idx_experiences_language ON experiences(language);
CREATE INDEX idx_experiences_city ON experiences(city);
CREATE INDEX idx_experiences_date ON experiences(date);
CREATE INDEX idx_experiences_status ON experiences(status);
CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_experience ON bookings(experience_id);
CREATE INDEX idx_reviews_teacher ON reviews(teacher_id);
CREATE INDEX idx_reviews_experience ON reviews(experience_id);
CREATE INDEX idx_teachers_user ON teachers(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Profiles: Anyone can read, users can update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Teachers: Public read, teacher can update own
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers are viewable by everyone"
  ON teachers FOR SELECT
  USING (true);

CREATE POLICY "Teachers can update own profile"
  ON teachers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can insert own profile"
  ON teachers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Experiences: Public read, teacher can manage own
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experiences are viewable by everyone"
  ON experiences FOR SELECT
  USING (status = 'published' OR teacher_id IN (
    SELECT id FROM teachers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Teachers can create experiences"
  ON experiences FOR INSERT
  WITH CHECK (teacher_id IN (
    SELECT id FROM teachers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Teachers can update own experiences"
  ON experiences FOR UPDATE
  USING (teacher_id IN (
    SELECT id FROM teachers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Teachers can delete own experiences"
  ON experiences FOR DELETE
  USING (teacher_id IN (
    SELECT id FROM teachers WHERE user_id = auth.uid()
  ));

-- Bookings: Users can see own bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  USING (student_id = auth.uid());

-- Reviews: Public read, users can create/update own
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for own bookings"
  ON reviews FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (student_id = auth.uid());

-- User Badges: Users can view own badges
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can earn badges"
  ON user_badges FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, photo)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'photo', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Conversa database schema created successfully!';
  RAISE NOTICE '📊 Tables: profiles, teachers, experiences, bookings, reviews, user_badges';
  RAISE NOTICE '🔒 Row Level Security: ENABLED on all tables';
  RAISE NOTICE '⚡ Auto-profile creation: ENABLED for new signups';
END $$;
