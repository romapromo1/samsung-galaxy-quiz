import React from 'react';

interface WelcomeScreenProps {
  onPlayClick: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPlayClick }) => {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-6 sm:p-8 w-full h-full bg-white select-none uppercase">
      <div className="w-full flex flex-col items-center text-center space-y-8 sm:space-y-10 max-w-2xl px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight">
          КВИЗ
        </h1>

        <button
          onClick={onPlayClick}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md h-16 sm:h-20 md:h-24 bg-black text-white hover:bg-slate-800 active:scale-95 text-2xl sm:text-3xl md:text-4xl font-black tracking-wider shadow-xl transition-all duration-150 cursor-pointer flex items-center justify-center border-2 border-black"
        >
          PLAY
        </button>
      </div>
    </div>
  );
};
