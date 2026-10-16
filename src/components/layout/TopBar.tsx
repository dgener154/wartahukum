import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Bell,
  Lock,
  Shield,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

interface TopBarProps {
  onOpenLogin: () => void;
  onOpenSearch: () => void;
  onGoToDashboard: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenLogin,
  onGoToDashboard,
}) => {
  const { currentUser, breakingNews } = usePortal();
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in Indonesian matching the screenshot: Kamis, 15 Oktober 2026 pukul 06.57.05 WIB
      const weekday = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(now);
      const day = now.getDate();
      const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(now);
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setCurrentDateTime(
        `${weekday}, ${day} ${month} ${year} pukul ${hours}.${minutes}.${seconds} WIB`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const latestAlert =
    breakingNews.find((bn) => bn.active)?.title ||
    'Kejaksaan Agung Sita Aset Rp 1,2 Triliun Terkait Dugaan Tipikor Komoditas...';

  return (
    <div className="w-full bg-[#0b1320] border-b border-slate-800 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Date & Time in Indonesian (WIB) with Calendar Icon + AKTUAL News Flash */}
        <div className="flex items-center gap-3 text-[11px] text-slate-300 overflow-hidden max-w-full">
          <div className="flex items-center gap-1.5 font-medium shrink-0 text-amber-400">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">{currentDateTime}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 border-l border-slate-700/80 pl-3 min-w-0">
            <span className="bg-[#f97316] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 shadow-xs">
              AKTUAL
            </span>
            <span className="truncate text-[11px] text-slate-200 hover:text-white transition-colors cursor-pointer">
              {latestAlert}
            </span>
          </div>
        </div>

        {/* Right: Notification bell, Social Text, and Login Redaksi button */}
        <div className="flex items-center gap-4 text-xs shrink-0">
          {/* Notification Bell with Badge 0 */}
          <div className="relative cursor-pointer text-slate-300 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              0
            </span>
          </div>

          {/* Social text matching screenshot: FB · X · IG */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">FB</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">X</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">IG</span>
          </div>

          {/* Login Redaksi button with lock icon */}
          {currentUser ? (
            <button
              onClick={onGoToDashboard}
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-semibold px-3 py-1 rounded-full shadow-sm text-[11px] transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentUser.role === 'ADMIN' ? 'Panel Admin' : 'Panel Redaksi'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold bg-[#111c2e] hover:bg-slate-800 px-3 py-1 rounded-full border border-slate-700/80 transition-colors text-[11px] shadow-2xs"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Login Redaksi</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
