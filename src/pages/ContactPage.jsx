import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  Globe,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardBody } from '../components/ui/Card';

/** Where unsent messages are kept until there's a mail backend. */
const DRAFTS_KEY = 'conversa-contact-messages';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // There is no mail backend yet. Rather than claim the message was sent
    // and silently drop it, keep it on the device so nothing the user typed
    // is lost, and say plainly what did and didn't happen.
    try {
      const stored = JSON.parse(localStorage.getItem(DRAFTS_KEY) ?? '[]');
      stored.push({ ...formData, savedAt: new Date().toISOString() });
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(stored));
    } catch (error) {
      console.error('Could not save the message locally:', error);
    }

    setSubmitted(true);
  };

  const startAnother = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardBody>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 dark:text-white">
                  Send us a Message
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">
                      Your message is saved
                    </h3>
                    <p className="text-gray-600 mb-2 dark:text-gray-400">
                      Thanks for writing, {formData.name || 'friend'}.
                    </p>
                    <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">
                      We haven't connected email delivery yet, so this is stored on
                      your device rather than sent to us. To reach a person today,
                      email{' '}
                      <a
                        href="mailto:hello@conversa.com"
                        className="text-primary-600 font-medium hover:underline"
                      >
                        hello@conversa.com
                      </a>
                      .
                    </p>
                    <Button variant="outline" onClick={startAnother}>
                      Write another
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={<Send className="w-5 h-5" />}
                      className="w-full sm:w-auto"
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardBody>
                <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email</p>
                      <a
                        href="mailto:support@conversa.com"
                        className="text-gray-600 hover:text-primary-600 text-sm dark:text-gray-400"
                      >
                        support@conversa.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-600 hover:text-primary-600 text-sm dark:text-gray-400"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Address</p>
                      <p className="text-gray-600 text-sm dark:text-gray-400">
                        123 Language Street
                        <br />
                        San Francisco, CA 94102
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Business Hours</p>
                      <p className="text-gray-600 text-sm dark:text-gray-400">
                        Monday - Friday: 9AM - 6PM PST
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardBody className="p-0">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm dark:text-gray-400">Map Coming Soon</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-primary-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Need Help?</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <Link
                    to="/faq"
                    className="block text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    Visit our FAQ page
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="block text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    Learn how Tonguee works
                  </Link>
                  <Link
                    to="/for-teachers"
                    className="block text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    Become a teacher
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Social Media / Additional Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30">
            <CardBody className="text-center py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">
                Join Our Community
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto dark:text-gray-400">
                Follow us on social media for language learning tips, cultural insights, and
                special offers.
              </p>
              <div className="flex items-center justify-center gap-4 text-3xl">
                <a
                  href="#"
                  className="hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="hover:scale-110 transition-transform"
                  aria-label="Twitter"
                >
                  🐦
                </a>
                <a
                  href="#"
                  className="hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="hover:scale-110 transition-transform"
                  aria-label="LinkedIn"
                >
                  💼
                </a>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
