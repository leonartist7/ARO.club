import { motion } from 'framer-motion';
import { Flame, TrendingUp, Calendar, Award } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';

/**
 * Streak Tracker Component
 * Displays user's current learning streak and streak history
 */
export default function StreakTracker({ streak = 0, longestStreak = 0, weekData = [] }) {
  // Default week data if none provided
  const defaultWeekData = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  const week = weekData.length > 0 ? weekData : defaultWeekData;

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-primary-50 to-success-50 border-2 border-primary-200">
      <CardBody>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-premium animate-pulse-slow">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900">
                {streak} Day Streak!
              </h3>
              <p className="text-sm text-gray-600">Keep it going!</p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-center"
          >
            <Award className="w-6 h-6 text-primary-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Best Streak</p>
            <p className="text-lg font-bold text-primary-600">{longestStreak}</p>
          </motion.div>
        </div>

        {/* Week Progress */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {week.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div
                className={`w-full aspect-square rounded-xl flex items-center justify-center mb-1 transition-all ${
                  day.completed
                    ? 'bg-gradient-to-br from-success-400 to-success-500 shadow-success animate-bounce-in'
                    : 'bg-white border-2 border-dashed border-gray-300'
                }`}
              >
                {day.completed ? (
                  <Flame className="w-4 h-4 text-white" />
                ) : (
                  <Calendar className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className={`text-xs font-medium ${day.completed ? 'text-success-600' : 'text-gray-400'}`}>
                {day.day}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Streak Stats */}
        <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-primary-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-success-500" />
            <span>Practice daily to maintain your streak!</span>
          </div>
          {streak >= 7 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-success-100 rounded-full">
              <Award className="w-3 h-3 text-success-600" />
              <span className="text-xs font-bold text-success-700">On Fire!</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
