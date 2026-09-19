import React, { useState, useEffect } from 'react';

interface CountdownOverlayProps {
  onFinish: () => void;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ onFinish }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-[#090d16]/95 backdrop-blur-xl flex flex-col items-center justify-center select-none">
      {/* Radial backlight */}
      <div className="absolute w-[450px] h-[450px] bg-blue-600/30 rounded-full blur-3xl animate-calm-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-xl md:text-2xl font-bold tracking-widest text-blue-400 uppercase mb-4">
          Приготовьтесь
        </span>

        {/* Animated Countdown Number */}
        <div
          key={count}
          className="text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl animate-bounce"
        >
          {count > 0 ? count : 'ВПЕРЁД!'}
        </div>

        <p className="mt-8 text-base md:text-lg text-slate-400 font-medium">
          60 секунд начинаются прямо сейчас...
        </p>
      </div>
    </div>
  );
};
