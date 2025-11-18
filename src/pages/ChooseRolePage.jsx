import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
} from 'lucide-react';
import { useStore } from '../store/useStore';

const ChooseRolePage = () => {
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
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
        opacity: hoveredSide === side ? 0.3 : 0.15,
        y: [y, y - 20, y],
        x: [x, x + 10, x],
      }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: duration, repeat: Infinity, delay: delay },
        x: { duration: duration * 1.5, repeat: Infinity, delay: delay },
      }}
      className="absolute"
      style={{ top: `${y}%`, left: `${x}%` }}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Student Side */}
      <motion.div
        className="absolute inset-y-0 left-0 overflow-hidden"
        initial={{ width: '50%' }}
        animate={{
          width: hoveredSide === 'student' ? '55%' : hoveredSide === 'teacher' ? '45%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        onMouseEnter={() => setHoveredSide('student')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600"
          animate={{
            opacity: hoveredSide === 'student' ? 1 : 0.9,
            scale: hoveredSide === 'student' ? 1.05 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Animated overlay pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: hoveredSide === 'student' ? ['0px 0px', '40px 40px'] : '0px 0px',
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating decorative icons */}
        <div className="relative h-full text-white">
          <FloatingIcon Icon={BookOpen} delay={0} duration={4} x={15} y={20} side="student" />
          <FloatingIcon Icon={Users} delay={0.5} duration={5} x={75} y={15} side="student" />
          <FloatingIcon Icon={Globe} delay={1} duration={4.5} x={25} y={70} side="student" />
          <FloatingIcon Icon={Heart} delay={1.5} duration={5.5} x={70} y={75} side="student" />
          <FloatingIcon Icon={Star} delay={2} duration={4} x={45} y={45} side="student" />
          <FloatingIcon Icon={Sparkles} delay={0.8} duration={5.2} x={85} y={50} side="student" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-white">
          <motion.div
            className="text-center"
            animate={{
              y: hoveredSide === 'student' ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon */}
            <motion.div
              className="mb-6"
              animate={{
                scale: hoveredSide === 'student' ? 1.1 : 1,
                rotate: hoveredSide === 'student' ? [0, -5, 5, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.4 },
                rotate: { duration: 0.6, repeat: hoveredSide === 'student' ? Infinity : 0 },
              }}
            >
              <div className="inline-block p-6 bg-white/20 backdrop-blur-sm rounded-3xl">
                <GraduationCap className="w-20 h-20" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-4 text-5xl font-bold font-heading"
              animate={{
                scale: hoveredSide === 'student' ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              I'm a Student
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mb-8 text-xl text-white/90 max-w-md"
              animate={{
                opacity: hoveredSide === 'student' ? 1 : 0.8,
              }}
              transition={{ duration: 0.4 }}
            >
              Discover amazing language experiences, connect with local teachers, and learn
              through cultural immersion
            </motion.p>

            {/* Button */}
            <motion.button
              onClick={() => handleRoleSelect('student')}
              className="relative px-12 py-5 text-lg font-semibold text-teal-600 bg-white rounded-2xl hover:bg-gray-50 transition-colors group overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Learning
                <motion.span
                  animate={{ x: hoveredSide === 'student' ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredSide === 'student' ? '100%' : '-100%' }}
                transition={{ duration: 0.8, repeat: hoveredSide === 'student' ? Infinity : 0 }}
              />
            </motion.button>

            {/* Features list */}
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: hoveredSide === 'student' ? 1 : 0,
                y: hoveredSide === 'student' ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {['Browse Experiences', 'Book Sessions', 'Track Progress', 'Earn Badges'].map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: hoveredSide === 'student' ? 1 : 0,
                      x: hoveredSide === 'student' ? 0 : -20,
                    }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Teacher Side */}
      <motion.div
        className="absolute inset-y-0 right-0 overflow-hidden"
        initial={{ width: '50%' }}
        animate={{
          width: hoveredSide === 'teacher' ? '55%' : hoveredSide === 'student' ? '45%' : '50%',
        }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        onMouseEnter={() => setHoveredSide('teacher')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-red-500"
          animate={{
            opacity: hoveredSide === 'teacher' ? 1 : 0.9,
            scale: hoveredSide === 'teacher' ? 1.05 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Animated overlay pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: hoveredSide === 'teacher' ? ['0px 0px', '40px 40px'] : '0px 0px',
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating decorative icons */}
        <div className="relative h-full text-white">
          <FloatingIcon Icon={Target} delay={0} duration={4.2} x={20} y={25} side="teacher" />
          <FloatingIcon Icon={Award} delay={0.6} duration={5.3} x={75} y={20} side="teacher" />
          <FloatingIcon Icon={MessageCircle} delay={1.2} duration={4.8} x={30} y={65} side="teacher" />
          <FloatingIcon Icon={TrendingUp} delay={1.8} duration={5} x={65} y={70} side="teacher" />
          <FloatingIcon Icon={Sparkles} delay={2.2} duration={4.5} x={50} y={40} side="teacher" />
          <FloatingIcon Icon={Star} delay={1} duration={5.5} x={80} y={55} side="teacher" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-white">
          <motion.div
            className="text-center"
            animate={{
              y: hoveredSide === 'teacher' ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon */}
            <motion.div
              className="mb-6"
              animate={{
                scale: hoveredSide === 'teacher' ? 1.1 : 1,
                rotate: hoveredSide === 'teacher' ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.4 },
                rotate: { duration: 0.6, repeat: hoveredSide === 'teacher' ? Infinity : 0 },
              }}
            >
              <div className="inline-block p-6 bg-white/20 backdrop-blur-sm rounded-3xl">
                <Users className="w-20 h-20" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-4 text-5xl font-bold font-heading"
              animate={{
                scale: hoveredSide === 'teacher' ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              I'm a Teacher
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mb-8 text-xl text-white/90 max-w-md"
              animate={{
                opacity: hoveredSide === 'teacher' ? 1 : 0.8,
              }}
              transition={{ duration: 0.4 }}
            >
              Share your language expertise, create unique cultural experiences, and grow your
              teaching business
            </motion.p>

            {/* Button */}
            <motion.button
              onClick={() => handleRoleSelect('teacher')}
              className="relative px-12 py-5 text-lg font-semibold text-orange-600 bg-white rounded-2xl hover:bg-gray-50 transition-colors group overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Teaching
                <motion.span
                  animate={{ x: hoveredSide === 'teacher' ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredSide === 'teacher' ? '100%' : '-100%' }}
                transition={{ duration: 0.8, repeat: hoveredSide === 'teacher' ? Infinity : 0 }}
              />
            </motion.button>

            {/* Features list */}
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: hoveredSide === 'teacher' ? 1 : 0,
                y: hoveredSide === 'teacher' ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {['Create Experiences', 'Manage Bookings', 'Track Revenue', 'Build Community'].map(
                (feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: hoveredSide === 'teacher' ? 1 : 0,
                      x: hoveredSide === 'teacher' ? 0 : -20,
                    }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Central divider line with glow effect */}
      <motion.div
        className="absolute inset-y-0 left-1/2 w-1 -ml-0.5 pointer-events-none"
        animate={{
          opacity: hoveredSide ? 0.3 : 0.6,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute inset-0 bg-white blur-sm" />
      </motion.div>

      {/* Conversa logo at top */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-white font-heading drop-shadow-lg">Conversa</h1>
        <p className="text-center text-white/80 text-sm mt-1">Choose your journey</p>
      </motion.div>

      {/* Skip/Sign out option */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button
          onClick={() => navigate('/')}
          className="text-white/60 hover:text-white text-sm transition-colors underline"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default ChooseRolePage;
