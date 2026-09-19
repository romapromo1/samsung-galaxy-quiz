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
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center select-none">
      <div
        key={count}
        className="text-9xl md:text-[14rem] font-black text-slate-900 tracking-tighter animate-pulse"
      >
        {count > 0 ? count : 'СТАРТ'}
      </div>
    </div>
  );
};
