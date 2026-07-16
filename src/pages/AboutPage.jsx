import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  Heart,
  Users,
  Globe,
  Sparkles,
  Award,
  TrendingUp,
  Shield,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Connection First',
      description: 'We believe language learning happens best through real human connections and shared experiences.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Cultural Immersion',
      description: 'Learn languages in their authentic cultural context, not just from textbooks.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Join a global community of language learners and native speakers learning together.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Fun & Engaging',
      description: 'Language learning should be enjoyable, not a chore. We make it exciting and memorable.',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Co-Founder & CEO',
      bio: 'Former language teacher with 10+ years experience. Speaks 5 languages.',
      emoji: '👩‍💼',
    },
    {
      name: 'Marco Rossi',
      role: 'Co-Founder & CTO',
      bio: 'Tech entrepreneur passionate about education technology and cultural exchange.',
      emoji: '👨‍💻',
    },
    {
      name: 'Yuki Tanaka',
      role: 'Head of Community',
      bio: 'Building global communities and fostering meaningful connections across cultures.',
      emoji: '👩‍🎨',
    },
  ];

  const stats = [
    { number: '15+', label: 'Cities Worldwide' },
    { number: '100+', label: 'Verified Teachers' },
    { number: '5,000+', label: 'Happy Learners' },
    { number: '20+', label: 'Languages Offered' },
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
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Target className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Our Mission: Connect the World Through Language
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Tonguee was born from a simple idea: the best way to learn a language is
              by living it. We connect language learners with native speakers for real,
              immersive experiences in cities around the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index, type: 'spring' }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                In 2023, our founders Sarah and Marco met at a language exchange meetup in
                Barcelona. Both were frustrated with traditional language learning methods—apps
                felt isolating, classes were expensive, and nothing compared to actually
                speaking with locals in real situations.
              </p>
              <p>
                That night, over tapas and wine, they dreamed up Tonguee: a platform that
                would make language learning feel less like studying and more like exploring.
                They imagined cooking classes in French, market tours in Spanish, and coffee
                chats in Japanese—all led by passionate locals who loved sharing their language
                and culture.
              </p>
              <p>
                Today, Tonguee operates in over 15 cities worldwide, connecting thousands
                of language learners with local teachers for unforgettable experiences. Our
                community includes everyone from complete beginners taking their first steps to
                advanced learners perfecting their accent—all united by curiosity and a love of
                languages.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
            What We Believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardBody className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index }}
            >
              <Card className="text-center">
                <CardBody>
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Award className="w-10 h-10" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Awards & Recognition
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <p className="font-bold text-lg mb-2">🏆 Best EdTech Startup 2024</p>
                <p className="text-white/80 text-sm">TechCrunch Disrupt</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <p className="font-bold text-lg mb-2">⭐ Top 10 Language Apps</p>
                <p className="text-white/80 text-sm">App Store Featured</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <p className="font-bold text-lg mb-2">🌟 Community Choice Award</p>
                <p className="text-white/80 text-sm">Product Hunt</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <p className="font-bold text-lg mb-2">💡 Innovation in Education</p>
                <p className="text-white/80 text-sm">Global EdTech Summit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-primary-50 to-secondary-50">
          <CardBody className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Join Our Journey
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a learner looking for authentic language experiences or a
              teacher wanting to share your culture, there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button variant="primary" size="lg">
                  Start Learning
                </Button>
              </Link>
              <Link to="/for-teachers">
                <Button variant="outline" size="lg">
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
