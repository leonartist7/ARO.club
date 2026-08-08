import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { usePlayerStore } from '../store/usePlayerStore';
import { getQuestions } from '../data/questions';
import studentsData from '../data/students.json';
import { Trophy, Zap, Volume2, Flame, Star, Clock, Target, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

const GAMES = [
  {
    id: 'word_match',
    name: 'Word Match',
    description: 'Match translations',
    emoji: '📝',
    points: 50,
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'speed_quiz',
    name: 'Speed Quiz',
    description: 'Timed multiple choice',
    emoji: '⚡',
    points: 75,
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'listening_challenge',
    name: 'Listening Challenge',
    description: 'Audio comprehension',
    emoji: '🎧',
    points: 100,
    icon: Volume2,
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'daily_streak',
    name: 'Daily Streak',
    description: 'Just for logging in',
    emoji: '🔥',
    points: 200,
    icon: Flame,
    color: 'from-orange-500 to-red-500',
  },
];

// Word Match Game Component
function WordMatchGame({ onComplete, language = 'Spanish' }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft, showFeedback]);

  const loadQuestions = async () => {
    // The bundled bank keeps the game playable with no backend attached.
    // Supabase overrides it whenever the table actually has content.
    let loaded = getQuestions(language, 10);

    try {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('language', language)
        .eq('question_type', 'translation')
        .limit(10);

      if (data?.length) loaded = data;
    } catch (error) {
      console.error('Using the local question bank:', error);
    }

    setQuestions(loaded);
    setLoading(false);
  };

  const handleAnswer = (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(30);
    } else {
      onComplete(score, questions.length);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4 dark:text-gray-400">No questions available for {language}.</p>
        <Button onClick={() => onComplete(0, 0)}>Back to Games</Button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const options = [
    question.correct_answer,
    question.wrong_answer_1,
    question.wrong_answer_2,
    question.wrong_answer_3,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          Question {currentQuestion + 1} / {questions.length}
        </div>
        <div className="flex items-center gap-2 text-orange-600 font-bold">
          <Clock className="w-5 h-5" />
          {timeLeft}s
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-center shadow-xl"
      >
        <div className="text-4xl font-bold text-white mb-2">
          {question.question_text}
        </div>
        <div className="text-white/80">Translate to English</div>
      </motion.div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, index) => {
          const isCorrect = option === question.correct_answer;
          const isSelected = option === selectedAnswer;
          const showResult = showFeedback && (isSelected || isCorrect);

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`p-4 rounded-2xl border-3 font-semibold text-lg transition-all ${
                showResult
                  ? isCorrect
                    ? 'bg-green-500 text-white border-green-600'
                    : isSelected
                    ? 'bg-red-500 text-white border-red-600'
                    : 'bg-white border-gray-200'
                  : 'bg-white border-gray-200 hover:border-yellow-400 hover:scale-105'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      {/* Score */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Score: {score} / {currentQuestion + (showFeedback ? 1 : 0)}
      </div>
    </div>
  );
}

// Speed Quiz Game Component
function SpeedQuizGame({ onComplete, language = 'Spanish' }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft, showFeedback]);

  const loadQuestions = async () => {
    // The bundled bank keeps the game playable with no backend attached.
    // Supabase overrides it whenever the table actually has content.
    let loaded = getQuestions(language, 20);

    try {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('language', language)
        .limit(20);

      if (data?.length) loaded = data;
    } catch (error) {
      console.error('Using the local question bank:', error);
    }

    setQuestions(loaded);
    setLoading(false);
  };

  const handleAnswer = (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === questions[currentQuestion].correct_answer) {
      const bonusPoints = Math.floor(timeLeft / 3);
      setScore(score + 1 + bonusPoints);
    }

    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(15);
    } else {
      onComplete(score, questions.length);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading quiz...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4 dark:text-gray-400">No quiz questions available.</p>
        <Button onClick={() => onComplete(0, 0)}>Back to Games</Button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const options = [
    question.correct_answer,
    question.wrong_answer_1,
    question.wrong_answer_2,
    question.wrong_answer_3,
  ].sort(() => Math.random() - 0.5);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Timer */}
      <div className="text-center">
        <motion.div
          key={timeLeft}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-6xl font-bold ${
            timeLeft <= 5 ? 'text-red-500' : 'text-purple-600'
          }`}
        >
          {timeLeft}
        </motion.div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-lg dark:bg-gray-800">
        <div className="text-2xl font-bold text-gray-800 text-center mb-6 dark:text-gray-100">
          {question.question_text}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {options.map((option, index) => {
            const isCorrect = option === question.correct_answer;
            const isSelected = option === selectedAnswer;
            const showResult = showFeedback && (isSelected || isCorrect);

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={`p-4 rounded-xl font-semibold transition-all ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100'
                    : 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Score */}
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-600">{score} points</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Bonus for speed!</div>
      </div>
    </div>
  );
}

// Listening Challenge (Placeholder - would need audio)
function ListeningChallengeGame({ onComplete }) {
  return (
    <div className="text-center py-12 space-y-6">
      <div className="text-6xl mb-4">🎧</div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Listening Challenge</h3>
      <p className="text-gray-600 max-w-md mx-auto dark:text-gray-400">
        This game requires audio files to be set up. For now, let's earn some points!
      </p>
      <Button onClick={() => onComplete(10, 10)}>
        Claim 100 Points
      </Button>
    </div>
  );
}

// Main Games Page
export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [gameResults, setGameResults] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const { user } = useAuth();

  const earnPoints = usePlayerStore((state) => state.earnPoints);
  const awardBadge = usePlayerStore((state) => state.awardBadge);
  const completeQuest = usePlayerStore((state) => state.completeQuest);
  const points = usePlayerStore((state) => state.points);
  const streak = usePlayerStore((state) => state.streak);
  const playerLanguages = usePlayerStore((state) => state.languages);

  useEffect(() => {
    loadLeaderboard();
    checkDailyStreak();
  }, []);

  const loadLeaderboard = async () => {
    // Rank the seed students against the live player so the board is
    // populated and the player's own position is real, backend or not.
    const localBoard = [...studentsData]
      .map((student) => ({ name: student.name, points: student.points, avatar: student.photo }))
      .concat({ name: 'You', points, avatar: null })
      .sort((a, b) => b.points - a.points);

    setLeaderboard(localBoard.slice(0, 10));
    setUserRank(localBoard.findIndex((entry) => entry.name === 'You') + 1);

    if (!user?.id) return;

    try {
      const { data } = await supabase
        .from('profiles')
        .select('name, points, level, avatar')
        .order('points', { ascending: false })
        .limit(10);

      if (data?.length) setLeaderboard(data);
    } catch (error) {
      console.error('Using the local leaderboard:', error);
    }
  };

  const checkDailyStreak = async () => {
    if (!user) return;

    try {
      // Check if already claimed today
      const today = new Date().toISOString().split('T')[0];
      const { data: sessions } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('game_type', 'daily_streak')
        .gte('completed_at', today);

      // Auto-claim if not claimed today
      if (!sessions || sessions.length === 0) {
        // User can claim daily streak
      }
    } catch (error) {
      console.error('Error checking streak:', error);
    }
  };

  const handleGameComplete = async (score, totalQuestions) => {
    const game = GAMES.find(g => g.id === selectedGame);
    const accuracy = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    const pointsEarned = Math.floor((accuracy / 100) * game.points);

    // The player store is the source of truth, so a finished run always counts
    // - and the points are spendable in the shop immediately.
    const result = earnPoints(pointsEarned, { games: 1 });
    completeQuest('play-game');

    if (accuracy === 100 && totalQuestions > 0) {
      awardBadge('perfect-score');
      completeQuest('perfect-round');
    }

    // Little "how did you find this" unlocks.
    const hour = new Date().getHours();
    if (hour < 4) awardBadge('night-owl');
    else if (hour < 7) awardBadge('early-riser');

    setGameResults({
      score,
      totalQuestions,
      pointsEarned: result.pointsGained,
      accuracy,
      leveledUp: result.leveledUp,
      level: result.level,
      badgesUnlocked: result.badgesUnlocked,
    });
    setShowResults(true);

    // Mirror to Supabase when a real session exists - best effort only.
    if (user?.id) {
      try {
        await supabase.from('game_sessions').insert({
          user_id: user.id,
          game_type: selectedGame,
          score,
          points_earned: pointsEarned,
          accuracy,
        });
      } catch (error) {
        console.error('Could not sync the game session:', error);
      }
    }
  };

  const handleClaimDailyStreak = async () => {
    try {
      const result = earnPoints(200);

      setGameResults({
        score: 1,
        totalQuestions: 1,
        pointsEarned: result.pointsGained,
        accuracy: 100,
        leveledUp: result.leveledUp,
        level: result.level,
        badgesUnlocked: result.badgesUnlocked,
      });
      setShowResults(true);

      if (user?.id) {
        await supabase.from('game_sessions').insert({
          user_id: user.id,
          game_type: 'daily_streak',
          score: 1,
          points_earned: 200,
        });
      }
    } catch (error) {
      console.error('Error claiming daily streak:', error);
    }
  };

  const handlePlayAgain = () => {
    setSelectedGame(null);
    setShowResults(false);
    setGameResults(null);
    loadLeaderboard();
  };

  if (showResults && gameResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card>
            <CardBody className="text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-8xl mb-6"
              >
                {gameResults.accuracy >= 80 ? '🎉' : gameResults.accuracy >= 60 ? '😊' : '💪'}
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-100">
                {gameResults.accuracy >= 80 ? 'Amazing!' : gameResults.accuracy >= 60 ? 'Great Job!' : 'Keep Practicing!'}
              </h2>

              <div className="space-y-4 my-8">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl dark:bg-yellow-900/30">
                  <span className="text-gray-600 dark:text-gray-400">Score</span>
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {gameResults.score} / {gameResults.totalQuestions}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl dark:bg-green-900/30">
                  <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                  <span className="text-2xl font-bold text-green-600">
                    {gameResults.accuracy.toFixed(0)}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl dark:bg-orange-900/30">
                  <span className="text-gray-600 dark:text-gray-400">Points Earned</span>
                  <span className="text-3xl font-bold text-orange-600 flex items-center gap-2">
                    <Star className="w-6 h-6 fill-current" />
                    +{gameResults.pointsEarned}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handlePlayAgain} variant="secondary" className="flex-1">
                  Back to Games
                </Button>
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setGameResults(null);
                  }}
                  className="flex-1"
                >
                  Play Again
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 dark:text-gray-400"
          >
            ← Back to Games
          </button>

          <Card>
            <CardBody className="p-6">
              {selectedGame === 'word_match' && (
                <WordMatchGame
                  onComplete={handleGameComplete}
                  language={playerLanguages[0] || 'es'}
                />
              )}
              {selectedGame === 'speed_quiz' && (
                <SpeedQuizGame
                  onComplete={handleGameComplete}
                  language={playerLanguages[0] || 'es'}
                />
              )}
              {selectedGame === 'listening_challenge' && (
                <ListeningChallengeGame onComplete={handleGameComplete} />
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 dark:text-gray-100">🎮 Mini Games</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Play games, earn points, climb the leaderboard!</p>
        </div>

        {/* User Stats */}
        {
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card>
              <CardBody className="text-center p-4">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-yellow-600">{points}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-4">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-orange-600">{streak}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-4">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-purple-600">#{userRank || '?'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rank</div>
              </CardBody>
            </Card>
          </div>
        }

        {/* Game Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {GAMES.map((game) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${game.color}`} />
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl`}>
                        {game.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1 dark:text-gray-100">{game.name}</h3>
                        <p className="text-gray-600 mb-3 dark:text-gray-400">{game.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-yellow-600 font-bold">
                            <Star className="w-5 h-5 fill-current" />
                            {game.points} points
                          </div>
                          {game.id === 'daily_streak' ? (
                            <Button onClick={handleClaimDailyStreak} size="sm">
                              Claim
                            </Button>
                          ) : (
                            <Button onClick={() => setSelectedGame(game.id)} size="sm">
                              Play
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Leaderboard */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 dark:text-gray-100">
              <Trophy className="w-6 h-6 text-yellow-600" />
              Top Players
            </h2>

            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    index < 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30'
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-orange-600' : 'text-gray-400'
                  }`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-gray-100">{player.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Level {player.level}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-600 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {player.points}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
