import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ExperienceCard from '../components/features/ExperienceCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import AdvancedFiltersPanel from '../components/AdvancedFiltersPanel';
import SaveSearchButton from '../components/SaveSearchButton';
import SavedSearchesList from '../components/SavedSearchesList';
import experiencesData from '../data/experiences';
import { usePlayerStore } from '../store/usePlayerStore';
import { LANGUAGES, CITIES, SKILL_LEVELS } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Explore Page with filters, search, and sort
 */
export default function ExplorePage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const createdExperiences = usePlayerStore((state) => state.createdExperiences);
  const publishedByPlayer = useMemo(
    () => createdExperiences.filter((experience) => experience.status !== 'draft'),
    [createdExperiences]
  );

  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState({
    weekend: false,
    accessible: false,
    petFriendly: false,
    foodIncluded: false,
    indoorOutdoor: 'all',
    groupSize: 'all',
    timeOfDay: [],
    experienceTypes: [],
  });

  // Filter and sort experiences
  const filteredExperiences = useMemo(() => {
    // Experiences the signed-in teacher published show up alongside the seed
    // catalogue, so creating a listing has a visible effect on the marketplace.
    let results = [
      ...experiencesData,
      ...publishedByPlayer,
    ];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (exp) =>
          exp.title?.toLowerCase().includes(query) ||
          exp.description?.toLowerCase().includes(query) ||
          exp.location?.venue?.toLowerCase().includes(query)
      );
    }

    // Language filter
    if (selectedLanguage) {
      results = results.filter((exp) => exp.language === selectedLanguage);
    }

    // City filter
    if (selectedCity) {
      results = results.filter((exp) => exp.cityId === selectedCity);
    }

    // Skill level filter
    if (selectedSkillLevel) {
      results = results.filter((exp) => exp.skillLevel === selectedSkillLevel || exp.skillLevel === 'all');
    }

    // Price range filter
    results = results.filter(
      (exp) => exp.price >= priceRange[0] && exp.price <= priceRange[1]
    );

    // Advanced filters
    if (advancedFilters.weekend) {
      results = results.filter((exp) => {
        const date = new Date(exp.date);
        const day = date.getDay();
        return day === 0 || day === 6; // Sunday or Saturday
      });
    }

    if (advancedFilters.accessible) {
      results = results.filter((exp) => exp.accessible === true);
    }

    if (advancedFilters.petFriendly) {
      results = results.filter((exp) => exp.petFriendly === true);
    }

    if (advancedFilters.foodIncluded) {
      results = results.filter((exp) => exp.foodIncluded === true);
    }

    if (advancedFilters.indoorOutdoor !== 'all') {
      results = results.filter(
        (exp) =>
          exp.indoorOutdoor === advancedFilters.indoorOutdoor ||
          exp.indoorOutdoor === 'both'
      );
    }

    if (advancedFilters.groupSize !== 'all') {
      results = results.filter((exp) => {
        const size = exp.maxCapacity;
        switch (advancedFilters.groupSize) {
          case '1-3':
            return size <= 3;
          case '4-6':
            return size >= 4 && size <= 6;
          case '7-10':
            return size >= 7 && size <= 10;
          case '10+':
            return size > 10;
          default:
            return true;
        }
      });
    }

    if (advancedFilters.timeOfDay?.length > 0) {
      results = results.filter((exp) =>
        advancedFilters.timeOfDay.includes(exp.timeOfDay)
      );
    }

    if (advancedFilters.experienceTypes?.length > 0) {
      results = results.filter((exp) =>
        advancedFilters.experienceTypes.includes(exp.type)
      );
    }

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
          return b.bookedSpots - a.bookedSpots;
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedLanguage, selectedCity, selectedSkillLevel, priceRange, sortBy, advancedFilters, publishedByPlayer]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('');
    setSelectedCity('');
    setSelectedSkillLevel('');
    setPriceRange([0, 100]);
  };

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      weekend: false,
      accessible: false,
      petFriendly: false,
      foodIncluded: false,
      indoorOutdoor: 'all',
      groupSize: 'all',
      timeOfDay: [],
      experienceTypes: [],
    });
  };

  const handleAdvancedFilterChange = (key, value) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applySearch = (filters) => {
    if (filters.language) setSelectedLanguage(filters.language);
    if (filters.city) setSelectedCity(filters.city);
    if (filters.skillLevel) setSelectedSkillLevel(filters.skillLevel);
    if (filters.searchTerm) setSearchQuery(filters.searchTerm);
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      setPriceRange([filters.priceMin || 0, filters.priceMax || 100]);
    }
  };

  const getCurrentFilters = () => ({
    language: selectedLanguage,
    city: selectedCity,
    skillLevel: selectedSkillLevel,
    searchTerm: searchQuery,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    ...advancedFilters,
  });

  const activeFiltersCount = [
    selectedLanguage,
    selectedCity,
    selectedSkillLevel,
    searchQuery
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0 ||
    advancedFilters.weekend ||
    advancedFilters.accessible ||
    advancedFilters.petFriendly ||
    advancedFilters.foodIncluded ||
    advancedFilters.indoorOutdoor !== 'all' ||
    advancedFilters.groupSize !== 'all' ||
    advancedFilters.timeOfDay?.length > 0 ||
    advancedFilters.experienceTypes?.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            {t('explore.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('home.hero.subtitle')}
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              leftIcon={<Search className="w-4 h-4" />}
              placeholder={t('explore.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'date', label: t('explore.sortByDate') },
              { value: 'price-low', label: t('explore.sortByPriceLow') },
              { value: 'price-high', label: t('explore.sortByPriceHigh') },
              { value: 'popularity', label: t('explore.sortByPopularity') },
            ]}
            className="w-full sm:w-48"
          />
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            icon={<SlidersHorizontal className="w-4 h-4" />}
            className="sm:hidden"
          >
            {t('explore.filters')} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>

        {/* Saved Searches and Save Button */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <SavedSearchesList onApplySearch={applySearch} />
          <SaveSearchButton
            filters={getCurrentFilters()}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t('explore.filters')}
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    {t('explore.reset')}
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('explore.language')}
                  </label>
                  <Select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    options={[
                      { value: '', label: t('explore.allLanguages') },
                      ...LANGUAGES.map((lang) => ({
                        value: lang.code,
                        label: `${lang.flag} ${lang.name}`,
                      })),
                    ]}
                  />
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('explore.city')}
                  </label>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    options={[
                      { value: '', label: t('explore.allCities') },
                      ...CITIES.map((city) => ({
                        value: city.id,
                        label: `${city.flag} ${city.name}`,
                      })),
                    ]}
                  />
                </div>

                {/* Skill Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('explore.skillLevel')}
                  </label>
                  <Select
                    value={selectedSkillLevel}
                    onChange={(e) => setSelectedSkillLevel(e.target.value)}
                    options={[
                      { value: '', label: t('explore.allLevels') },
                      ...SKILL_LEVELS.map((level) => ({
                        value: level.value,
                        label: level.label,
                      })),
                    ]}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('explore.priceRange')}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      $0 - ${priceRange[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <AdvancedFiltersPanel
              advancedFilters={advancedFilters}
              onFilterChange={handleAdvancedFilterChange}
              onResetAdvanced={resetAdvancedFilters}
            />
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('explore.activeFilters')}</span>
                {selectedLanguage && (
                  <Badge variant="primary">
                    {LANGUAGES.find((l) => l.code === selectedLanguage)?.name}
                    <button
                      onClick={() => setSelectedLanguage('')}
                      className="ml-1 hover:text-primary-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCity && (
                  <Badge variant="primary">
                    {CITIES.find((c) => c.id === selectedCity)?.name}
                    <button
                      onClick={() => setSelectedCity('')}
                      className="ml-1 hover:text-primary-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedSkillLevel && (
                  <Badge variant="primary">
                    {SKILL_LEVELS.find((l) => l.value === selectedSkillLevel)?.label}
                    <button
                      onClick={() => setSelectedSkillLevel('')}
                      className="ml-1 hover:text-primary-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              {t('explore.showing')} {filteredExperiences.length} {filteredExperiences.length === 1 ? t('explore.experience') : t('explore.experiences')}
            </div>

            {/* Experience Grid */}
            {filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('explore.noResults')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('explore.noResultsDescription')}
                </p>
                <Button variant="primary" onClick={resetFilters}>
                  {t('explore.clearFilters')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
