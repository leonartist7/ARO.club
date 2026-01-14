import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Map,
  Lock,
  CheckCircle2,
  Star,
  Clock,
  BookOpen,
  TrendingUp,
  Award,
  Play
} from 'lucide-react';
import learningPathsData from '../data/learningPaths.json';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

export default function LearningPathsPage() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [paths, setPaths] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  useEffect(() => {
    loadPaths();
  }, [user]);

  const loadPaths = async () => {
    try {
      setLoading(true);

      // Load paths (using mock data for now)
      setPaths(learningPathsData);

      // Load user progress if authenticated
      if (user) {
        const { data: progressData, error } = await supabase
          .from('user_learning_path_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error loading progress:', error);
        } else {
          const progressMap = {};
          progressData?.forEach(p => {
            progressMap[p.path_id] = p;
          });
          setUserProgress(progressMap);
        }
      }
    } catch (error) {
      console.error('Error loading paths:', error);
    } finally {
      setLoading(false);
    }
  };

  const startPath = async (path) => {
    if (!user) {
      alert('Please log in to start a learning path');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_learning_path_progress')
        .upsert({
          user_id: user.id,
          path_id: path.id,
          status: 'in_progress',
          started_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,path_id'
        });

      if (error) throw error;

      // Navigate to first lesson if available
      if (path.lesson_ids && path.lesson_ids.length > 0) {
        window.location.href = `/lesson/${path.lesson_ids[0]}`;
      }
    } catch (error) {
      console.error('Error starting path:', error);
      alert('Failed to start learning path');
    }
  };

  const getPathStatus = (path) => {
    const progress = userProgress[path.id];
    if (!progress) return 'not_started';
    return progress.status;
  };

  const filteredPaths = paths.filter(path => {
    if (selectedDifficulty !== 'all' && path.difficulty !== selectedDifficulty) {
      return false;
    }
    if (selectedLanguage !== 'all' && path.language !== selectedLanguage) {
      return false;
    }
    return true;
  });

  const languages = [...new Set(paths.map(p => p.language))];
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
            <Map className="w-12 h-12 text-purple-600" />
            Learning Paths
          </h1>
          <p className="text-xl text-gray-600">
            Structured courses to guide your language learning journey
          </p>
        </motion.div>

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

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path, index) => {
            const status = getPathStatus(path);
            const progress = userProgress[path.id];

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  path.is_premium ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                {/* Path Card */}
                <div className="p-6">
                  {/* Icon and Premium Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{path.icon}</div>
                    <div className="flex flex-col gap-2 items-end">
                      {path.is_premium && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold">
                          PREMIUM
                        </span>
                      )}
                      {status === 'completed' && (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      )}
                      {status === 'in_progress' && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Play className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {path.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {path.language}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {path.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {path.estimated_hours}h
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {path.total_points} pts
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

                  {/* Lessons Count */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>{path.lesson_ids?.length || 0} lessons</span>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant={status === 'completed' ? 'outline' : 'primary'}
                    className="w-full"
                    onClick={() => startPath(path)}
                    disabled={path.is_premium && !profile?.is_premium}
                  >
                    {path.is_premium && !profile?.is_premium && (
                      <>
                        <Lock className="w-4 h-4 inline mr-1" />
                        Premium Only
                      </>
                    )}
                    {(!path.is_premium || profile?.is_premium) && (
                      <>
                        {status === 'not_started' && (
                          <>
                            <Play className="w-4 h-4 inline mr-1" />
                            Start Path
                          </>
                        )}
                        {status === 'in_progress' && (
                          <>
                            <TrendingUp className="w-4 h-4 inline mr-1" />
                            Continue
                          </>
                        )}
                        {status === 'completed' && (
                          <>
                            <Award className="w-4 h-4 inline mr-1" />
                            Completed
                          </>
                        )}
                      </>
                    )}
                  </Button>
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
        {filteredPaths.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No learning paths found with the selected filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
