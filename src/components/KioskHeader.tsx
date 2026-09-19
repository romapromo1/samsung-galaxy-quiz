import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Settings2 } from 'lucide-react';
import type { DeviceMode } from '../types/quiz';
import { getSessionHistory, clearSessionHistory } from '../utils/sessionManager';

interface KioskHeaderProps {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  onResetSession?: () => void;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({
  deviceMode,
  setDeviceMode,
  onResetSession,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [historyStats, setHistoryStats] = useState<number[][]>([]);

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

  const openAdmin = () => {
    setHistoryStats(getSessionHistory());
    setShowAdminModal(true);
  };

  const handleClearHistory = () => {
    clearSessionHistory();
    setHistoryStats([]);
    if (onResetSession) onResetSession();
    alert('Память сессий очищена.');
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 z-40 select-none">
        {/* Left: Minimal label */}
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
          Samsung Galaxy Z Fold Kiosk
        </div>

        {/* Right: Device Switcher & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 rounded-xl p-1 text-xs">
            <button
              onClick={() => setDeviceMode('auto')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceMode === 'auto'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Auto
            </button>
            <button
              onClick={() => setDeviceMode('fold8')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceMode === 'fold8'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fold 8
            </button>
            <button
              onClick={() => setDeviceMode('fold8ultra')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceMode === 'fold8ultra'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fold 8 Ultra
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Полный экран"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={openAdmin}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
            title="Память сессий"
          >
            <Settings2 size={16} />
          </button>
        </div>
      </header>

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Память сессий
            </h3>
            <p className="text-xs text-slate-600">
              В памяти сохраняются последние 2 сессии (0 повторов в n+1, не более 2 в n+2).
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs text-slate-700">
              <div>Сессий в памяти: <strong>{historyStats.length} / 2</strong></div>
              {historyStats.map((s, i) => (
                <div key={i} className="text-slate-500">
                  Сессия {i + 1}: {s.length} вопросов
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleClearHistory}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold"
              >
                Очистить
              </button>
              <button
                onClick={() => setShowAdminModal(false)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
