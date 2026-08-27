import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlayerStore } from '../store/usePlayerStore';
import { supabase } from '../lib/supabase';
import { Check, X } from 'lucide-react';
import Button from '../components/ui/Button';

const LANGUAGES = [
  { code: 'es', name: 'Spanish', emoji: '🇪🇸', color: 'from-red-500 to-yellow-500' },
  { code: 'fr', name: 'French', emoji: '🇫🇷', color: 'from-blue-500 to-white' },
  { code: 'de', name: 'German', emoji: '🇩🇪', color: 'from-black to-red-600' },
  { code: 'ja', name: 'Japanese', emoji: '🇯🇵', color: 'from-white to-red-500' },
  { code: 'ko', name: 'Korean', emoji: '🇰🇷', color: 'from-blue-600 to-red-600' },
  { code: 'it', name: 'Italian', emoji: '🇮🇹', color: 'from-green-500 to-red-500' },
  { code: 'pt', name: 'Portuguese', emoji: '🇵🇹', color: 'from-green-600 to-red-600' },
  { code: 'zh', name: 'Chinese', emoji: '🇨🇳', color: 'from-red-600 to-yellow-400' },
];

const INTERESTS = [
  { id: 'cooking', name: 'Cooking', emoji: '👨‍🍳', description: 'Learn while cooking local dishes' },
  { id: 'coffee', name: 'Coffee & Cafés', emoji: '☕', description: 'Casual conversations in cafés' },
  { id: 'museums', name: 'Museums & Art', emoji: '🎨', description: 'Explore culture and history' },
  { id: 'hiking', name: 'Hiking & Nature', emoji: '🥾', description: 'Practice outdoors' },
  { id: 'music', name: 'Music & Concerts', emoji: '🎵', description: 'Learn through music' },
  { id: 'sports', name: 'Sports & Fitness', emoji: '⚽', description: 'Active learning' },
  { id: 'food-tours', name: 'Food Tours', emoji: '🍜', description: 'Taste and learn' },
  { id: 'photography', name: 'Photography', emoji: '📸', description: 'Visual storytelling' },
];

const GOALS = [
  { id: 'casual', name: 'Casual', minutes: 5, emoji: '☕', description: '5 min/day - Just exploring' },
  { id: 'regular', name: 'Regular', minutes: 15, emoji: '📚', description: '15 min/day - Steady progress' },
  { id: 'serious', name: 'Serious', minutes: 30, emoji: '🔥', description: '30 min/day - Committed learner' },
  { id: 'intense', name: 'Intense', minutes: 60, emoji: '💪', description: '1 hour/day - Full immersion' },
];

const SKIN_TONES = ['light', 'medium-light', 'medium', 'medium-dark', 'dark'];
const HAIRSTYLES = [
  { id: 'short-brown', name: 'Short Brown', emoji: '👦' },
  { id: 'long-blonde', name: 'Long Blonde', emoji: '👧' },
  { id: 'curly-black', name: 'Curly Black', emoji: '👨‍🦱' },
  { id: 'bun', name: 'Bun', emoji: '👩' },
  { id: 'mohawk', name: 'Mohawk', emoji: '🧑' },
];
const EYE_COLORS = ['brown', 'blue', 'green', 'hazel', 'gray'];
const OUTFITS = [
  { id: 'casual', name: 'Casual', emoji: '👕' },
  { id: 'business', name: 'Business', emoji: '👔' },
  { id: 'sporty', name: 'Sporty', emoji: '⚽' },
  { id: 'artsy', name: 'Artsy', emoji: '🎨' },
];

