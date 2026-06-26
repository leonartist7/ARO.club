import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Trophy,
  Star,
  Zap,
  Target,
  Gift,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
  Heart,
} from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { dailyQuests, badges } from '../data/characters';
import { useLanguage } from '../contexts/LanguageContext';

export default function StudentDashboard() {
  const currentUser = useStore((state) => state.currentUser);
  const { t } = useLanguage();

  // Mock user stats - in real app, fetch from backend
  const [userStats, setUserStats] = useState({
    points: 1250,
    streak: 7,
    level: 5,
    xp: 350,
    xpToNextLevel: 500,
    completedLessons: 23,
    totalHours: 12,
    rank: 'Gold',
    selectedCharacter: 'coco',
    equippedHat: null,
    equippedGlasses: null,
    equippedAccessory: 'fire',
    background: 'beach',
  });

  const [completedQuests, setCompletedQuests] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState(['first_lesson', 'week_streak']);

  const completeQuest = (questId) => {
    if (!completedQuests.includes(questId)) {
      const quest = dailyQuests.find(q => q.id === questId);
      setCompletedQuests([...completedQuests, questId]);
      setUserStats(prev => ({ ...prev, points: prev.points + quest.reward }));
    }
  };

  // Character display with accessories
  const CharacterDisplay = () => (
    <div className="relative">
      <motion.div
        className="text-9xl filter drop-shadow-2xl"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🦉
      </motion.div>

      {/* Equipped accessories */}
      {userStats.equippedHat && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          👑
        </motion.div>
      )}

      {userStats.equippedAccessory && (
        <motion.div
          className="absolute -right-4 top-1/2 -translate-y-1/2 text-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          🔥
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-2">
            Welcome back, {currentUser?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Ready to continue your learning journey?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Character & Stats */}
          <div className="lg:col-span-1 space-y-6">

            {/* Character Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card glass hover className="relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-secondary-100/50 dark:from-primary-900/20 dark:to-secondary-900/20"></div>

                <CardBody className="relative z-10 text-center py-8">
                  <CharacterDisplay />

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
                    Duo the Owl
                  </h3>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-primary-500 fill-primary-500" />
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Level {userStats.level}
                    </span>
                  </div>

                  {/* XP Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>{userStats.xp} XP</span>
                      <span>{userStats.xpToNextLevel} XP</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  <Link to="/character-builder">
                    <Button variant="primary" size="sm" className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Customize Character
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </motion.div>

            {/* Points & Streak Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card glass hover>
                <CardBody>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl">
                      <Trophy className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        {userStats.points}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        Total Points
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 rounded-xl">
                      <Flame className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-secondary-600 mb-1">
                        {userStats.streak}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        Day Streak
                      </div>
                    </div>
                  </div>

                  <Link to="/shop" className="block mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <Gift className="w-4 h-4 mr-2" />
                      Visit Shop
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card glass>
                <CardBody>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    Your Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Lessons</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {userStats.completedLessons}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Hours</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {userStats.totalHours}h
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rank</span>
                      <span className="font-semibold text-primary-600 flex items-center gap-1">
                        <Crown className="w-4 h-4" />
                        {userStats.rank}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Middle & Right Columns */}
          <div className="lg:col-span-2 space-y-6">

            {/* Daily Quests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card glass>
                <CardBody>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary-500" />
                      Daily Quests
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Resets in 12h
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dailyQuests.slice(0, 3).map((quest, index) => {
                      const isCompleted = completedQuests.includes(quest.id);

                      return (
                        <motion.div
                          key={quest.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isCompleted
                              ? 'bg-accent-50 dark:bg-accent-900/20 border-accent-300 dark:border-accent-700'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{quest.emoji}</div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {quest.name}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400">
                                  <Trophy className="w-4 h-4" />
                                  <span>+{quest.reward} points</span>
                                </div>
                              </div>
                            </div>

                            {isCompleted ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 text-accent-600 dark:text-accent-400"
                              >
                                <CheckCircle className="w-6 h-6" />
                                <span className="font-semibold text-sm">Done!</span>
                              </motion.div>
                            ) : (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => completeQuest(quest.id)}
                              >
                                Start
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card glass>
                <CardBody>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Award className="w-6 h-6 text-primary-500" />
                      Achievements
                    </h2>
                    <Link to="/achievements" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {badges.slice(0, 10).map((badge, index) => {
                      const isEarned = earnedBadges.includes(badge.id);

                      return (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * index }}
                          className={`group relative aspect-square rounded-xl p-3 flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isEarned
                              ? 'bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 hover:scale-110'
                              : 'bg-gray-100 dark:bg-gray-800 opacity-50 hover:opacity-70'
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className={`text-3xl mb-1 ${!isEarned && 'grayscale'}`}>
                            {badge.emoji}
                          </div>
                          <div className="text-xs font-medium text-center text-gray-700 dark:text-gray-300 line-clamp-2">
                            {badge.name}
                          </div>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {badge.description}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Continue Learning CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 hover:shadow-2xl transition-all">
                <CardBody className="py-8 text-center text-white">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Zap className="w-12 h-12 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Ready for your next adventure?</h3>
                  <p className="text-white/90 mb-6">
                    Continue learning and earn more points!
                  </p>
                  <Link to="/explore">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-primary-600 hover:bg-gray-50"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Browse Experiences
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
