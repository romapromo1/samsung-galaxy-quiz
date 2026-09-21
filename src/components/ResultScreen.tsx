import React from 'react';
import type { SessionResult } from '../types/quiz';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 max-w-3xl mx-auto bg-white select-none uppercase overflow-y-auto">
      <div className="w-full text-center">
        <h2 className="text-xs sm:text-sm md:text-lg font-extrabold text-slate-400">
          ВРЕМЯ ВЫШЛО
        </h2>
      </div>

      {/* Main Score */}
      <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 md:space-y-4 my-auto">
        <span className="text-sm sm:text-base md:text-2xl font-black text-slate-800 leading-tight">
          КОЛИЧЕСТВО ПРАВИЛЬНЫХ ОТВЕТОВ:
        </span>
        <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#1428a0] tracking-tight leading-none">
          {result.correctCount}
        </div>
        <div className="text-xs sm:text-sm md:text-lg text-slate-500 font-extrabold pt-1">
          ВСЕГО ОТВЕЧЕНО: {result.totalAnswered}
        </div>
      </div>

      {/* Restart Button */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md pb-2 sm:pb-3">
        <button
          onClick={onRestart}
          className="w-full h-14 sm:h-16 md:h-20 bg-[#1428a0] text-white hover:bg-[#0f1f80] active:scale-95 font-black text-base sm:text-xl md:text-2xl tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center border-2 border-[#1428a0]"
        >
          СЫГРАТЬ ЕЩЁ РАЗ
        </button>
      </div>
    </div>
  );
};
