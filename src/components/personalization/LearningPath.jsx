import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  CheckCircle,
  Circle,
  Star,
  TrendingUp,
  Award,
  MapPin,
  Compass,
  Flag,
} from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * Learning Path Component
 * Personalized learning journey with goals and milestones
 */
export default function LearningPath({ language = 'French', level = 'Beginner' }) {
  const [currentMilestone, setCurrentMilestone] = useState(1);

  // Learning path milestones
  const milestones = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Learn basic greetings and introductions',
      tasks: [
        { id: 1, text: 'Complete "Coffee Chat" experience', completed: true },
        { id: 2, text: 'Learn 50 basic words', completed: true },
        { id: 3, text: 'Practice pronunciation for 30 minutes', completed: true },
      ],
      points: 100,
      status: 'completed',
    },
    {
      id: 2,
      title: 'Building Confidence',
      description: 'Have basic conversations about daily life',
      tasks: [
        { id: 1, text: 'Complete "Market Tour" experience', completed: true },
        { id: 2, text: 'Learn 100 vocabulary words', completed: true },
        { id: 3, text: 'Practice with 3 different teachers', completed: false },
      ],
      points: 200,
      status: 'in_progress',
    },
    {
      id: 3,
      title: 'Expanding Vocabulary',
      description: 'Express yourself about hobbies and interests',
      tasks: [
        { id: 1, text: 'Complete "Cooking Class" experience', completed: false },
        { id: 2, text: 'Learn 200 vocabulary words', completed: false },
        { id: 3, text: 'Write 5 short paragraphs', completed: false },
      ],
      points: 300,
      status: 'locked',
    },
    {
      id: 4,
      title: 'Conversational Fluency',
      description: 'Discuss complex topics with ease',
      tasks: [
        { id: 1, text: 'Complete "Cultural Tour" experience', completed: false },
        { id: 2, text: 'Have 10 full conversations', completed: false },
        { id: 3, text: 'Watch a movie without subtitles', completed: false },
      ],
      points: 500,
      status: 'locked',
    },
    {
      id: 5,
      title: 'Advanced Mastery',
      description: 'Achieve near-native fluency',
      tasks: [
        { id: 1, text: 'Complete 50 total experiences', completed: false },
        { id: 2, text: 'Pass advanced proficiency test', completed: false },
        { id: 3, text: 'Teach a beginner class', completed: false },
      ],
      points: 1000,
      status: 'locked',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-success-500" />;
      case 'in_progress':
        return <Target className="w-6 h-6 text-primary-500 animate-pulse" />;
      case 'locked':
        return <Circle className="w-6 h-6 text-gray-400" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 border-success-300';
      case 'in_progress':
        return 'bg-primary-100 border-primary-300';
      case 'locked':
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const calculateProgress = (milestone) => {
    const completed = milestone.tasks.filter((t) => t.completed).length;
    return (completed / milestone.tasks.length) * 100;
  };

  const totalPoints = milestones.reduce((sum, m) => sum + m.points, 0);
  const earnedPoints = milestones
    .filter((m) => m.status === 'completed')
    .reduce((sum, m) => sum + m.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0">
        <CardBody>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold mb-2">
                  {language} Learning Path
                </h2>
                <p className="text-white/90 mb-3">Current Level: {level}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {milestones.filter((m) => m.status === 'completed').length} / {milestones.length} Milestones
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {earnedPoints} / {totalPoints} Points
                  </Badge>
                </div>
              </div>
            </div>
            <Flag className="w-8 h-8 text-white/70" />
          </div>

          {/* Overall Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/90">Overall Progress</span>
              <span className="text-sm font-bold text-white">
                {Math.round((milestones.filter((m) => m.status === 'completed').length / milestones.length) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(milestones.filter((m) => m.status === 'completed').length / milestones.length) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-white rounded-full shadow-lg"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Milestones */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const progress = calculateProgress(milestone);

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hover={milestone.status !== 'locked'}
                className={`border-2 ${getStatusColor(milestone.status)} ${
                  milestone.status === 'locked' ? 'opacity-60' : ''
                }`}
              >
                <CardBody>
                  <div className="flex items-start gap-4">
                    {/* Milestone Number & Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          milestone.status === 'completed'
                            ? 'bg-success-500 text-white'
                            : milestone.status === 'in_progress'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {milestone.id}
                      </div>
                      {getStatusIcon(milestone.status)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                        <Badge
                          variant={
                            milestone.status === 'completed'
                              ? 'success'
                              : milestone.status === 'in_progress'
                              ? 'primary'
                              : 'gray'
                          }
                        >
                          +{milestone.points} pts
                        </Badge>
                      </div>

                      {/* Tasks */}
                      <div className="space-y-2 mb-3">
                        {milestone.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 text-sm"
                          >
                            {task.completed ? (
                              <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            )}
                            <span
                              className={
                                task.completed
                                  ? 'text-gray-500 line-through'
                                  : 'text-gray-700'
                              }
                            >
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      {milestone.status !== 'locked' && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-xs font-medium text-primary-600">
                              {Math.round(progress)}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                              className={`h-full rounded-full ${
                                milestone.status === 'completed'
                                  ? 'bg-gradient-to-r from-success-400 to-success-600'
                                  : 'bg-gradient-to-r from-primary-400 to-primary-600'
                              }`}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      {milestone.status === 'in_progress' && (
                        <div className="mt-4">
                          <Button variant="primary" size="sm">
                            Continue Learning
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Connector Line (except for last milestone) */}
              {index < milestones.length - 1 && (
                <div className="flex justify-start pl-6">
                  <div
                    className={`w-0.5 h-4 ${
                      milestone.status === 'completed' ? 'bg-success-300' : 'bg-gray-300'
                    }`}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completion Reward */}
      {milestones.every((m) => m.status === 'completed') && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <Card className="bg-gradient-to-r from-primary-500 to-accent-500 text-white border-0">
            <CardBody className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold mb-2">
                Path Complete! 🎉
              </h3>
              <p className="text-white/90 mb-4">
                Congratulations! You've mastered the {language} learning path!
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-primary-600">
                Start Next Language
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
