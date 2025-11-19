-- ============================================
-- Langgie Seed Data
-- ============================================
-- Sample data for questions, shop items, and achievements
-- ============================================

-- ============================================
-- SEED ACHIEVEMENTS
-- ============================================

INSERT INTO achievements (id, name, description, points_reward, icon_emoji, unlock_condition, tier) VALUES
('welcome_bonus', 'Welcome Aboard!', 'Complete your onboarding journey', 100, '👋', 'Complete onboarding', 'bronze'),
('first_game', 'Game On', 'Play your first mini game', 50, '🎮', 'Complete any game', 'bronze'),
('streak_3', 'Streak Starter', 'Maintain a 3-day streak', 100, '🔥', 'Reach 3-day streak', 'bronze'),
('streak_7', 'Week Warrior', 'Maintain a 7-day streak', 300, '⚡', 'Reach 7-day streak', 'silver'),
('streak_30', 'Monthly Master', 'Maintain a 30-day streak', 1000, '💎', 'Reach 30-day streak', 'gold'),
('social_butterfly', 'Social Butterfly', 'Send 10 messages to teachers', 150, '💬', 'Send 10 messages', 'bronze'),
('bookworm', 'Bookworm', 'Book your first experience', 200, '📚', 'Complete first booking', 'silver'),
('big_spender', 'Big Spender', 'Spend 500 points in the shop', 300, '💰', 'Spend 500 points', 'silver'),
('level_5', 'Rising Star', 'Reach level 5', 250, '⭐', 'Reach level 5', 'silver'),
('level_10', 'Language Legend', 'Reach level 10', 500, '👑', 'Reach level 10', 'gold'),
('perfect_score', 'Perfect Score', 'Get 100% on any quiz', 150, '💯', 'Score 100% on quiz', 'silver'),
('game_master', 'Game Master', 'Play all 4 mini games', 200, '🏆', 'Complete all game types', 'gold'),
('decorator', 'Home Decorator', 'Buy 5 home decor items', 150, '🏠', 'Purchase 5 decor items', 'bronze'),
('fashionista', 'Fashionista', 'Buy 5 avatar accessories', 150, '👕', 'Purchase 5 accessories', 'bronze'),
('teacher_favorite', 'Teacher''s Favorite', 'Book 3 experiences', 300, '🌟', 'Complete 3 bookings', 'gold')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SEED SHOP ITEMS - AVATAR ACCESSORIES
-- ============================================

INSERT INTO shop_items (name, emoji, category, price_points, level_required, description) VALUES
-- Accessories
('Cool Sunglasses', '🕶️', 'accessory', 100, 1, 'Look cool while learning'),
('Party Hat', '🎉', 'accessory', 150, 2, 'Celebrate your learning journey'),
('Headphones', '🎧', 'accessory', 120, 1, 'Perfect for listening practice'),
('Crown', '👑', 'accessory', 500, 5, 'For language royalty'),
('Pirate Hat', '🏴‍☠️', 'accessory', 200, 3, 'Arr, matey! Learn like a pirate'),
('Wizard Hat', '🧙', 'accessory', 300, 4, 'Magical learning powers'),
('Baseball Cap', '🧢', 'accessory', 80, 1, 'Casual cool'),
('Cowboy Hat', '🤠', 'accessory', 180, 2, 'Howdy, language partner!'),

-- Outfits
('Superhero Cape', '🦸', 'outfit', 300, 3, 'Be a language superhero'),
('Wizard Robe', '🧙‍♂️', 'outfit', 400, 4, 'Cast language spells'),
('Business Suit', '👔', 'outfit', 250, 2, 'Professional learner'),
('Sports Jersey', '⚽', 'outfit', 200, 2, 'Athletic approach to learning'),
('Ninja Outfit', '🥷', 'outfit', 350, 4, 'Stealth language skills'),
('Chef Uniform', '👨‍🍳', 'outfit', 220, 2, 'Cook up some vocabulary'),
('Astronaut Suit', '👨‍🚀', 'outfit', 500, 5, 'Language learning to the moon'),
('Detective Coat', '🕵️', 'outfit', 280, 3, 'Investigate new words'),

-- Hairstyles
('Curly Hair', '🦱', 'hairstyle', 100, 1, 'Bouncy and fun'),
('Short Spiky', '✨', 'hairstyle', 100, 1, 'Edgy style'),
('Long Flowing', '💇', 'hairstyle', 120, 1, 'Elegant locks'),
('Bun Style', '🎀', 'hairstyle', 100, 1, 'Classic and neat'),
('Mohawk', '🎸', 'hairstyle', 150, 2, 'Rock your learning'),
('Braids', '🌺', 'hairstyle', 130, 2, 'Beautifully styled')

