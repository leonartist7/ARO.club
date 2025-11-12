import { useState } from 'react';
import { X, Send, User, Mail, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';
import { Card, CardBody } from '../ui/Card';

export default function ContactTeacherModal({ isOpen, onClose, teacher }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.message.trim().length < 20) {
      setError('Message must be at least 20 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, would call:
      // await supabase.from('messages').insert([{
      //   teacher_id: teacher.id,
      //   sender_name: formData.name,
      //   sender_email: formData.email,
      //   subject: formData.subject,
      //   message: formData.message,
      //   status: 'unread'
      // }]);

      console.log('Message sent to teacher:', {
        teacherId: teacher.id,
        teacherName: teacher.name,
        ...formData,
      });

      setSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        onClose();
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Card>
                  <CardBody>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={teacher?.photo}
                          alt={teacher?.name}
                          name={teacher?.name}
                          size="lg"
                        />
                        <div>
                          <h2 className="text-xl font-display font-bold text-gray-900">
                            Contact {teacher?.name}
                          </h2>
                          <p className="text-sm text-gray-600">
                            Typically responds within {teacher?.responseTime || '24 hours'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={loading}
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Success Message */}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">Message sent successfully!</p>
                          <p className="text-xs text-green-600 mt-1">
                            {teacher?.name} will get back to you soon.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                      </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <Input
                        type="text"
                        name="name"
                        label="Your Name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading || success}
                        icon={<User className="w-5 h-5" />}
                      />

                      {/* Email */}
                      <Input
                        type="email"
                        name="email"
                        label="Your Email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading || success}
                        icon={<Mail className="w-5 h-5" />}
                      />

                      {/* Subject (Optional) */}
                      <Input
                        type="text"
                        name="subject"
                        label="Subject (Optional)"
                        placeholder="e.g., Interested in French conversation class"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={loading || success}
                        icon={<MessageCircle className="w-5 h-5" />}
                      />

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          disabled={loading || success}
                          required
                          placeholder="Tell the teacher about your language learning goals, experience level, and what you're looking for..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
                          maxLength={1000}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          {formData.message.length}/1000 characters
                        </p>
                      </div>

                      {/* Tips */}
                      <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-1">
                        <p className="font-medium text-gray-700 mb-2">Tips for contacting teachers:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Mention your current language level</li>
                          <li>Share your learning goals and interests</li>
                          <li>Ask specific questions about their teaching style</li>
                          <li>Mention any schedule preferences or constraints</li>
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={onClose}
                          disabled={loading || success}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={loading || success}
                          loading={loading}
                          icon={!loading && !success ? <Send className="w-4 h-4" /> : undefined}
                          className="flex-1"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              Sending...
                            </>
                          ) : success ? (
                            'Sent!'
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
