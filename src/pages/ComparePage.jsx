import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar, Check, X } from 'lucide-react';
import { useCompare } from '../hooks/useCompare';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import EmptyState from '../components/ui/EmptyState';
import experiencesData from '../data/experiences';
import teachersData from '../data/teachers.json';
import { LANGUAGES, CITIES } from '../data/constants';
import { formatPrice, getSpotsLeft } from '../utils/helpers';
import { formatDate, formatTime } from '../utils/date';

/**
 * Compare Page Component
 * Side-by-side comparison of experiences
 */
export default function ComparePage() {
  const { compareList, removeFromCompare } = useCompare();

  // Get experience details
  const experiences = compareList
    .map((id) => experiencesData.find((exp) => exp.id === id))
    .filter(Boolean);

  // If no experiences to compare
  if (experiences.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            title="No Experiences to Compare"
            description="Add experiences to your comparison list to see them side by side."
            actionLabel="Browse Experiences"
            actionLink="/explore"
          />
        </div>
      </div>
    );
  }

  // Get teacher and location info for each experience
  const experienceDetails = experiences.map((exp) => ({
    ...exp,
    teacher: teachersData.find((t) => t.id === exp.teacherId),
    city: CITIES.find((c) => c.id === exp.cityId),
    language: LANGUAGES.find((l) => l.code === exp.language),
    spotsLeft: getSpotsLeft(exp.maxCapacity, exp.bookedSpots),
  }));

  // Comparison rows
  const comparisonRows = [
    {
      label: 'Experience',
      render: (exp) => (
        <div className="space-y-3">
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {exp.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {exp.description}
          </p>
        </div>
      ),
    },
    {
      label: 'Teacher',
      render: (exp) => (
        <Link
          to={`/teacher/${exp.teacher?.id}`}
          className="flex items-center gap-3 group"
        >
          <Avatar
            src={exp.teacher?.photo}
            alt={exp.teacher?.name}
            name={exp.teacher?.name}
            size="md"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
              {exp.teacher?.name}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
              <span>{exp.teacher?.rating}</span>
              <span>({exp.teacher?.totalReviews})</span>
            </div>
          </div>
        </Link>
      ),
    },
    {
      label: 'Language',
      render: (exp) => (
        <div className="flex items-center gap-2">
          <span className="text-2xl">{exp.language?.flag}</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {exp.language?.name}
          </span>
        </div>
      ),
    },
    {
      label: 'Price',
      render: (exp) => (
        <div>
          <div className="text-2xl font-bold text-primary-500">
            {formatPrice(exp.price)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">per person</div>
        </div>
      ),
    },
    {
      label: 'Date & Time',
      render: (exp) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
            <Calendar className="w-4 h-4 text-primary-500" />
            {formatDate(exp.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            {formatTime(exp.date)}
          </div>
        </div>
      ),
    },
    {
      label: 'Duration',
      render: (exp) => (
        <span className="text-gray-900 dark:text-white font-medium">
          {exp.duration} minutes
        </span>
      ),
    },
    {
      label: 'Location',
      render: (exp) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
            <MapPin className="w-4 h-4 text-primary-500" />
            <span className="font-medium">{exp.city?.name}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {exp.location.venue}
          </p>
        </div>
      ),
    },
    {
      label: 'Group Size',
      render: (exp) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary-500" />
          <span className="text-gray-900 dark:text-white">
            Max {exp.maxCapacity} people
          </span>
        </div>
      ),
    },
    {
      label: 'Availability',
      render: (exp) => (
        <Badge
          variant={exp.spotsLeft > 2 ? 'success' : exp.spotsLeft > 0 ? 'warning' : 'default'}
        >
          {exp.spotsLeft > 0 ? `${exp.spotsLeft} spots left` : 'Sold Out'}
        </Badge>
      ),
    },
    {
      label: 'Skill Level',
      render: (exp) => (
        <Badge variant="info">{exp.skillLevel}</Badge>
      ),
    },
    {
      label: 'Features',
      render: (exp) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            {exp.accessible ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-gray-300" />
            )}
            <span className="text-gray-700 dark:text-gray-300">Wheelchair Accessible</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {exp.petFriendly ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-gray-300" />
            )}
            <span className="text-gray-700 dark:text-gray-300">Pet Friendly</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {exp.foodIncluded ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-gray-300" />
            )}
            <span className="text-gray-700 dark:text-gray-300">Food Included</span>
          </div>
        </div>
      ),
    },
    {
      label: 'Actions',
      render: (exp) => (
        <div className="space-y-2">
          <Link to={`/experience/${exp.id}`} className="block">
            <Button variant="primary" size="md" className="w-full">
              View Details
            </Button>
          </Link>
          <Button
            variant="outline"
            size="md"
            className="w-full"
            onClick={() => removeFromCompare(exp.id)}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/explore" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
            Compare Experiences
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Compare up to {experiences.length} experiences side by side
          </p>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-6">
          {experienceDetails.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
              {comparisonRows.map((row) => (
                <div key={row.label} className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    {row.label}
                  </h4>
                  {row.render(exp)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white w-48">
                  Feature
                </th>
                {experienceDetails.map((exp) => (
                  <th key={exp.id} className="px-6 py-4 text-left">
                    <Badge variant="primary">{exp.language?.flag} {exp.language?.name}</Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}
                >
                  <td className="px-6 py-6 text-sm font-semibold text-gray-700 dark:text-gray-300 align-top">
                    {row.label}
                  </td>
                  {experienceDetails.map((exp) => (
                    <td key={exp.id} className="px-6 py-6 align-top">
                      {row.render(exp)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
