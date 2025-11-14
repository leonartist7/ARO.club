import { motion } from 'framer-motion';
import {
  Award,
  Star,
  Trophy,
  Target,
  Zap,
  Globe,
  Heart,
  BookOpen,
  Users,
  Flame,
  TrendingUp,
  Medal,
} from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';

/**
 * Achievements Component
 * Displays user's earned and available achievements
 */
export default function Achievements({ earnedAchievements = [], showAll = false }) {
  // Achievement definitions
  const allAchievements = [
    {
      id: 'first_lesson',
      title: 'First Steps',
      description: 'Complete your first language experience',
      icon: <Star className="w-6 h-6" />,
      color: 'primary',
      points: 10,
      rarity: 'common',
    },
    {
      id: 'streak_7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: <Flame className="w-6 h-6" />,
      color: 'success',
      points: 50,
      rarity: 'uncommon',
    },
    {
      id: 'streak_30',
      title: 'Month Master',
      description: 'Maintain a 30-day learning streak',
      icon: <Trophy className="w-6 h-6" />,
      color: 'primary',
      points: 200,
      rarity: 'rare',
    },
    {
      id: 'polyglot',
      title: 'Polyglot Pro',
      description: 'Learn 3 different languages',
      icon: <Globe className="w-6 h-6" />,
      color: 'accent',
      points: 150,
      rarity: 'rare',
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Make 10 language learning friends',
      icon: <Heart className="w-6 h-6" />,
      color: 'info',
      points: 100,
      rarity: 'uncommon',
    },
    {
      id: 'fast_learner',
      title: 'Fast Learner',
      description: 'Complete 5 experiences in one week',
      icon: <Zap className="w-6 h-6" />,
      color: 'primary',
      points: 75,
      rarity: 'uncommon',
    },
    {
      id: 'bookworm',
      title: 'Bookworm',
      description: 'Complete 20 language experiences',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'success',
      points: 150,
      rarity: 'rare',
    },
    {
      id: 'community_star',
      title: 'Community Star',
      description: 'Help 5 learners with reviews',
      icon: <Users className="w-6 h-6" />,
      color: 'accent',
      points: 100,
      rarity: 'uncommon',
    },
    {
      id: 'goal_getter',
      title: 'Goal Getter',
      description: 'Complete all your monthly goals',
      icon: <Target className="w-6 h-6" />,
      color: 'primary',
      points: 200,
      rarity: 'rare',
    },
    {
      id: 'legend',
      title: 'Langgie Legend',
      description: 'Reach level 50',
      icon: <Medal className="w-6 h-6" />,
      color: 'primary',
      points: 500,
      rarity: 'legendary',
    },
  ];

  const displayAchievements = showAll ? allAchievements : allAchievements.slice(0, 6);

  const isEarned = (achievementId) => earnedAchievements.includes(achievementId);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600 bg-gray-100';
      case 'uncommon':
        return 'text-success-600 bg-success-100';
      case 'rare':
        return 'text-info-600 bg-info-100';
      case 'legendary':
        return 'text-primary-600 bg-primary-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getIconBgColor = (color, earned) => {
    if (!earned) return 'bg-gray-200';

    switch (color) {
      case 'primary':
        return 'bg-gradient-to-br from-primary-400 to-primary-600';
      case 'success':
        return 'bg-gradient-to-br from-success-400 to-success-600';
      case 'accent':
        return 'bg-gradient-to-br from-accent-400 to-accent-600';
      case 'info':
        return 'bg-gradient-to-br from-info-400 to-info-600';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary-500" />
          Achievements
        </h2>
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary-500" />
          <span className="text-lg font-bold text-gray-700">
            {earnedAchievements.length} / {allAchievements.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayAchievements.map((achievement, index) => {
          const earned = isEarned(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                hover={earned}
                className={`h-full transition-all ${
                  earned ? 'ring-2 ring-primary-200' : 'opacity-60 grayscale'
                }`}
              >
                <CardBody className="relative">
                  {earned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 + index * 0.05 }}
                      className="absolute top-3 right-3"
                    >
                      <div className="w-8 h-8 bg-success-400 rounded-full flex items-center justify-center shadow-success">
                        <Star className="w-5 h-5 text-white fill-white" />
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-col items-center text-center space-y-3">
                    <motion.div
                      whileHover={earned ? { scale: 1.1, rotate: 5 } : {}}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getIconBgColor(
                        achievement.color,
                        earned
                      )} ${earned ? 'shadow-lg' : ''} transition-all`}
                    >
                      <div className={earned ? 'text-white' : 'text-gray-400'}>
                        {achievement.icon}
                      </div>
                    </motion.div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>

                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <Badge variant={achievement.color}>
                          +{achievement.points} pts
                        </Badge>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {!showAll && allAchievements.length > 6 && (
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            +{allAchievements.length - 6} more achievements to unlock
          </p>
        </div>
      )}
    </div>
  );
}
