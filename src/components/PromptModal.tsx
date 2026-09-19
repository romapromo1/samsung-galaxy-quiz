import React from 'react';

interface PromptModalProps {
  onStart: () => void;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center space-y-8">
        
        {/* Requested prompt text */}
        <p className="text-2xl md:text-3xl lg:text-4xl text-slate-900 font-semibold leading-relaxed">
          Ответьте на максимальное количество вопросов за 60 секунд. Если готовы, жмите «СТАРТ»
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={onStart}
            className="flex-1 py-5 md:py-6 px-8 rounded-2xl bg-black hover:bg-slate-800 active:scale-95 text-white font-bold text-2xl md:text-3xl shadow-md transition-all cursor-pointer"
          >
            СТАРТ
          </button>
          <button
            onClick={onClose}
            className="py-5 px-8 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-lg md:text-xl transition-all cursor-pointer"
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};