ON CONFLICT DO NOTHING;

-- ============================================
-- SEED SHOP ITEMS - HOME DECOR
-- ============================================

INSERT INTO shop_items (name, emoji, category, price_points, level_required, description) VALUES
-- Furniture
('Cozy Couch', '🛋️', 'furniture', 250, 2, 'Relax while you learn'),
('Gaming Setup', '🎮', 'furniture', 600, 5, 'Epic gaming station'),
('Bookshelf', '📚', 'furniture', 200, 1, 'Store your knowledge'),
('Piano', '🎹', 'furniture', 800, 7, 'Musical ambiance'),
('Fireplace', '🔥', 'furniture', 500, 4, 'Warm and cozy'),
('Study Desk', '🪑', 'furniture', 180, 1, 'Focus station'),
('Bean Bag Chair', '💺', 'furniture', 150, 1, 'Casual seating'),
('Dining Table', '🍽️', 'furniture', 300, 3, 'Feast on vocabulary'),

-- Decorations
('Potted Plant', '🪴', 'decoration', 80, 1, 'Add some green'),
('Wall Art', '🖼️', 'decoration', 150, 2, 'Beautify your space'),
('String Lights', '💡', 'decoration', 100, 1, 'Cozy lighting'),
('Fish Tank', '🐠', 'decoration', 350, 3, 'Zen learning environment'),
('Trophy Case', '🏆', 'decoration', 400, 4, 'Display your achievements'),
('World Map', '🗺️', 'decoration', 120, 1, 'Dream of travel'),
('Globe', '🌍', 'decoration', 180, 2, 'Explore languages worldwide'),
('Neon Sign', '⚡', 'decoration', 250, 3, 'Cool vibes'),
('Rug', '🧶', 'decoration', 90, 1, 'Tie the room together'),
('Mirror', '🪞', 'decoration', 140, 2, 'Reflect on progress'),
('Clock', '⏰', 'decoration', 100, 1, 'Track study time'),
('Telescope', '🔭', 'decoration', 450, 4, 'Reach for the stars'),
('Guitar', '🎸', 'decoration', 300, 3, 'Musical decoration'),
('Record Player', '📻', 'decoration', 280, 3, 'Vintage vibes')

ON CONFLICT DO NOTHING;

-- ============================================
-- SEED QUESTIONS - SPANISH
-- ============================================

INSERT INTO questions (language, question_text, question_type, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, difficulty, native_language) VALUES
-- Easy Spanish
('Spanish', '¿Cómo estás?', 'translation', 'How are you?', 'Where is it?', 'What time is it?', 'Who are you?', 'easy', 'English'),
('Spanish', 'Buenos días', 'translation', 'Good morning', 'Good night', 'Good afternoon', 'Goodbye', 'easy', 'English'),
('Spanish', 'Gracias', 'translation', 'Thank you', 'Please', 'Sorry', 'Excuse me', 'easy', 'English'),
('Spanish', 'Por favor', 'translation', 'Please', 'Thank you', 'Excuse me', 'Welcome', 'easy', 'English'),
('Spanish', 'Adiós', 'translation', 'Goodbye', 'Hello', 'See you soon', 'Good night', 'easy', 'English'),
('Spanish', 'Sí', 'translation', 'Yes', 'No', 'Maybe', 'Always', 'easy', 'English'),
('Spanish', 'No', 'translation', 'No', 'Yes', 'Maybe', 'Never', 'easy', 'English'),
('Spanish', '¿Dónde está el baño?', 'translation', 'Where is the bathroom?', 'Where is the restaurant?', 'Where is the hotel?', 'Where is the station?', 'easy', 'English'),
('Spanish', 'Me llamo...', 'translation', 'My name is...', 'I am from...', 'I live in...', 'I like...', 'easy', 'English'),
('Spanish', '¿Cuánto cuesta?', 'translation', 'How much does it cost?', 'What time is it?', 'How are you?', 'Where is it?', 'easy', 'English'),

