import React from 'react';

interface WelcomeScreenProps {
  onPlayClick: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPlayClick }) => {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-8 w-full h-full bg-white select-none uppercase">
      <div className="w-full flex flex-col items-center text-center space-y-12 max-w-3xl px-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tight">
          КВИЗ
        </h1>

        <button
          onClick={onPlayClick}
          className="w-full max-w-xl h-28 md:h-36 rounded-3xl md:rounded-[40px] bg-black text-white hover:bg-slate-800 active:scale-95 text-4xl md:text-6xl font-black tracking-wider shadow-2xl transition-all duration-150 cursor-pointer flex items-center justify-center"
        >
          PLAY
        </button>
      </div>
    </div>
  );
};
