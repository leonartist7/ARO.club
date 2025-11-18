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

export default function ForTeachersPage() {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Earn Extra Income',
      description: 'Set your own prices and schedule. Earn money sharing your language and culture.',
      stats: 'Avg. $40/hour',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Flexible Schedule',
      description: 'Choose when and how often you teach. Work around your existing commitments.',
      stats: 'Your schedule, your rules',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Small Groups',
      description: 'Teach intimate groups of 4-8 students. More personal, more impactful.',
      stats: 'Max 8 students',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Connect with learners from around the world who want to learn your language.',
      stats: '100+ countries',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Apply Online',
      description: 'Fill out our simple application form. Tell us about your language skills and teaching experience.',
    },
    {
      number: '2',
      title: 'Get Verified',
      description: 'We verify your identity and language proficiency. Most applications are reviewed within 48 hours.',
    },
    {
      number: '3',
      title: 'Create Experiences',
      description: 'Design unique language learning experiences. Cooking classes, walking tours, coffee chats—you choose!',
    },
    {
      number: '4',
      title: 'Start Teaching',
      description: 'Students book your experiences and you get paid. It\'s that simple.',
    },
  ];

  const requirements = [
    'Native or fluent speaker of the language you want to teach',
    'Passion for sharing your language and culture',
    'Reliable internet connection for communication',
    'Ability to create engaging, interactive experiences',
    'Available to teach at least 2 sessions per month',
    'Must be 18 years or older',
  ];

  const faqs = [
    {
      q: 'Do I need teaching experience?',
      a: 'Not required! While teaching experience helps, we value enthusiasm and cultural knowledge. We provide resources to help you create great experiences.',
    },
    {
      q: 'How much can I earn?',
      a: 'Teachers typically earn $30-60 per hour depending on location, experience, and demand. You set your own prices.',
    },
    {
      q: 'What if I need to cancel?',
      a: 'Life happens! You can cancel up to 48 hours before a session with no penalty. Last-minute cancellations may affect your rating.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
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
                Teach Your Language, Share Your Culture
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Turn your language skills into income. Join thousands of teachers worldwide
                helping students learn through real experiences.
              </p>
              <Link to="/teacher-dashboard">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Apply to Teach
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
          Why Teach with Conversa?
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
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                  <p className="text-primary-600 font-semibold text-sm">{benefit.stats}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
            How to Get Started
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
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
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  Teacher Requirements
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
                    <span className="text-gray-700">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
            Teacher Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sophie Laurent',
                location: 'Paris, France',
                emoji: '👩‍🍳',
                quote: 'I teach French through cooking classes. It\'s amazing to see students learn while making croissants!',
                earnings: '$2,400/month',
              },
              {
                name: 'Carlos Martinez',
                location: 'Barcelona, Spain',
                emoji: '🎸',
                quote: 'Teaching Spanish through flamenco and tapas tours is my passion. Students love the cultural immersion.',
                earnings: '$3,100/month',
              },
              {
                name: 'Yuki Sato',
                location: 'Tokyo, Japan',
                emoji: '🍜',
                quote: 'I combine Japanese lessons with ramen tours. It\'s the perfect way to share my culture!',
                earnings: '$2,800/month',
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
                        <p className="font-bold text-gray-900">{story.name}</p>
                        <p className="text-sm text-gray-500">{story.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic mb-4">{story.quote}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-sm font-semibold">4.9</span>
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
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
          Common Questions
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
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/faq" className="text-primary-600 hover:text-primary-700 font-medium">
            View all FAQs →
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
          <CardBody className="text-center py-12 text-white">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Start Teaching?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our global community of teachers. Share your language, earn income, and
              make a difference in students' lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/teacher-dashboard">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Apply Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}
