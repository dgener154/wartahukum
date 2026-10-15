import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const NewsletterSection: React.FC = () => {
  const { subscribeNewsletter } = usePortal();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus({ type: 'error', message: 'Harap masukkan alamat surel (email) yang valid.' });
      return;
    }

    const res = subscribeNewsletter(email);
    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setEmail('');
    } else {
      setStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
        {/* Rainbow top hairline accent */}
        <div className="absolute top-0 left-0 right-0 h-1 rainbow-gradient-bar" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-600/30 text-red-400 flex items-center justify-center border border-red-500/30">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                Buletin Hukum Pilihan Redaksi
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight mb-3">
              Dapatkan Ringkasan Putusan & Isu Hukum Teraktual Setiap Pagi
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Berlangganan buletin resmi <strong>WARTA HUKUM</strong>. Laporan investigasi mendalam, ringkasan perkara korupsi, dan analisis regulasi langsung di kotak masuk Anda tanpa spam.
            </p>

            <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Privasi terjamin. Anda dapat berhenti berlangganan kapan saja.</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status.type !== 'idle') setStatus({ type: 'idle', message: '' });
                  }}
                  placeholder="Masukkan alamat email Anda..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap active:scale-98"
                >
                  Berlangganan
                </button>
              </div>

              {status.type === 'success' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.type === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
