import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Smartphone, RotateCcw, Info } from 'lucide-react';
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
    alert('История сессий очищена! Банк вопросов полностью сброшен.');
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-3 bg-[#0c121e]/80 backdrop-blur-md border-b border-white/10 z-40">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-bold tracking-wider text-sm md:text-base text-white">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent uppercase font-extrabold">
              SAMSUNG
            </span>
            <span className="text-white/40">✕</span>
            <span className="text-white/80 font-medium">New Star Weekend 2026</span>
          </div>
          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Kiosk Mode
          </span>
        </div>

        {/* Right: Device Switcher & Kiosk Controls */}
        <div className="flex items-center gap-2">
          {/* Device Preset Switcher (Fold8 vs Fold8 Ultra vs Auto) */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setDeviceMode('auto')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceMode === 'auto'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Полный экран устройства без рамки"
            >
              Auto
            </button>
            <button
              onClick={() => setDeviceMode('fold8')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceMode === 'fold8'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Развертка Galaxy Z Fold8 (7.6'')"
            >
              Fold 8
            </button>
            <button
              onClick={() => setDeviceMode('fold8ultra')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                deviceMode === 'fold8ultra'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Развертка Galaxy Z Fold8 Ultra (8.0'')"
            >
              Fold 8 Ultra
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all"
            title={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>

          {/* Admin / Session memory button */}
          <button
            onClick={openAdmin}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all"
            title="Настройки сессий и память"
          >
            <Info size={18} />
          </button>
        </div>
      </header>

      {/* Admin / Info Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Smartphone className="text-blue-400" size={24} />
              Состояние памяти сессий
            </h3>
            <p className="text-sm text-slate-300">
              Система автоматически запоминает последние 2 сессии:
            </p>
            <ul className="text-xs text-slate-400 space-y-1 bg-black/40 p-3 rounded-xl border border-white/5">
              <li>• В сессии <strong>n+1</strong>: 0 повторов из сессии n.</li>
              <li>• В сессии <strong>n+2</strong>: максимум 2 вопроса из сессии n.</li>
              <li>• Внутри любой сессии повторы исключены.</li>
            </ul>

            <div className="bg-slate-800/60 p-3 rounded-xl border border-white/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Сессий в буфере:</span>
                <span className="font-bold text-blue-400">{historyStats.length} / 2</span>
              </div>
              {historyStats.map((sess, idx) => (
                <div key={idx} className="text-xs text-slate-300 flex justify-between">
                  <span>Сессия #{idx + 1}:</span>
                  <span>{sess.length} вопросов ({sess.join(', ') || 'нет'})</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleClearHistory}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-sm font-semibold transition-all"
              >
                <RotateCcw size={16} />
                Сбросить память
              </button>
              <button
                onClick={() => setShowAdminModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
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
