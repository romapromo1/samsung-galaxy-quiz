import React from 'react';

interface PromptModalProps {
  onStart: () => void;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-150 uppercase">
      <div className="relative w-full max-w-5xl lg:max-w-6xl bg-white border border-slate-200 rounded-[36px] md:rounded-[56px] p-8 md:p-20 shadow-2xl flex flex-col items-center text-center space-y-12">
        
        {/* 40% larger prompt text */}
        <p className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-900 font-black leading-tight tracking-tight">
          ОТВЕТЬТЕ НА МАКСИМАЛЬНОЕ КОЛИЧЕСТВО ВОПРОСОВ ЗА 60 СЕКУНД. ЕСЛИ ГОТОВЫ, ЖМИТЕ «СТАРТ»
        </p>

        {/* 40% larger action buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-6 pt-6 max-w-3xl">
          <button
            onClick={onStart}
            className="flex-1 h-28 md:h-36 rounded-3xl md:rounded-[36px] bg-black hover:bg-slate-800 active:scale-95 text-white font-black text-4xl md:text-6xl lg:text-7xl shadow-2xl transition-all cursor-pointer flex items-center justify-center"
          >
            СТАРТ
          </button>
          <button
            onClick={onClose}
            className="h-28 md:h-36 px-12 rounded-3xl md:rounded-[36px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-3xl md:text-5xl transition-all cursor-pointer flex items-center justify-center"
          >
            НАЗАД
          </button>
        </div>
      </div>
    </div>
  );
};
