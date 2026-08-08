import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Calendar,
  Users,
  Globe,
  TrendingUp,
  CheckCircle,
  Star,
  Heart,
  Zap,
  Award,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { useLanguage } from '../contexts/LanguageContext';

export default function ForTeachersPage() {
  const { t } = useLanguage();
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: t('forTeachers.benefit1Title'),
      description: t('forTeachers.benefit1Description'),
      stats: t('forTeachers.benefit1Stats'),
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: t('forTeachers.benefit2Title'),
      description: t('forTeachers.benefit2Description'),
      stats: t('forTeachers.benefit2Stats'),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('forTeachers.benefit3Title'),
      description: t('forTeachers.benefit3Description'),
      stats: t('forTeachers.benefit3Stats'),
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('forTeachers.benefit4Title'),
      description: t('forTeachers.benefit4Description'),
      stats: t('forTeachers.benefit4Stats'),
    },
  ];

  const steps = [
    {
      number: '1',
      title: t('forTeachers.step1Title'),
      description: t('forTeachers.step1Description'),
    },
    {
      number: '2',
      title: t('forTeachers.step2Title'),
      description: t('forTeachers.step2Description'),
    },
    {
      number: '3',
      title: t('forTeachers.step3Title'),
      description: t('forTeachers.step3Description'),
    },
    {
      number: '4',
      title: t('forTeachers.step4Title'),
      description: t('forTeachers.step4Description'),
    },
  ];

  const requirements = [
    t('forTeachers.req1'),
    t('forTeachers.req2'),
    t('forTeachers.req3'),
    t('forTeachers.req4'),
    t('forTeachers.req5'),
    t('forTeachers.req6'),
  ];

  const faqs = [
    {
      q: t('forTeachers.faq1Q'),
      a: t('forTeachers.faq1A'),
    },
    {
      q: t('forTeachers.faq2Q'),
      a: t('forTeachers.faq2A'),
    },
    {
      q: t('forTeachers.faq3Q'),
      a: t('forTeachers.faq3A'),
    },
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Award className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                {t('forTeachers.title')}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t('forTeachers.subtitle')}
              </p>
              <Link to="/onboarding/teacher">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50 dark:bg-gray-800"
                >
                  {t('forTeachers.applyToTeach')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center dark:text-white">
          {t('forTeachers.whyTeach')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 dark:bg-primary-900/40">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 dark:text-gray-400">{benefit.description}</p>
                  <p className="text-primary-600 font-semibold text-sm">{benefit.stats}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center dark:text-white">
            {t('forTeachers.howToStart')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 * index, type: 'spring' }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardBody>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary-500" />
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  {t('forTeachers.requirements')}
                </h2>
              </div>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3"
                  >
                    <Zap className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center dark:text-white">
            {t('forTeachers.successStories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: t('forTeachers.story1Name'),
                location: t('forTeachers.story1Location'),
                emoji: '👩‍🍳',
                quote: t('forTeachers.story1Quote'),
                earnings: t('forTeachers.story1Earnings'),
              },
              {
                name: t('forTeachers.story2Name'),
                location: t('forTeachers.story2Location'),
                emoji: '🎸',
                quote: t('forTeachers.story2Quote'),
                earnings: t('forTeachers.story2Earnings'),
              },
              {
                name: t('forTeachers.story3Name'),
                location: t('forTeachers.story3Location'),
                emoji: '🍜',
                quote: t('forTeachers.story3Quote'),
                earnings: t('forTeachers.story3Earnings'),
              },
            ].map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                <Card>
                  <CardBody>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{story.emoji}</div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{story.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{story.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic mb-4 dark:text-gray-300">{story.quote}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">4.9</span>
                      </div>
                      <p className="text-primary-600 font-semibold text-sm">{story.earnings}</p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center dark:text-white">
          {t('forTeachers.commonQuestions')}
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardBody>
                  <h3 className="font-bold text-gray-900 mb-2 dark:text-white">{faq.q}</h3>
                  <p className="text-gray-600 text-sm dark:text-gray-400">{faq.a}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary-600 hover:text-primary-700 font-medium">
            {t('forTeachers.viewAllFaqs')}
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
          <CardBody className="text-center py-12 text-white">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('forTeachers.readyToTeach')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('forTeachers.readyToTeachDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/onboarding/teacher">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50 dark:bg-gray-800"
                >
                  {t('forTeachers.applyNow')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('forTeachers.contactUs')}
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}
