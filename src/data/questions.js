/**
 * Local question bank for the mini games.
 *
 * The games used to read these straight from Supabase, so with no backend
 * attached they sat on a loading spinner forever. These ship with the app and
 * keep the games playable; Supabase can override them once it's wired up.
 *
 * Shape matches the `questions` table exactly so either source drops in.
 */

export const QUESTIONS = [
  // Spanish
  { id: 'es-1', language: 'es', question_text: 'How do you say "Hello" in Spanish?', correct_answer: 'Hola', wrong_answer_1: 'Adiós', wrong_answer_2: 'Gracias', wrong_answer_3: 'Por favor' },
  { id: 'es-2', language: 'es', question_text: 'What does "Gracias" mean?', correct_answer: 'Thank you', wrong_answer_1: 'Please', wrong_answer_2: 'Sorry', wrong_answer_3: 'Goodbye' },
  { id: 'es-3', language: 'es', question_text: 'How do you say "Water" in Spanish?', correct_answer: 'Agua', wrong_answer_1: 'Leche', wrong_answer_2: 'Vino', wrong_answer_3: 'Pan' },
  { id: 'es-4', language: 'es', question_text: 'What does "Buenos días" mean?', correct_answer: 'Good morning', wrong_answer_1: 'Good night', wrong_answer_2: 'See you later', wrong_answer_3: 'How are you?' },
  { id: 'es-5', language: 'es', question_text: 'How do you say "Friend" in Spanish?', correct_answer: 'Amigo', wrong_answer_1: 'Hermano', wrong_answer_2: 'Vecino', wrong_answer_3: 'Maestro' },
  { id: 'es-6', language: 'es', question_text: 'What does "¿Cómo estás?" mean?', correct_answer: 'How are you?', wrong_answer_1: 'Where are you?', wrong_answer_2: 'What is your name?', wrong_answer_3: 'How old are you?' },
  { id: 'es-7', language: 'es', question_text: 'How do you say "Book" in Spanish?', correct_answer: 'Libro', wrong_answer_1: 'Mesa', wrong_answer_2: 'Silla', wrong_answer_3: 'Puerta' },
  { id: 'es-8', language: 'es', question_text: 'What does "La cuenta, por favor" mean?', correct_answer: 'The bill, please', wrong_answer_1: 'The menu, please', wrong_answer_2: 'A table for two', wrong_answer_3: 'Where is the exit?' },
  { id: 'es-9', language: 'es', question_text: 'How do you say "Tomorrow" in Spanish?', correct_answer: 'Mañana', wrong_answer_1: 'Ayer', wrong_answer_2: 'Hoy', wrong_answer_3: 'Ahora' },
  { id: 'es-10', language: 'es', question_text: 'What does "Me llamo" mean?', correct_answer: 'My name is', wrong_answer_1: 'I live in', wrong_answer_2: 'I want', wrong_answer_3: 'I am from' },

  // French
  { id: 'fr-1', language: 'fr', question_text: 'How do you say "Hello" in French?', correct_answer: 'Bonjour', wrong_answer_1: 'Merci', wrong_answer_2: 'Au revoir', wrong_answer_3: "S'il vous plaît" },
  { id: 'fr-2', language: 'fr', question_text: 'What does "Merci" mean?', correct_answer: 'Thank you', wrong_answer_1: 'Hello', wrong_answer_2: 'Excuse me', wrong_answer_3: 'Goodbye' },
  { id: 'fr-3', language: 'fr', question_text: 'How do you say "Bread" in French?', correct_answer: 'Pain', wrong_answer_1: 'Fromage', wrong_answer_2: 'Lait', wrong_answer_3: 'Eau' },
  { id: 'fr-4', language: 'fr', question_text: 'What does "Bonne nuit" mean?', correct_answer: 'Good night', wrong_answer_1: 'Good morning', wrong_answer_2: 'Good luck', wrong_answer_3: 'Good afternoon' },
  { id: 'fr-5', language: 'fr', question_text: 'How do you say "Cat" in French?', correct_answer: 'Chat', wrong_answer_1: 'Chien', wrong_answer_2: 'Oiseau', wrong_answer_3: 'Cheval' },
  { id: 'fr-6', language: 'fr', question_text: 'What does "Comment ça va ?" mean?', correct_answer: 'How are you?', wrong_answer_1: 'What time is it?', wrong_answer_2: 'Where do you live?', wrong_answer_3: 'What is this?' },
  { id: 'fr-7', language: 'fr', question_text: 'How do you say "Thank you very much" in French?', correct_answer: 'Merci beaucoup', wrong_answer_1: 'De rien', wrong_answer_2: 'Bien sûr', wrong_answer_3: "S'il te plaît" },
  { id: 'fr-8', language: 'fr', question_text: 'What does "Je voudrais" mean?', correct_answer: 'I would like', wrong_answer_1: 'I have', wrong_answer_2: 'I know', wrong_answer_3: 'I go' },
  { id: 'fr-9', language: 'fr', question_text: 'How do you say "Tomorrow" in French?', correct_answer: 'Demain', wrong_answer_1: 'Hier', wrong_answer_2: "Aujourd'hui", wrong_answer_3: 'Maintenant' },
  { id: 'fr-10', language: 'fr', question_text: 'What does "Où est la gare ?" mean?', correct_answer: 'Where is the station?', wrong_answer_1: 'Where is the hotel?', wrong_answer_2: 'How much is it?', wrong_answer_3: 'What is your name?' },

  // German
  { id: 'de-1', language: 'de', question_text: 'How do you say "Hello" in German?', correct_answer: 'Hallo', wrong_answer_1: 'Tschüss', wrong_answer_2: 'Danke', wrong_answer_3: 'Bitte' },
  { id: 'de-2', language: 'de', question_text: 'What does "Danke" mean?', correct_answer: 'Thank you', wrong_answer_1: 'Please', wrong_answer_2: 'Sorry', wrong_answer_3: 'Yes' },
  { id: 'de-3', language: 'de', question_text: 'How do you say "Water" in German?', correct_answer: 'Wasser', wrong_answer_1: 'Bier', wrong_answer_2: 'Milch', wrong_answer_3: 'Saft' },
  { id: 'de-4', language: 'de', question_text: 'What does "Guten Morgen" mean?', correct_answer: 'Good morning', wrong_answer_1: 'Good night', wrong_answer_2: 'Good evening', wrong_answer_3: 'Goodbye' },
  { id: 'de-5', language: 'de', question_text: 'How do you say "House" in German?', correct_answer: 'Haus', wrong_answer_1: 'Baum', wrong_answer_2: 'Stadt', wrong_answer_3: 'Straße' },
  { id: 'de-6', language: 'de', question_text: 'What does "Wie geht es dir?" mean?', correct_answer: 'How are you?', wrong_answer_1: 'Where are you going?', wrong_answer_2: 'What do you want?', wrong_answer_3: 'Who are you?' },
  { id: 'de-7', language: 'de', question_text: 'How do you say "Book" in German?', correct_answer: 'Buch', wrong_answer_1: 'Tisch', wrong_answer_2: 'Stuhl', wrong_answer_3: 'Fenster' },
  { id: 'de-8', language: 'de', question_text: 'What does "Ich heiße" mean?', correct_answer: 'My name is', wrong_answer_1: 'I am from', wrong_answer_2: 'I like', wrong_answer_3: 'I need' },

  // Japanese
  { id: 'ja-1', language: 'ja', question_text: 'How do you say "Hello" in Japanese?', correct_answer: 'Konnichiwa', wrong_answer_1: 'Sayonara', wrong_answer_2: 'Arigatou', wrong_answer_3: 'Sumimasen' },
  { id: 'ja-2', language: 'ja', question_text: 'What does "Arigatou" mean?', correct_answer: 'Thank you', wrong_answer_1: 'Excuse me', wrong_answer_2: 'Good morning', wrong_answer_3: 'Goodbye' },
  { id: 'ja-3', language: 'ja', question_text: 'How do you say "Water" in Japanese?', correct_answer: 'Mizu', wrong_answer_1: 'Ocha', wrong_answer_2: 'Gohan', wrong_answer_3: 'Sakana' },
  { id: 'ja-4', language: 'ja', question_text: 'What does "Ohayou gozaimasu" mean?', correct_answer: 'Good morning', wrong_answer_1: 'Good night', wrong_answer_2: 'Good evening', wrong_answer_3: 'See you tomorrow' },
  { id: 'ja-5', language: 'ja', question_text: 'How do you say "Delicious" in Japanese?', correct_answer: 'Oishii', wrong_answer_1: 'Kawaii', wrong_answer_2: 'Atsui', wrong_answer_3: 'Takai' },
  { id: 'ja-6', language: 'ja', question_text: 'What does "Sumimasen" mean?', correct_answer: 'Excuse me', wrong_answer_1: 'You are welcome', wrong_answer_2: 'Congratulations', wrong_answer_3: 'Good luck' },
  { id: 'ja-7', language: 'ja', question_text: 'How do you say "Friend" in Japanese?', correct_answer: 'Tomodachi', wrong_answer_1: 'Sensei', wrong_answer_2: 'Kazoku', wrong_answer_3: 'Gakusei' },
  { id: 'ja-8', language: 'ja', question_text: 'What does "Ikura desu ka?" mean?', correct_answer: 'How much is it?', wrong_answer_1: 'Where is it?', wrong_answer_2: 'What is it?', wrong_answer_3: 'When is it?' },

  // Italian
  { id: 'it-1', language: 'it', question_text: 'How do you say "Hello" in Italian?', correct_answer: 'Ciao', wrong_answer_1: 'Grazie', wrong_answer_2: 'Prego', wrong_answer_3: 'Scusa' },
  { id: 'it-2', language: 'it', question_text: 'What does "Grazie" mean?', correct_answer: 'Thank you', wrong_answer_1: 'Please', wrong_answer_2: 'Hello', wrong_answer_3: 'Sorry' },
  { id: 'it-3', language: 'it', question_text: 'How do you say "Coffee" in Italian?', correct_answer: 'Caffè', wrong_answer_1: 'Latte', wrong_answer_2: 'Acqua', wrong_answer_3: 'Vino' },
  { id: 'it-4', language: 'it', question_text: 'What does "Buonasera" mean?', correct_answer: 'Good evening', wrong_answer_1: 'Good morning', wrong_answer_2: 'Good luck', wrong_answer_3: 'Goodbye' },
  { id: 'it-5', language: 'it', question_text: 'How do you say "Beautiful" in Italian?', correct_answer: 'Bello', wrong_answer_1: 'Grande', wrong_answer_2: 'Piccolo', wrong_answer_3: 'Veloce' },
  { id: 'it-6', language: 'it', question_text: 'What does "Quanto costa?" mean?', correct_answer: 'How much does it cost?', wrong_answer_1: 'Where is it?', wrong_answer_2: 'What is it?', wrong_answer_3: 'Who is it?' },
];

/** Fisher-Yates shuffle on a copy. */
const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * A shuffled round of questions. Falls back to the whole bank when a language
 * doesn't have enough of its own.
 */
export const getQuestions = (language = null, limit = 10) => {
  const pool = language
    ? QUESTIONS.filter((question) => question.language === language)
    : QUESTIONS;

  const source = pool.length >= limit ? pool : QUESTIONS;
  return shuffle(source).slice(0, limit);
};
