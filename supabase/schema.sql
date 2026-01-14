-- ============================================
-- TongueConnect Database Schema
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

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
-- LESSONS TABLE
-- ============================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category TEXT NOT NULL, -- grammar, vocabulary, conversation, culture
  icon TEXT, -- emoji or icon name
  points_reward INTEGER DEFAULT 10,
  duration_minutes INTEGER DEFAULT 15,
  content JSONB NOT NULL DEFAULT '[]', -- [{type: 'text|quiz|flashcard|audio', data: {...}}]
  order_index INTEGER DEFAULT 0,
  is_locked BOOLEAN DEFAULT FALSE,
  unlock_requirements JSONB DEFAULT '{}', -- {requiredLessons: [], minPoints: 0}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER LESSON PROGRESS TABLE
-- ============================================
CREATE TABLE user_lesson_progress (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  score INTEGER, -- quiz/test score
  time_spent_minutes INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);

-- ============================================
-- HOME OBJECTS TABLE (Items for 3D Home)
-- ============================================
CREATE TABLE home_objects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- furniture, decoration, plant, lighting, electronics, fun
  icon TEXT, -- emoji or icon identifier
  model_type TEXT NOT NULL, -- primitive shape: box, sphere, cylinder, or custom
  model_config JSONB NOT NULL DEFAULT '{}', -- {color, size, geometry, etc.}
  price_points INTEGER DEFAULT 0, -- 0 means free/earned
  earn_requirement JSONB, -- {type: 'lesson_complete', lessonId: 'xxx'} or {type: 'achievement', points: 100}
  is_unlocked_by_default BOOLEAN DEFAULT FALSE,
  fun_fact TEXT, -- educational tidbit shown when interacting
  interactive_message TEXT, -- message shown when tapped
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER INVENTORY TABLE (Objects owned by user)
-- ============================================
CREATE TABLE user_inventory (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  object_id UUID REFERENCES home_objects(id) ON DELETE CASCADE,
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  acquisition_method TEXT, -- 'purchase', 'earned', 'reward', 'gift'
  PRIMARY KEY (user_id, object_id)
);

-- ============================================
-- USER HOME CUSTOMIZATION TABLE (Placed objects)
-- ============================================
CREATE TABLE user_home_customization (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  object_id UUID REFERENCES home_objects(id) ON DELETE CASCADE,
  position_x DECIMAL DEFAULT 0,
  position_y DECIMAL DEFAULT 0,
  position_z DECIMAL DEFAULT 0,
  rotation_x DECIMAL DEFAULT 0,
  rotation_y DECIMAL DEFAULT 0,
  rotation_z DECIMAL DEFAULT 0,
  scale DECIMAL DEFAULT 1.0,
  is_visible BOOLEAN DEFAULT TRUE,
  custom_name TEXT, -- user can rename objects
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LEARNING PATHS TABLE (Structured Courses)
-- ============================================
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  icon TEXT,
  estimated_hours INTEGER DEFAULT 10,
  total_points INTEGER DEFAULT 0,
  lesson_ids TEXT[] DEFAULT '{}', -- Array of lesson IDs in order
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER LEARNING PATH PROGRESS TABLE
-- ============================================
CREATE TABLE user_learning_path_progress (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  current_lesson_index INTEGER DEFAULT 0,
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, path_id)
);

-- ============================================
-- DAILY CHALLENGES TABLE
-- ============================================
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  challenge_type TEXT NOT NULL, -- complete_lessons, earn_points, practice_streak, quiz_perfect
  target_value INTEGER DEFAULT 1,
  points_reward INTEGER DEFAULT 20,
  expires_at DATE NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER CHALLENGE PROGRESS TABLE
-- ============================================
CREATE TABLE user_challenge_progress (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES daily_challenges(id) ON DELETE CASCADE,
  current_value INTEGER DEFAULT 0,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'expired')),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, challenge_id)
);

-- ============================================
-- USER STREAKS TABLE
-- ============================================
CREATE TABLE user_streaks (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  total_study_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT, -- learning, social, streak, collection
  requirement_type TEXT NOT NULL, -- streak, lessons_completed, points, friends, etc.
  requirement_value INTEGER,
  points_reward INTEGER DEFAULT 0,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  unlock_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

-- ============================================
-- FRIENDS TABLE
-- ============================================
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, friend_id)
);

