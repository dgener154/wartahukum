import React, { useState } from 'react';
import { Clock, User, ArrowRight, ChevronLeft, ChevronRight, Eye, Flame, TrendingUp } from 'lucide-react';
import { Article } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface LatestNewsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  const publishedArticles = articles
    .filter((a) => a.status === 'published')
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Tampilkan hanya 2 card saja sesuai permintaan pengguna
  const totalPages = Math.ceil(publishedArticles.length / itemsPerPage);

  const paginatedArticles = publishedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Most popular articles sorted by genuine viewsCount
  const popularArticles = [...publishedArticles]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 5);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Latest News (8 cols) */}
        <div className="lg:col-span-8">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-3.5 mb-6 border-b-2 border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-6 rounded-xs bg-red-600" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                Berita Terbaru
              </h2>
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Halaman {currentPage} dari {totalPages || 1}
            </span>
          </div>

          {/* Grid Cards with Modern Rainbow Gradient Card subtle touch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {paginatedArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Card Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={article.coverImage}
                    alt={article.title}
                    fallbackCategory={article.categoryName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Category Badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(article.categoryId);
                    }}
                    className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-white/95 text-slate-900 backdrop-blur-md shadow-sm hover:bg-red-600 hover:text-white transition-colors"
                  >
                    {article.categoryName}
                  </button>

                  {article.location && (
                    <span className="absolute bottom-3 left-3 z-10 text-[10px] font-medium bg-slate-900/80 text-slate-200 px-2 py-0.5 rounded backdrop-blur-xs">
                      {article.location.province}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                      </span>
                      <span>·</span>
                      <span className="truncate">{article.authorName}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-2">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {article.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Eye className="w-3 h-3 text-slate-400" />
                      {article.viewsCount.toLocaleString('id-ID')} views
                    </span>

                    <span className="font-semibold text-red-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Baca Selengkapnya
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Halaman Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Popular / Trending Stories Sidebar (4 cols) */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-none">
                    Berita Terpopuler
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    Berdasarkan Kunjungan Riil
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                Terverifikasi
              </span>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {popularArticles.map((article, idx) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="pt-3 first:pt-0 group cursor-pointer flex gap-3.5 items-start"
                >
                  {/* Number Ranking */}
                  <span
                    className={`text-xl sm:text-2xl font-serif font-black leading-none shrink-0 w-6 text-center ${
                      idx === 0
                        ? 'text-red-600'
                        : idx === 1
                        ? 'text-orange-500'
                        : idx === 2
                        ? 'text-amber-500'
                        : 'text-slate-400'
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                      <span className="font-semibold text-red-600 uppercase">
                        {article.categoryName}
                      </span>
                      <span>·</span>
                      <span className="font-mono flex items-center gap-0.5 text-slate-600">
                        <Eye className="w-2.5 h-2.5 text-slate-400" />
                        {article.viewsCount.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/80 -mx-5 -mb-5 p-3 rounded-b-2xl flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Indeks Pembaca Aktif</span>
              </span>
              <span className="font-mono text-slate-500 text-[10px]">Pembaruan Otomatis</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
