import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Globe, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { CITIES, LANGUAGES } from '../data/constants';
import experiencesData from '../data/experiences.json';
import { useLanguage } from '../contexts/LanguageContext';

export default function MapViewPage() {
  const { t } = useLanguage();
  // Count experiences per city
  const cityStats = CITIES.map((city) => ({
    ...city,
    count: experiencesData.filter((exp) => exp.city === city.id).length,
    languages: [...new Set(experiencesData.filter((exp) => exp.city === city.id).map((exp) => exp.language))],
  })).filter((city) => city.count > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              {t('mapView.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('mapView.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardBody className="p-0">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Placeholder World Map */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  {/* Simple world map outline - decorative */}
                  <path
                    d="M100 200 L150 180 L200 190 L250 170 L300 185 L350 200 L400 190 L450 200 L500 185 L550 195 L600 180 L650 190 L700 175 L750 185 L800 195 L850 180 L900 190"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="text-center z-10">
                <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-700 font-bold text-lg mb-2">
                  {t('mapView.mapComingSoon')}
                </p>
                <p className="text-gray-600">
                  {t('mapView.mapSubtitle')}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Cities Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
            {t('mapView.availableCities')}
          </h2>
          <p className="text-gray-600">
            {t('mapView.weAreIn')} {cityStats.length} {t('mapView.citiesDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cityStats.map((city, index) => {
            const cityLanguages = city.languages.map((langCode) =>
              LANGUAGES.find((l) => l.code === langCode)
            );

            return (
              <motion.div
                key={city.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/explore?city=${city.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardBody>
                      {/* City Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{city.flag}</span>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                            <p className="text-sm text-gray-500">{city.country}</p>
                          </div>
                        </div>
                        <Badge variant="primary" size="sm">
                          {city.count} {t('mapView.experiencesLabel').toLowerCase()}
                        </Badge>
                      </div>

                      {/* Languages Available */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          {t('mapView.languagesAvailable')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cityLanguages.map((lang) => (
                            <span
                              key={lang.code}
                              className="text-xl"
                              title={lang.name}
                            >
                              {lang.flag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-primary-600 font-medium text-sm">
                          {t('mapView.exploreCity')} {city.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary-600" />
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">{cityStats.length}+</p>
              <p className="text-gray-600 text-sm">{t('mapView.citiesLabel')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">{experiencesData.length}+</p>
              <p className="text-gray-600 text-sm">{t('mapView.experiencesLabel')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">
                {[...new Set(experiencesData.map((e) => e.language))].length}+
              </p>
              <p className="text-gray-600 text-sm">{t('mapView.languagesLabel')}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">100+</p>
              <p className="text-gray-600 text-sm">{t('mapView.teachersLabel')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
          <CardBody className="text-center py-12 text-white">
            <Globe className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('mapView.dontSeeCity')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('mapView.dontSeeCityDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  {t('mapView.requestCity')}
                </Button>
              </Link>
              <Link to="/for-teachers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('mapView.becomeTeacher')}
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}
