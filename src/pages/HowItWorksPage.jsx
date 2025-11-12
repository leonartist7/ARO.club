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
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import VideoPlayer from '../components/ui/VideoPlayer';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      icon: <Search className="w-8 h-8" />,
      title: 'Browse Experiences',
      description: 'Explore hundreds of language learning experiences in cities worldwide. Filter by language, location, skill level, and activity type.',
      details: ['Search by city or language', 'Filter by price and availability', 'Read reviews from other learners'],
    },
    {
      number: '02',
      icon: <Calendar className="w-8 h-8" />,
      title: 'Book Your Spot',
      description: 'Found the perfect experience? Book your spot instantly. Bring a friend and save 15% with our couple discount!',
      details: ['Secure instant booking', '15% couple discount available', 'Flexible cancellation policy'],
    },
    {
      number: '03',
      icon: <Users className="w-8 h-8" />,
      title: 'Meet & Learn',
      description: 'Show up and immerse yourself! Meet your teacher and fellow learners for an unforgettable language learning experience.',
      details: ['Small groups (max 8 people)', 'Native speaker teachers', 'Real-world practice'],
    },
    {
      number: '04',
      icon: <Star className="w-8 h-8" />,
      title: 'Earn & Share',
      description: 'Complete experiences to earn points, unlock badges, and climb the leaderboard. Share your review to help others!',
      details: ['Earn points for each experience', 'Unlock achievement badges', 'Build your language portfolio'],
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified Teachers',
      description: 'All teachers are verified native speakers with teaching experience.',
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Secure Payments',
      description: 'Your payment information is encrypted and secure.',
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Our support team is always here to help you.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Community Focused',
      description: 'Join a global community of language learners.',
    },
  ];

  const benefits = [
    { text: 'Learn from native speakers in real situations', icon: '✓' },
    { text: 'Small group sizes for personalized attention', icon: '✓' },
    { text: 'Immersive cultural experiences, not just lessons', icon: '✓' },
    { text: 'Flexible scheduling around your life', icon: '✓' },
    { text: 'Affordable prices with couple discounts', icon: '✓' },
    { text: 'Earn points and badges as you progress', icon: '✓' },
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              How TongueConnect Works
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Learning a language has never been this easy—or this fun. Here's how to get
              started on your language learning journey.
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
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-600">
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
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose TongueConnect?
            </h2>
            <p className="text-gray-600 text-lg">
              We're not just another language app. Here's what makes us different:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index, type: 'spring' }}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-4"
              >
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {benefit.icon}
                </div>
                <p className="text-gray-700">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
            Built for Your Success
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
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              See It In Action
            </h2>
            <p className="text-gray-600">
              Watch how TongueConnect brings language learning to life
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <VideoPlayer
              // videoUrl="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
              // thumbnail="https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg"
              title="TongueConnect Introduction"
              placeholder="Video Coming Soon"
            />
            <p className="text-center text-sm text-gray-500 mt-4">
              See real students learning in real situations
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
          <CardBody className="text-center py-12 text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners discovering languages through real experiences.
              Your adventure starts today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Browse Experiences
                </Button>
              </Link>
              <Link to="/for-teachers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Become a Teacher
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}
