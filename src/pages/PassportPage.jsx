import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, MapPin, Lock, Sparkles, Plane } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { usePlayerStore } from '../store/usePlayerStore';
import { CITIES, LANGUAGES } from '../data/constants';
import experiencesData from '../data/experiences';
import { getBadge } from '../data/gamification';
import { formatDate } from '../utils/date';

/**
 * The passport.
 *
 * Every city you learn in earns a stamp. The point is to make "international
 * and immersive" something you can see rather than a tagline: the cities you
 * have been to fill in, the ones you haven't sit faint and pull you onward.
 * It reads from the bookings the player already has, and gives the
 * globe-trotter badge somewhere to live.
 */
export default function PassportPage() {
  const player = usePlayerStore((state) => state.user);
  const bookings = usePlayerStore((state) => state.bookings);
  const badges = usePlayerStore((state) => state.badges);

  /** The first booking in each city is the one that stamped it. */
  const stampsByCity = bookings.reduce((acc, booking) => {
    const existing = acc[booking.cityId];
    if (!existing || new Date(booking.date) < new Date(existing.date)) {
      acc[booking.cityId] = booking;
    }
    return acc;
  }, {});

  const visited = CITIES.filter((city) => stampsByCity[city.id]);
  const remaining = CITIES.filter((city) => !stampsByCity[city.id]);

  const languagesHeard = [
    ...new Set(bookings.map((booking) => booking.language).filter(Boolean)),
  ]
    .map((code) => LANGUAGES.find((language) => language.code === code))
    .filter(Boolean);

  const countries = new Set(visited.map((city) => city.country));
  const globeTrotter = getBadge('globe-trotter');
  const toGlobeTrotter = Math.max(0, 5 - visited.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-primary-50/40 to-white dark:from-gray-900 dark:to-gray-950"
    >
      {/* Cover */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-9 h-9" />
                <h1 className="text-3xl md:text-4xl font-display font-bold">Passport</h1>
              </div>
              <p className="text-white/90 max-w-lg">
                {player?.name ? `${player.name}'s` : 'Your'} record of every city
                you've learned in. One stamp per city.
              </p>
            </div>

            <div className="flex gap-6 shrink-0">
              <Stat value={visited.length} label={visited.length === 1 ? 'city' : 'cities'} />
              <Stat
                value={countries.size}
                label={countries.size === 1 ? 'country' : 'countries'}
              />
              <Stat
                value={languagesHeard.length}
                label={languagesHeard.length === 1 ? 'language' : 'languages'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
        {visited.length === 0 ? (
          <Card>
            <CardBody className="text-center py-16">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-6xl mb-4"
              >
                🛂
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No stamps yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Book your first experience and this page starts filling up. There are{' '}
                {CITIES.length} cities waiting.
              </p>
              <Link to="/explore">
                <Button variant="primary" icon={<Plane className="w-4 h-4" />}>
                  Find somewhere to start
                </Button>
              </Link>
            </CardBody>
          </Card>
        ) : (
          <>
            {/* Progress toward globe-trotter */}
            {toGlobeTrotter > 0 && (
              <Card className="mb-8">
                <CardBody className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="text-4xl shrink-0">{globeTrotter?.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {toGlobeTrotter} more{' '}
                      {toGlobeTrotter === 1 ? 'city' : 'cities'} to {globeTrotter?.name}
                    </p>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(visited.length / 5) * 100}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {badges.includes('globe-trotter') && (
              <Card className="mb-8 border-2 border-primary-400">
                <CardBody className="flex items-center gap-4">
                  <div className="text-4xl">{globeTrotter?.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {globeTrotter?.name} earned
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {globeTrotter?.description}
                    </p>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Stamps */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Stamps ({visited.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {visited.map((city, index) => {
                const stamp = stampsByCity[city.id];
                const experience = experiencesData.find(
                  (exp) => exp.id === stamp.experienceId
                );
                const timesHere = bookings.filter((b) => b.cityId === city.id).length;

                return (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.06, type: 'spring', stiffness: 160 }}
                  >
                    <Card className="h-full border-2 border-dashed border-primary-300 dark:border-primary-700">
                      <CardBody className="text-center">
                        <div className="text-5xl mb-2">{city.flag}</div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {city.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {city.country}
                        </p>

                        <div className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-3">
                          {formatDate(stamp.date, 'd MMM yyyy')}
                        </div>

                        {experience && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {experience.title}
                          </p>
                        )}

                        {timesHere > 1 && (
                          <p className="text-xs text-primary-600 dark:text-primary-400 mt-2 font-medium">
                            {timesHere} visits
                          </p>
                        )}
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* Still to visit */}
        {remaining.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Still to visit ({remaining.length})
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Book anywhere here and the stamp is yours.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {remaining.map((city) => {
                const available = experiencesData.filter(
                  (exp) => exp.cityId === city.id
                ).length;

                return (
                  <Link key={city.id} to={`/explore?city=${city.id}`} className="group">
                    <Card className="h-full border border-dashed border-gray-300 dark:border-gray-700 opacity-70 group-hover:opacity-100 transition-opacity">
                      <CardBody className="text-center p-4">
                        <div className="text-3xl mb-1 grayscale group-hover:grayscale-0 transition-all">
                          {city.flag}
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {city.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1 mt-1">
                          {available > 0 ? (
                            <>
                              <MapPin className="w-3 h-3" />
                              {available}
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3" />
                              soon
                            </>
                          )}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Languages heard */}
        {languagesHeard.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-500" />
              Languages you've practised
            </h2>
            <div className="flex flex-wrap gap-3">
              {languagesHeard.map((language) => (
                <span
                  key={language.code}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium text-gray-800 dark:text-gray-200"
                >
                  <span className="text-lg">{language.flag}</span>
                  {language.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-white/80 uppercase tracking-wide">{label}</div>
    </div>
  );
}
