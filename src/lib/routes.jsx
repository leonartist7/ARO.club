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
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const RecentlyViewedPage = lazy(() => import('../pages/RecentlyViewedPage'));
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
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'recently-viewed',
        element: <RecentlyViewedPage />,
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
