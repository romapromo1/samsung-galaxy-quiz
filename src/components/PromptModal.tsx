import React from 'react';

interface PromptModalProps {
  onStart: () => void;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-150 uppercase">
      <div className="relative w-full max-w-5xl lg:max-w-6xl bg-white border-2 border-slate-300 p-8 md:p-20 shadow-2xl flex flex-col items-center text-center space-y-12">
        
        {/* Prompt text */}
        <p className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-slate-900 font-black leading-tight tracking-tight">
          ОТВЕТЬТЕ НА МАКСИМАЛЬНОЕ КОЛИЧЕСТВО ВОПРОСОВ ЗА 60 СЕКУНД. ЕСЛИ ГОТОВЫ, ЖМИТЕ «НАЧАТЬ»
        </p>

        {/* НАЧАТЬ and НАЗАД buttons: 100% straight corners, identical equal font size and height */}
        <div className="w-full flex flex-col sm:flex-row gap-6 pt-6 max-w-3xl">
          <button
            onClick={onStart}
            className="flex-1 h-28 md:h-36 bg-black hover:bg-slate-800 active:scale-95 text-white font-black text-3xl md:text-5xl lg:text-6xl shadow-2xl transition-all cursor-pointer flex items-center justify-center border-2 border-black"
          >
            НАЧАТЬ
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-28 md:h-36 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-3xl md:text-5xl lg:text-6xl transition-all cursor-pointer flex items-center justify-center border-2 border-slate-300"
          >
            НАЗАД
          </button>
        </div>
      </div>
    </div>
  );
};
