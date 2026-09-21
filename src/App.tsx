import { useState, useCallback } from 'react';
import type { GameState, PlayableQuestion, AnswerLog, SessionResult } from './types/quiz';
import { generateSessionQuestions, recordCompletedSession } from './utils/sessionManager';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PromptModal } from './components/PromptModal';
import { CountdownOverlay } from './components/CountdownOverlay';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';

export function App() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [questions, setQuestions] = useState<PlayableQuestion[]>([]);
  const [result, setResult] = useState<SessionResult | null>(null);

  const handlePlayClick = () => {
    setGameState('modal');
  };

  const handleStartFromModal = () => {
    const sessionDeck = generateSessionQuestions();
    setQuestions(sessionDeck);
    setGameState('countdown');
  };

  const handleCountdownFinish = () => {
    setGameState('quiz');
  };

  const handleQuizFinish = useCallback(
    (answers: AnswerLog[], correctCount: number, shownIds: number[]) => {
      recordCompletedSession(shownIds);

      const totalAnswered = answers.length;
      const percentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

      setResult({
        totalAnswered,
        correctCount,
        percentage,
        answers,
        completedAt: Date.now(),
      });

      setGameState('result');
    },
    []
  );

  const handleRestart = () => {
    setResult(null);
    setGameState('idle');
  };

  return (
    <div className="w-full h-full h-[100dvh] max-h-[100dvh] flex flex-col bg-white text-slate-900 overflow-hidden select-none">
      {/* Main full-screen edge-to-edge area */}
      <main className="flex-1 flex flex-col w-full h-full min-h-0 bg-white overflow-hidden">
        {gameState === 'idle' && <WelcomeScreen onPlayClick={handlePlayClick} />}

        {gameState === 'modal' && (
          <>
            <WelcomeScreen onPlayClick={handlePlayClick} />
            <PromptModal
              onStart={handleStartFromModal}
              onClose={() => setGameState('idle')}
            />
          </>
        )}

        {gameState === 'countdown' && (
          <CountdownOverlay onFinish={handleCountdownFinish} />
        )}

        {gameState === 'quiz' && (
          <QuizScreen questions={questions} onFinish={handleQuizFinish} />
        )}

        {gameState === 'result' && result && (
          <ResultScreen result={result} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}

export default App;
