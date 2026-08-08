import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

/**
 * My Bookings shell (DP1 destination for BottomNav).
 * Full booking UI lands in DP4 / Phase C ? honest empty until then.
 */
export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2 text-center">
          Your tables
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-8 text-center">
          Upcoming and past experiences will show up here.
        </p>
        <EmptyState
          pose="think"
          title="Booking opens soon"
          description="We're wiring secure checkout next. Until then, explore tables and save your favorites ? your passport is waiting for its first stamp."
          action={{
            label: 'Find an experience',
            href: '/explore',
          }}
        />
        <div className="mt-6 flex justify-center">
          <Link to="/favorites">
            <Button variant="outline">View favorites</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
