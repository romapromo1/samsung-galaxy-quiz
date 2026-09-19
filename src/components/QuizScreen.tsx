import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PlayableQuestion, AnswerLog, ShuffledOption } from '../types/quiz';
import { Timer, CheckCircle2, HelpCircle } from 'lucide-react';

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

  // Keep track of all question IDs shown to the user in this session
  const shownIdsRef = useRef<number[]>([]);
  const answersRef = useRef<AnswerLog[]>([]);
  const correctCountRef = useRef<number>(0);

  const currentQuestion = questions[currentIndex] || null;

  // Record question ID when current question loads
  useEffect(() => {
    if (currentQuestion && !shownIdsRef.current.includes(currentQuestion.id)) {
      shownIdsRef.current.push(currentQuestion.id);
    }
  }, [currentQuestion]);

  const handleFinish = useCallback(() => {
    onFinish(answersRef.current, correctCountRef.current, shownIdsRef.current);
  }, [onFinish]);

  // 60-second countdown timer
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

    // Brief tactile transition (250ms) so user registers their tap
    setTimeout(() => {
      setSelectedOption(null);
      setIsLocked(false);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // In the unlikely case user answers all questions in deck
        handleFinish();
      }
    }, 250);
  };

  if (!currentQuestion) {
    return null;
  }

  const progressPercentage = (timeLeft / TOTAL_TIME) * 100;
  const isTimeCritical = timeLeft <= 10;

  return (
    <div className="relative flex-1 flex flex-col justify-between p-4 md:p-8 w-full max-w-4xl mx-auto overflow-hidden">
      {/* Top HUD: Timer & Score */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          {/* Question Index Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm md:text-base">
            <HelpCircle size={18} className="text-blue-400" />
            <span>Вопрос {currentIndex + 1}</span>
          </div>

          {/* 60s Digital Timer */}
          <div
            className={`flex items-center gap-2 px-5 py-2 rounded-2xl border font-bold text-lg md:text-xl transition-all ${
              isTimeCritical
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                : 'bg-white/5 border-white/10 text-white'
            }`}
          >
            <Timer size={22} className={isTimeCritical ? 'text-rose-400' : 'text-blue-400'} />
            <span className="font-mono tracking-wider">{timeLeft} сек</span>
          </div>

          {/* Correct Count */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-sm md:text-base">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span>Верно: {correctCount}</span>
          </div>
        </div>

        {/* Linear Progress Bar for 60s */}
        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              isTimeCritical ? 'bg-gradient-to-r from-amber-400 to-rose-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="my-auto py-4 md:py-6 flex flex-col justify-center">
        <div className="bg-slate-900/70 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-black/40 min-h-[140px] md:min-h-[170px] flex items-center justify-center text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug tracking-tight">
            {currentQuestion.question}
          </h2>
        </div>
      </div>

      {/* Answer Options Grid */}
      <div className="w-full grid grid-cols-1 gap-3 md:gap-4 pb-2">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption?.text === option.text;
          let btnStyle = 'bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-white';

          if (isSelected) {
            btnStyle = option.isCorrect
              ? 'bg-emerald-600 border-emerald-400 text-white scale-[0.99] shadow-lg shadow-emerald-600/30'
              : 'bg-rose-600 border-rose-400 text-white scale-[0.99] shadow-lg shadow-rose-600/30';
          }

          return (
            <button
              key={option.letter}
              onClick={() => handleSelectOption(option)}
              disabled={isLocked}
              className={`w-full min-h-[68px] md:min-h-[82px] px-6 py-4 rounded-2xl md:rounded-3xl border flex items-center gap-4 text-left font-semibold text-lg md:text-2xl transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-md ${btnStyle}`}
            >
              {/* Letter Badge */}
              <span
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-base md:text-xl flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-white/25 text-white'
                    : 'bg-white/10 text-blue-300 border border-white/10'
                }`}
              >
                {option.letter}
              </span>

              {/* Option Text */}
              <span className="flex-1 leading-snug break-words">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
