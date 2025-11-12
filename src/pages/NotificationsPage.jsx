import { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import { Star, Calendar, Trophy, MessageCircle, BookOpen } from 'lucide-react';

// Mock notification data - matches NotificationCenter
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'booking_confirmed',
    title: 'Booking Confirmed',
    message: 'Your booking for "French Cooking Class" has been confirmed',
    time: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    link: '/bookings',
    icon: Calendar,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 2,
    type: 'review_received',
    title: 'New Review',
    message: 'Sophie Martin left a 5-star review for your Spanish class',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    link: '/profile',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    type: 'level_up',
    title: 'Level Up! 🎉',
    message: 'Congratulations! You\'ve reached Intermediate level in French',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: false,
    link: '/profile',
    icon: Trophy,
    color: 'text-primary-500',
    bgColor: 'bg-primary-50',
  },
  {
    id: 4,
    type: 'message_received',
    title: 'New Message',
    message: 'Pierre Dubois sent you a message about upcoming class',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    link: '/messages',
    icon: MessageCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 5,
    type: 'experience_reminder',
    title: 'Upcoming Experience',
    message: 'Reminder: "Italian Wine Tasting" starts tomorrow at 6:00 PM',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    link: '/bookings',
    icon: BookOpen,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 6,
    type: 'booking_confirmed',
    title: 'Booking Confirmed',
    message: 'Your booking for "Spanish Tapas Night" has been confirmed',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    read: true,
    link: '/bookings',
    icon: Calendar,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 7,
    type: 'review_received',
    title: 'New Review',
    message: 'Marc Dupont left a 4-star review for your French class',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    read: true,
    link: '/profile',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 8,
    type: 'message_received',
    title: 'New Message',
    message: 'Isabella Rossi sent you a message',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    read: true,
    link: '/messages',
    icon: MessageCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Notifications' },
  { value: 'unread', label: 'Unread Only' },
  { value: 'booking_confirmed', label: 'Bookings' },
  { value: 'review_received', label: 'Reviews' },
  { value: 'level_up', label: 'Achievements' },
  { value: 'message_received', label: 'Messages' },
];

/**
 * Full-page notifications view
 */
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter notifications
  const filteredNotifications = notifications.filter((n) => {
    // Filter by type
    if (filter === 'unread' && n.read) return false;
    if (filter !== 'all' && filter !== 'unread' && n.type !== filter) return false;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(query) ||
        n.message.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id) => {
    // In production: await supabase.from('notifications').update({ read: true }).eq('id', id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In production: await supabase.from('notifications').update({ read: true }).in('id', ...);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setLoading(false);
  };

  const handleDelete = async (id) => {
    // In production: await supabase.from('notifications').delete().eq('id', id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} notification(s)?`)) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In production: await supabase.from('notifications').delete().in('id', selectedIds);
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
    setLoading(false);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary-500" />
                Notifications
              </h1>
              <p className="text-gray-600 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={loading}
                  icon={<CheckCheck className="w-4 h-4" />}
                >
                  Mark all read
                </Button>
              )}
              {selectedIds.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={loading}
                  icon={<Trash2 className="w-4 h-4" />}
                >
                  Delete ({selectedIds.length})
                </Button>
              )}
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filter */}
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {notifications.length > 0 && (
          <div className="mb-4 flex items-center gap-3 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.length === filteredNotifications.length && filteredNotifications.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">Select all</span>
            </label>
            {selectedIds.length > 0 && (
              <span className="text-gray-600">
                {selectedIds.length} selected
              </span>
            )}
          </div>
        )}

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardBody>
              <div className="py-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">No notifications found</p>
                <p className="text-sm text-gray-500">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : 'You\'re all caught up!'}
                </p>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                isSelected={selectedIds.includes(notification.id)}
                onToggleSelect={() => toggleSelect(notification.id)}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Individual notification card
 */
function NotificationCard({ notification, isSelected, onToggleSelect, onMarkAsRead, onDelete }) {
  const Icon = notification.icon;
  const timeAgo = getTimeAgo(notification.time);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <Card className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-primary-500' : ''}`}>
        <CardBody>
          <div className="flex items-start gap-4">
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />

            {/* Icon or Avatar */}
            {notification.avatar ? (
              <Avatar src={notification.avatar} alt={notification.title} size="md" />
            ) : (
              <div className={`flex-shrink-0 w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${notification.color}`} />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className={`text-base ${notification.read ? 'font-medium text-gray-700' : 'font-semibold text-gray-900'}`}>
                  {notification.title}
                  {!notification.read && (
                    <span className="ml-2 inline-block w-2 h-2 bg-primary-500 rounded-full"></span>
                  )}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">{timeAgo}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{notification.message}</p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => onDelete(notification.id)}
                  className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

/**
 * Helper function to format time ago
 */
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + ' year' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 2592000; // months
  if (interval > 1) return Math.floor(interval) + ' month' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + ' day' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';

  return 'Just now';
}
