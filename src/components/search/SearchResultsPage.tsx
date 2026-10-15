import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, Clock, Eye, X } from 'lucide-react';
import { Article } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { usePortal } from '../../context/PortalContext';

interface SearchResultsPageProps {
  initialQuery?: string;
  initialCategoryId?: string | null;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  initialQuery = '',
  initialCategoryId = null,
  onBack,
  onSelectArticle,
}) => {
  const { articles, categories } = usePortal();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState<string | null>(initialCategoryId);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const published = articles.filter((a) => a.status === 'published');

  const filtered = published.filter((a) => {
    const matchCat = selectedCat ? a.categoryId === selectedCat : true;
    const matchQuery = query.trim()
      ? a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        a.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      : true;
    return matchCat && matchQuery;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.viewsCount - a.viewsCount;
    }
    return (
      new Date(b.publishedAt || b.createdAt).getTime() -
      new Date(a.publishedAt || a.createdAt).getTime()
    );
  });

  const selectedCategoryObj = categories.find((c) => c.id === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berdasarkan kata kunci, judul perkara, jaksa, polisi, UU..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCat || ''}
            onChange={(e) => setSelectedCat(e.target.value || null)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Semua Kanal Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="latest">Terbaru</option>
            <option value="popular">Terpopuler</option>
          </select>
        </div>

        {/* Active Filters Display */}
        {(selectedCat || query) && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span>Filter aktif:</span>
            {selectedCategoryObj && (
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md font-medium">
                Kanal: {selectedCategoryObj.name}
                <button onClick={() => setSelectedCat(null)}>✕</button>
              </span>
            )}
            {query && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md font-medium">
                Kata kunci: "{query}"
                <button onClick={() => setQuery('')}>✕</button>
              </span>
            )}
            <button
              onClick={() => {
                setQuery('');
                setSelectedCat(null);
              }}
              className="text-red-600 hover:underline font-medium text-[11px] ml-1"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-800">
          Hasil Pencarian ({sorted.length} berita ditemukan)
        </h2>
      </div>

      {/* Results Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={article.coverImage}
                    alt={article.title}
                    fallbackCategory={article.categoryName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-900/90 text-white backdrop-blur-xs">
                    {article.categoryName}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 mt-2">
                <span>{article.authorName}</span>
                <span className="font-mono">{article.viewsCount} baca</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">
            Tidak ditemukan berita yang cocok
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Coba gunakan kata kunci umum lainnya seperti "hukum", "peradilan", "korupsi", atau pilih saluran kanal yang berbeda.
          </p>
        </div>
      )}
    </div>
  );
};
