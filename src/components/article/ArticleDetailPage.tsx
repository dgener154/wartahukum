import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  ArrowLeft,
  Eye,
  Type,
  ChevronRight,
  ShieldAlert,
  MessageCircle,
} from 'lucide-react';
import { Article } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { usePortal } from '../../context/PortalContext';

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onSelectArticle,
  onSelectCategory,
}) => {
  const { articles, incrementArticleViews } = usePortal();
  const [fontSizeClass, setFontSizeClass] = useState<'text-sm' | 'text-base' | 'text-lg' | 'text-xl'>('text-base');
  const [copied, setCopied] = useState(false);

  // Increment views count on visit
  useEffect(() => {
    incrementArticleViews(article.id);
  }, [article.id]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date) + ' WIB';
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${article.title}\n\nBaca di Warta Hukum: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} - WARTA HUKUM`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${text}`, '_blank');
  };

  // Related articles (same category, excluding current)
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.categoryId === article.categoryId && a.status === 'published')
    .slice(0, 3);

  // Latest news for sidebar
  const latestSidebar = articles
    .filter((a) => a.id !== article.id && a.status === 'published')
    .slice(0, 4);

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
        <button onClick={onBack} className="hover:text-red-600 transition-colors">
          Beranda
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => onSelectCategory(article.categoryId)}
          className="hover:text-red-600 transition-colors font-medium text-slate-700"
        >
          {article.categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400 truncate max-w-xs">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Article Body (8 cols) */}
        <div className="lg:col-span-8">
          {/* Category & Status Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <button
              onClick={() => onSelectCategory(article.categoryId)}
              className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              {article.categoryName}
            </button>

            {article.isOpinion && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-amber-500 text-slate-900">
                KOLOM OPINI
              </span>
            )}

            {article.isBreaking && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-red-100 text-red-700 border border-red-200">
                BREAKING NEWS
              </span>
            )}
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 leading-tight mb-4 text-balance">
            {article.title}
          </h1>

          {/* Lead Summary */}
          {article.summary && (
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6 border-l-4 border-red-500 pl-4 py-1 bg-slate-50 rounded-r-lg">
              {article.summary}
            </p>
          )}

          {/* Author & Editorial Byline Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-slate-200 mb-6 text-xs text-slate-600">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Penulis:</span>
                <span className="text-slate-800">{article.authorName}</span>
                {article.authorRole === 'GURU' && (
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 text-slate-600">
                    Kontributor
                  </span>
                )}
              </div>
              {article.editorName && (
                <div className="flex items-center gap-2 text-slate-500">
                  <span>Editor:</span>
                  <span className="text-slate-700">{article.editorName}</span>
                </div>
              )}
            </div>

            <div className="space-y-1 text-right">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                <span>{article.readTimeMinutes} menit waktu baca</span> ·{' '}
                <span className="font-mono">{article.viewsCount} dilihat</span>
              </div>
            </div>
          </div>

          {/* Cover Photo & Caption */}
          <div className="mb-8">
            <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-sm border border-slate-200">
              <ImageWithFallback
                src={article.coverImage}
                alt={article.title}
                fallbackCategory={article.categoryName}
                className="w-full h-full object-cover"
              />
            </div>
            {(article.caption || article.imageCredit) && (
              <div className="mt-2 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 italic px-1">
                <span>{article.caption}</span>
                {article.imageCredit && (
                  <span className="font-sans font-medium text-slate-400 shrink-0 not-italic">
                    Foto: {article.imageCredit}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Reading Accessibility Bar (Font Size Adjuster & Share) */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                <span>Ukuran Teks:</span>
              </span>
              <div className="flex items-center gap-1 bg-white rounded-lg p-0.5 border border-slate-200 text-xs">
                <button
                  onClick={() => setFontSizeClass('text-sm')}
                  className={`px-2 py-0.5 rounded ${fontSizeClass === 'text-sm' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSizeClass('text-base')}
                  className={`px-2 py-0.5 rounded ${fontSizeClass === 'text-base' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeClass('text-lg')}
                  className={`px-2 py-0.5 rounded ${fontSizeClass === 'text-lg' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Share Shortcuts */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 hidden sm:inline mr-1">
                Bagikan:
              </span>
              <button
                onClick={handleShareWhatsApp}
                className="w-7 h-7 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                title="Bagikan ke WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareFacebook}
                className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                title="Bagikan ke Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareTwitter}
                className="w-7 h-7 rounded-lg bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
                title="Bagikan ke X"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors"
                title="Salin Tautan"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Article Full Body */}
          <div
            className={`prose prose-slate max-w-none ${fontSizeClass} leading-relaxed text-slate-800 space-y-4`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                  Tag Terkait:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hak Jawab & Koreksi Callout Notice */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">Koreksi & Hak Jawab:</p>
            <p>
              Apabila terdapat kekeliruan data atau Anda memiliki informasi tanggapan, silakan hubungi Redaksi WARTA HUKUM melalui email: <strong>redaksi@wartahukum.id</strong> sesuai ketentuan Pedoman Pemberitaan Media Siber Dewan Pers.
            </p>
          </div>

          {/* Related Articles in Same Category */}
          {relatedArticles.length > 0 && (
            <div className="mt-10 pt-8 border-t-2 border-slate-200">
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-4">
                Berita Terkait Lainnya
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="group cursor-pointer bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md transition-all"
                  >
                    <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2 bg-slate-100">
                      <ImageWithFallback
                        src={rel.coverImage}
                        alt={rel.title}
                        fallbackCategory={rel.categoryName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-red-600 uppercase">
                      {rel.categoryName}
                    </span>
                    <h4 className="font-serif font-bold text-xs text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 mt-1 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Latest Flash Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-serif font-bold text-sm text-slate-900">
                Berita Terbaru Terkini
              </h3>
              <span className="w-2 h-2 rounded-full bg-red-600" />
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              {latestSidebar.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle(item)}
                  className="pt-3 first:pt-0 group cursor-pointer flex gap-3 items-start"
                >
                  <div className="w-18 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <ImageWithFallback
                      src={item.coverImage}
                      alt={item.title}
                      fallbackCategory={item.categoryName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-red-600 uppercase">
                      {item.categoryName}
                    </span>
                    <h4 className="font-serif font-bold text-xs text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Integrity Box */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Integritas Media
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              WARTA HUKUM mematuhi asas praduga tak bersalah dan tidak menerima suap atau gratifikasi dalam bentuk apa pun terkait peliputan persidangan dan penegakan hukum.
            </p>
            <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
              Pemberitaan Berimbang · Akurat · Faktual
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};
