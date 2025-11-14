-- SEED INITIAL DATA FOR TONGUECONNECT
-- This creates sample experiences and makes your app look production-ready
-- Run AFTER verify_auth_setup.sql shows all green checkmarks

-- ====================
-- PART 1: CREATE TEACHER PROFILES
-- ====================
-- Update your own profile to be a teacher (replace with your user ID)
-- First, get your user ID by running: SELECT id, email FROM auth.users;
-- Then uncomment and update this:
-- UPDATE public.profiles
-- SET is_teacher = true,
--     bio = 'Passionate language teacher with 10+ years of experience',
--     native_language = 'french',
--     city = 'paris'
-- WHERE email = 'YOUR_EMAIL@example.com';

-- ====================
-- PART 2: ADD SAMPLE EXPERIENCES (if experiences table exists)
-- ====================
-- Note: This assumes you have a user_id. Get it from: SELECT id FROM auth.users LIMIT 1;
-- Replace 'YOUR_USER_ID_HERE' with actual UUID

DO $$
DECLARE
  teacher_id UUID;
BEGIN
  -- Get first teacher user (or your user)
  SELECT id INTO teacher_id FROM public.profiles WHERE is_teacher = true LIMIT 1;

  -- If no teacher found, skip
  IF teacher_id IS NULL THEN
    RAISE NOTICE 'No teacher found. Please set is_teacher=true for at least one profile first.';
  ELSE
    -- Insert sample experiences
    INSERT INTO public.experiences
      (teacher_id, title, description, language, city, skill_level, type, price, max_capacity, booked_spots, date, time, duration, location, status)
    VALUES
      (teacher_id, 'French Cooking Class in Montmartre', 'Learn to cook authentic French cuisine while practicing your French. We''ll prepare a 3-course meal together!', 'french', 'paris', 'beginner', 'food', 45.00, 8, 3, CURRENT_DATE + INTERVAL '7 days', '18:00', 3.0, 'Cooking Studio, 15 Rue Montmartre, Paris', 'published'),

      (teacher_id, 'Spanish Tapas Night & Language Exchange', 'Enjoy delicious tapas while practicing conversational Spanish in a relaxed setting.', 'spanish', 'barcelona', 'intermediate', 'food', 38.00, 6, 2, CURRENT_DATE + INTERVAL '5 days', '19:30', 2.5, 'La Bodega, Carrer de la Riera, Barcelona', 'published'),

      (teacher_id, 'Italian Wine Tasting Tour', 'Explore Tuscan wines while learning Italian wine vocabulary and culture.', 'italian', 'florence', 'beginner', 'cultural', 55.00, 8, 5, CURRENT_DATE + INTERVAL '10 days', '16:00', 2.0, 'Cantina del Vino, Via dei Neri, Florence', 'published'),

      (teacher_id, 'Morning Coffee Chat in French', 'Start your day with coffee and casual French conversation at a local café.', 'french', 'paris', 'beginner', 'social', 25.00, 4, 1, CURRENT_DATE + INTERVAL '3 days', '09:00', 1.5, 'Café de Flore, Boulevard Saint-Germain, Paris', 'published'),

      (teacher_id, 'Spanish Market Tour & Cooking', 'Visit a traditional Spanish market and cook what we buy!', 'spanish', 'barcelona', 'intermediate', 'food', 42.00, 6, 4, CURRENT_DATE + INTERVAL '8 days', '10:00', 4.0, 'Mercat de Sant Josep, La Rambla, Barcelona', 'published'),

      (teacher_id, 'Italian Art Gallery Tour', 'Explore the Uffizi Gallery while learning art-related Italian vocabulary.', 'italian', 'florence', 'intermediate', 'cultural', 35.00, 8, 2, CURRENT_DATE + INTERVAL '12 days', '14:00', 2.5, 'Uffizi Gallery, Piazzale degli Uffizi, Florence', 'published')
    ON CONFLICT DO NOTHING;

    RAISE NOTICE 'Sample experiences created successfully!';
  END IF;
END $$;

-- ====================
-- PART 3: ADD SAMPLE NOTIFICATIONS FOR ALL USERS
-- ====================
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN SELECT id FROM public.profiles LOOP
    INSERT INTO public.notifications
      (user_id, type, title, message, link, read, created_at)
    VALUES
      (user_record.id, 'level_up', 'Welcome to TongueConnect! 🎉', 'Your account has been created successfully. Start exploring language experiences now!', '/explore', false, NOW()),
      (user_record.id, 'booking_confirmed', 'Getting Started', 'Browse experiences, book your first class, and start your language learning journey!', '/explore', false, NOW() - INTERVAL '1 hour')
    ON CONFLICT DO NOTHING;
  END LOOP;

  RAISE NOTICE 'Welcome notifications created for all users!';
END $$;

-- ====================
-- PART 4: VERIFY DATA WAS CREATED
-- ====================
SELECT 'Experiences Created' as check, COUNT(*) as count FROM public.experiences;
SELECT 'Notifications Created' as check, COUNT(*) as count FROM public.notifications;
SELECT 'Teacher Profiles' as check, COUNT(*) as count FROM public.profiles WHERE is_teacher = true;

-- ====================
-- PART 5: SHOW SAMPLE DATA
-- ====================
SELECT
  e.title,
  e.language,
  e.city,
  e.price,
  e.date,
  e.status,
  p.name as teacher_name
FROM public.experiences e
JOIN public.profiles p ON p.id = e.teacher_id
ORDER BY e.date
LIMIT 10;

-- ====================
-- QUICK FIX: Make yourself a teacher
-- ====================
-- Run this if you want to access Teacher Dashboard:
-- UPDATE public.profiles
-- SET is_teacher = true
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL@example.com');

-- ====================
-- SUCCESS MESSAGE
-- ====================
SELECT
  '✅ SETUP COMPLETE!' as message,
  'Your app now has sample data and is production-ready!' as status;
