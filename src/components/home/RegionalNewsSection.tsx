import React, { useState, useRef } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Article } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface RegionalNewsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const RegionalNewsSection: React.FC<RegionalNewsSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const publishedArticles = articles.filter((a) => a.status === 'published');

  // Extract available provinces with real count
  const regionalArticles = publishedArticles.filter((a) => Boolean(a.location?.province));
  
  // Custom province order matching the screenshot sequence
  const preferredOrder = ['DKI Jakarta', 'Jawa Timur', 'Jawa Barat', 'Sumatera Utara', 'Bali', 'Banten', 'Sumatera Barat'];
  const allProvinces = Array.from(
    new Set(regionalArticles.map((a) => a.location!.province))
  );

  const sortedProvinces = [...allProvinces].sort((a, b) => {
    const idxA = preferredOrder.indexOf(a);
    const idxB = preferredOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  const [selectedProvince, setSelectedProvince] = useState<string>('SEMUA');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredArticles =
    selectedProvince === 'SEMUA'
      ? regionalArticles
      : regionalArticles.filter((a) => a.location?.province === selectedProvince);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
      {/* 1. Header Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <MapPin className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-700">
            Kanal Berita Daerah Nusantara
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
          Kabar Penegakan Hukum & Perda di Seluruh Wilayah
        </h2>
      </div>

      {/* 2. Menu Nama Provinsi (DIPINDAH TEPAT DIBAWAH TEKS SESUAI GAMBAR) */}
      <div className="mb-6 bg-[#f0f9ff]/70 border border-cyan-100 rounded-2xl p-2 sm:p-2.5 shadow-2xs">
        <div className="relative flex items-center">
          {/* Scrollable Province Pills Row */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 px-1 no-scrollbar w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Semua Wilayah Pill */}
            <button
              onClick={() => setSelectedProvince('SEMUA')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                selectedProvince === 'SEMUA'
                  ? 'bg-[#088395] text-white shadow-sm'
                  : 'text-slate-700 hover:text-cyan-900 hover:bg-white/80'
              }`}
            >
              Semua Wilayah ({regionalArticles.length})
            </button>

            {/* Province Buttons matching screenshot sequence */}
            {sortedProvinces.map((prov) => {
              const count = regionalArticles.filter(
                (a) => a.location?.province === prov
              ).length;
              const isSelected = selectedProvince === prov;
              return (
                <button
                  key={prov}
                  onClick={() => setSelectedProvince(prov)}
                  className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#088395] text-white font-bold shadow-sm'
                      : 'text-slate-700 hover:text-cyan-900 hover:bg-white/80 font-medium'
                  }`}
                >
                  {prov} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll Bar Track Indicator matching screenshot (with left and right arrow icons) */}
        <div className="mt-1 pt-1 border-t border-cyan-100/60 flex items-center justify-between gap-2 px-1">
          <button
            onClick={() => handleScroll('left')}
            className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
            title="Geser Kiri"
            aria-label="Geser Kiri"
          >
            <span className="text-[10px] select-none">◀</span>
          </button>

          {/* Visual Track Bar */}
          <div className="flex-1 h-1 bg-slate-300/80 rounded-full overflow-hidden mx-1" />

          <button
            onClick={() => handleScroll('right')}
            className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
            title="Geser Kanan"
            aria-label="Geser Kanan"
          >
            <span className="text-[10px] select-none">▶</span>
          </button>
        </div>
      </div>

      {/* 3. Grid of Regional News Cards */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredArticles.slice(0, 4).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={article.coverImage}
                    alt={article.title}
                    fallbackCategory={article.categoryName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {article.location && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#088395] text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{article.location.city || article.location.province}</span>
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase text-cyan-700 tracking-wider">
                    {article.categoryName}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug mt-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 mt-2">
                <span className="truncate">{article.authorName}</span>
                <span className="font-mono text-[10px] flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.viewsCount} baca
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 rounded-2xl border border-slate-200">
          Belum ada berita daerah untuk wilayah {selectedProvince}.
        </div>
      )}
    </section>
  );
};
