import React from 'react';
import type { SessionResult } from '../types/quiz';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  return (
    <div className="flex-1 flex flex-col justify-between items-center p-8 md:p-16 w-full h-full bg-white select-none">
      <div className="w-full text-center">
        <h2 className="text-2xl md:text-4xl font-medium text-slate-400">
          Время вышло
        </h2>
      </div>

      {/* Main Score */}
      <div className="flex flex-col items-center text-center space-y-6 my-auto">
        <span className="text-3xl md:text-5xl font-semibold text-slate-600">
          Количество правильных ответов:
        </span>
        <div className="text-8xl md:text-[14rem] font-black text-slate-900 tracking-tight leading-none">
          {result.correctCount}
        </div>
        <div className="text-2xl md:text-4xl text-slate-400 font-medium pt-2">
          Всего отвечено: {result.totalAnswered}
        </div>
      </div>

      {/* Restart Button */}
      <div className="w-full max-w-xl pb-4">
        <button
          onClick={onRestart}
          className="w-full h-24 md:h-32 rounded-3xl md:rounded-[36px] bg-black text-white hover:bg-slate-800 active:scale-95 font-bold text-3xl md:text-5xl shadow-2xl transition-all cursor-pointer flex items-center justify-center"
        >
          Сыграть ещё раз
        </button>
      </div>
    </div>
  );
};