-- Medium Spanish
('Spanish', 'Necesito ayuda', 'translation', 'I need help', 'I want food', 'I like this', 'I understand', 'medium', 'English'),
('Spanish', '¿Hablas inglés?', 'translation', 'Do you speak English?', 'Do you speak Spanish?', 'Do you understand?', 'Can you help?', 'medium', 'English'),
('Spanish', 'No entiendo', 'translation', 'I don''t understand', 'I don''t speak', 'I don''t know', 'I don''t like', 'medium', 'English'),
('Spanish', 'La cuenta, por favor', 'translation', 'The bill, please', 'The menu, please', 'The table, please', 'The food, please', 'medium', 'English'),
('Spanish', 'Estoy perdido', 'translation', 'I am lost', 'I am tired', 'I am hungry', 'I am ready', 'medium', 'English'),

-- Hard Spanish
('Spanish', 'Me gustaría hacer una reserva', 'translation', 'I would like to make a reservation', 'I would like to order food', 'I would like to pay now', 'I would like to leave', 'hard', 'English'),
('Spanish', '¿Puede recomendarme un buen restaurante?', 'translation', 'Can you recommend a good restaurant?', 'Can you help me find a hotel?', 'Can you tell me the time?', 'Can you speak slower?', 'hard', 'English'),
('Spanish', 'Disculpe, ¿cómo llego a la estación?', 'translation', 'Excuse me, how do I get to the station?', 'Excuse me, where is the bathroom?', 'Excuse me, what time is it?', 'Excuse me, can you help me?', 'hard', 'English')

ON CONFLICT DO NOTHING;

-- ============================================
-- SEED QUESTIONS - FRENCH
-- ============================================

INSERT INTO questions (language, question_text, question_type, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, difficulty, native_language) VALUES
-- Easy French
('French', 'Bonjour', 'translation', 'Hello', 'Goodbye', 'Good night', 'Good evening', 'easy', 'English'),
('French', 'Merci', 'translation', 'Thank you', 'Please', 'Sorry', 'Excuse me', 'easy', 'English'),
('French', 'Oui', 'translation', 'Yes', 'No', 'Maybe', 'Always', 'easy', 'English'),
('French', 'Non', 'translation', 'No', 'Yes', 'Maybe', 'Never', 'easy', 'English'),
('French', 'Au revoir', 'translation', 'Goodbye', 'Hello', 'See you later', 'Good night', 'easy', 'English'),
('French', 'S''il vous plaît', 'translation', 'Please', 'Thank you', 'Excuse me', 'Sorry', 'easy', 'English'),
('French', 'Excusez-moi', 'translation', 'Excuse me', 'Thank you', 'Please', 'Sorry', 'easy', 'English'),
('French', 'Comment allez-vous?', 'translation', 'How are you?', 'Where are you?', 'Who are you?', 'What is this?', 'easy', 'English'),
('French', 'Je m''appelle...', 'translation', 'My name is...', 'I am from...', 'I live in...', 'I like...', 'easy', 'English'),
('French', 'Combien ça coûte?', 'translation', 'How much does it cost?', 'What time is it?', 'Where is it?', 'How are you?', 'easy', 'English'),

-- Medium French
('French', 'Je ne comprends pas', 'translation', 'I don''t understand', 'I don''t speak', 'I don''t know', 'I don''t like', 'medium', 'English'),
('French', 'Parlez-vous anglais?', 'translation', 'Do you speak English?', 'Do you speak French?', 'Do you understand?', 'Can you help?', 'medium', 'English'),
('French', 'Où est la gare?', 'translation', 'Where is the train station?', 'Where is the hotel?', 'Where is the restaurant?', 'Where is the bathroom?', 'medium', 'English'),
('French', 'L''addition, s''il vous plaît', 'translation', 'The bill, please', 'The menu, please', 'The table, please', 'The food, please', 'medium', 'English'),
('French', 'Je voudrais...', 'translation', 'I would like...', 'I want...', 'I need...', 'I have...', 'medium', 'English'),

-- Hard French
('French', 'Pourriez-vous parler plus lentement?', 'translation', 'Could you speak more slowly?', 'Could you help me?', 'Could you repeat that?', 'Could you come here?', 'hard', 'English'),
('French', 'Je cherche un bon restaurant', 'translation', 'I''m looking for a good restaurant', 'I''m looking for a hotel', 'I''m looking for the station', 'I''m looking for the museum', 'hard', 'English')

ON CONFLICT DO NOTHING;

-- ============================================
-- SEED QUESTIONS - JAPANESE
-- ============================================

