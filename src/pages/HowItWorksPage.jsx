import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Users,
  Star,
  CreditCard,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Shield,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

export default function HowItWorksPage() {
  const { t } = useLanguage();
  const steps = [
    {
      number: t('howItWorks.step1.number'),
      icon: <Search className="w-8 h-8" />,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      details: [t('howItWorks.step1.detail1'), t('howItWorks.step1.detail2'), t('howItWorks.step1.detail3')],
    },
    {
      number: t('howItWorks.step2.number'),
      icon: <Calendar className="w-8 h-8" />,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      details: [t('howItWorks.step2.detail1'), t('howItWorks.step2.detail2'), t('howItWorks.step2.detail3')],
    },
    {
      number: t('howItWorks.step3.number'),
      icon: <Users className="w-8 h-8" />,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      details: [t('howItWorks.step3.detail1'), t('howItWorks.step3.detail2'), t('howItWorks.step3.detail3')],
    },
    {
      number: t('howItWorks.step4.number'),
      icon: <Star className="w-8 h-8" />,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      details: [t('howItWorks.step4.detail1'), t('howItWorks.step4.detail2'), t('howItWorks.step4.detail3')],
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('howItWorks.feature1Title'),
      description: t('howItWorks.feature1Description'),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: t('howItWorks.feature2Title'),
      description: t('howItWorks.feature2Description'),
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: t('howItWorks.feature3Title'),
      description: t('howItWorks.feature3Description'),
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t('howItWorks.feature4Title'),
      description: t('howItWorks.feature4Description'),
    },
  ];

  const benefits = [
    { text: t('howItWorks.benefit1'), icon: '✓' },
    { text: t('howItWorks.benefit2'), icon: '✓' },
    { text: t('howItWorks.benefit3'), icon: '✓' },
    { text: t('howItWorks.benefit4'), icon: '✓' },
    { text: t('howItWorks.benefit5'), icon: '✓' },
    { text: t('howItWorks.benefit6'), icon: '✓' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              {t('howItWorks.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardBody className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Number Section */}
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-8 flex flex-col items-center justify-center text-white">
                      <span className="text-6xl font-bold opacity-50 mb-4">{step.number}</span>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-center">{step.title}</h3>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-2 p-8">
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed dark:text-gray-300">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 dark:text-white">
              {t('howItWorks.whyChoose')}
            </h2>
            <p className="text-gray-600 text-lg dark:text-gray-400">
              {t('howItWorks.whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index, type: 'spring' }}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 dark:bg-gray-800"
              >
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {benefit.icon}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center dark:text-white">
            {t('howItWorks.builtForSuccess')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardBody>
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 dark:bg-primary-900/40">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 text-sm dark:text-gray-400">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="bg-gray-100 py-16 dark:bg-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 dark:text-white">
              {t('howItWorks.seeInAction')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('howItWorks.seeInActionSubtitle')}
            </p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardBody className="p-0">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-600 font-medium dark:text-gray-400">{t('howItWorks.videoComingSoon')}</p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {t('howItWorks.videoSubtitle')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
          <CardBody className="text-center py-12 text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('howItWorks.readyToStart')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('howItWorks.readyToStartDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="bg-white text-primary-600 hover:bg-gray-50 dark:bg-gray-800"
                >
                  {t('howItWorks.browseExperiences')}
                </Button>
              </Link>
              <Link to="/for-teachers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('howItWorks.becomeTeacher')}
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}
