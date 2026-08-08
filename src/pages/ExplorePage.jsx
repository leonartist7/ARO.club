import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Map, X } from 'lucide-react';
import ExperienceCard from '../components/features/ExperienceCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import AdvancedFiltersPanel from '../components/AdvancedFiltersPanel';
import SaveSearchButton from '../components/SaveSearchButton';
import SavedSearchesList from '../components/SavedSearchesList';
import experiencesData from '../data/experiences.json';
import { usePlayerStore } from '../store/usePlayerStore';
import { LANGUAGES, CITIES, SKILL_LEVELS } from '../data/constants';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '../utils/cn';

export default function ExplorePage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [smartChips, setSmartChips] = useState({
    weekend: false,
    online: false,
    buddy: false,
    brave: false,
  });

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

  const createdExperiences = usePlayerStore((state) => state.createdExperiences);
  const publishedByPlayer = useMemo(
    () => createdExperiences.filter((experience) => experience.status !== 'draft'),
    [createdExperiences]
  );

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
          exp.location?.venue?.toLowerCase().includes(query) ||
          (CITIES.find((c) => c.id === exp.cityId)?.name || '').toLowerCase().includes(query)
      );
    }
    if (selectedLanguage) results = results.filter((exp) => exp.language === selectedLanguage);
    if (selectedCity) results = results.filter((exp) => exp.cityId === selectedCity);
    if (selectedSkillLevel) {
      results = results.filter((exp) => exp.skillLevel === selectedSkillLevel || exp.skillLevel === 'all');
    }
    results = results.filter((exp) => exp.price >= priceRange[0] && exp.price <= priceRange[1]);
    const weekendOn = advancedFilters.weekend || smartChips.weekend;
    if (weekendOn) {
      results = results.filter((exp) => {
        const day = new Date(exp.date).getDay();
        return day === 0 || day === 6;
      });
    }
    if (smartChips.online) {
      results = results.filter(
        (exp) => exp.type === 'online' || exp.tags?.includes('online') || exp.indoorOutdoor === 'online'
      );
    }
    if (smartChips.buddy) results = results.filter((exp) => exp.maxCapacity >= 2);
    if (smartChips.brave) {
      results = results.filter((exp) => exp.skillLevel === 'intermediate' || exp.skillLevel === 'advanced');
    }
    if (advancedFilters.accessible) results = results.filter((exp) => exp.accessible === true);
    if (advancedFilters.petFriendly) results = results.filter((exp) => exp.petFriendly === true);
    if (advancedFilters.foodIncluded) results = results.filter((exp) => exp.foodIncluded === true);
    if (advancedFilters.indoorOutdoor !== 'all') {
      results = results.filter(
        (exp) => exp.indoorOutdoor === advancedFilters.indoorOutdoor || exp.indoorOutdoor === 'both'
      );
    }
    if (advancedFilters.groupSize !== 'all') {
      results = results.filter((exp) => {
        const size = exp.maxCapacity;
        switch (advancedFilters.groupSize) {
          case '1-3': return size <= 3;
          case '4-6': return size >= 4 && size <= 6;
          case '7-10': return size >= 7 && size <= 10;
          case '10+': return size > 10;
          default: return true;
        }
      });
    }
    if (advancedFilters.timeOfDay?.length > 0) {
      results = results.filter((exp) => advancedFilters.timeOfDay.includes(exp.timeOfDay));
    }
    if (advancedFilters.experienceTypes?.length > 0) {
      results = results.filter((exp) => advancedFilters.experienceTypes.includes(exp.type));
    }
    results.sort((a, b) => {
      switch (sortBy) {
        case 'date': return new Date(a.date) - new Date(b.date);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'popularity': return b.bookedSpots - a.bookedSpots;
        default: return 0;
      }
    });
    return results;
  }, [searchQuery, selectedLanguage, selectedCity, selectedSkillLevel, priceRange, sortBy, advancedFilters, smartChips, publishedByPlayer]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('');
    setSelectedCity('');
    setSelectedSkillLevel('');
    setPriceRange([0, 100]);
    setSmartChips({ weekend: false, online: false, buddy: false, brave: false });
  };

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      weekend: false, accessible: false, petFriendly: false, foodIncluded: false,
      indoorOutdoor: 'all', groupSize: 'all', timeOfDay: [], experienceTypes: [],
    });
  };

  const handleAdvancedFilterChange = (key, value) => {
    setAdvancedFilters((prev) => ({ ...prev, [key]: value }));
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
    language: selectedLanguage, city: selectedCity, skillLevel: selectedSkillLevel,
    searchTerm: searchQuery, priceMin: priceRange[0], priceMax: priceRange[1], ...advancedFilters,
  });

  const activeFiltersCount = [selectedLanguage, selectedCity, selectedSkillLevel, searchQuery].filter(Boolean).length;
  const hasActiveFilters =
    activeFiltersCount > 0 || advancedFilters.weekend || advancedFilters.accessible ||
    advancedFilters.petFriendly || advancedFilters.foodIncluded || advancedFilters.indoorOutdoor !== 'all' ||
    advancedFilters.groupSize !== 'all' || advancedFilters.timeOfDay?.length > 0 ||
    advancedFilters.experienceTypes?.length > 0 || Object.values(smartChips).some(Boolean);

  const toggleChip = (key) => setSmartChips((prev) => ({ ...prev, [key]: !prev[key] }));
  const chipDefs = [
    { key: 'weekend', label: t('explore.chips.weekend') },
    { key: 'online', label: t('explore.chips.online') },
    { key: 'buddy', label: t('explore.chips.buddy') },
    { key: 'brave', label: t('explore.chips.brave') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            {t('explore.title')}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">{t('home.hero.subtitle')}</p>
        </div>

        {/* Full-width search row */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 min-w-0">
            <Input
              leftIcon={<Search className="w-5 h-5" />}
              placeholder={t('explore.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('explore.search')}
              className="text-base min-h-12"
            />
          </div>
          <Link to="/map" className="shrink-0">
            <Button variant="outline" icon={<Map className="w-4 h-4" />} className="w-full sm:w-auto min-h-12">
              {t('explore.mapView')}
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            icon={<SlidersHorizontal className="w-4 h-4" />}
            className="lg:hidden w-full sm:w-auto min-h-12"
            aria-expanded={showFilters}
            aria-controls="explore-filters"
          >
            {t('explore.filters')}
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Quick filters">
          {chipDefs.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => toggleChip(chip.key)}
              className={cn(
                'inline-flex items-center min-h-11 px-4 rounded-full text-sm font-medium border transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                smartChips[chip.key]
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-800'
              )}
              aria-pressed={smartChips[chip.key]}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <SavedSearchesList onApplySearch={applySearch} />
          <SaveSearchButton filters={getCurrentFilters()} hasActiveFilters={hasActiveFilters} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters column: sort on top, then filters */}
          <aside id="explore-filters" className={cn('lg:w-72 space-y-4', showFilters ? 'block' : 'hidden lg:block')}>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 sticky top-24 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {t('explore.sortBy')}
                </label>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={[
                    { value: 'date', label: t('explore.sortByDate') },
                    { value: 'price-low', label: t('explore.sortByPriceLow') },
                    { value: 'price-high', label: t('explore.sortByPriceHigh') },
                    { value: 'popularity', label: t('explore.sortByPopularity') },
                  ]}
                  aria-label={t('explore.sortBy')}
                />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Filter className="w-5 h-5" aria-hidden="true" />
                    {t('explore.filters')}
                  </h2>
                  {activeFiltersCount > 0 && (
                    <button type="button" onClick={resetFilters} className="text-sm text-primary-700 dark:text-primary-300 hover:underline min-h-11 px-2">
                      {t('explore.reset')}
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t('explore.language')}</label>
                    <Select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      options={[
                        { value: '', label: t('explore.allLanguages') },
                        ...LANGUAGES.map((lang) => ({ value: lang.code, label: `${lang.flag} ${lang.name}` })),
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t('explore.city')}</label>
                    <Select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      options={[
                        { value: '', label: t('explore.allCities') },
                        ...CITIES.map((city) => ({ value: city.id, label: `${city.flag} ${city.name}` })),
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t('explore.skillLevel')}</label>
                    <Select
                      value={selectedSkillLevel}
                      onChange={(e) => setSelectedSkillLevel(e.target.value)}
                      options={[
                        { value: '', label: t('explore.allLevels') },
                        ...SKILL_LEVELS.map((level) => ({ value: level.value, label: level.label })),
                      ]}
                    />
                  </div>
                  <div>
                    <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      {t('explore.priceRange')}
                    </label>
                    <input
                      id="price-range"
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
                      className="w-full accent-primary-600 min-h-11"
                    />
                    <div className="text-sm text-gray-500 dark:text-gray-400">$0 - ${priceRange[1]}</div>
                  </div>
                </div>
              </div>
            </div>

            <AdvancedFiltersPanel
              advancedFilters={advancedFilters}
              onFilterChange={handleAdvancedFilterChange}
              onResetAdvanced={resetAdvancedFilters}
            />
          </aside>

          <div className="flex-1 min-w-0">
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t('explore.activeFilters')}</span>
                {selectedLanguage && (
                  <Badge variant="primary">
                    {LANGUAGES.find((l) => l.code === selectedLanguage)?.name}
                    <button type="button" onClick={() => setSelectedLanguage('')} className="ml-1" aria-label="Remove language"><X className="w-3 h-3" /></button>
                  </Badge>
                )}
                {selectedCity && (
                  <Badge variant="primary">
                    {CITIES.find((c) => c.id === selectedCity)?.name}
                    <button type="button" onClick={() => setSelectedCity('')} className="ml-1" aria-label="Remove city"><X className="w-3 h-3" /></button>
                  </Badge>
                )}
              </div>
            )}

            <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {t('explore.showing')} {filteredExperiences.length}{' '}
              {filteredExperiences.length === 1 ? t('explore.experience') : t('explore.experiences')}
            </div>

            {filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
              </div>
            ) : (
              <EmptyState
                pose="think"
                title={t('explore.noResults')}
                description={t('explore.noResultsDescription')}
                action={{
                  label: t('explore.clearFilters'),
                  onClick: () => { resetFilters(); resetAdvancedFilters(); },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
