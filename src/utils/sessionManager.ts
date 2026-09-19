import rawQuestions from '../data/questions.json';
import type { RawQuestion, PlayableQuestion, ShuffledOption } from '../types/quiz';

const STORAGE_KEY = 'samsung_nsw26_quiz_session_history';

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getSessionHistory(): number[][] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(-2); // keep only last 2
    }
  } catch (e) {
    console.error('Error reading session history', e);
  }
  return [];
}

export function recordCompletedSession(shownQuestionIds: number[]): void {
  if (!shownQuestionIds || shownQuestionIds.length === 0) return;
  const history = getSessionHistory();
  // push current session and keep only the last 2 sessions [n-2, n-1]
  const updated = [...history, shownQuestionIds].slice(-2);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving session history', e);
  }
}

export function clearSessionHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing session history', e);
  }
}

const LETTER_LABELS = ['A', 'B', 'C', 'D'];

export function preparePlayableQuestion(q: RawQuestion): PlayableQuestion {
  // Pair options with their correctness
  const paired = q.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === q.correctIndex
  }));

  // Shuffle options so correct answer is not on static letter
  const shuffled = shuffleArray(paired);

  const options: ShuffledOption[] = shuffled.map((item, idx) => ({
    text: item.text,
    isCorrect: item.isCorrect,
    letter: LETTER_LABELS[idx] || String.fromCharCode(65 + idx)
  }));

  return {
    id: q.id,
    question: q.question,
    options
  };
}

/**
 * Builds a randomized question queue for the new session obeying rules:
 * 1. 0 questions from immediately preceding session (n-1)
 * 2. At most 2 questions from session two steps ago (n-2)
 * 3. No repetitions within session
 */
export function generateSessionQuestions(): PlayableQuestion[] {
  const all: RawQuestion[] = rawQuestions;
  const history = getSessionHistory();

  // prev1 is session (n-1), prev2 is session (n-2)
  const prev1Ids = new Set<number>(history.length >= 1 ? history[history.length - 1] : []);
  const prev2Ids = new Set<number>(history.length >= 2 ? history[history.length - 2] : []);

  // Questions from prev2 that are NOT in prev1
  const eligibleFromPrev2 = Array.from(prev2Ids)
    .filter(id => !prev1Ids.has(id))
    .map(id => all.find(q => q.id === id))
    .filter((q): q is RawQuestion => q !== undefined);

  // Fresh questions: not in prev1 and not in prev2
  const freshQuestions = all.filter(q => !prev1Ids.has(q.id) && !prev2Ids.has(q.id));

  // Pick up to 2 questions from prev2 (at most 2, user specified: "может быть максимум 2 вопроса")
  const shuffledPrev2 = shuffleArray(eligibleFromPrev2);
  const countFromPrev2 = Math.min(2, shuffledPrev2.length);
  const pickedFromPrev2 = shuffledPrev2.slice(0, countFromPrev2);

  // Fresh pool shuffled
  const shuffledFresh = shuffleArray(freshQuestions);

  // Combine and shuffle together so prev2 questions are randomly distributed
  const combined = shuffleArray([...pickedFromPrev2, ...shuffledFresh]);

  return combined.map(preparePlayableQuestion);
}
