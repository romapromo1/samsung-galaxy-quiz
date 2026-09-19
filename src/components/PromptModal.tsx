import React from 'react';
import { Timer, ArrowRight, X } from 'lucide-react';

interface PromptModalProps {
  onStart: () => void;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#151c2d] to-[#0e1422] border border-white/20 rounded-[36px] p-8 md:p-12 shadow-2xl shadow-blue-900/30 flex flex-col items-center text-center space-y-8">
        
        {/* Close button in top-right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
          <Timer size={44} />
        </div>

        {/* Instruction text exactly as requested by user */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Готовы к викторине?
          </h3>
          <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed">
            Ответьте на максимальное количество вопросов за 60 секунд. Если готовы, жмите «СТАРТ»
          </p>
        </div>

        {/* Giant Start Button */}
        <button
          onClick={onStart}
          className="w-full flex items-center justify-center gap-3 py-5 md:py-6 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-extrabold text-2xl md:text-3xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer border border-blue-400/40"
        >
          <span>СТАРТ</span>
          <ArrowRight size={32} />
        </button>
      </div>
    </div>
  );
};
