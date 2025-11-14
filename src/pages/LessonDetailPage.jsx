import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Star,
  Award,
  BookOpen,
  Clock,
  Trophy
} from 'lucide-react';
import lessonsData from '../data/lessons.json';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function LessonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [id]);

  const loadLesson = () => {
    const foundLesson = lessonsData.find(l => l.id === id);
    if (foundLesson) {
      setLesson(foundLesson);
    }
    setLoading(false);
  };

  const handleQuizAnswer = (stepIndex, selectedOption) => {
    setAnswers({ ...answers, [stepIndex]: selectedOption });
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentStep < lesson.content.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeLesson();
    }
  };

  const handlePrevious = () => {
    setShowResult(false);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeLesson = async () => {
    if (!user) {
      alert('Please log in to save your progress');
      navigate('/login');
      return;
    }

    try {
      // Calculate score
      const quizSteps = lesson.content
        .map((step, idx) => ({ step, idx }))
        .filter(({ step }) => step.type === 'quiz');

      let correctAnswers = 0;
      quizSteps.forEach(({ step, idx }) => {
        if (answers[idx] === step.data.correct) {
          correctAnswers++;
        }
      });

      const score = quizSteps.length > 0
        ? Math.round((correctAnswers / quizSteps.length) * 100)
        : 100;

      // Save progress
      const { error: progressError } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lesson.id,
          status: 'completed',
          progress_percentage: 100,
          score: score,
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (progressError) throw progressError;

      // Award points
      const newPoints = (profile?.points || 0) + lesson.points_reward;
      await updateProfile({ points: newPoints });

      // Check if this unlocks an object
      const unlockedObject = await checkForUnlockedObjects();

      setLessonComplete(true);

      // Show completion message
      setTimeout(() => {
        if (unlockedObject) {
          alert(`Congratulations! You earned ${lesson.points_reward} points and unlocked: ${unlockedObject.name}!`);
        } else {
          alert(`Congratulations! You earned ${lesson.points_reward} points!`);
        }
        navigate('/lessons');
      }, 2000);
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('Failed to save progress');
    }
  };

  const checkForUnlockedObjects = async () => {
    if (!user) return null;

    try {
      // Load home objects data
      const { default: homeObjectsData } = await import('../data/homeObjects.json');

      // Find objects that should be unlocked by this lesson
      const unlockedObject = homeObjectsData.find(obj =>
        obj.earn_requirement?.type === 'lesson_complete' &&
        obj.earn_requirement?.lessonId === lesson.id
      );

      if (unlockedObject) {
        // Check if user already has it
        const { data: existing } = await supabase
          .from('user_inventory')
          .select('*')
          .eq('user_id', user.id)
          .eq('object_id', unlockedObject.id)
          .single();

        if (!existing) {
          // Add to inventory
          await supabase
            .from('user_inventory')
            .insert({
              user_id: user.id,
              object_id: unlockedObject.id,
              acquisition_method: 'earned'
            });

          return unlockedObject;
        }
      }
    } catch (error) {
      console.error('Error checking unlocked objects:', error);
    }

    return null;
  };

  const renderContent = (content, index) => {
    switch (content.type) {
      case 'text':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {content.data.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.data.body}
            </p>
          </motion.div>
        );

      case 'flashcard':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Flashcards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.data.cards.map((card, cardIdx) => (
                <FlashCard key={cardIdx} front={card.front} back={card.back} />
              ))}
            </div>
          </motion.div>
        );

      case 'quiz':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quiz Time!</h3>
            <p className="text-lg text-gray-700 mb-6">{content.data.question}</p>
            <div className="space-y-3">
              {content.data.options.map((option, optIdx) => {
                const isSelected = answers[index] === optIdx;
                const isCorrect = optIdx === content.data.correct;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleQuizAnswer(index, optIdx)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showWrong
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    {showCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 inline ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-4 rounded-lg ${
                  answers[index] === content.data.correct
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                }`}
              >
                <p className="font-bold">
                  {answers[index] === content.data.correct
                    ? '🎉 Correct! Great job!'
                    : '❌ Not quite. The correct answer is: ' + content.data.options[content.data.correct]
                  }
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson not found</h2>
          <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
        </div>
      </div>
    );
  }

  if (lessonComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lesson Complete!</h1>
          <p className="text-xl text-gray-600 mb-2">You earned {lesson.points_reward} points!</p>
          <div className="flex justify-center gap-2 mt-6">
            <div className="animate-bounce">🎉</div>
            <div className="animate-bounce delay-100">🎊</div>
            <div className="animate-bounce delay-200">⭐</div>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentContent = lesson.content[currentStep];
  const isQuiz = currentContent.type === 'quiz';
  const canProceed = !isQuiz || showResult;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/lessons')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Lessons
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {lesson.icon} {lesson.title}
                </h1>
                <p className="text-gray-600">{lesson.description}</p>
              </div>
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-gray-900">{lesson.points_reward} pts</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{currentStep + 1} / {lesson.content.length}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / lesson.content.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {renderContent(currentContent, currentStep)}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {lesson.content.length}
          </span>

          {currentStep < lesson.content.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              variant="primary"
              icon={<Award className="w-5 h-5" />}
              iconPosition="right"
            >
              Complete Lesson
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// FlashCard Component
function FlashCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="relative h-40 cursor-pointer perspective-1000"
    >
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center p-6 text-white shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-xl font-bold text-center">{front}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center p-6 text-white shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <p className="text-xl font-bold text-center">{back}</p>
        </div>
      </motion.div>
    </div>
  );
}
