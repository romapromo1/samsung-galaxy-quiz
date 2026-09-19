import React from 'react';
import type { SessionResult } from '../types/quiz';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  return (
    <div className="flex-1 flex flex-col justify-between items-center p-8 md:p-12 w-full h-full bg-white select-none uppercase">
      <div className="w-full text-center">
        <h2 className="text-xl md:text-3xl font-extrabold text-slate-400">
          ВРЕМЯ ВЫШЛО
        </h2>
      </div>

      {/* Main Score scaled down 25% */}
      <div className="flex flex-col items-center text-center space-y-6 my-auto">
        <span className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-800 leading-tight">
          КОЛИЧЕСТВО ПРАВИЛЬНЫХ ОТВЕТОВ:
        </span>
        <div className="text-7xl md:text-9xl lg:text-[12rem] font-black text-slate-900 tracking-tight leading-none">
          {result.correctCount}
        </div>
        <div className="text-xl md:text-3xl text-slate-500 font-extrabold pt-2">
          ВСЕГО ОТВЕЧЕНО: {result.totalAnswered}
        </div>
      </div>

      {/* Restart Button scaled down 25% */}
      <div className="w-full max-w-xl pb-4">
        <button
          onClick={onRestart}
          className="w-full h-20 md:h-24 bg-black text-white hover:bg-slate-800 active:scale-95 font-black text-2xl md:text-4xl shadow-xl transition-all cursor-pointer flex items-center justify-center border-2 border-black"
        >
          СЫГРАТЬ ЕЩЁ РАЗ
        </button>
      </div>
    </div>
  );
};
