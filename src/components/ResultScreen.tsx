import React from 'react';
import type { SessionResult } from '../types/quiz';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between items-center p-3 sm:p-5 md:p-6 lg:p-8 max-w-3xl mx-auto bg-white select-none uppercase overflow-y-auto">
      <div className="w-full text-center">
        <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-slate-400">
          ВРЕМЯ ВЫШЛО
        </h2>
      </div>

      {/* Main Score: responsive */}
      <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4 my-auto">
        <span className="text-sm sm:text-base md:text-xl font-black text-slate-800 leading-tight">
          КОЛИЧЕСТВО ПРАВИЛЬНЫХ ОТВЕТОВ:
        </span>
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-none">
          {result.correctCount}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-slate-500 font-extrabold pt-1">
          ВСЕГО ОТВЕЧЕНО: {result.totalAnswered}
        </div>
      </div>

      {/* Restart Button: responsive */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md pb-2 sm:pb-3">
        <button
          onClick={onRestart}
          className="w-full h-12 sm:h-14 md:h-16 bg-black text-white hover:bg-slate-800 active:scale-95 font-black text-xs sm:text-sm md:text-base shadow-xl transition-all cursor-pointer flex items-center justify-center border-2 border-black"
        >
          СЫГРАТЬ ЕЩЁ РАЗ
        </button>
      </div>
    </div>
  );
};
