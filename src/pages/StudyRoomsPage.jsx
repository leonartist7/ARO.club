import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Users,
  Plus,
  X,
  User,
  Globe,
  Lock as LockIcon,
  Play,
  LogIn
} from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

export default function StudyRoomsPage() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    description: '',
    language: 'French',
    max_participants: 6,
    is_public: true,
    theme: 'modern'
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);

      const { data: roomsData, error } = await supabase
        .from('study_rooms')
        .select(`
          *,
          profiles:host_user_id(name, photo),
          study_room_participants(count)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRooms(roomsData || []);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!user) {
      alert('Please log in to create a study room');
      return;
    }

    if (!newRoom.name.trim()) {
      alert('Please enter a room name');
      return;
    }

    try {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      const { data, error } = await supabase
        .from('study_rooms')
        .insert({
          ...newRoom,
          host_user_id: user.id,
          room_code: roomCode
        })
        .select()
        .single();

      if (error) throw error;

      // Auto-join the host
      await supabase
        .from('study_room_participants')
        .insert({
          room_id: data.id,
          user_id: user.id
        });

      setShowCreateModal(false);
      setNewRoom({
        name: '',
        description: '',
        language: 'French',
        max_participants: 6,
        is_public: true,
        theme: 'modern'
      });

      loadRooms();
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create study room');
    }
  };

  const joinRoom = async (room) => {
    if (!user) {
      alert('Please log in to join a study room');
      return;
    }

    try {
      const { error } = await supabase
        .from('study_room_participants')
        .insert({
          room_id: room.id,
          user_id: user.id
        });

      if (error) {
        if (error.code === '23505') {
          alert('You are already in this room');
        } else {
          throw error;
        }
      } else {
        alert(`Joined ${room.name}! Room code: ${room.room_code}`);
        loadRooms();
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Failed to join room');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Users className="w-10 h-10 text-purple-600" />
              Study Rooms
            </h1>
            <p className="text-lg text-gray-600">
              Join collaborative learning spaces with other students
            </p>
          </div>

          {user && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Room
            </Button>
          )}
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => {
            const participantCount = room.study_room_participants?.[0]?.count || 0;
            const isFull = participantCount >= room.max_participants;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                {/* Room Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {room.is_public ? (
                        <Globe className="w-5 h-5 text-green-500" />
                      ) : (
                        <LockIcon className="w-5 h-5 text-gray-400" />
                      )}
                      <h3 className="font-bold text-gray-900">{room.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{room.description || 'No description'}</p>
                  </div>
                </div>

                {/* Room Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">
                      Host: {room.profiles?.name || 'Unknown'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {room.language}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {room.theme}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">
                      {participantCount} / {room.max_participants} participants
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">
                      Code: <span className="font-mono font-bold">{room.room_code}</span>
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isFull ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${(participantCount / room.max_participants) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Join Button */}
                <Button
                  onClick={() => joinRoom(room)}
                  disabled={isFull || !user}
                  variant={isFull ? 'outline' : 'primary'}
                  className="w-full"
                >
                  {!user ? (
                    <>
                      <LogIn className="w-4 h-4 inline mr-1" />
                      Login to Join
                    </>
                  ) : isFull ? (
                    'Room Full'
                  ) : (
                    <>
                      <Play className="w-4 h-4 inline mr-1" />
                      Join Room
                    </>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {rooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">No active study rooms</p>
            {user && (
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4 inline mr-1" />
                Create the First Room
              </Button>
            )}
          </motion.div>
        )}

        {/* Create Room Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Study Room</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Name *
                  </label>
                  <input
                    type="text"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., French Conversation Practice"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="3"
                    placeholder="What will you study together?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={newRoom.language}
                    onChange={(e) => setNewRoom({ ...newRoom, language: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="English">English</option>
                    <option value="German">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="20"
                    value={newRoom.max_participants}
                    onChange={(e) => setNewRoom({ ...newRoom, max_participants: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_public"
                    checked={newRoom.is_public}
                    onChange={(e) => setNewRoom({ ...newRoom, is_public: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="is_public" className="text-sm text-gray-700">
                    Make room public
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={createRoom}
                    className="flex-1"
                  >
                    Create Room
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
