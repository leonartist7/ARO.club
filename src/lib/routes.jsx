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
const StudentDashboard = lazy(() => import('../pages/StudentDashboard'));
const CharacterBuilder = lazy(() => import('../pages/CharacterBuilder'));
const MapViewPage = lazy(() => import('../pages/MapViewPage'));
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const RecentlyViewedPage = lazy(() => import('../pages/RecentlyViewedPage'));
const ComparePage = lazy(() => import('../pages/ComparePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const HowItWorksPage = lazy(() => import('../pages/HowItWorksPage'));
const ForTeachersPage = lazy(() => import('../pages/ForTeachersPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Auth Pages
const ChooseRolePage = lazy(() => import('../pages/ChooseRolePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const AuthCallbackPage = lazy(() => import('../pages/AuthCallbackPage'));
const StudentOnboarding = lazy(() => import('../pages/StudentOnboarding'));
const TeacherOnboarding = lazy(() => import('../pages/TeacherOnboarding'));
const GamesPage = lazy(() => import('../pages/GamesPage'));
const ShopPage = lazy(() => import('../pages/ShopPage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));

// Teacher application + Admin (Trust & Quality Engine)
const TeacherApplicationStatus = lazy(() => import('../pages/teacher/TeacherApplicationStatus'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const ApplicationReview = lazy(() => import('../pages/admin/ApplicationReview'));

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
        path: 'teacher/dashboard',
        element: (
          <ProtectedRoute>
            <TeacherDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student-dashboard',
        element: (
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'character-builder',
        element: (
          <ProtectedRoute>
            <CharacterBuilder />
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
        path: 'games',
        element: (
          <ProtectedRoute>
            <GamesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'shop',
        element: (
          <ProtectedRoute>
            <ShopPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'chat',
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'recently-viewed',
        element: <RecentlyViewedPage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
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
        element: <ChooseRolePage />,
      },
      {
        path: 'choose-role',
        element: <ChooseRolePage />,
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
        path: 'onboarding/student',
        element: (
          <ProtectedRoute>
            <StudentOnboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: 'onboarding/teacher',
        element: (
          <ProtectedRoute>
            <TeacherOnboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: 'teacher/application',
        element: (
          <ProtectedRoute>
            <TeacherApplicationStatus />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute requireRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/applications/:id',
        element: (
          <ProtectedRoute requireRole="admin">
            <ApplicationReview />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
