import { useState } from 'react';
import { X, User, Mail, FileText, Upload, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';
import { Card, CardBody } from '../ui/Card';

export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    bio: profile?.bio || '',
    photo: profile?.photo || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call parent save handler
      if (onSave) {
        await onSave(formData);
      }

      setSuccess(true);

      // Close after showing success
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result,
        });
      };
      reader.readAsDataURL(file);
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
                      <h2 className="text-2xl font-display font-bold text-gray-900">
                        Edit Profile
                      </h2>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Success Message */}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-sm text-green-700 font-medium">
                          Profile updated successfully!
                        </p>
                      </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Photo Upload */}
                      <div className="flex flex-col items-center gap-4">
                        <Avatar
                          src={formData.photo}
                          alt={formData.name}
                          name={formData.name}
                          size="2xl"
                        />
                        <div className="flex gap-3">
                          <label htmlFor="photo-upload">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              icon={<Upload className="w-4 h-4" />}
                              onClick={() => document.getElementById('photo-upload').click()}
                            >
                              Change Photo
                            </Button>
                          </label>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                          {formData.photo && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setFormData({ ...formData, photo: '' })}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          JPG, PNG or GIF. Max 5MB.
                        </p>
                      </div>

                      {/* Name */}
                      <Input
                        type="text"
                        name="name"
                        label="Full Name"
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
                        label="Email Address"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading || success}
                        icon={<Mail className="w-5 h-5" />}
                      />

                      {/* Bio */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea
                            name="bio"
                            placeholder="Tell us a bit about yourself..."
                            value={formData.bio}
                            onChange={handleChange}
                            disabled={loading || success}
                            rows={4}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {formData.bio.length}/500 characters
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
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
                          className="flex-1"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              Saving...
                            </>
                          ) : success ? (
                            'Saved!'
                          ) : (
                            'Save Changes'
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
