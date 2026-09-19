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
    <div className="flex-1 flex flex-col justify-between p-6 md:p-8 w-full h-full bg-white select-none uppercase">
      {/* Top HUD scaled down 25% */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-500">
            ВОПРОС {currentIndex + 1}
          </div>

          <div className="font-mono text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            {timeLeft} <span className="text-xl md:text-2xl font-bold text-slate-400">СЕК</span>
          </div>

          <div className="text-lg md:text-2xl lg:text-3xl font-black text-slate-900">
            ПРАВИЛЬНО: <span className="text-emerald-600">{correctCount}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 md:h-3 bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Center Question Card scaled down 25% */}
      <div className="my-auto py-3 flex items-center justify-center w-full">
        <div className="w-full bg-slate-50 border-2 border-slate-300 p-6 md:p-10 text-center shadow-xs">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 leading-snug tracking-tight">
            {currentQuestion.question}
          </h2>
        </div>
      </div>

      {/* Answer Options scaled down 25% */}
      <div className="w-full flex flex-col gap-3 md:gap-4 pb-2">
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
              className={`w-full min-h-[75px] md:min-h-[90px] lg:min-h-[105px] px-6 md:px-8 py-4 md:py-5 flex items-center gap-6 text-left font-black text-lg md:text-2xl lg:text-3xl transition-all duration-150 active:scale-98 cursor-pointer ${btnStyle}`}
            >
              <span
                className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-black text-xl md:text-3xl shrink-0 border border-slate-300 ${
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