-- ============================================
-- STUDY ROOMS TABLE (Virtual Study Spaces)
-- ============================================
CREATE TABLE study_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  host_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  max_participants INTEGER DEFAULT 6,
  is_public BOOLEAN DEFAULT TRUE,
  room_code TEXT UNIQUE,
  theme TEXT DEFAULT 'modern', -- modern, cozy, library, cafe
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STUDY ROOM PARTICIPANTS TABLE
-- ============================================
CREATE TABLE study_room_participants (
  room_id UUID REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  left_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (room_id, user_id)
);

-- ============================================
-- USER ANALYTICS TABLE
-- ============================================
CREATE TABLE user_analytics (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  total_study_time_minutes INTEGER DEFAULT 0,
  lessons_completed_count INTEGER DEFAULT 0,
  average_quiz_score DECIMAL DEFAULT 0,
  favorite_language TEXT,
  most_active_day TEXT, -- monday, tuesday, etc.
  total_points_earned INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  achievements_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- achievement, friend_request, challenge, streak, lesson
  related_id TEXT, -- ID of related entity (achievement_id, friend_id, etc.)
  icon TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- HOME THEMES TABLE
-- ============================================
CREATE TABLE home_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  preview_image TEXT,
  background_color TEXT DEFAULT '#e0e0e0',
  floor_color TEXT DEFAULT '#cccccc',
  wall_color TEXT DEFAULT '#f5f5f5',
  lighting_preset TEXT DEFAULT 'bright', -- bright, warm, cool, dramatic
  price_points INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  unlock_requirement JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER HOME THEMES TABLE
-- ============================================
CREATE TABLE user_home_themes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES home_themes(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT FALSE,
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, theme_id)
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
CREATE INDEX idx_lessons_language ON lessons(language);
CREATE INDEX idx_lessons_difficulty ON lessons(difficulty);
CREATE INDEX idx_lessons_order ON lessons(order_index);
CREATE INDEX idx_user_lesson_progress_user ON user_lesson_progress(user_id);
CREATE INDEX idx_user_lesson_progress_lesson ON user_lesson_progress(lesson_id);
CREATE INDEX idx_home_objects_category ON home_objects(category);
CREATE INDEX idx_user_inventory_user ON user_inventory(user_id);
CREATE INDEX idx_user_home_customization_user ON user_home_customization(user_id);
CREATE INDEX idx_learning_paths_language ON learning_paths(language);
CREATE INDEX idx_user_learning_path_progress_user ON user_learning_path_progress(user_id);
CREATE INDEX idx_daily_challenges_expires ON daily_challenges(expires_at);
CREATE INDEX idx_user_challenge_progress_user ON user_challenge_progress(user_id);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_friendships_user ON friendships(user_id);
CREATE INDEX idx_friendships_friend ON friendships(friend_id);
CREATE INDEX idx_friendships_status ON friendships(status);
CREATE INDEX idx_study_rooms_active ON study_rooms(is_active);
CREATE INDEX idx_study_rooms_host ON study_rooms(host_user_id);
CREATE INDEX idx_study_room_participants_room ON study_room_participants(room_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_home_themes_premium ON home_themes(is_premium);

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

-- Lessons: Public read
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable by everyone"
  ON lessons FOR SELECT
  USING (true);

-- User Lesson Progress: Users can manage own progress
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson progress"
  ON user_lesson_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own lesson progress"
  ON user_lesson_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own lesson progress"
  ON user_lesson_progress FOR UPDATE
  USING (user_id = auth.uid());

-- Home Objects: Public read
ALTER TABLE home_objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Home objects are viewable by everyone"
  ON home_objects FOR SELECT
  USING (true);

-- User Inventory: Users can manage own inventory
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own inventory"
  ON user_inventory FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can add to own inventory"
  ON user_inventory FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove from own inventory"
  ON user_inventory FOR DELETE
  USING (user_id = auth.uid());

-- User Home Customization: Users can manage own home
ALTER TABLE user_home_customization ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own home customization"
  ON user_home_customization FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create home customization"
  ON user_home_customization FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update home customization"
  ON user_home_customization FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete home customization"
  ON user_home_customization FOR DELETE
  USING (user_id = auth.uid());

-- Learning Paths: Public read
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learning paths are viewable by everyone"
  ON learning_paths FOR SELECT
  USING (true);

-- User Learning Path Progress: Users manage own progress
ALTER TABLE user_learning_path_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning path progress"
  ON user_learning_path_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own learning path progress"
  ON user_learning_path_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own learning path progress"
  ON user_learning_path_progress FOR UPDATE
  USING (user_id = auth.uid());

-- Daily Challenges: Public read
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Daily challenges are viewable by everyone"
  ON daily_challenges FOR SELECT
  USING (true);

-- User Challenge Progress: Users manage own progress
ALTER TABLE user_challenge_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own challenge progress"
  ON user_challenge_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own challenge progress"
  ON user_challenge_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own challenge progress"
  ON user_challenge_progress FOR UPDATE
  USING (user_id = auth.uid());

-- User Streaks: Users manage own streaks
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON user_streaks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own streaks"
  ON user_streaks FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own streaks"
  ON user_streaks FOR UPDATE
  USING (user_id = auth.uid());

-- Achievements: Public read
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  USING (true);

-- User Achievements: Users manage own achievements
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can earn achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Friendships: Users can view and manage own friendships
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own friendships"
  ON friendships FOR SELECT
  USING (user_id = auth.uid() OR friend_id = auth.uid());

CREATE POLICY "Users can create friend requests"
  ON friendships FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own friendships"
  ON friendships FOR UPDATE
  USING (user_id = auth.uid() OR friend_id = auth.uid());

CREATE POLICY "Users can delete own friendships"
  ON friendships FOR DELETE
  USING (user_id = auth.uid() OR friend_id = auth.uid());

-- Study Rooms: Public read active rooms, users manage own
ALTER TABLE study_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active study rooms are viewable by everyone"
  ON study_rooms FOR SELECT
  USING (is_active = true OR host_user_id = auth.uid());

CREATE POLICY "Users can create study rooms"
  ON study_rooms FOR INSERT
  WITH CHECK (host_user_id = auth.uid());

CREATE POLICY "Hosts can update own rooms"
  ON study_rooms FOR UPDATE
  USING (host_user_id = auth.uid());

CREATE POLICY "Hosts can delete own rooms"
  ON study_rooms FOR DELETE
  USING (host_user_id = auth.uid());

-- Study Room Participants: Users manage own participation
ALTER TABLE study_room_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room participants are viewable"
  ON study_room_participants FOR SELECT
  USING (true);

CREATE POLICY "Users can join rooms"
  ON study_room_participants FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own participation"
  ON study_room_participants FOR UPDATE
  USING (user_id = auth.uid());

-- User Analytics: Users view own analytics
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analytics"
  ON user_analytics FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own analytics"
  ON user_analytics FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own analytics"
  ON user_analytics FOR UPDATE
  USING (user_id = auth.uid());

-- Notifications: Users view own notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (user_id = auth.uid());

-- Home Themes: Public read
ALTER TABLE home_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Home themes are viewable by everyone"
  ON home_themes FOR SELECT
  USING (true);

-- User Home Themes: Users manage own themes
ALTER TABLE user_home_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own themes"
  ON user_home_themes FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can add themes"
  ON user_home_themes FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own themes"
  ON user_home_themes FOR UPDATE
  USING (user_id = auth.uid());

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

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_lesson_progress_updated_at
  BEFORE UPDATE ON user_lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_home_objects_updated_at
  BEFORE UPDATE ON home_objects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_home_customization_updated_at
  BEFORE UPDATE ON user_home_customization
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at
  BEFORE UPDATE ON learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_learning_path_progress_updated_at
  BEFORE UPDATE ON user_learning_path_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_challenge_progress_updated_at
  BEFORE UPDATE ON user_challenge_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_streaks_updated_at
  BEFORE UPDATE ON user_streaks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_friendships_updated_at
  BEFORE UPDATE ON friendships
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_rooms_updated_at
  BEFORE UPDATE ON study_rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_analytics_updated_at
  BEFORE UPDATE ON user_analytics
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
  RAISE NOTICE 'TongueConnect database schema created successfully!';
END $$;
