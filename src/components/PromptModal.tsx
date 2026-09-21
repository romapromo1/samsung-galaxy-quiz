import React from 'react';

interface PromptModalProps {
  onStart: () => void;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onStart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-150 uppercase">
      <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl max-h-[92vh] overflow-y-auto bg-white border-2 border-slate-300 p-5 sm:p-7 md:p-10 shadow-2xl flex flex-col items-center text-center space-y-5 sm:space-y-7 md:space-y-8">
        
        {/* Responsive prompt text */}
        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-900 leading-snug tracking-tight">
          ОТВЕТЬТЕ НА МАКСИМАЛЬНОЕ КОЛИЧЕСТВО ВОПРОСОВ ЗА 60 СЕКУНД. ЕСЛИ ГОТОВЫ, ЖМИТЕ «НАЧАТЬ»
        </p>

        {/* Buttons: identical text size, responsive on mobile */}
        <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 pt-1 sm:pt-2 max-w-xl">
          <button
            onClick={onStart}
            className="flex-1 h-12 sm:h-15 md:h-18 bg-[#1428a0] hover:bg-[#0f1f80] active:scale-95 text-white font-black text-sm sm:text-lg md:text-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center border-2 border-[#1428a0]"
          >
            НАЧАТЬ
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-12 sm:h-15 md:h-18 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm sm:text-lg md:text-2xl transition-all cursor-pointer flex items-center justify-center border-2 border-slate-300"
          >
            НАЗАД
          </button>
        </div>
      </div>
    </div>
  );
};
