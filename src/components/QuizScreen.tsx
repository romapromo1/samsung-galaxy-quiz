import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PlayableQuestion, AnswerLog, ShuffledOption } from '../types/quiz';

interface QuizScreenProps {
  questions: PlayableQuestion[];
  onFinish: (answers: AnswerLog[], correctCount: number, shownIds: number[]) => void;
}

const TOTAL_TIME = 60; // 60 seconds

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<ShuffledOption | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const shownIdsRef = useRef<number[]>([]);
  const answersRef = useRef<AnswerLog[]>([]);
  const correctCountRef = useRef<number>(0);

  const currentQuestion = questions[currentIndex] || null;

  useEffect(() => {
    if (currentQuestion && !shownIdsRef.current.includes(currentQuestion.id)) {
      shownIdsRef.current.push(currentQuestion.id);
    }
  }, [currentQuestion]);

  const handleFinish = useCallback(() => {
    onFinish(answersRef.current, correctCountRef.current, shownIdsRef.current);
  }, [onFinish]);

  // 60-second timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleFinish]);

  const handleSelectOption = (option: ShuffledOption) => {
    if (isLocked || !currentQuestion) return;

    setIsLocked(true);
    setSelectedOption(option);

    const isCorrect = option.isCorrect;
    const correctOpt = currentQuestion.options.find((o) => o.isCorrect)?.text || '';

    const newAnswer: AnswerLog = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedText: option.text,
      correctText: correctOpt,
      isCorrect,
    };

    answersRef.current = [...answersRef.current, newAnswer];

    if (isCorrect) {
      correctCountRef.current += 1;
      setCorrectCount(correctCountRef.current);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setIsLocked(false);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        handleFinish();
      }
    }, 250);
  };

  if (!currentQuestion) return null;

  const progressPercentage = (timeLeft / TOTAL_TIME) * 100;

  return (
    <div className="w-full h-full max-h-full flex flex-col px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 max-w-3xl mx-auto bg-white select-none uppercase overflow-hidden">
      {/* Top Fixed Section: HUD + Question Card stays firmly in place */}
      <div className="w-full shrink-0">
        {/* Top HUD */}
        <div className="w-full space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm md:text-xl lg:text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap">
            <div>
              ВОПРОС {currentIndex + 1}
            </div>

            <div className="flex items-baseline justify-center">
              <span>{timeLeft}</span>
              <span className="text-slate-400 font-bold ml-1 sm:ml-1.5">СЕК</span>
            </div>

            <div className="text-right">
              ПРАВИЛЬНО: <span className="text-slate-900 font-black">{correctCount}</span>
            </div>
          </div>

          {/* Progress bar: Samsung brand blue */}
          <div className="w-full h-1.5 sm:h-2 md:h-2.5 bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-[#1428a0] transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Center Question Card: bold and prominent for Fold / Fold Ultra with increased spacing from line */}
        <div className="w-full bg-slate-50 border-2 border-slate-300 p-3.5 sm:p-4 md:py-5 md:px-8 text-center shadow-xs mt-4 sm:mt-6 md:mt-7 mb-2.5 sm:mb-3">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-snug tracking-normal font-brand-headline">
            {currentQuestion.question}
          </h2>
        </div>
      </div>

      {/* Answer Options: Independent smooth scrollable container, centered on Fold/Fold Ultra */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto flex flex-col justify-start md:justify-center gap-2.5 sm:gap-3 md:gap-3.5 py-1 pr-1 overscroll-contain">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption?.text === option.text;
          let btnStyle = 'bg-white border-2 border-slate-300 text-slate-900 hover:border-[#1428a0] hover:bg-blue-50/20';

          if (isSelected) {
            btnStyle = option.isCorrect
              ? 'bg-emerald-600 border-2 border-emerald-600 text-white'
              : 'bg-rose-600 border-2 border-rose-600 text-white';
          }

          return (
            <button
              key={option.letter}
              onClick={() => handleSelectOption(option)}
              disabled={isLocked}
              className={`w-full h-14 sm:h-16 md:h-20 flex items-stretch text-left font-black tracking-wide transition-all duration-150 active:scale-98 cursor-pointer shrink-0 overflow-hidden ${btnStyle}`}
            >
              <span
                className={`w-14 sm:w-16 md:w-20 shrink-0 flex items-center justify-center font-black text-xl sm:text-2xl md:text-3xl border-r ${
                  isSelected ? 'bg-white/20 text-white border-white/40' : 'bg-[#1428a0] text-white border-[#1428a0]'
                }`}
              >
                {option.letter}
              </span>
              <span className="flex-1 px-4 sm:px-6 md:px-8 flex items-center text-xl sm:text-2xl md:text-3xl font-black leading-snug">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
