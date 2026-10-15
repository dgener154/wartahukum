import React from 'react';
import { ArrowLeft, ChevronRight, ShieldCheck, Printer, Calendar } from 'lucide-react';
import { StaticPage } from '../../types';

interface StaticPageViewProps {
  page: StaticPage;
  onBack: () => void;
}

export const StaticPageView: React.FC<StaticPageViewProps> = ({ page, onBack }) => {
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <button onClick={onBack} className="hover:text-red-600 transition-colors">
          Beranda
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400">Informasi Resmi</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">{page.title}</span>
      </nav>

      {/* Header Container */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-red-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Dokumen & Kebijakan Redaksi WARTA HUKUM
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight mb-3">
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {page.subtitle}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Pembaruan Terakhir: {formatDate(page.lastUpdated)}</span>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 p-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak Dokumen</span>
          </button>
        </div>
      </div>

      {/* Static Content */}
      <div
        className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
