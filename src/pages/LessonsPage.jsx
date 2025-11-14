import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  BookOpen,
  Lock,
  CheckCircle2,
  Star,
  Trophy,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import lessonsData from '../data/lessons.json';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

export default function LessonsPage() {
  const { user, profile } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    loadLessons();
  }, [user]);

  const loadLessons = async () => {
    try {
      setLoading(true);

      // Load lessons (using mock data for now)
      setLessons(lessonsData);

      // Load user progress if authenticated
      if (user) {
        const { data: progressData, error } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error loading progress:', error);
        } else {
          // Convert to object for easy lookup
          const progressMap = {};
          progressData?.forEach(p => {
            progressMap[p.lesson_id] = p;
          });
          setUserProgress(progressMap);
        }
      }
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLessonUnlocked = (lesson) => {
    if (lesson.is_locked === false) return true;
    if (!lesson.unlock_requirements) return true;

    const { requiredLessons, minPoints } = lesson.unlock_requirements;

    // Check if required lessons are completed
    if (requiredLessons && requiredLessons.length > 0) {
      const allCompleted = requiredLessons.every(reqId => {
        const progress = userProgress[reqId];
        return progress && progress.status === 'completed';
      });
      if (!allCompleted) return false;
    }

    // Check if user has minimum points
    if (minPoints && profile?.points < minPoints) return false;

    return true;
  };

  const getLessonStatus = (lesson) => {
    const progress = userProgress[lesson.id];
    if (!progress) return 'not_started';
    return progress.status;
  };

  const getCompletedCount = () => {
    return Object.values(userProgress).filter(p => p.status === 'completed').length;
  };

  const getTotalPoints = () => {
    return Object.values(userProgress)
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => {
        const lesson = lessons.find(l => l.id === p.lesson_id);
        return sum + (lesson?.points_reward || 0);
      }, 0);
  };

  const filteredLessons = lessons.filter(lesson => {
    if (selectedLanguage !== 'all' && lesson.language !== selectedLanguage) {
      return false;
    }
    if (selectedDifficulty !== 'all' && lesson.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  const languages = [...new Set(lessons.map(l => l.language))];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-12 h-12 text-purple-600" />
            Language Lessons
          </h1>
          <p className="text-xl text-gray-600">
            Learn, practice, and master new languages with fun interactive lessons
          </p>
        </motion.div>

        {/* Stats Overview */}
        {user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{getCompletedCount()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Points Earned</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalPoints()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Lessons</p>
                  <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-pink-500" />
                <div>
                  <p className="text-sm text-gray-600">Your Points</p>
                  <p className="text-2xl font-bold text-gray-900">{profile?.points || 0}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Levels</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, index) => {
            const unlocked = isLessonUnlocked(lesson);
            const status = getLessonStatus(lesson);
            const progress = userProgress[lesson.id];

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  !unlocked ? 'opacity-60' : ''
                }`}
              >
                {/* Lesson Card */}
                <div className="p-6">
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{lesson.icon}</div>
                    <div>
                      {status === 'completed' && (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      )}
                      {!unlocked && (
                        <Lock className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {lesson.language}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {lesson.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {lesson.points_reward} pts
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.duration_minutes} min
                    </span>
                  </div>

                  {/* Progress Bar (if in progress) */}
                  {progress && status === 'in_progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress.progress_percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.progress_percentage}%` }}
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    variant={status === 'completed' ? 'outline' : 'primary'}
                    className="w-full"
                    disabled={!unlocked}
                    onClick={() => {
                      // Navigate to lesson detail
                      window.location.href = `/lesson/${lesson.id}`;
                    }}
                  >
                    {!unlocked && 'Locked'}
                    {unlocked && status === 'not_started' && 'Start Lesson'}
                    {status === 'in_progress' && 'Continue'}
                    {status === 'completed' && 'Review'}
                  </Button>

                  {/* Unlock Requirements */}
                  {!unlocked && lesson.unlock_requirements && (
                    <div className="mt-3 text-xs text-gray-500 text-center">
                      {lesson.unlock_requirements.requiredLessons?.length > 0 && (
                        <p>Complete previous lessons to unlock</p>
                      )}
                      {lesson.unlock_requirements.minPoints > 0 && (
                        <p>Requires {lesson.unlock_requirements.minPoints} points</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Completed Badge */}
                {status === 'completed' && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-green-400 to-green-600 text-white px-4 py-1 rounded-bl-2xl font-bold text-xs">
                    COMPLETED
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No lessons found with the selected filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
