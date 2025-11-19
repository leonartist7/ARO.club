import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Send, Search, ArrowLeft, MoreVertical } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    loadConversations();

    // Subscribe to new conversations
    const conversationSubscription = supabase
      .channel('conversations')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'conversations',
        filter: `student_id=eq.${user.id},teacher_id=eq.${user.id}`
      }, (payload) => {
        loadConversations();
      })
      .subscribe();

    return () => {
      conversationSubscription.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);

      // Subscribe to new messages in this conversation
      const messageSubscription = supabase
        .channel(`messages:${selectedConversation.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation.id}`
        }, (payload) => {
          setMessages(prev => [...prev, payload.new]);
          scrollToBottom();
        })
        .subscribe();

      return () => {
        messageSubscription.unsubscribe();
      };
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          student:student_id(id, name, avatar),
          teacher:teacher_id(id, name, avatar)
        `)
        .or(`student_id.eq.${user.id},teacher_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      // Get the other person in each conversation
      const conversationsWithOther = data?.map(conv => {
        const isStudent = conv.student_id === user.id;
        return {
          ...conv,
          otherPerson: isStudent ? conv.teacher : conv.student,
          isStudent,
        };
      });

      setConversations(conversationsWithOther || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversation.id,
          sender_id: user.id,
          message_text: newMessage.trim(),
          message_type: 'text',
        });

      if (error) throw error;

      // Check for social butterfly achievement
      const { data: messageCount } = await supabase
        .from('messages')
        .select('id', { count: 'exact' })
        .eq('sender_id', user.id);

      if (messageCount?.length >= 10) {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: 'social_butterfly',
        }).catch(() => {}); // Ignore if already has achievement
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.otherPerson?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading chats...</div>
      </div>
    );
  }

  // Mobile view: Show either conversations list or chat
  const isMobile = true; // In real app, use window.innerWidth < 768
  const showConversationsList = !selectedConversation || !isMobile;
  const showChat = selectedConversation && (isMobile ? !showConversationsList : true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Conversations List */}
        {showConversationsList && (
          <div className={`${isMobile ? 'w-full' : 'w-96'} border-r border-gray-200 bg-white flex flex-col`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                💬 Chats
              </h1>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-gray-600">
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Book an experience to start chatting with teachers!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredConversations.map((conv) => {
                    const unreadCount = conv.isStudent
                      ? conv.unread_count_student
                      : conv.unread_count_teacher;

                    return (
                      <motion.button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-yellow-50' : ''
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0">
                            {conv.otherPerson?.avatar ? '👤' : '👤'}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between mb-1">
                              <h3 className="font-semibold text-gray-800 truncate">
                                {conv.otherPerson?.name || 'Unknown'}
                              </h3>
                              {conv.last_message_at && (
                                <span className="text-xs text-gray-500 ml-2">
                                  {new Date(conv.last_message_at).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conv.last_message || 'No messages yet'}
                            </p>
                          </div>

                          {/* Unread Badge */}
                          {unreadCount > 0 && (
                            <div className="bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                              {unreadCount}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat View */}
        {showChat && (
          <div className={`${isMobile ? 'w-full' : 'flex-1'} bg-white flex flex-col`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              {isMobile && (
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl">
                👤
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-gray-800">
                  {selectedConversation.otherPerson?.name || 'Unknown'}
                </h2>
                <p className="text-xs text-gray-500">
                  {selectedConversation.isStudent ? 'Teacher' : 'Student'}
                </p>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Start the conversation!</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const isOwn = message.sender_id === user.id;
                  const showAvatar = index === 0 || messages[index - 1].sender_id !== message.sender_id;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      {!isOwn && showAvatar && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0" />
                      )}
                      {!isOwn && !showAvatar && <div className="w-8" />}

                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                          isOwn
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.message_text}</p>
                        <p className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-gray-500'}`}>
                          {new Date(message.created_at).toLocaleTimeString(undefined, {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? '...' : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Empty state (desktop) */}
        {!selectedConversation && !isMobile && (
          <div className="flex-1 bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
