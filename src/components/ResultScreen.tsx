import React from 'react';
import type { SessionResult } from '../types/quiz';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  return (
    <div className="flex-1 flex flex-col justify-between items-center p-8 md:p-14 w-full h-full bg-white select-none">
      <div className="w-full text-center">
        <h2 className="text-xl md:text-2xl font-medium text-slate-500">
          Время вышло
        </h2>
      </div>

      {/* Main Score */}
      <div className="flex flex-col items-center text-center space-y-4 my-auto">
        <span className="text-2xl md:text-3xl font-medium text-slate-600">
          Количество правильных ответов:
        </span>
        <div className="text-7xl md:text-9xl font-black text-slate-900 tracking-tight">
          {result.correctCount}
        </div>
        <div className="text-lg md:text-xl text-slate-500 font-medium pt-2">
          Всего отвечено: {result.totalAnswered}
        </div>
      </div>

      {/* Restart Button */}
      <div className="w-full max-w-md pb-4">
        <button
          onClick={onRestart}
          className="w-full py-5 md:py-6 px-8 rounded-3xl bg-black text-white hover:bg-slate-800 active:scale-95 font-bold text-2xl md:text-3xl shadow-lg transition-all cursor-pointer flex items-center justify-center"
        >
          Сыграть ещё раз
        </button>
      </div>
    </div>
  );
};
