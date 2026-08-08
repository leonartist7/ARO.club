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
import { BADGES } from '../data/gamification';
import { getLevelFromPoints } from '../utils/helpers';
import { usePlayerStore } from '../store/usePlayerStore';

const PLAYER_ID = '__you__';

export default function LeaderboardPage() {

  // The signed-in player competes on the real board rather than the board
  // pretending the first seed student is you.
  const player = usePlayerStore((state) => state.user);
  const points = usePlayerStore((state) => state.points);
  const badges = usePlayerStore((state) => state.badges);
  const playerStats = usePlayerStore((state) => state.stats);

  const board = player
    ? [
        ...studentsData,
        {
          id: PLAYER_ID,
          name: player.name || 'You',
          photo: player.photo,
          points,
          badges,
          stats: { totalExperiences: playerStats.experiencesBooked },
        },
      ]
    : studentsData;

  const currentUserId = player ? PLAYER_ID : null;

  // Sort by points
  const rankedStudents = [...board].sort((a, b) => b.points - a.points);

  // Top 3 for podium
  const topThree = rankedStudents.slice(0, 3);

  // Ranks 4-10
  const nextRanks = rankedStudents.slice(3, 10);

  // Find current user rank
  const currentUserRank = currentUserId
    ? rankedStudents.findIndex((s) => s.id === currentUserId) + 1
    : 0;
  const currentUser = currentUserId
    ? rankedStudents.find((s) => s.id === currentUserId)
    : null;

  // Community stats
  const totalPoints = board.reduce((sum, s) => sum + s.points, 0);
  const totalExperiences = board.reduce((sum, s) => sum + (s.stats?.totalExperiences ?? 0), 0);
  const totalBadgesEarned = board.reduce((sum, s) => sum + s.badges.length, 0);
  const avgPointsPerUser = Math.round(totalPoints / board.length);

  const podiumOrder = [1, 0, 2]; // Second, First, Third for visual layout

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-10 h-10 text-primary-500" />
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Leaderboard</h1>
          </div>
          <p className="text-gray-600 text-lg dark:text-gray-400">
            Compete with learners worldwide and climb the ranks!
          </p>
        </div>

        {/* This board is all-time.
            There used to be All Time / Month / Week pills here, but nothing
            behind them: they restyled themselves and the rankings never
            changed. Points carry no timestamps, so weekly and monthly
            standings cannot be computed without inventing figures for the
            other learners. The control is gone until there's a points ledger
            to build it from. */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
            <Trophy className="w-4 h-4 text-primary-500" />
            All-time standings
          </span>
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
                const bgColors = ['bg-gray-500', 'bg-gradient-to-br from-yellow-300 to-yellow-500', 'bg-amber-600'];
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
                      className="relative flex flex-col items-center h-full bg-white dark:bg-gray-800 rounded-t-2xl p-6 hover:shadow-2xl transition-shadow"
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
                      <p className="font-bold text-gray-900 text-center mb-1 dark:text-white">
                        {student.name}
                      </p>
                      <Badge variant="secondary" size="sm" className="mb-2">
                        Level {levelInfo.level}
                      </Badge>
                      <div className="mt-auto">
                        <p className="text-2xl font-bold text-primary-500">
                          {student.points}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">points</p>
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
                const bgColors = ['bg-gradient-to-br from-yellow-300 to-yellow-500', 'bg-gray-500', 'bg-amber-600'];
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
                      className="flex items-center gap-4 bg-white rounded-xl p-4 hover:shadow-lg transition-shadow dark:bg-gray-800"
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
                        <p className="font-bold text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Level {levelInfo.level}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-500">{student.points}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">points</p>
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
                    <h3 className="font-semibold text-gray-900 dark:text-white">Your Rank</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 dark:bg-primary-900/40">
                      <span className="text-2xl font-bold text-primary-600">#{currentUserRank}</span>
                    </div>

                    <Avatar
                      src={currentUser.photo}
                      alt={currentUser.name}
                      name={currentUser.name}
                      size="md"
                    />

                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Level {getLevelFromPoints(currentUser.points).level}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-500">{currentUser.points}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">points</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Rankings 4-10 */}
            <Card>
              <CardBody>
                <h3 className="font-semibold text-gray-900 mb-4 dark:text-white">Top 10 Rankings</h3>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Rank
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Learner
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Level
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Points
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
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
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors dark:border-gray-700"
                          >
                            <td className="py-4 px-4">
                              <span className="font-semibold text-gray-900 dark:text-white">#{rank}</span>
                            </td>
                            <td className="py-4 px-4">
                              <Link to="/profile" className="flex items-center gap-3 hover:underline">
                                <Avatar
                                  src={student.photo}
                                  alt={student.name}
                                  name={student.name}
                                  size="sm"
                                />
                                <span className="font-medium text-gray-900 dark:text-white">{student.name}</span>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Badge variant="secondary" size="sm">
                                {levelInfo.level}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="font-semibold text-gray-900 dark:text-white">{student.points}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-gray-600 dark:text-gray-400">{student.badges.length}</span>
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
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-gray-800"
                        >
                          <span className="font-bold text-gray-900 text-lg w-8 dark:text-white">#{rank}</span>
                          <Avatar
                            src={student.photo}
                            alt={student.name}
                            name={student.name}
                            size="sm"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
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
                  <h3 className="font-semibold text-gray-900 dark:text-white">Community Stats</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Learners</span>
                      <span className="font-bold text-gray-900 dark:text-white">{studentsData.length}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
                      <span className="font-bold text-gray-900 dark:text-white">{totalPoints.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Experiences Completed</span>
                      <span className="font-bold text-gray-900 dark:text-white">{totalExperiences}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</span>
                      <span className="font-bold text-gray-900 dark:text-white">{totalBadgesEarned}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Avg Points per User</span>
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
                  <h3 className="font-semibold text-gray-900 dark:text-white">Available Badges</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {BADGES.slice(0, 6).map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors dark:bg-gray-800"
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <p className="text-xs font-semibold text-gray-900 mb-1 dark:text-white">
                        {badge.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 dark:text-gray-400">
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
                  <Button variant="secondary" size="sm" className="w-full bg-white text-primary-600 hover:bg-gray-50 dark:bg-gray-800">
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
