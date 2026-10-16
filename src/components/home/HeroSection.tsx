import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  ArrowRight,
  Play,
  Pause,
} from 'lucide-react';
import { Article } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { VoicePlayer } from '../common/VoicePlayer';

interface HeroSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  const publishedArticles = articles.filter((a) => a.status === 'published');
  const heroArticles = publishedArticles.slice(0, 5);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide switch every 6 seconds
  useEffect(() => {
    if (isPaused || heroArticles.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroArticles.length]);

  const currentArticle = heroArticles[activeSlide] || heroArticles[0];

  if (!currentArticle) {
    return null;
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Selasa, 13 Oktober 2026 pukul 16.30 WIB';
    const date = new Date(dateString);
    const weekday = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${weekday}, ${day} ${month} ${year} pukul ${hours}.${minutes} WIB`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      {/* Full-width Slide Foto matching user screenshot */}
      <div
        className="relative group overflow-hidden rounded-[2rem] border border-slate-700/60 bg-[#080d1a] shadow-xl min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-end"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle iridescent rainbow hairline border */}
        <div className="absolute inset-0 rounded-[2rem] p-[1.5px] pointer-events-none bg-gradient-to-r from-red-500/40 via-amber-500/40 via-cyan-500/40 via-blue-500/40 to-purple-500/40 opacity-80" />

        {/* Background Cover Image with High Contrast Vignette */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={currentArticle.coverImage}
            alt={currentArticle.title}
            fallbackCategory={currentArticle.categoryName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          {/* Measured deep vignette overlay for sharp white text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/80 to-[#050914]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050914]/90 via-[#050914]/60 to-transparent" />
        </div>

        {/* Content Box (Bottom Left matching screenshot) */}
        <div className="relative z-10 p-6 sm:p-9 lg:p-12 text-white max-w-4xl">
          {/* Category & Byline Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs sm:text-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory(currentArticle.categoryId);
              }}
              className="text-[#f59e0b] hover:text-amber-300 font-extrabold uppercase tracking-wider transition-colors"
            >
              {currentArticle.categoryName || 'KEJAKSAAN'}
            </button>

            <span className="text-slate-400">·</span>

            <span className="flex items-center gap-1.5 text-slate-300">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentArticle.authorName || 'Bambang Trihatmojo, S.H., M.H.'}</span>
            </span>

            <span className="text-slate-400">·</span>

            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDate(currentArticle.publishedAt)}</span>
            </span>
          </div>

          {/* Large Headline */}
          <h1
            onClick={() => onSelectArticle(currentArticle)}
            className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-black text-white hover:text-amber-200 transition-colors cursor-pointer leading-[1.18] mb-4 text-balance"
          >
            {currentArticle.title}
          </h1>

          {/* Summary Lead */}
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 font-normal max-w-3xl line-clamp-2 sm:line-clamp-3">
            {currentArticle.summary}
          </p>

          {/* Action Button: Baca Selengkapnya & Voice Play */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectArticle(currentArticle)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white shadow-lg transition-all hover:scale-102 active:scale-98"
            >
              <span>Baca Selengkapnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <VoicePlayer
              title={currentArticle.title}
              textToRead={`${currentArticle.summary || ''}. ${currentArticle.content || ''}`}
              variant="compact"
            />
          </div>
        </div>

        {/* Bottom-Right Slider Navigation Controls matching screenshot */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs">
          {/* Previous Arrow */}
          <button
            onClick={() =>
              setActiveSlide((prev) => (prev === 0 ? heroArticles.length - 1 : prev - 1))
            }
            className="p-1 hover:text-amber-400 transition-colors"
            aria-label="Slide Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Indicators: Amber Bar + Dots */}
          <div className="flex items-center gap-1.5 px-1">
            {heroArticles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? 'w-5 h-1.5 bg-[#f59e0b]'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={() =>
              setActiveSlide((prev) => (prev + 1) % heroArticles.length)
            }
            className="p-1 hover:text-amber-400 transition-colors"
            aria-label="Slide Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Play/Pause Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:text-amber-400 transition-colors border-l border-white/20 pl-2 ml-1"
            title={isPaused ? 'Putar' : 'Jeda'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
};
