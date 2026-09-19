export interface RawQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  correctAnswer: string;
}

export interface ShuffledOption {
  text: string;
  isCorrect: boolean;
  letter: string; // 'A', 'B', 'C', 'D'
}

export interface PlayableQuestion {
  id: number;
  question: string;
  options: ShuffledOption[];
}

export interface AnswerLog {
  questionId: number;
  questionText: string;
  selectedText: string;
  correctText: string;
  isCorrect: boolean;
}

export interface SessionResult {
  totalAnswered: number;
  correctCount: number;
  percentage: number;
  answers: AnswerLog[];
  completedAt: number;
}

export type GameState = 'idle' | 'modal' | 'countdown' | 'quiz' | 'result';

export type DeviceMode = 'auto' | 'fold8' | 'fold8ultra';
