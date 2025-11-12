import { useState } from 'react';
import { Check, X, Clock, Calendar, User, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/date';
import { formatPrice } from '../../utils/helpers';

// Mock booking requests data
const MOCK_REQUESTS = [
  {
    id: 1,
    experienceTitle: 'French Cooking Class in Montmartre',
    experienceDate: '2025-12-15',
    experienceTime: '18:00',
    experiencePrice: 45,
    studentName: 'Emily Johnson',
    studentEmail: 'emily.j@email.com',
    studentPhoto: 'https://i.pravatar.cc/150?img=1',
    studentLevel: 'Beginner',
    numberOfSpots: 2,
    message: 'Hi! Really excited about this class. I\'ll be bringing my partner. Do you accommodate dietary restrictions?',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'pending',
  },
  {
    id: 2,
    experienceTitle: 'Spanish Tapas Night',
    experienceDate: '2025-12-20',
    experienceTime: '19:30',
    experiencePrice: 38,
    studentName: 'Michael Chen',
    studentEmail: 'mchen@email.com',
    studentPhoto: 'https://i.pravatar.cc/150?img=13',
    studentLevel: 'Intermediate',
    numberOfSpots: 1,
    message: 'Looking forward to practicing my Spanish in a relaxed setting!',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'pending',
  },
  {
    id: 3,
    experienceTitle: 'Italian Wine Tasting Tour',
    experienceDate: '2025-12-18',
    experienceTime: '16:00',
    experiencePrice: 55,
    studentName: 'Sarah Williams',
    studentEmail: 'sarah.w@email.com',
    studentPhoto: 'https://i.pravatar.cc/150?img=5',
    studentLevel: 'Beginner',
    numberOfSpots: 1,
    message: 'Is this suitable for complete beginners? I don\'t speak any Italian yet.',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: 'pending',
  },
];

/**
 * Booking Requests component for teachers
 * Displays pending booking requests with approve/decline actions
 */
export default function BookingRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [processingId, setProcessingId] = useState(null);

  const handleApprove = async (requestId) => {
    setProcessingId(requestId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, would call Supabase:
    // await supabase
    //   .from('booking_requests')
    //   .update({ status: 'approved' })
    //   .eq('id', requestId);
    //
    // // Send notification to student
    // await supabase.from('notifications').insert([{
    //   user_id: request.student_id,
    //   type: 'booking_approved',
    //   message: 'Your booking request has been approved!'
    // }]);

    console.log('Approved booking request:', requestId);

    // Remove from list
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
    setProcessingId(null);
  };

  const handleDecline = async (requestId) => {
    setProcessingId(requestId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, would call Supabase:
    // await supabase
    //   .from('booking_requests')
    //   .update({ status: 'declined' })
    //   .eq('id', requestId);
    //
    // // Send notification to student
    // await supabase.from('notifications').insert([{
    //   user_id: request.student_id,
    //   type: 'booking_declined',
    //   message: 'Your booking request was declined.'
    // }]);

    console.log('Declined booking request:', requestId);

    // Remove from list
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
    setProcessingId(null);
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No pending booking requests</p>
        <p className="text-sm text-gray-500 mt-1">
          New requests will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {requests.map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 hover:shadow-md transition-all bg-white"
          >
            <div className="flex items-start gap-4">
              {/* Student Avatar */}
              <Avatar
                src={request.studentPhoto}
                alt={request.studentName}
                name={request.studentName}
                size="lg"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.studentName}</h3>
                    <p className="text-sm text-gray-600">{request.studentEmail}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {getTimeAgo(request.requestedAt)}
                  </span>
                </div>

                {/* Experience Details */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    {request.experienceTitle}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(request.experienceDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {request.experienceTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {request.numberOfSpots} {request.numberOfSpots > 1 ? 'spots' : 'spot'}
                    </span>
                    <Badge variant="secondary" size="sm">
                      {request.studentLevel}
                    </Badge>
                  </div>
                  <p className="font-semibold text-primary-600 mt-2 text-sm">
                    Total: {formatPrice(request.experiencePrice * request.numberOfSpots)}
                  </p>
                </div>

                {/* Student Message */}
                {request.message && (
                  <div className="flex items-start gap-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 italic">"{request.message}"</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(request.id)}
                    disabled={processingId !== null}
                    loading={processingId === request.id}
                    icon={processingId !== request.id ? <Check className="w-4 h-4" /> : undefined}
                    className="flex-1 sm:flex-none"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDecline(request.id)}
                    disabled={processingId !== null}
                    icon={<X className="w-4 h-4" />}
                    className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    Decline
                  </Button>
                  <a href={`mailto:${request.studentEmail}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Mail className="w-4 h-4" />}
                      className="hidden sm:flex"
                    >
                      Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Example usage:
 *
 * <BookingRequests />
 */
