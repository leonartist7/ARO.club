-- ============================================
-- Langgie Extensions - Gamification Features
-- ============================================
-- This extends the existing schema with Langgie-specific features:
-- - Onboarding fields in profiles
-- - Chat system (conversations, messages)
-- - Mini games (game_sessions, questions)
-- - Marketplace (shop_items, user_inventory)
-- - Achievements system
-- ============================================

-- ============================================
-- 1. EXTEND PROFILES TABLE WITH LANGGIE FIELDS
-- ============================================

-- Add new columns for Langgie onboarding and gamification
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_type TEXT CHECK (user_type IN ('student', 'teacher'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar JSONB DEFAULT '{"skin":"light","hair":"short-brown","eyes":"brown","outfit":"casual","accessory":"none"}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS goal TEXT CHECK (goal IN ('casual', 'regular', 'serious', 'intense'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS goal_minutes INTEGER DEFAULT 5;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS streak INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active DATE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS experience_types TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS daily_minutes_practiced INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_practice_date DATE;

-- ============================================
-- 2. CONVERSATIONS TABLE (For Chat System)
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unread_count_student INTEGER DEFAULT 0,
  unread_count_teacher INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, teacher_id)
);

-- ============================================
-- 3. MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message_text TEXT,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'location')),
  image_url TEXT,
  location_lat DECIMAL,
  location_lng DECIMAL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. GAME SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  game_type TEXT NOT NULL CHECK (game_type IN ('word_match', 'speed_quiz', 'listening_challenge', 'daily_streak')),
  score INTEGER DEFAULT 0,
  points_earned INTEGER NOT NULL,
  accuracy DECIMAL,
  time_spent INTEGER, -- seconds
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. QUESTIONS TABLE (For Quiz Games)
-- ============================================
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('translation', 'multiple_choice', 'listening')),
  correct_answer TEXT NOT NULL,
  wrong_answer_1 TEXT NOT NULL,
  wrong_answer_2 TEXT NOT NULL,
  wrong_answer_3 TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  audio_url TEXT, -- For listening challenges
  native_language TEXT DEFAULT 'English',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. SHOP ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS shop_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('accessory', 'outfit', 'hairstyle', 'furniture', 'decoration')),
  price_points INTEGER NOT NULL,
  level_required INTEGER DEFAULT 1,
  available BOOLEAN DEFAULT TRUE,
  description TEXT,
  preview_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. USER INVENTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_inventory (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  item_id UUID REFERENCES shop_items(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  equipped BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, item_id)
);

-- ============================================
-- 8. ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  points_reward INTEGER NOT NULL,
  icon_emoji TEXT NOT NULL,
  unlock_condition TEXT NOT NULL,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. USER ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, achievement_id)
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_conversations_student ON conversations(student_id);
CREATE INDEX IF NOT EXISTS idx_conversations_teacher ON conversations(teacher_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user ON game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_type ON game_sessions(game_type);
CREATE INDEX IF NOT EXISTS idx_questions_language ON questions(language);
CREATE INDEX IF NOT EXISTS idx_questions_type ON questions(question_type);
CREATE INDEX IF NOT EXISTS idx_shop_items_category ON shop_items(category);
CREATE INDEX IF NOT EXISTS idx_user_inventory_user ON user_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Conversations: Users can only see their own conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (student_id = auth.uid() OR teacher_id = auth.uid());

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (student_id = auth.uid() OR teacher_id = auth.uid());

CREATE POLICY "Users can update own conversations"
  ON conversations FOR UPDATE
  USING (student_id = auth.uid() OR teacher_id = auth.uid());

-- Messages: Users can see messages in their conversations
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (conversation_id IN (
    SELECT id FROM conversations WHERE student_id = auth.uid() OR teacher_id = auth.uid()
  ));

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    conversation_id IN (
      SELECT id FROM conversations WHERE student_id = auth.uid() OR teacher_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  USING (sender_id = auth.uid());

-- Game Sessions: Users can only see/create their own sessions
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own game sessions"
  ON game_sessions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own game sessions"
  ON game_sessions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Questions: Everyone can read questions (needed for games)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view questions"
  ON questions FOR SELECT
  USING (true);

-- Shop Items: Everyone can view shop items
ALTER TABLE shop_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view shop items"
  ON shop_items FOR SELECT
  USING (available = true);

-- User Inventory: Users can only see/manage their own inventory
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own inventory"
  ON user_inventory FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can add to own inventory"
  ON user_inventory FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own inventory"
  ON user_inventory FOR UPDATE
  USING (user_id = auth.uid());

-- Achievements: Everyone can read achievements
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view achievements"
  ON achievements FOR SELECT
  USING (true);

-- User Achievements: Users can only see their own achievements
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can unlock achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- TRIGGERS
-- ============================================

-- Update conversations updated_at on new message
CREATE OR REPLACE FUNCTION update_conversation_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET
    last_message = NEW.message_text,
    last_message_at = NEW.created_at,
    updated_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_message_sent
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_on_message();

-- Update streak on daily login
CREATE OR REPLACE FUNCTION update_streak_on_login()
RETURNS TRIGGER AS $$
BEGIN
  -- If last_active was yesterday, increment streak
  IF NEW.last_active = CURRENT_DATE - INTERVAL '1 day' THEN
    NEW.streak = OLD.streak + 1;
  -- If last_active was today, keep streak
  ELSIF NEW.last_active = CURRENT_DATE THEN
    NEW.streak = OLD.streak;
  -- Otherwise reset streak
  ELSE
    NEW.streak = 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_streak
  BEFORE UPDATE OF last_active ON profiles
  FOR EACH ROW
  WHEN (NEW.last_active IS DISTINCT FROM OLD.last_active)
  EXECUTE FUNCTION update_streak_on_login();

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Langgie extensions created successfully!';
  RAISE NOTICE '🎮 Added: Conversations, Messages, Game Sessions, Questions';
  RAISE NOTICE '🛍️ Added: Shop Items, User Inventory';
  RAISE NOTICE '🏆 Added: Achievements, User Achievements';
  RAISE NOTICE '👤 Extended: Profiles with onboarding fields';
  RAISE NOTICE '🔒 Row Level Security: ENABLED on all new tables';
END $$;
