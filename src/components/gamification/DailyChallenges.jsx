import { motion } from 'framer-motion';
import { Target, CheckCircle, Circle, Star, Clock, TrendingUp } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * Daily Challenges Component
 * Displays today's language learning challenges
 */
export default function DailyChallenges({ challenges = [], onCompleteChallenge }) {
  // Default challenges if none provided
  const defaultChallenges = [
    {
      id: 'daily_practice',
      title: 'Complete One Experience',
      description: 'Join any language experience today',
      progress: 0,
      goal: 1,
      points: 50,
      completed: false,
      icon: '🎯',
    },
    {
      id: 'vocabulary',
      title: 'Learn 10 New Words',
      description: 'Add 10 words to your vocabulary',
      progress: 7,
      goal: 10,
      points: 30,
      completed: false,
      icon: '📚',
    },
    {
      id: 'social',
      title: 'Connect with a Learner',
      description: 'Send a message to another language learner',
      progress: 1,
      goal: 1,
      points: 20,
      completed: true,
      icon: '👋',
    },
    {
      id: 'review',
      title: 'Leave a Review',
      description: 'Rate a past language experience',
      progress: 0,
      goal: 1,
      points: 25,
      completed: false,
      icon: '⭐',
    },
  ];

  const displayChallenges = challenges.length > 0 ? challenges : defaultChallenges;
  const completedCount = displayChallenges.filter((c) => c.completed).length;
  const totalPoints = displayChallenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);
  const maxPoints = displayChallenges.reduce((sum, c) => sum + c.points, 0);

  const getProgressPercentage = (challenge) => {
    return Math.min((challenge.progress / challenge.goal) * 100, 100);
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-info-50 to-accent-50 border-2 border-info-200">
      <CardBody>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-info-500 to-info-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                Daily Challenges
                <Clock className="w-5 h-5 text-gray-400" />
              </h3>
              <p className="text-sm text-gray-600">
                {completedCount} of {displayChallenges.length} completed
              </p>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-center"
          >
            <Star className="w-6 h-6 text-primary-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Points Earned</p>
            <p className="text-lg font-bold text-primary-600">
              {totalPoints} / {maxPoints}
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-info-600">
              {Math.round((completedCount / displayChallenges.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / displayChallenges.length) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-info-400 to-info-600 rounded-full"
            />
          </div>
        </div>

        {/* Challenges List */}
        <div className="space-y-3">
          {displayChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`p-4 rounded-xl transition-all ${
                  challenge.completed
                    ? 'bg-success-100 border-2 border-success-300'
                    : 'bg-white border-2 border-gray-200 hover:border-info-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon & Status */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        challenge.completed ? 'bg-success-400' : 'bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {challenge.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-2xl">{challenge.icon}</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <Badge variant={challenge.completed ? 'success' : 'primary'}>
                        +{challenge.points} pts
                      </Badge>
                    </div>

                    {/* Progress Bar (if not completed) */}
                    {!challenge.completed && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">
                            {challenge.progress} / {challenge.goal}
                          </span>
                          <span className="text-xs font-medium text-info-600">
                            {Math.round(getProgressPercentage(challenge))}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getProgressPercentage(challenge)}%` }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-info-400 to-info-600 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completion Bonus */}
        {completedCount === displayChallenges.length && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.4 }}
            className="mt-6 p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white text-center"
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-bold text-lg mb-1">All Challenges Complete! 🎉</h4>
            <p className="text-sm text-white/90 mb-3">
              Bonus +100 points for completing all daily challenges!
            </p>
            <Badge variant="secondary" className="bg-white text-primary-600">
              +100 Bonus Points
            </Badge>
          </motion.div>
        )}

        {/* Time Remaining */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Resets in 8 hours</span>
        </div>
      </CardBody>
    </Card>
  );
}
