import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, BookOpen, Users, CreditCard, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', label: 'General', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'booking', label: 'Booking', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'teachers', label: 'For Teachers', icon: <Users className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
  ];

  const faqs = [
    {
      category: 'general',
      question: 'What is Langgie?',
      answer: 'Langgie is a platform that connects language learners with native speakers for immersive, real-world language learning experiences. Instead of traditional classes, you learn through activities like cooking classes, walking tours, coffee chats, and more—all led by local teachers in cities worldwide.',
    },
    {
      category: 'general',
      question: 'How is Langgie different from language apps or traditional classes?',
      answer: 'We focus on real-world immersion and cultural experiences. You\'re not just memorizing vocabulary—you\'re using the language in authentic situations with native speakers. Plus, our small group sizes (max 8 people) ensure personalized attention.',
    },
    {
      category: 'general',
      question: 'What languages are available?',
      answer: 'We offer experiences in 20+ languages including French, Spanish, Japanese, Korean, Mandarin, Italian, Portuguese, German, Arabic, and Russian. The availability varies by city.',
    },
    {
      category: 'booking',
      question: 'How do I book an experience?',
      answer: 'Simply browse experiences in your desired city and language, select a date that works for you, and complete the booking with secure payment. You\'ll receive instant confirmation via email with all the details.',
    },
    {
      category: 'booking',
      question: 'What is the couple discount?',
      answer: 'When you book for 2 people together, you get 15% off the total price! It\'s perfect for learning with a friend, partner, or family member. The discount is automatically applied at checkout.',
    },
    {
      category: 'booking',
      question: 'What is your cancellation policy?',
      answer: 'You can cancel up to 48 hours before your experience for a full refund. Cancellations within 48 hours are non-refundable, but you can reschedule if the teacher agrees.',
    },
    {
      category: 'booking',
      question: 'Do I need any prior language knowledge?',
      answer: 'Not necessarily! Many experiences welcome complete beginners. Each experience listing shows the required skill level: Beginner, Intermediate, Advanced, or All Levels. Choose one that matches your comfort level.',
    },
    {
      category: 'booking',
      question: 'How long are the experiences?',
      answer: 'Most experiences last 2-3 hours, though some shorter coffee chats might be 1 hour and longer tours could be 4-5 hours. The duration is clearly listed on each experience page.',
    },
    {
      category: 'teachers',
      question: 'How do I become a teacher on Langgie?',
      answer: 'Visit our "For Teachers" page and click "Apply to Teach." You\'ll need to be a native or fluent speaker, pass our verification process, and create your first experience. Most applications are reviewed within 48 hours.',
    },
    {
      category: 'teachers',
      question: 'How much can I earn as a teacher?',
      answer: 'Teachers typically earn $30-60 per hour depending on location, experience, and demand. You set your own prices and keep 80% of each booking (we take a 20% platform fee to cover payment processing and support).',
    },
    {
      category: 'teachers',
      question: 'Do I need teaching experience to become a teacher?',
      answer: 'No! While teaching experience helps, we value enthusiasm and cultural knowledge. We provide resources and guidelines to help you create engaging experiences.',
    },
    {
      category: 'safety',
      question: 'How do you verify teachers?',
      answer: 'All teachers go through identity verification and language proficiency assessment. We also collect reviews from students after each experience to maintain quality standards.',
    },
    {
      category: 'safety',
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard encryption and never store your full credit card details. All payments are processed through secure, PCI-compliant payment providers.',
    },
    {
      category: 'safety',
      question: 'What if I have a problem during an experience?',
      answer: 'Our 24/7 support team is always available to help. You can contact us via the app, email, or phone. We take all concerns seriously and will work to resolve any issues quickly.',
    },
    {
      category: 'general',
      question: 'How does the gamification system work?',
      answer: 'You earn points for every experience you complete (typically 1 point per dollar spent). As you accumulate points, you level up and unlock achievement badges. Check the leaderboard to see how you rank against other learners!',
    },
    {
      category: 'general',
      question: 'Can I request a private experience?',
      answer: 'Yes! While most experiences are small groups, many teachers offer private sessions. Contact the teacher directly through their profile to discuss private bookings and pricing.',
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Got questions? We've got answers. Find everything you need to know about Langgie.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="max-w-2xl mx-auto">
          <CardBody>
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              className="text-lg"
            />
          </CardBody>
        </Card>
      </div>

      {/* Category Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <CardBody className="p-0">
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
                      >
                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                            expandedIndex === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No questions found</p>
                <p className="text-gray-500 text-sm">Try a different search term or category</p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Still Have Questions CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 max-w-4xl mx-auto">
          <CardBody className="text-center py-12 text-white">
            <HelpCircle className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Contact Support
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}
