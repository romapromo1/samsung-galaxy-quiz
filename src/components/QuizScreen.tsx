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
    <div className="w-full h-full max-h-full flex flex-col p-3 sm:p-4 md:p-5 lg:p-6 max-w-4xl mx-auto bg-white select-none uppercase overflow-hidden">
      {/* Top Fixed Section: HUD + Question Card stays in place */}
      <div className="w-full shrink-0">
        {/* Top HUD */}
        <div className="w-full space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm md:text-base font-black text-slate-900 tracking-tight whitespace-nowrap">
            <div>
              ВОПРОС {currentIndex + 1}
            </div>

            <div className="flex items-baseline justify-center">
              <span>{timeLeft}</span>
              <span className="text-slate-400 font-bold ml-1">СЕК</span>
            </div>

            <div className="text-right">
              ПРАВИЛЬНО: <span className="text-emerald-600">{correctCount}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 sm:h-2 bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Center Question Card: compact, calibrated to never push options off screen */}
        <div className="w-full bg-slate-50 border-2 border-slate-300 p-3 sm:p-4 md:p-5 text-center shadow-xs mt-2 sm:mt-2.5 mb-2 sm:mb-2.5">
          <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-black text-slate-900 leading-snug tracking-tight">
            {currentQuestion.question}
          </h2>
        </div>
      </div>

      {/* Answer Options: Independent smooth scrollable container */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto flex flex-col justify-start gap-2 sm:gap-2.5 md:gap-3 py-1 pr-1 overscroll-contain">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption?.text === option.text;
          let btnStyle = 'bg-white border-2 border-slate-300 text-slate-900 hover:border-black hover:bg-slate-50';

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
              className={`w-full min-h-[46px] sm:min-h-[50px] md:min-h-[56px] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center gap-3 sm:gap-4 text-left font-black text-xs sm:text-sm md:text-base transition-all duration-150 active:scale-98 cursor-pointer shrink-0 ${btnStyle}`}
            >
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center font-black text-xs sm:text-sm md:text-base shrink-0 border border-slate-300 ${
                  isSelected ? 'bg-white/20 text-white border-white/40' : 'bg-slate-100 text-slate-900'
                }`}
              >
                {option.letter}
              </span>
              <span className="flex-1 leading-snug">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
