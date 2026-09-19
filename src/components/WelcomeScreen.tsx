import React from 'react';

interface WelcomeScreenProps {
  onPlayClick: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPlayClick }) => {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-8 w-full h-full bg-white select-none">
      <div className="flex flex-col items-center text-center space-y-10 max-w-xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
          Квиз
        </h1>

        <button
          onClick={onPlayClick}
          className="w-64 h-24 md:w-80 md:h-28 rounded-3xl bg-black text-white hover:bg-slate-800 active:scale-95 text-3xl md:text-4xl font-bold tracking-wider shadow-lg transition-all duration-150 cursor-pointer flex items-center justify-center"
        >
          Play
        </button>
      </div>
    </div>
  );
};
