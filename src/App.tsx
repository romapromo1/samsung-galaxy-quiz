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

  // User taps "PLAY" on welcome screen
  const handlePlayClick = () => {
    setGameState('modal');
  };

  // User confirms in prompt modal ("СТАРТ")
  const handleStartFromModal = () => {
    // Generate filtered randomized questions obeying session memory constraints
    const sessionDeck = generateSessionQuestions();
    setQuestions(sessionDeck);
    setGameState('countdown');
  };

  // Countdown 3, 2, 1 completes
  const handleCountdownFinish = () => {
    setGameState('quiz');
  };

  // 60-second quiz ends
  const handleQuizFinish = useCallback(
    (answers: AnswerLog[], correctCount: number, shownIds: number[]) => {
      // Save session question IDs in memory (strictly 0 repeats in n+1, <=2 in n+2)
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

  // Play again
  const handleRestart = () => {
    setResult(null);
    setGameState('idle');
  };

  // Container styling depending on simulated device preset
  const getDeviceContainerClass = () => {
    switch (deviceMode) {
      case 'fold8':
        return 'w-full max-w-[768px] h-[890px] max-h-[92dvh] rounded-[32px] border-[8px] border-slate-700/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden';
      case 'fold8ultra':
        return 'w-full max-w-[860px] h-[950px] max-h-[92dvh] rounded-[36px] border-[8px] border-slate-600/80 shadow-[0_0_55px_rgba(0,0,0,0.8)] overflow-hidden';
      case 'auto':
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="w-screen h-screen h-[100dvh] flex flex-col bg-[#070a10] text-white overflow-hidden select-none">
      {/* Kiosk top bar with branding, device selector and fullscreen */}
      <KioskHeader
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onResetSession={() => {
          setResult(null);
          setGameState('idle');
        }}
      />

      {/* Main viewport canvas */}
      <main className="flex-1 flex items-center justify-center p-0 md:p-3 overflow-hidden bg-gradient-to-b from-[#090d16] to-[#04060a]">
        <div
          className={`relative flex flex-col bg-[#0a0f1d] overflow-hidden transition-all duration-300 ${getDeviceContainerClass()}`}
        >
          {/* Subtle inner grid styling */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          {/* Screen Content */}
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
