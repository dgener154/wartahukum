import React, { useState } from 'react';
import { X, Shield, Lock, Mail, AlertCircle, PenTool } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { User } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { login } = usePortal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Harap masukkan alamat surel (email) akun Anda.');
      return;
    }

    const loggedInUser = login(email);
    if (loggedInUser) {
      onLoginSuccess(loggedInUser);
      onClose();
    } else {
      setErrorMessage(
        'Akun tidak ditemukan. Silakan klik tombol akses cepat di bawah atau periksa alamat email Anda.'
      );
    }
  };

  const handleQuickLogin = (role: 'ADMIN' | 'REDAKSI') => {
    setErrorMessage('');
    const targetEmail =
      role === 'ADMIN' ? 'admin@wartahukum.id' : 'redaksi@wartahukum.id';
    const loggedInUser = login(targetEmail, role);
    if (loggedInUser) {
      onLoginSuccess(loggedInUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 overflow-hidden">
        {/* Rainbow top line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-gradient-bar" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 mx-auto flex items-center justify-center mb-3 shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Masuk Portal Redaksi
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            WARTA HUKUM Content Management & Editorial System
          </p>
        </div>

        {/* Quick Demo Access Switchers */}
        <div className="mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2.5">
            Pilihan Akses Cepat Masuk
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('ADMIN')}
              className="p-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-800 text-left transition-all group"
            >
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Admin (Akses Penuh)</span>
              </div>
              <div className="text-[10px] text-red-700/80 mt-1 leading-snug">
                12 Modul: CRUD berita, persetujuan, rubrik, user, settings
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('REDAKSI')}
              className="p-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-900 text-left transition-all group"
            >
              <div className="text-xs font-bold flex items-center gap-1.5">
                <PenTool className="w-3 h-3 text-blue-600" />
                <span>Redaksi (Wartawan)</span>
              </div>
              <div className="text-[10px] text-blue-700/80 mt-1 leading-snug">
                Tulis draf liputan, kirim berita, pantau status kurasi
              </div>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Surel (Email)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wartahukum.id atau redaksi@wartahukum.id"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            Masuk ke Sistem
          </button>
        </form>

        <div className="mt-5 text-center text-[11px] text-slate-400">
          Sistem Terotentikasi & Dilindungi Audit Trail Redaksi WARTA HUKUM.
        </div>
      </div>
    </div>
  );
};
