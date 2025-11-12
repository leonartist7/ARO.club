import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, X, Star, Calendar, Trophy, MessageCircle, BookOpen, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

// Mock notification data - will be replaced with Supabase Realtime
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'booking_confirmed',
    title: 'Booking Confirmed',
    message: 'Your booking for "French Cooking Class" has been confirmed',
    time: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
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
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
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
    time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
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
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
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
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    link: '/bookings',
    icon: BookOpen,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
];

/**
 * Individual notification item
 */
function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  const Icon = notification.icon;
  const timeAgo = getTimeAgo(notification.time);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`relative group ${notification.read ? 'bg-white' : 'bg-blue-50/50'}`}
    >
      <Link
        to={notification.link}
        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start gap-3">
          {/* Icon or Avatar */}
          {notification.avatar ? (
            <Avatar src={notification.avatar} alt={notification.title} size="sm" />
          ) : (
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${notification.bgColor} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${notification.color}`} />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className={`text-sm ${notification.read ? 'font-normal text-gray-700' : 'font-semibold text-gray-900'}`}>
                {notification.title}
              </p>
              {!notification.read && (
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-1"></span>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
              {notification.message}
            </p>
            <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
          </div>
        </div>
      </Link>

      {/* Actions (visible on hover) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.read && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onMarkAsRead(notification.id);
            }}
            className="p-1.5 rounded-md bg-white hover:bg-gray-100 shadow-sm border border-gray-200"
            title="Mark as read"
          >
            <Check className="w-3.5 h-3.5 text-gray-600" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(notification.id);
          }}
          className="p-1.5 rounded-md bg-white hover:bg-red-50 shadow-sm border border-gray-200"
          title="Delete"
        >
          <X className="w-3.5 h-3.5 text-gray-600 hover:text-red-600" />
        </button>
      </div>
    </motion.div>
  );
}

/**
 * Notification Center dropdown component
 */
export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [loading, setLoading] = useState(false);

  // In production, would fetch from Supabase:
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     const { data } = await supabase
  //       .from('notifications')
  //       .select('*')
  //       .order('created_at', { ascending: false })
  //       .limit(10);
  //     setNotifications(data);
  //   };
  //   fetchNotifications();
  //
  //   // Subscribe to real-time updates
  //   const channel = supabase
  //     .channel('notifications')
  //     .on('postgres_changes',
  //       { event: 'INSERT', schema: 'public', table: 'notifications' },
  //       (payload) => {
  //         setNotifications(prev => [payload.new, ...prev]);
  //       }
  //     )
  //     .subscribe();
  //
  //   return () => supabase.removeChannel(channel);
  // }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id) => {
    // In production, would update Supabase:
    // await supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .eq('id', id);

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In production, would update Supabase:
    // await supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .in('id', notifications.filter(n => !n.read).map(n => n.id));

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setLoading(false);
  };

  const handleDelete = async (id) => {
    // In production, would delete from Supabase:
    // await supabase
    //   .from('notifications')
    //   .delete()
    //   .eq('id', id);

    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all notifications?')) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In production, would delete from Supabase:
    // await supabase
    //   .from('notifications')
    //   .delete()
    //   .in('id', notifications.map(n => n.id));

    setNotifications([]);
    setLoading(false);
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        ({unreadCount} unread)
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-1">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        disabled={loading}
                        className="text-xs font-medium text-primary-600 hover:text-primary-700 px-2 py-1 rounded hover:bg-primary-50 transition-colors disabled:opacity-50"
                        title="Mark all as read"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        disabled={loading}
                        className="text-xs font-medium text-gray-600 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                        title="Clear all"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-[28rem] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">No notifications</p>
                    <p className="text-xs text-gray-500">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <Link
                    to="/notifications"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center justify-center gap-1"
                  >
                    View all notifications
                    <span className="text-xs">→</span>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Helper function to format time ago
 */
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + 'y ago';

  interval = seconds / 2592000; // months
  if (interval > 1) return Math.floor(interval) + 'mo ago';

  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + 'd ago';

  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + 'h ago';

  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + 'm ago';

  return 'Just now';
}
