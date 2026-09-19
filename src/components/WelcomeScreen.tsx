import React from 'react';
import { Play, Sparkles, Timer, ShieldCheck } from 'lucide-react';

interface WelcomeScreenProps {
  onPlayClick: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPlayClick }) => {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-between p-6 md:p-10 w-full overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-transparent rounded-full blur-3xl pointer-events-none animate-calm-pulse" />

      {/* Top Tagline */}
      <div className="relative z-10 flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium backdrop-blur-md">
        <Sparkles size={16} className="text-blue-400" />
        <span>Бренд-зона «Территория Samsung Galaxy»</span>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4 space-y-6">
        <div className="space-y-3">
          <h2 className="text-sm md:text-base font-semibold tracking-widest uppercase text-blue-400">
            Интерактивная викторина
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Galaxy Quiz Challenge
          </h1>
          <p className="text-base md:text-xl text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
            Проверьте свои знания об истории Samsung Galaxy, технологиях и фестивале New Star Weekend
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full pt-4">
          <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <Timer className="text-blue-400 mb-1.5" size={24} />
            <span className="text-xs md:text-sm font-semibold text-white">60 секунд</span>
            <span className="text-[11px] text-slate-400">на максимум ответов</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <Sparkles className="text-indigo-400 mb-1.5" size={24} />
            <span className="text-xs md:text-sm font-semibold text-white">170 вопросов</span>
            <span className="text-[11px] text-slate-400">в общем банке</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <ShieldCheck className="text-emerald-400 mb-1.5" size={24} />
            <span className="text-xs md:text-sm font-semibold text-white">Без повторов</span>
            <span className="text-[11px] text-slate-400">новая подборка</span>
          </div>
        </div>
      </div>

      {/* Bottom Giant Play Button */}
      <div className="relative z-10 w-full max-w-md pb-4">
        <button
          onClick={onPlayClick}
          className="group w-full relative flex items-center justify-center gap-4 py-5 md:py-6 px-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-bold text-2xl md:text-3xl shadow-xl shadow-blue-500/25 transition-all duration-200 border border-blue-400/30 cursor-pointer"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={28} className="fill-white text-white translate-x-0.5" />
          </div>
          <span className="tracking-wide">PLAY</span>
        </button>
      </div>
    </div>
  );
};