INSERT INTO questions (language, question_text, question_type, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, difficulty, native_language) VALUES
-- Easy Japanese
('Japanese', 'こんにちは (Konnichiwa)', 'translation', 'Hello', 'Goodbye', 'Thank you', 'Good morning', 'easy', 'English'),
('Japanese', 'ありがとう (Arigatou)', 'translation', 'Thank you', 'Please', 'Sorry', 'Hello', 'easy', 'English'),
('Japanese', 'すみません (Sumimasen)', 'translation', 'Excuse me', 'Thank you', 'Please', 'Hello', 'easy', 'English'),
('Japanese', 'はい (Hai)', 'translation', 'Yes', 'No', 'Maybe', 'Hello', 'easy', 'English'),
('Japanese', 'いいえ (Iie)', 'translation', 'No', 'Yes', 'Maybe', 'Hello', 'easy', 'English'),
('Japanese', 'おはよう (Ohayou)', 'translation', 'Good morning', 'Good evening', 'Good night', 'Hello', 'easy', 'English'),
('Japanese', 'さようなら (Sayounara)', 'translation', 'Goodbye', 'Hello', 'Thank you', 'See you', 'easy', 'English'),
('Japanese', 'おいしい (Oishii)', 'translation', 'Delicious', 'Beautiful', 'Expensive', 'Cold', 'easy', 'English'),
('Japanese', 'いくらですか？ (Ikura desu ka?)', 'translation', 'How much is it?', 'What is this?', 'Where is it?', 'When is it?', 'easy', 'English'),
('Japanese', 'わかりません (Wakarimasen)', 'translation', 'I don''t understand', 'I don''t know', 'I don''t speak', 'I don''t have', 'easy', 'English'),

-- Medium Japanese
('Japanese', 'トイレはどこですか？ (Toire wa doko desu ka?)', 'translation', 'Where is the bathroom?', 'Where is the station?', 'Where is the hotel?', 'Where is the restaurant?', 'medium', 'English'),
('Japanese', '英語を話せますか？ (Eigo wo hanasemasu ka?)', 'translation', 'Can you speak English?', 'Can you help me?', 'Can you wait?', 'Can you come?', 'medium', 'English'),
('Japanese', '助けてください (Tasukete kudasai)', 'translation', 'Please help me', 'Please wait', 'Please come', 'Please stop', 'medium', 'English')

ON CONFLICT DO NOTHING;

-- ============================================
-- SEED QUESTIONS - GERMAN
-- ============================================

INSERT INTO questions (language, question_text, question_type, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, difficulty, native_language) VALUES
-- Easy German
('German', 'Guten Tag', 'translation', 'Good day', 'Good night', 'Goodbye', 'Good morning', 'easy', 'English'),
('German', 'Danke', 'translation', 'Thank you', 'Please', 'Sorry', 'Hello', 'easy', 'English'),
('German', 'Bitte', 'translation', 'Please', 'Thank you', 'Sorry', 'Hello', 'easy', 'English'),
('German', 'Ja', 'translation', 'Yes', 'No', 'Maybe', 'Hello', 'easy', 'English'),
('German', 'Nein', 'translation', 'No', 'Yes', 'Maybe', 'Hello', 'easy', 'English'),
('German', 'Auf Wiedersehen', 'translation', 'Goodbye', 'Hello', 'See you', 'Good night', 'easy', 'English'),
('German', 'Entschuldigung', 'translation', 'Excuse me', 'Thank you', 'Please', 'Sorry', 'easy', 'English'),
('German', 'Wie geht''s?', 'translation', 'How are you?', 'Where are you?', 'Who are you?', 'What is this?', 'easy', 'English'),
('German', 'Ich heiße...', 'translation', 'My name is...', 'I am from...', 'I live in...', 'I speak...', 'easy', 'English'),
('German', 'Was kostet das?', 'translation', 'What does this cost?', 'What is this?', 'Where is this?', 'When is this?', 'easy', 'English'),

-- Medium German
('German', 'Ich verstehe nicht', 'translation', 'I don''t understand', 'I don''t speak', 'I don''t know', 'I don''t have', 'medium', 'English'),
('German', 'Sprechen Sie Englisch?', 'translation', 'Do you speak English?', 'Do you speak German?', 'Can you help?', 'Do you understand?', 'medium', 'English'),
('German', 'Wo ist die Toilette?', 'translation', 'Where is the toilet?', 'Where is the station?', 'Where is the hotel?', 'Where is the restaurant?', 'medium', 'English')

ON CONFLICT DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Langgie seed data created successfully!';
  RAISE NOTICE '🏆 Added 15 achievements';
  RAISE NOTICE '🛍️ Added 40+ shop items (accessories, outfits, furniture, decorations)';
  RAISE NOTICE '❓ Added 60+ questions across Spanish, French, Japanese, and German';
  RAISE NOTICE '🎮 Ready to play mini games and earn rewards!';
END $$;
