import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ExperienceCard from '../components/features/ExperienceCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import experiencesData from '../data/experiences.json';
import { LANGUAGES, CITIES, SKILL_LEVELS } from '../data/constants';

/**
 * Explore Page with filters, search, and sort
 */
export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort experiences
  const filteredExperiences = useMemo(() => {
    let results = [...experiencesData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query) ||
          exp.location.venue.toLowerCase().includes(query)
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
  }, [searchQuery, selectedLanguage, selectedCity, selectedSkillLevel, priceRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('');
    setSelectedCity('');
    setSelectedSkillLevel('');
    setPriceRange([0, 100]);
  };

  const activeFiltersCount = [
    selectedLanguage,
    selectedCity,
    selectedSkillLevel,
    searchQuery
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
            Explore Experiences
          </h1>
          <p className="text-lg text-gray-600">
            Discover language learning experiences in cities around the world
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              leftIcon={<Search className="w-4 h-4" />}
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'date', label: 'Sort by Date' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'popularity', label: 'Most Popular' },
            ]}
            className="w-full sm:w-48"
          />
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            icon={<SlidersHorizontal className="w-4 h-4" />}
            className="sm:hidden"
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <Select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    options={[
                      { value: '', label: 'All Languages' },
                      ...LANGUAGES.map((lang) => ({
                        value: lang.code,
                        label: `${lang.flag} ${lang.name}`,
                      })),
                    ]}
                  />
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    options={[
                      { value: '', label: 'All Cities' },
                      ...CITIES.map((city) => ({
                        value: city.id,
                        label: `${city.flag} ${city.name}`,
                      })),
                    ]}
                  />
                </div>

                {/* Skill Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level
                  </label>
                  <Select
                    value={selectedSkillLevel}
                    onChange={(e) => setSelectedSkillLevel(e.target.value)}
                    options={[
                      { value: '', label: 'All Levels' },
                      ...SKILL_LEVELS.map((level) => ({
                        value: level.value,
                        label: level.label,
                      })),
                    ]}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
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
                    <div className="text-sm text-gray-600">
                      $0 - ${priceRange[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
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
            <div className="mb-6 text-sm text-gray-600">
              Showing {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'}
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No experiences found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button variant="primary" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
