import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export const KioskHeader: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen request failed', e);
    }
  };

  return (
    <header className="w-full flex items-center justify-end px-6 py-3 bg-white z-40 select-none">
      <button
        onClick={toggleFullscreen}
        className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer border border-slate-300"
        title="НА ВЕСЬ ЭКРАН"
      >
        {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
      </button>
    </header>
  );
};
