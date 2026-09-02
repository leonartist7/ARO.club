import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getOrCreateDraft, updateApplication, submitApplication } from '../lib/teacherApplications';
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

const EXPERIENCE_TYPES = [
  { id: 'cooking', name: 'Cooking Classes', emoji: '👨‍🍳', description: 'Teach through culinary experiences' },
  { id: 'coffee', name: 'Coffee Conversations', emoji: '☕', description: 'Casual café conversations' },
  { id: 'walking-tours', name: 'Walking Tours', emoji: '🚶', description: 'Explore while learning' },
  { id: 'cultural', name: 'Cultural Events', emoji: '🎭', description: 'Immersive cultural activities' },
  { id: 'business', name: 'Business Language', emoji: '💼', description: 'Professional communication' },
  { id: 'kids-teens', name: 'Kids & Teens', emoji: '👦', description: 'Teaching young learners' },
  { id: 'exam-prep', name: 'Exam Prep', emoji: '📝', description: 'Test preparation' },
  { id: 'travel', name: 'Travel Phrases', emoji: '✈️', description: 'Essential travel language' },
];

const SKIN_TONES = ['light', 'medium-light', 'medium', 'medium-dark', 'dark'];
const HAIRSTYLES = [
  { id: 'short-brown', name: 'Short Brown', emoji: '👦' },
  { id: 'long-blonde', name: 'Long Blonde', emoji: '👧' },
  { id: 'curly-black', name: 'Curly Black', emoji: '👨‍🦱' },
  { id: 'bun', name: 'Bun', emoji: '👩' },
  { id: 'mohawk', name: 'Mohawk', emoji: '🧑' },
];
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

export default function TeacherOnboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languageIndex, setLanguageIndex] = useState(0);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [avatar, setAvatar] = useState({
    skin: 'light',
    hair: 'short-brown',
    eyes: 'brown',
    outfit: 'casual',
    accessory: 'none',
  });
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSwipe = (direction, isLanguage = false) => {
    if (direction === 'right') {
      if (isLanguage) {
        const language = LANGUAGES[languageIndex];
        setSelectedLanguages([...selectedLanguages, language.code]);
      } else {
        const experience = EXPERIENCE_TYPES[experienceIndex];
        setSelectedExperiences([...selectedExperiences, experience.id]);
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
      if (experienceIndex < EXPERIENCE_TYPES.length - 1) {
        setTimeout(() => setExperienceIndex(experienceIndex + 1), 300);
      } else {
        setTimeout(() => setStep(4), 300);
      }
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Save profile onboarding data. NOTE: we do NOT create a live `teachers`
      // row or set verified — the teacher only goes live after an admin
      // approves their application (see the Trust & Quality Engine).
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name,
          user_type: 'teacher',
          avatar,
          bio,
          experience_types: selectedExperiences,
          onboarding_completed: true,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Create + submit a teacher application for human review.
      const draft = await getOrCreateDraft(user.id, { display_name: name });
      await updateApplication(draft.id, {
        display_name: name,
        bio,
        languages: selectedLanguages.map((code) => ({
          code,
          name: LANGUAGES.find((l) => l.code === code)?.name,
          proficiency: 'native',
        })),
        experience_types: selectedExperiences,
        teaches_in_person: true,
        agreed_to_standards: true,
      });
      await submitApplication(draft.id);

      // Go to the application status page to add portfolio + track review.
      navigate('/teacher/application');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Error saving your profile. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <div className="px-4 py-2 text-center text-sm text-gray-600">
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
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Teacher!</h1>
                <p className="text-xl text-gray-600 mb-8">Let's set up your teaching profile</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What's your name?"
                  className="w-full px-6 py-4 text-xl rounded-2xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none mb-6"
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
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    What languages do you teach?
                  </h2>
                  <p className="text-gray-600">Swipe right to add, left to skip</p>
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
                    className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => handleSwipe('right', true)}
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

            {/* Step 3: Experience Type Selection (Swipe Cards) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px]"
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    What experiences can you offer?
                  </h2>
                  <p className="text-gray-600">Swipe right to add, left to skip</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    {selectedExperiences.map((id) => (
                      <span key={id} className="text-2xl">
                        {EXPERIENCE_TYPES.find(e => e.id === id)?.emoji}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative h-[400px]">
                  <AnimatePresence>
                    {experienceIndex < EXPERIENCE_TYPES.length && (
                      <SwipeCard
                        key={experienceIndex}
                        data={EXPERIENCE_TYPES[experienceIndex]}
                        onSwipe={handleSwipe}
                        isLanguage={false}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => handleSwipe('left')}
                    className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Check className="w-8 h-8" />
                  </button>
                </div>

                {selectedExperiences.length > 0 && (
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
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Avatar</h2>

                {/* Avatar Preview */}
                <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-8xl">
                  👤
                </div>

                {/* Customization Options */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skin Tone</label>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hairstyle</label>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Outfit</label>
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

            {/* Step 5: Bio */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Tell Students About Yourself</h2>
                <p className="text-gray-600 mb-8">Share your teaching style, experience, and what makes your classes special</p>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="I'm passionate about teaching..."
                  rows={8}
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none resize-none"
                />

                <Button
                  onClick={() => setStep(6)}
                  disabled={!bio || bio.length < 50}
                  className="w-full mt-6 py-4 text-xl"
                >
                  Continue
                </Button>
                {bio.length < 50 && bio.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    {50 - bio.length} more characters needed
                  </p>
                )}
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
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Submit!</h2>
                <p className="text-xl text-gray-600 mb-2">Welcome bonus: +100 points 🌟</p>
                <p className="text-base text-gray-500 mb-8">
                  Next: add your portfolio (intro video + ID) and our team will personally verify you
                  before you go live.
                </p>

                <div className="bg-white rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-bold text-lg mb-4">Your Profile</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Languages:</strong> {selectedLanguages.length} selected</p>
                    <p><strong>Experience Types:</strong> {selectedExperiences.length} selected</p>
                    <p><strong>Bio:</strong> {bio.substring(0, 50)}...</p>
                  </div>
                </div>

                <Button
                  onClick={handleComplete}
                  disabled={loading}
                  className="w-full py-4 text-xl"
                >
                  {loading ? 'Submitting...' : 'Submit for Verification'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
