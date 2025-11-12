import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Users,
  TrendingUp,
  Star,
  MapPin,
  Globe,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Card, CardBody } from '../components/ui/Card';
import studentsData from '../data/students.json';
import { BADGE_DEFINITIONS } from '../data/constants';
import { getLevelFromPoints } from '../utils/helpers';

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState('all-time');

  // Current user (first student)
  const currentUserId = studentsData[0].id;

  // Filter students by time period
  // Note: This is a mock implementation. In production, points would have timestamps
  // and we'd filter based on when they were earned via Supabase query
  const getFilteredStudents = () => {
    let filtered = [...studentsData];

    if (activeFilter === 'week') {
      // Mock: Show only students with points > 100 (simulating recent activity)
      // In production: Filter by points earned in last 7 days
      filtered = filtered.filter(s => s.points > 100);
    } else if (activeFilter === 'month') {
      // Mock: Show only students with points > 50 (simulating monthly activity)
      // In production: Filter by points earned in last 30 days
      filtered = filtered.filter(s => s.points > 50);
    }
    // 'all-time' shows everyone

    return filtered;
  };

  // Sort students by points
  const rankedStudents = getFilteredStudents().sort((a, b) => b.points - a.points);

  // Top 3 for podium
  const topThree = rankedStudents.slice(0, 3);

  // Ranks 4-10
  const nextRanks = rankedStudents.slice(3, 10);

  // Find current user rank
  const currentUserRank = rankedStudents.findIndex((s) => s.id === currentUserId) + 1;
  const currentUser = rankedStudents.find((s) => s.id === currentUserId);

  // Community stats (based on filtered data)
  const filteredStudents = getFilteredStudents();
  const totalPoints = filteredStudents.reduce((sum, s) => sum + s.points, 0);
  const totalExperiences = filteredStudents.reduce((sum, s) => sum + s.stats.totalExperiences, 0);
  const totalBadgesEarned = filteredStudents.reduce((sum, s) => sum + s.badges.length, 0);
  const avgPointsPerUser = filteredStudents.length > 0 ? Math.round(totalPoints / filteredStudents.length) : 0;

  const filters = [
    { id: 'all-time', label: 'All Time' },
    { id: 'month', label: 'This Month' },
    { id: 'week', label: 'This Week' },
  ];

  const podiumOrder = [1, 0, 2]; // Second, First, Third for visual layout

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-10 h-10 text-primary-500" />
            <h1 className="text-4xl font-display font-bold text-gray-900">Leaderboard</h1>
          </div>
          <p className="text-gray-600 text-lg">
            {activeFilter === 'all-time' && 'Compete with learners worldwide and climb the ranks!'}
            {activeFilter === 'month' && 'Top performers this month'}
            {activeFilter === 'week' && 'Top performers this week'}
          </p>
          {activeFilter !== 'all-time' && (
            <p className="text-sm text-gray-500 mt-2">
              Showing learners with recent activity
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-sm p-1 border border-gray-200">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium - Top 3 */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-8">
            <h2 className="text-2xl font-display font-bold text-white text-center mb-8">
              Top 3 Champions
            </h2>

            {/* Desktop Podium */}
            <div className="hidden md:flex items-end justify-center gap-4 max-w-3xl mx-auto">
              {podiumOrder.map((index) => {
                const student = topThree[index];
                if (!student) return null;

                const rank = index + 1;
                const heights = ['h-48', 'h-56', 'h-40'];
                const icons = [
                  <Medal key="2" className="w-8 h-8 text-gray-400" />,
                  <Crown key="1" className="w-10 h-10 text-yellow-400" />,
                  <Medal key="3" className="w-8 h-8 text-amber-600" />,
                ];
                const bgColors = ['bg-gray-200', 'bg-gradient-to-br from-yellow-300 to-yellow-500', 'bg-amber-600'];
                const levelInfo = getLevelFromPoints(student.points);

                return (
                  <motion.div
                    key={student.id}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, type: 'spring' }}
                    className={`flex-1 ${heights[index]}`}
                  >
                    <Link
                      to="/profile"
                      className="relative flex flex-col items-center h-full bg-white rounded-t-2xl p-6 hover:shadow-2xl transition-shadow"
                    >
                      {/* Icon */}
                      <div className="absolute -top-5">{icons[index]}</div>

                      {/* Rank Badge */}
                      <div className={`w-12 h-12 rounded-full ${bgColors[index]} flex items-center justify-center text-white font-bold text-xl mb-3 mt-4`}>
                        {rank}
                      </div>

                      {/* Avatar */}
                      <Avatar
                        src={student.photo}
                        alt={student.name}
                        name={student.name}
                        size="lg"
                        className="mb-3 ring-4 ring-white"
                      />

                      {/* Info */}
                      <p className="font-bold text-gray-900 text-center mb-1">
                        {student.name}
                      </p>
                      <Badge variant="secondary" size="sm" className="mb-2">
                        Level {levelInfo.level}
                      </Badge>
                      <div className="mt-auto">
                        <p className="text-2xl font-bold text-primary-500">
                          {student.points}
                        </p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Podium */}
            <div className="md:hidden space-y-4">
              {topThree.map((student, index) => {
                const rank = index + 1;
                const icons = [
                  <Crown key="1" className="w-6 h-6 text-yellow-400" />,
                  <Medal key="2" className="w-6 h-6 text-gray-400" />,
                  <Medal key="3" className="w-6 h-6 text-amber-600" />,
                ];
                const bgColors = ['bg-gradient-to-br from-yellow-300 to-yellow-500', 'bg-gray-200', 'bg-amber-600'];
                const levelInfo = getLevelFromPoints(student.points);

                return (
                  <motion.div
                    key={student.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Link
                      to="/profile"
                      className="flex items-center gap-4 bg-white rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className={`w-12 h-12 rounded-full ${bgColors[index]} flex items-center justify-center flex-shrink-0`}>
                        {icons[index]}
                      </div>

                      <Avatar
                        src={student.photo}
                        alt={student.name}
                        name={student.name}
                        size="md"
                      />

                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">Level {levelInfo.level}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-500">{student.points}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Rankings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Your Rank */}
            {currentUser && (
              <Card className="border-2 border-primary-500">
                <CardBody>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-primary-500 fill-primary-500" />
                    <h3 className="font-semibold text-gray-900">Your Rank</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary-600">#{currentUserRank}</span>
                    </div>

                    <Avatar
                      src={currentUser.photo}
                      alt={currentUser.name}
                      name={currentUser.name}
                      size="md"
                    />

                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{currentUser.name}</p>
                      <p className="text-sm text-gray-500">
                        Level {getLevelFromPoints(currentUser.points).level}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-500">{currentUser.points}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Rankings 4-10 */}
            <Card>
              <CardBody>
                <h3 className="font-semibold text-gray-900 mb-4">Top 10 Rankings</h3>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Rank
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Learner
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                          Level
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                          Points
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                          Badges
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {nextRanks.map((student, index) => {
                        const rank = index + 4;
                        const levelInfo = getLevelFromPoints(student.points);
                        return (
                          <motion.tr
                            key={student.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <span className="font-semibold text-gray-900">#{rank}</span>
                            </td>
                            <td className="py-4 px-4">
                              <Link to="/profile" className="flex items-center gap-3 hover:underline">
                                <Avatar
                                  src={student.photo}
                                  alt={student.name}
                                  name={student.name}
                                  size="sm"
                                />
                                <span className="font-medium text-gray-900">{student.name}</span>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Badge variant="secondary" size="sm">
                                {levelInfo.level}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-semibold text-gray-900">{student.points}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-gray-600">{student.badges.length}</span>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-3">
                  {nextRanks.map((student, index) => {
                    const rank = index + 4;
                    const levelInfo = getLevelFromPoints(student.points);
                    return (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-bold text-gray-900 text-lg w-8">#{rank}</span>
                          <Avatar
                            src={student.photo}
                            alt={student.name}
                            name={student.name}
                            size="sm"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-xs text-gray-500">
                              Level {levelInfo.level} · {student.badges.length} badges
                            </p>
                          </div>
                          <p className="font-bold text-primary-500">{student.points}</p>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Stats & Badges */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Stats */}
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary-500" />
                  <h3 className="font-semibold text-gray-900">Community Stats</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Total Learners</span>
                      <span className="font-bold text-gray-900">{studentsData.length}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Total Points</span>
                      <span className="font-bold text-gray-900">{totalPoints.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Experiences Completed</span>
                      <span className="font-bold text-gray-900">{totalExperiences}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Badges Earned</span>
                      <span className="font-bold text-gray-900">{totalBadgesEarned}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Points per User</span>
                      <span className="font-bold text-primary-500">{avgPointsPerUser}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Available Badges */}
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary-500" />
                  <h3 className="font-semibold text-gray-900">Available Badges</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {BADGE_DEFINITIONS.slice(0, 6).map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <p className="text-xs font-semibold text-gray-900 mb-1">
                        {badge.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {badge.requirement}
                      </p>
                    </div>
                  ))}
                </div>

                <Link to="/profile" className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Badges
                  </Button>
                </Link>
              </CardBody>
            </Card>

            {/* Motivation Card */}
            <Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
              <CardBody>
                <TrendingUp className="w-8 h-8 text-white mb-3" />
                <h3 className="font-bold text-white text-lg mb-2">Keep Learning!</h3>
                <p className="text-white/90 text-sm mb-4">
                  Complete more experiences to earn points and climb the leaderboard.
                </p>
                <Link to="/explore">
                  <Button variant="secondary" size="sm" className="w-full bg-white text-primary-600 hover:bg-gray-50">
                    Browse Experiences
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
