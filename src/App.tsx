import { useState, useCallback } from 'react';
import type { GameState, DeviceMode, PlayableQuestion, AnswerLog, SessionResult } from './types/quiz';
import { generateSessionQuestions, recordCompletedSession } from './utils/sessionManager';
import { KioskHeader } from './components/KioskHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PromptModal } from './components/PromptModal';
import { CountdownOverlay } from './components/CountdownOverlay';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';

export function App() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');
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

  // Container styling for wide unfolded dual-screen Fold presets
  const getDeviceContainerClass = () => {
    switch (deviceMode) {
      case 'fold8':
        // Unfolded 7.6" wide screen (~1.16:1 aspect ratio)
        return 'w-full max-w-[1024px] h-full max-h-[880px] border border-slate-300 rounded-3xl shadow-xl overflow-hidden';
      case 'fold8ultra':
        // Unfolded 8.0" wide screen (~1.11:1 aspect ratio)
        return 'w-full max-w-[1100px] h-full max-h-[990px] border border-slate-300 rounded-3xl shadow-xl overflow-hidden';
      case 'auto':
      default:
        // Full dual screen on the physical device
        return 'w-full h-full';
    }
  };

  return (
    <div className="w-screen h-screen h-[100dvh] flex flex-col bg-slate-50 text-slate-900 overflow-hidden select-none">
      {/* Top minimal bar */}
      <KioskHeader
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onResetSession={() => {
          setResult(null);
          setGameState('idle');
        }}
      />

      {/* Main full unfolded dual-screen canvas */}
      <main className="flex-1 flex items-center justify-center p-0 md:p-4 overflow-hidden bg-slate-100/60">
        <div
          className={`relative flex flex-col bg-white overflow-hidden transition-all duration-300 ${getDeviceContainerClass()}`}
        >
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
        </div>
      </main>
    </div>
  );
}

export default App;
