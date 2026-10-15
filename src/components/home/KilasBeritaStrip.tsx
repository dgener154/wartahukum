import React, { useState, useEffect } from 'react';
import { Zap, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Article } from '../../types';

interface KilasBeritaStripProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const KilasBeritaStrip: React.FC<KilasBeritaStripProps> = ({
  articles,
  onSelectArticle,
}) => {
  const breakingArticles = articles.filter(
    (a) => (a.isBreaking || a.status === 'published') && a.status === 'published'
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStaticMode, setIsStaticMode] = useState(false);

  useEffect(() => {
    if (isPaused || isStaticMode || breakingArticles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isStaticMode, breakingArticles.length]);

  const currentArticle = breakingArticles[currentIndex] || breakingArticles[0];

  if (!currentArticle) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1">
      <div className="flex items-center justify-between gap-3 p-1.5 sm:p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        {/* Left Pill Badge */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="flex items-center gap-1 bg-[#dc2626] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shrink-0 shadow-2xs">
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>KILAS BERITA</span>
          </div>

          {/* Headline Link */}
          <div
            onClick={() => onSelectArticle(currentArticle)}
            className="truncate text-xs sm:text-sm font-bold text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
          >
            {currentArticle.title}
          </div>
        </div>

        {/* Right Section: Status Badge, Prev/Next, Statis Toggle */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0 pl-2">
          {/* Status Label matching screenshot */}
          <span className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
            Dalam Tahap Penyidikan Khusus
          </span>

          {/* Arrow & Pause Controls */}
          <div className="flex items-center gap-1 text-slate-600">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? breakingArticles.length - 1 : prev - 1
                )
              }
              className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              title="Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              title={isPaused ? 'Putar Otomatis' : 'Jeda'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % breakingArticles.length)
              }
              className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              title="Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Statis Button */}
          <button
            onClick={() => setIsStaticMode(!isStaticMode)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors border ${
              isStaticMode
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Statis
          </button>
        </div>
      </div>
    </div>
  );
};
