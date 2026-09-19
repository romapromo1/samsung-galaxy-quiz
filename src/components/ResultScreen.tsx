import React from 'react';
import type { SessionResult } from '../types/quiz';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  return (
    <div className="flex-1 flex flex-col justify-between items-center p-8 md:p-16 w-full h-full bg-white select-none uppercase">
      <div className="w-full text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-400">
          ВРЕМЯ ВЫШЛО
        </h2>
      </div>

      {/* Main Score: 40% larger */}
      <div className="flex flex-col items-center text-center space-y-8 my-auto">
        <span className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-800 leading-tight">
          КОЛИЧЕСТВО ПРАВИЛЬНЫХ ОТВЕТОВ:
        </span>
        <div className="text-9xl md:text-[18rem] lg:text-[22rem] font-black text-slate-900 tracking-tight leading-none">
          {result.correctCount}
        </div>
        <div className="text-3xl md:text-5xl lg:text-6xl text-slate-500 font-extrabold pt-4">
          ВСЕГО ОТВЕЧЕНО: {result.totalAnswered}
        </div>
      </div>

      {/* Restart Button: 40% larger */}
      <div className="w-full max-w-3xl pb-6">
        <button
          onClick={onRestart}
          className="w-full h-28 md:h-40 rounded-3xl md:rounded-[44px] bg-black text-white hover:bg-slate-800 active:scale-95 font-black text-4xl md:text-6xl lg:text-7xl shadow-2xl transition-all cursor-pointer flex items-center justify-center"
        >
          СЫГРАТЬ ЕЩЁ РАЗ
        </button>
      </div>
    </div>
  );
};
