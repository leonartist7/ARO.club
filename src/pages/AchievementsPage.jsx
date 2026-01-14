import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Trophy, Lock, Star, Award } from 'lucide-react';
import achievementsData from '../data/achievements.json';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadAchievements();
  }, [user]);

  const loadAchievements = async () => {
    try {
      setLoading(true);

      // Load all achievements
      setAchievements(achievementsData);

      // Load user's earned achievements
      if (user) {
        const { data, error } = await supabase
          .from('user_achievements')
          .select('achievement_id')
          .eq('user_id', user.id);

        if (error) throw error;

        const earnedIds = new Set(data.map(a => a.achievement_id));
        setUserAchievements(earnedIds);
      }
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const isEarned = (achievementId) => userAchievements.has(achievementId);

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedCategory === 'all') return true;
    return achievement.category === selectedCategory;
  });

  const categories = ['all', ...new Set(achievements.map(a => a.category))];
  const earnedCount = achievements.filter(a => isEarned(a.id)).length;
  const totalPoints = achievements
    .filter(a => isEarned(a.id))
    .reduce((sum, a) => sum + a.points_reward, 0);

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
            <Trophy className="w-12 h-12 text-yellow-500" />
            Achievements
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Track your progress and unlock rewards
          </p>

          {user && (
            <div className="flex items-center justify-center gap-6">
              <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
                <span className="text-3xl font-bold text-purple-600">{earnedCount}</span>
                <span className="text-gray-600 ml-2">/ {achievements.length} Unlocked</span>
              </div>
              <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
                <Star className="w-6 h-6 text-yellow-500 inline mr-2" />
                <span className="text-3xl font-bold text-yellow-600">{totalPoints}</span>
                <span className="text-gray-600 ml-2">Points Earned</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => {
            const earned = isEarned(achievement.id);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`relative bg-white rounded-2xl p-6 shadow-lg ${
                  !earned ? 'opacity-60 grayscale' : ''
                }`}
              >
                {/* Rarity Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                    achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white' :
                    achievement.rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4 flex items-center justify-center">
                  {earned ? (
                    <div className="text-6xl">{achievement.icon}</div>
                  ) : (
                    <div className="relative">
                      <div className="text-6xl opacity-30">{achievement.icon}</div>
                      <Lock className="absolute inset-0 m-auto w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {achievement.description}
                </p>

                {/* Progress/Requirement */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xs text-gray-500">
                    {achievement.requirement_type.replace('_', ' ')}: {achievement.requirement_value}
                  </span>
                </div>

                {/* Points Reward */}
                <div className="flex items-center justify-center gap-2 bg-yellow-50 rounded-lg py-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-yellow-700">
                    +{achievement.points_reward} points
                  </span>
                </div>

                {/* Earned Badge */}
                {earned && (
                  <div className="absolute top-0 left-0 bg-gradient-to-br from-green-400 to-green-600 text-white px-4 py-1 rounded-tr-2xl rounded-bl-2xl font-bold text-xs flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    EARNED
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No achievements in this category</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
