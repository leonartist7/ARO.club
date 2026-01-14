import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Pages (lazy loaded for better performance)
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage'));
const ExplorePage = lazy(() => import('../pages/ExplorePage'));
const ExperienceDetailPage = lazy(() => import('../pages/ExperienceDetailPage'));
const TeacherProfilePage = lazy(() => import('../pages/TeacherProfilePage'));
const StudentProfilePage = lazy(() => import('../pages/StudentProfilePage'));
const TeacherDashboardPage = lazy(() => import('../pages/TeacherDashboardPage'));
const MapViewPage = lazy(() => import('../pages/MapViewPage'));
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage'));
const LessonsPage = lazy(() => import('../pages/LessonsPage'));
const LessonDetailPage = lazy(() => import('../pages/LessonDetailPage'));
const MyHomePage = lazy(() => import('../pages/MyHomePage'));
const DashboardPageNew = lazy(() => import('../pages/DashboardPage'));
const LearningPathsPage = lazy(() => import('../pages/LearningPathsPage'));
const StudyRoomsPage = lazy(() => import('../pages/StudyRoomsPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const HowItWorksPage = lazy(() => import('../pages/HowItWorksPage'));
const ForTeachersPage = lazy(() => import('../pages/ForTeachersPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Auth Pages
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const AuthCallbackPage = lazy(() => import('../pages/AuthCallbackPage'));

/**
 * App routes configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'experience/:id',
        element: <ExperienceDetailPage />,
      },
      {
        path: 'teacher/:id',
        element: <TeacherProfilePage />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <StudentProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <TeacherDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'map',
        element: <MapViewPage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: 'lessons',
        element: <LessonsPage />,
      },
      {
        path: 'lesson/:id',
        element: <LessonDetailPage />,
      },
      {
        path: 'my-home',
        element: <MyHomePage />,
      },
      {
        path: 'my-dashboard',
        element: <DashboardPageNew />,
      },
      {
        path: 'learning-paths',
        element: <LearningPathsPage />,
      },
      {
        path: 'study-rooms',
        element: <StudyRoomsPage />,
      },
      {
        path: 'achievements',
        element: <AchievementsPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'how-it-works',
        element: <HowItWorksPage />,
      },
      {
        path: 'for-teachers',
        element: <ForTeachersPage />,
      },
      {
        path: 'faq',
        element: <FAQPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'auth/callback',
        element: <AuthCallbackPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
