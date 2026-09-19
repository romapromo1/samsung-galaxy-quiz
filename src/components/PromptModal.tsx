import React from 'react';

interface PromptModalProps {
  onStart: () => void;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 md:p-10 animate-in fade-in duration-150 uppercase">
      <div className="relative w-full max-w-3xl lg:max-w-4xl bg-white border-2 border-slate-300 p-8 md:p-14 shadow-2xl flex flex-col items-center text-center space-y-10">
        
        {/* Prompt text scaled down 25% */}
        <p className="text-2xl md:text-4xl lg:text-5xl text-slate-900 font-extrabold leading-tight tracking-tight">
          ОТВЕТЬТЕ НА МАКСИМАЛЬНОЕ КОЛИЧЕСТВО ВОПРОСОВ ЗА 60 СЕКУНД. ЕСЛИ ГОТОВЫ, ЖМИТЕ «НАЧАТЬ»
        </p>

        {/* НАЧАТЬ and НАЗАД: identical font size, scaled down 25% */}
        <div className="w-full flex flex-col sm:flex-row gap-5 pt-4 max-w-2xl">
          <button
            onClick={onStart}
            className="flex-1 h-20 md:h-24 bg-black hover:bg-slate-800 active:scale-95 text-white font-black text-2xl md:text-3xl lg:text-4xl shadow-xl transition-all cursor-pointer flex items-center justify-center border-2 border-black"
          >
            НАЧАТЬ
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-20 md:h-24 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-2xl md:text-3xl lg:text-4xl transition-all cursor-pointer flex items-center justify-center border-2 border-slate-300"
          >
            НАЗАД
          </button>
        </div>
      </div>
    </div>
  );
};
