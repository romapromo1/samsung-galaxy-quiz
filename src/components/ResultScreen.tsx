import React, { useEffect, useState } from 'react';
import { Trophy, RotateCcw, Award, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { SessionResult } from '../types/quiz';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#6366f1', '#10b981', '#ffffff']
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  }, []);

  return (
    <div className="relative flex-1 flex flex-col justify-between items-center p-6 md:p-10 w-full max-w-3xl mx-auto overflow-y-auto">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm md:text-base font-semibold">
        <Award size={20} />
        <span>Время вышло! Сессия завершена</span>
      </div>

      {/* Main Score Display */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 my-auto py-6 w-full">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
          <Trophy size={54} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-medium text-slate-300">
            Ваш результат
          </h2>
          <div className="text-6xl md:text-8xl font-black text-white tracking-tight">
            {result.correctCount}
          </div>
          <p className="text-lg md:text-xl font-semibold text-blue-400">
            {result.correctCount === 1
              ? 'правильный ответ'
              : result.correctCount >= 2 && result.correctCount <= 4
              ? 'правильных ответа'
              : 'правильных ответов'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
            <span className="text-xs text-slate-400 block mb-1">Всего отвечено</span>
            <span className="text-2xl font-bold text-white">{result.totalAnswered}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
            <span className="text-xs text-slate-400 block mb-1">Точность</span>
            <span className="text-2xl font-bold text-emerald-400">{result.percentage}%</span>
          </div>
        </div>

        {/* Informative note about no repeats */}
        <p className="text-xs md:text-sm text-slate-400 max-w-md">
          Сессия сохранена в памяти устройства. В следующем раунде вопросы не будут повторяться!
        </p>

        {/* Optional Review Toggle */}
        {result.answers.length > 0 && (
          <div className="w-full max-w-md">
            <button
              onClick={() => setShowReview(!showReview)}
              className="flex items-center justify-center gap-2 text-xs md:text-sm text-blue-400 hover:text-blue-300 py-2 mx-auto cursor-pointer"
            >
              <span>{showReview ? 'Скрыть разбор ответов' : 'Посмотреть ответы сессии'}</span>
              {showReview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showReview && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1 text-left">
                {result.answers.map((a, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1"
                  >
                    <div className="flex items-start gap-2">
                      {a.isCorrect ? (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <span className="text-slate-200 font-medium">{a.questionText}</span>
                    </div>
                    {!a.isCorrect && (
                      <div className="pl-6 text-[11px] text-slate-400">
                        Правильно: <span className="text-emerald-400 font-semibold">{a.correctText}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Restart Button */}
      <div className="relative z-10 w-full max-w-md pb-4">
        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-3 py-5 md:py-6 px-8 rounded-3xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-2xl md:text-3xl shadow-xl shadow-blue-500/25 transition-all cursor-pointer border border-blue-400/40"
        >
          <RotateCcw size={28} />
          <span>Сыграть ещё раз</span>
        </button>
      </div>
    </div>
  );
};
