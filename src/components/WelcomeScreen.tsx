import React from 'react';

interface WelcomeScreenProps {
  onPlayClick: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPlayClick }) => {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-6 sm:p-8 w-full h-full bg-white select-none uppercase">
      <div className="w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10 max-w-3xl px-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-snug tracking-tight font-brand-headline max-w-3xl">
          КАК МНОГО ТЫ ЗНАЕШЬ О SAMSUNG GALAXY И ФЕСТИВАЛЯХ NEW STAR?
        </h1>

        <button
          onClick={onPlayClick}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md h-14 sm:h-16 md:h-20 bg-[#1428a0] text-white hover:bg-[#0f1f80] active:scale-95 text-xl sm:text-2xl md:text-3xl font-black tracking-wider shadow-xl transition-all duration-150 cursor-pointer flex items-center justify-center border-2 border-[#1428a0]"
        >
          НАЧАТЬ
        </button>
      </div>
    </div>
  );
};