const SwipeCard = ({ data, onSwipe, isLanguage = false }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className={`w-full h-full rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center ${
        isLanguage
          ? `bg-gradient-to-br ${data.color}`
          : 'bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400'
      }`}>
        <div className="text-8xl mb-6">{data.emoji}</div>
        <h2 className="text-4xl font-bold text-white mb-3">{data.name}</h2>
        {data.description && (
          <p className="text-xl text-white/90">{data.description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default function StudentOnboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageIndex, setLanguageIndex] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestIndex, setInterestIndex] = useState(0);
  const [avatar, setAvatar] = useState({
    skin: 'light',
    hair: 'short-brown',
    eyes: 'brown',
    outfit: 'casual',
    accessory: 'none',
  });
  const [goal, setGoal] = useState('regular');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const completeOnboarding = usePlayerStore((state) => state.completeOnboarding);

  const handleSwipe = (direction, isLanguage = false) => {
    if (direction === 'right') {
      if (isLanguage) {
        const language = LANGUAGES[languageIndex];
        setSelectedLanguages([...selectedLanguages, language.code]);
      } else {
        const interest = INTERESTS[interestIndex];
        setSelectedInterests([...selectedInterests, interest.id]);
      }
    }

    // Move to next card
    if (isLanguage) {
      if (languageIndex < LANGUAGES.length - 1) {
        setTimeout(() => setLanguageIndex(languageIndex + 1), 300);
      } else {
        setTimeout(() => setStep(3), 300);
      }
    } else {
      if (interestIndex < INTERESTS.length - 1) {
        setTimeout(() => setInterestIndex(interestIndex + 1), 300);
      } else {
        setTimeout(() => setStep(4), 300);
      }
    }
  };

  const handleComplete = async () => {
    setLoading(true);

    // The local player store is the source of truth, so onboarding always
    // completes - even with no backend attached.
    completeOnboarding({
      name: name.trim() || 'Learner',
      languages: selectedLanguages,
      interests: selectedInterests,
      goal,
      avatar,
      welcomeBonus: 100,
    });

    // Mirror to Supabase when there's a real session. Best effort: a failure
    // here must never trap the player on the last onboarding step.
    if (user?.id) {
      try {
        await supabase
          .from('profiles')
          .update({
            name,
            user_type: 'student',
            avatar,
            goal,
            goal_minutes: GOALS.find((g) => g.id === goal)?.minutes || 15,
            interests: selectedInterests,
            languages_learning: selectedLanguages,
            onboarding_completed: true,
            points: 100, // Welcome bonus
          })
          .eq('id', user.id);

        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: 'welcome_bonus',
        });
      } catch (error) {
        console.error('Could not sync onboarding to Supabase:', error);
      }
    }

    setLoading(false);
    navigate('/student-dashboard');
  };

  const progress = (step / 6) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="h-2 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="px-4 py-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Step {step} of 6
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 mt-16">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {/* Step 1: Welcome & Name */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="text-7xl mb-6">👋</div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-100">Welcome to ARO.</h1>
                <p className="text-xl text-gray-600 mb-8 dark:text-gray-400">Let's start your language learning adventure</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What's your name?"
                  className="w-full px-6 py-4 text-xl rounded-2xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none mb-6 dark:border-gray-700"
                />
                <Button
                  onClick={() => name && setStep(2)}
                  disabled={!name}
                  className="w-full py-4 text-xl"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {/* Step 2: Language Selection (Swipe Cards) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px]"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-100">
                    What do you want to learn?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Swipe right to add, left to skip</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {selectedLanguages.map((code) => (
                      <span key={code} className="text-2xl">
                        {LANGUAGES.find(l => l.code === code)?.emoji}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative h-[400px]">
                  <AnimatePresence>
                    {languageIndex < LANGUAGES.length && (
                      <SwipeCard
                        key={languageIndex}
                        data={LANGUAGES[languageIndex]}
                        onSwipe={(dir) => handleSwipe(dir, true)}
                        isLanguage={true}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => handleSwipe('left', true)}
                    aria-label="Skip this language"
                    className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => handleSwipe('right', true)}
                    aria-label="Add this language"
                    className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Check className="w-8 h-8" />
                  </button>
                </div>

                {selectedLanguages.length > 0 && (
                  <Button
                    onClick={() => setStep(3)}
                    variant="secondary"
                    className="w-full mt-4"
                  >
                    Skip remaining
                  </Button>
                )}
              </motion.div>
            )}

            {/* Step 3: Interest Selection (Swipe Cards) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px]"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-100">
                    What are your interests?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Swipe right to add, left to skip</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    {selectedInterests.map((id) => (
                      <span key={id} className="text-2xl">
                        {INTERESTS.find(i => i.id === id)?.emoji}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative h-[400px]">
                  <AnimatePresence>
                    {interestIndex < INTERESTS.length && (
                      <SwipeCard
                        key={interestIndex}
                        data={INTERESTS[interestIndex]}
                        onSwipe={handleSwipe}
                        isLanguage={false}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => handleSwipe('left')}
                    aria-label="Skip this interest"
                    className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    aria-label="Add this interest"
                    className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Check className="w-8 h-8" />
                  </button>
                </div>

                {selectedInterests.length > 0 && (
                  <Button
                    onClick={() => setStep(4)}
                    variant="secondary"
                    className="w-full mt-4"
                  >
                    Skip remaining
                  </Button>
                )}
              </motion.div>
            )}

            {/* Step 4: Avatar Customizer */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">Create Your Avatar</h2>

                {/* Avatar Preview */}
                <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-8xl">
                  👤
                </div>

                {/* Customization Options */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Skin Tone</label>
                    <div className="flex justify-center gap-2">
                      {SKIN_TONES.map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setAvatar({ ...avatar, skin: tone })}
                          className={`w-10 h-10 rounded-full border-4 transition-all ${
                            avatar.skin === tone ? 'border-yellow-500 scale-110' : 'border-gray-300'
                          }`}
                          style={{
                            backgroundColor:
                              tone === 'light' ? '#fdd' :
                              tone === 'medium-light' ? '#f4c4a0' :
                              tone === 'medium' ? '#d19b6e' :
                              tone === 'medium-dark' ? '#8b6f47' : '#4a3728'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Hairstyle</label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {HAIRSTYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setAvatar({ ...avatar, hair: style.id })}
                          className={`px-4 py-2 rounded-xl text-2xl border-2 transition-all ${
                            avatar.hair === style.id
                              ? 'border-yellow-500 bg-yellow-50 scale-110'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {style.emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Outfit</label>
                    <div className="flex justify-center gap-2">
                      {OUTFITS.map((outfit) => (
                        <button
                          key={outfit.id}
                          onClick={() => setAvatar({ ...avatar, outfit: outfit.id })}
                          className={`px-4 py-2 rounded-xl text-2xl border-2 transition-all ${
                            avatar.outfit === outfit.id
                              ? 'border-yellow-500 bg-yellow-50 scale-110'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {outfit.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={() => setStep(5)} className="w-full mt-8 py-4 text-xl">
                  Continue
                </Button>
              </motion.div>
            )}

            {/* Step 5: Goal Selection */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-gray-100">Set Your Goal</h2>
                <p className="text-gray-600 mb-8 dark:text-gray-400">How much time can you practice each day?</p>

                <div className="space-y-4">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`w-full p-6 rounded-2xl border-4 transition-all text-left ${
                        goal === g.id
                          ? 'border-yellow-500 bg-yellow-50 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{g.emoji}</div>
                        <div className="flex-1">
                          <div className="font-bold text-xl text-gray-800 dark:text-gray-100">{g.name}</div>
                          <div className="text-gray-600 dark:text-gray-400">{g.description}</div>
                        </div>
                        {goal === g.id && (
                          <Check className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <Button onClick={() => setStep(6)} className="w-full mt-8 py-4 text-xl">
                  Continue
                </Button>
              </motion.div>
            )}

            {/* Step 6: Complete */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="text-9xl mb-6"
                >
                  🎉
                </motion.div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-100">You're All Set!</h2>
                <p className="text-xl text-gray-600 mb-8 dark:text-gray-400">Welcome bonus: +100 points 🌟</p>

                <div className="bg-white rounded-2xl p-6 mb-8 text-left dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-4">Your Profile</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Languages:</strong> {selectedLanguages.length} selected</p>
                    <p><strong>Interests:</strong> {selectedInterests.length} selected</p>
                    <p><strong>Daily Goal:</strong> {GOALS.find(g => g.id === goal)?.name}</p>
                  </div>
                </div>

                <Button
                  onClick={handleComplete}
                  disabled={loading}
                  className="w-full py-4 text-xl"
                >
                  {loading ? 'Saving...' : 'Start Learning!'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
