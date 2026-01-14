import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Flame,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Star,
  BookOpen,
  Home,
  Bell,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import achievementsData from '../data/achievements.json';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(null);
  const [todayChallenges, setTodayChallenges] = useState([]);
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load user streak
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (streakData) {
        setStreak(streakData);
      } else {
        // Initialize streak
        const { data: newStreak } = await supabase
          .from('user_streaks')
          .insert({ user_id: user.id })
          .select()
          .single();
        setStreak(newStreak);
      }

      // Load today's challenges (mock for now)
      const today = new Date().toISOString().split('T')[0];
      const { data: challengesData } = await supabase
        .from('daily_challenges')
        .select('*')
        .gte('expires_at', today)
        .limit(3);

      setTodayChallenges(challengesData || []);

      // Load recent achievements
      const { data: userAchievementsData } = await supabase
        .from('user_achievements')
        .select('*, achievements(*)')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false })
        .limit(5);

      setRecentAchievements(userAchievementsData || []);

      // Load analytics
      const { data: analyticsData } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (analyticsData) {
        setAnalytics(analyticsData);
      } else {
        // Initialize analytics
        const { data: newAnalytics } = await supabase
          .from('user_analytics')
          .insert({ user_id: user.id })
          .select()
          .single();
        setAnalytics(newAnalytics);
      }

      // Load notifications
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(5);

      setNotifications(notificationsData || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please log in to view your dashboard</p>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Continue your language learning journey
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Flame className="w-8 h-8" />
              <span className="text-3xl font-bold">{streak?.current_streak || 0}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Day Streak</h3>
            <p className="text-sm opacity-90">Longest: {streak?.longest_streak || 0} days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8" />
              <span className="text-3xl font-bold">{profile?.points || 0}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Total Points</h3>
            <p className="text-sm opacity-90">Level {profile?.level || 1} - {profile?.level_name}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8" />
              <span className="text-3xl font-bold">{analytics?.lessons_completed_count || 0}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Lessons Completed</h3>
            <p className="text-sm opacity-90">Avg Score: {analytics?.average_quiz_score || 0}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8" />
              <span className="text-3xl font-bold">{analytics?.achievements_count || 0}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Achievements</h3>
            <p className="text-sm opacity-90">Keep earning more!</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Daily Challenges
                </h2>
                <Link to="/challenges" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              {todayChallenges.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No challenges available today</p>
                  <p className="text-sm text-gray-500">Check back tomorrow!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100"
                    >
                      <div className="text-3xl">{challenge.icon || '🎯'}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-600 font-bold">
                          <Star className="w-4 h-4" />
                          {challenge.points_reward}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Recent Activity / Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  Recent Achievements
                </h2>
                <Link to="/achievements" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              {recentAchievements.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No achievements yet</p>
                  <p className="text-sm text-gray-500">Complete lessons to earn achievements!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentAchievements.map((item) => (
                    <div
                      key={item.achievement_id}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
                    >
                      <div className="text-3xl">{item.achievements.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.achievements.name}</h3>
                        <p className="text-sm text-gray-600">{item.achievements.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.achievements.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                        item.achievements.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                        item.achievements.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.achievements.rarity}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/lessons">
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-medium">Start Learning</span>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <Link to="/my-home">
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5" />
                      <span className="font-medium">My 3D Home</span>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <Link to="/study-rooms">
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span className="font-medium">Study Rooms</span>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <Link to="/learning-paths">
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-medium">Learning Paths</span>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Notifications
                </h2>
                {notifications.length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-4">No new notifications</p>
              ) : (
                <div className="space-y-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                    >
                      <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                      <p className="text-xs text-gray-600">{notif.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Study Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Study Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Study Time</span>
                    <span className="font-bold text-gray-900">
                      {Math.floor((analytics?.total_study_time_minutes || 0) / 60)}h {(analytics?.total_study_time_minutes || 0) % 60}m
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Favorite Language</span>
                    <span className="font-bold text-gray-900">{analytics?.favorite_language || 'None'}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Most Active Day</span>
                    <span className="font-bold text-gray-900">{analytics?.most_active_day || 'N/A'}</span>
                  </div>
                </div>

                <Link to="/analytics">
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View Full Analytics
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
