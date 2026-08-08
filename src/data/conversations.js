import teachersData from './teachers.json';

/**
 * Local chat threads.
 *
 * Chat is Supabase-only in production, which left the page crashing (it read
 * `user.id` with no session) and unstyleable with no backend. These seed
 * threads keep the UI real and designable; Supabase takes over once a session
 * exists.
 */

const seedTeachers = teachersData.slice(0, 4);

const minutesAgo = (minutes) =>
  new Date(Date.now() - minutes * 60000).toISOString();

/** Scripted openers so each thread reads like a real conversation. */
const scripts = [
  [
    { from: 'them', text: "Hi! I saw you booked the café conversation class - looking forward to meeting you!" },
    { from: 'me', text: 'Me too! Should I prepare anything beforehand?' },
    { from: 'them', text: 'Just bring your curiosity. Maybe think of three topics you enjoy talking about.' },
  ],
  [
    { from: 'them', text: 'Bonjour! Ready for the market tour on Saturday?' },
    { from: 'me', text: 'Yes! Where exactly should we meet?' },
    { from: 'them', text: "By the main entrance at 10am. I'll be wearing a yellow scarf." },
  ],
  [
    { from: 'me', text: 'Hello! Do you have space in next week’s cooking class?' },
    { from: 'them', text: 'I do - two spots left. Any allergies I should know about?' },
  ],
  [
    { from: 'them', text: 'Great work today, your pronunciation improved a lot!' },
    { from: 'me', text: 'Thank you! The tongue twisters really helped.' },
  ],
];

export const MOCK_CONVERSATIONS = seedTeachers.map((teacher, index) => {
  const script = scripts[index % scripts.length];
  const base = (index + 1) * 45;

  const messages = script.map((line, position) => ({
    id: `msg-${index}-${position}`,
    conversation_id: `conv-${index}`,
    sender_id: line.from === 'me' ? 'me' : teacher.id,
    message_text: line.text,
    message_type: 'text',
    read: true,
    created_at: minutesAgo(base - position * 6),
  }));

  return {
    id: `conv-${index}`,
    student_id: 'me',
    teacher_id: teacher.id,
    otherPerson: {
      id: teacher.id,
      name: teacher.name,
      avatar: teacher.photo,
    },
    isStudent: true,
    last_message_at: messages[messages.length - 1].created_at,
    unread_count: index === 0 ? 1 : 0,
    messages,
  };
});

/** Messages for one thread, oldest first. */
export const mockMessagesFor = (conversationId) =>
  MOCK_CONVERSATIONS.find((conv) => conv.id === conversationId)?.messages ?? [];
