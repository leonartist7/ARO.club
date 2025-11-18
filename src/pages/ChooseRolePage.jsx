import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  GraduationCap,
  Globe,
  Award,
  Heart,
  Star,
  Sparkles,
  MessageCircle,
  Target,
  Zap,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useLanguage } from '../contexts/LanguageContext';

const ChooseRolePage = () => {
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const { t } = useLanguage();
  const [hoveredSide, setHoveredSide] = useState(null);

  const handleRoleSelect = (role) => {
    // Set mock user based on role
    const mockUser = {
      id: role === 'student' ? 'student-1' : 'teacher-1',
      name: role === 'student' ? 'Student User' : 'Teacher User',
      email: role === 'student' ? 'student@conversa.com' : 'teacher@conversa.com',
      role: role,
      isTeacher: role === 'teacher',
    };

    setCurrentUser(mockUser);

    // Navigate to appropriate page with smooth transition
    setTimeout(() => {
      if (role === 'student') {
        navigate('/explore');
      } else {
        navigate('/teacher/dashboard');
      }
    }, 300);
  };

  // Floating icon components for decoration
  const FloatingIcon = ({ Icon, delay, duration, x, y, side }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: hoveredSide === side ? 0.2 : 0.1,
        y: [y, y - 15, y],
        x: [x, x + 8, x],
      }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: duration, repeat: Infinity, delay: delay },
        x: { duration: duration * 1.5, repeat: Infinity, delay: delay },
      }}
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, left: `${x}%` }}
    >
      <Icon className="w-6 h-6 md:w-8 md:h-8" />
    </motion.div>
  );

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-gray-900">
      {/* Student Side */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden cursor-pointer"
        initial={{ width: '50%' }}
        animate={{
          width: hoveredSide === 'student' ? '60%' : hoveredSide === 'teacher' ? '40%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        onMouseEnter={() => setHoveredSide('student')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleRoleSelect('student')}
      >
        {/* Gradient Background - Vibrant Orange */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-800"
          animate={{
            opacity: hoveredSide === 'student' ? 1 : 0.95,
            scale: hoveredSide === 'student' ? 1.02 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Animated overlay pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
          animate={{
            backgroundPosition: hoveredSide === 'student' ? ['0px 0px', '32px 32px'] : '0px 0px',
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating decorative icons */}
        <div className="absolute inset-0 text-white">
          <FloatingIcon Icon={BookOpen} delay={0} duration={4} x={15} y={25} side="student" />
          <FloatingIcon Icon={Users} delay={0.5} duration={5} x={75} y={20} side="student" />
          <FloatingIcon Icon={Globe} delay={1} duration={4.5} x={20} y={70} side="student" />
          <FloatingIcon Icon={Heart} delay={1.5} duration={5.5} x={70} y={75} side="student" />
          <FloatingIcon Icon={Star} delay={2} duration={4} x={50} y={50} side="student" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8 text-white text-center max-w-md">
          <motion.div
            animate={{
              y: hoveredSide === 'student' ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon */}
            <motion.div
              className="mb-6"
              animate={{
                scale: hoveredSide === 'student' ? 1.15 : 1,
                rotate: hoveredSide === 'student' ? [0, -5, 5, -5, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.4 },
                rotate: { duration: 1.2, repeat: hoveredSide === 'student' ? Infinity : 0 },
              }}
            >
              <div className="inline-flex items-center justify-center p-5 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl">
                <GraduationCap className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-3 text-4xl md:text-5xl font-bold font-heading"
              animate={{
                scale: hoveredSide === 'student' ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              {t('roleSelection.studentTitle')}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mb-6 text-base md:text-lg text-white/90 leading-relaxed"
              animate={{
                opacity: hoveredSide === 'student' ? 1 : 0.85,
              }}
              transition={{ duration: 0.4 }}
            >
              {t('roleSelection.studentDescription')}
            </motion.p>

            {/* Button */}
            <motion.button
              className="relative px-8 py-4 text-base md:text-lg font-semibold text-secondary-700 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all group overflow-hidden"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('roleSelection.startLearning')}
                <motion.span
                  animate={{ x: hoveredSide === 'student' ? [0, 4, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredSide === 'student' ? '200%' : '-100%' }}
                transition={{ duration: 1, repeat: hoveredSide === 'student' ? Infinity : 0, repeatDelay: 0.5 }}
              />
            </motion.button>

            {/* Features - Only show on hover */}
            <motion.div
              className="mt-6 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hoveredSide === 'student' ? 1 : 0,
                height: hoveredSide === 'student' ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {hoveredSide === 'student' && [t('roleSelection.browseExperiences'), t('roleSelection.bookSessions'), t('roleSelection.earnBadges')].map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-white/90 justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{feature}</span>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Teacher Side */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden cursor-pointer"
        initial={{ width: '50%' }}
        animate={{
          width: hoveredSide === 'teacher' ? '60%' : hoveredSide === 'student' ? '40%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        onMouseEnter={() => setHoveredSide('teacher')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => handleRoleSelect('teacher')}
      >
        {/* Gradient Background - Vibrant Green */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent-400 via-accent-500 to-accent-800"
          animate={{
            opacity: hoveredSide === 'teacher' ? 1 : 0.95,
            scale: hoveredSide === 'teacher' ? 1.02 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Animated overlay pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
          animate={{
            backgroundPosition: hoveredSide === 'teacher' ? ['0px 0px', '32px 32px'] : '0px 0px',
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating decorative icons */}
        <div className="absolute inset-0 text-white">
          <FloatingIcon Icon={Target} delay={0} duration={4.2} x={20} y={28} side="teacher" />
          <FloatingIcon Icon={Award} delay={0.6} duration={5.3} x={75} y={22} side="teacher" />
          <FloatingIcon Icon={MessageCircle} delay={1.2} duration={4.8} x={25} y={68} side="teacher" />
          <FloatingIcon Icon={TrendingUp} delay={1.8} duration={5} x={70} y={72} side="teacher" />
          <FloatingIcon Icon={Sparkles} delay={2.2} duration={4.5} x={50} y={45} side="teacher" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-8 text-white text-center max-w-md">
          <motion.div
            animate={{
              y: hoveredSide === 'teacher' ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon */}
            <motion.div
              className="mb-6"
              animate={{
                scale: hoveredSide === 'teacher' ? 1.15 : 1,
                rotate: hoveredSide === 'teacher' ? [0, 5, -5, 5, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.4 },
                rotate: { duration: 1.2, repeat: hoveredSide === 'teacher' ? Infinity : 0 },
              }}
            >
              <div className="inline-flex items-center justify-center p-5 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl">
                <Users className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-3 text-4xl md:text-5xl font-bold font-heading"
              animate={{
                scale: hoveredSide === 'teacher' ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              {t('roleSelection.teacherTitle')}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mb-6 text-base md:text-lg text-white/90 leading-relaxed"
              animate={{
                opacity: hoveredSide === 'teacher' ? 1 : 0.85,
              }}
              transition={{ duration: 0.4 }}
            >
              {t('roleSelection.teacherDescription')}
            </motion.p>

            {/* Button */}
            <motion.button
              className="relative px-8 py-4 text-base md:text-lg font-semibold text-accent-700 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all group overflow-hidden"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('roleSelection.startTeaching')}
                <motion.span
                  animate={{ x: hoveredSide === 'teacher' ? [0, 4, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredSide === 'teacher' ? '200%' : '-100%' }}
                transition={{ duration: 1, repeat: hoveredSide === 'teacher' ? Infinity : 0, repeatDelay: 0.5 }}
              />
            </motion.button>

            {/* Features - Only show on hover */}
            <motion.div
              className="mt-6 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hoveredSide === 'teacher' ? 1 : 0,
                height: hoveredSide === 'teacher' ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {hoveredSide === 'teacher' && [t('roleSelection.createExperiences'), t('roleSelection.manageBookings'), t('roleSelection.buildCommunity')].map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-white/90 justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{feature}</span>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Choose your journey - below navigation bar */}
      <motion.div
        className="absolute top-20 md:top-24 inset-x-0 z-30 text-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: [1, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-heading drop-shadow-2xl px-8">
          {t('roleSelection.chooseYourJourney')}
        </h1>
      </motion.div>

      {/* Back to home link */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button
          onClick={() => navigate('/')}
          className="text-white/70 hover:text-white text-xs md:text-sm transition-colors underline underline-offset-4"
        >
          {t('nav.backToHome')}
        </button>
      </motion.div>
    </div>
  );
};

export default ChooseRolePage;
