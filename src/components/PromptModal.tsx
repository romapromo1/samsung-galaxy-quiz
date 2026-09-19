import React from 'react';

interface PromptModalProps {
  onStart: () => void;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[36px] md:rounded-[48px] p-8 md:p-16 shadow-2xl flex flex-col items-center text-center space-y-10">
        
        {/* Exact prompt text */}
        <p className="text-3xl md:text-5xl lg:text-6xl text-slate-900 font-bold leading-relaxed tracking-tight">
          Ответьте на максимальное количество вопросов за 60 секунд. Если готовы, жмите «СТАРТ»
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-6 pt-4 max-w-2xl">
          <button
            onClick={onStart}
            className="flex-1 h-24 md:h-28 rounded-2xl md:rounded-3xl bg-black hover:bg-slate-800 active:scale-95 text-white font-black text-3xl md:text-5xl shadow-xl transition-all cursor-pointer flex items-center justify-center"
          >
            СТАРТ
          </button>
          <button
            onClick={onClose}
            className="h-24 md:h-28 px-10 rounded-2xl md:rounded-3xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-2xl md:text-3xl transition-all cursor-pointer flex items-center justify-center"
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};
