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
  MessageSquare,
  ArrowDown,
  ArrowRight,
  Newspaper,
  Send,
} from 'lucide-react';
import { Article } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { VoicePlayer } from '../common/VoicePlayer';
import { usePortal } from '../../context/PortalContext';

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
  onKirimBerita?: () => void;
}

interface ReaderComment {
  id: string;
  name: string;
  content: string;
  timeAgo: string;
}

const defaultComments: ReaderComment[] = [
  {
    id: 'c1',
    name: 'Nurfajriana',
    content: 'Sangat baik',
    timeAgo: '3 hari yang lalu',
  },
  {
    id: 'c2',
    name: 'Saskia Wandira',
    content: 'Program yang bagus',
    timeAgo: '3 hari yang lalu',
  },
  {
    id: 'c3',
    name: 'Siti Huzaifah',
    content: 'Sangat seruu',
    timeAgo: '3 hari yang lalu',
  },
];

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onSelectArticle,
  onSelectCategory,
  onKirimBerita,
}) => {
  const { articles, incrementArticleViews } = usePortal();
  const [fontSizeClass, setFontSizeClass] = useState<'text-sm' | 'text-base' | 'text-lg' | 'text-xl'>('text-base');
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<ReaderComment[]>(() => {
    try {
      const saved = localStorage.getItem(`comments_${article.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultComments;
  });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    const newCommentItem: ReaderComment = {
      id: `comment-${Date.now()}`,
      name: newCommentAuthor.trim(),
      content: newCommentText.trim(),
      timeAgo: 'Baru saja',
    };

    const updated = [newCommentItem, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));
    } catch {
      // fallback
    }

    setNewCommentAuthor('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => {
      setCommentSuccess(false);
      setShowCommentForm(false);
    }, 1200);
  };

  const formatDateSummary = (dateString?: string | null) => {
    if (!dateString) return '07 Okt 2026';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return '07 Okt 2026';
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(d);
    } catch {
      return '07 Okt 2026';
    }
  };

  const calculateReadingTime = () => {
    if (article.readTimeMinutes) return `${article.readTimeMinutes} menit`;
    const plainText = (article.summary || '') + ' ' + (article.content || '').replace(/<[^>]*>/g, ' ');
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return `${minutes} menit`;
  };

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
                {(article.authorRole === 'REDAKSI' || article.authorRole === 'GURU') && (
                  <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-blue-700 font-medium">
                    Wartawan Redaksi
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

          {/* Reading Accessibility Bar (Voice Play Naskah, Font Size Adjuster & Share) */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-100 border border-slate-200 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Play Naskah: Hanya Tombol Play Saja */}
              <div className="flex items-center gap-1.5 pr-3 border-r border-slate-300">
                <VoicePlayer
                  title={article.title}
                  textToRead={`${article.summary || ''}. ${article.content || ''}`}
                  authorName={article.authorName}
                  variant="button-only"
                />
              </div>

              {/* Ukuran Teks */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5" />
                  <span>Ukuran Teks:</span>
                </span>
                <div className="flex items-center gap-1 bg-white rounded-lg p-0.5 border border-slate-200 text-xs">
                  <button
                    onClick={() => setFontSizeClass('text-sm')}
                    className={`px-2 py-0.5 rounded font-medium ${fontSizeClass === 'text-sm' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSizeClass('text-base')}
                    className={`px-2 py-0.5 rounded font-medium ${fontSizeClass === 'text-base' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSizeClass('text-lg')}
                    className={`px-2 py-0.5 rounded font-medium ${fontSizeClass === 'text-lg' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    A+
                  </button>
                </div>
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

          {/* CARD 1: KOMENTAR TERBARU (Ikut obrolan pembaca) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#1b8055] uppercase block">
                  KOMENTAR TERBARU
                </span>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-1">
                  Ikut obrolan pembaca
                </h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <MessageSquare className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            {/* Daftar Komentar */}
            <div className="space-y-2.5">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1 transition-colors hover:bg-slate-100/70"
                >
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-none">
                    {c.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {c.content}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    {c.timeAgo}
                  </p>
                </div>
              ))}
            </div>

            {/* Form Tulis Komentar atau Tombol */}
            {showCommentForm ? (
              <form onSubmit={handleAddComment} className="pt-2 border-t border-slate-100 space-y-2.5 animate-in fade-in">
                {commentSuccess && (
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Komentar Anda berhasil dikirim!</span>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  required
                />
                <textarea
                  rows={2}
                  placeholder="Tulis tanggapan atau komentar Anda..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none"
                  required
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Komentar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCommentForm(false)}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowCommentForm(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-300/80 bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] shadow-xs"
              >
                <span>Tulis komentar</span>
                <ArrowDown className="w-4 h-4 text-emerald-700" />
              </button>
            )}
          </div>

          {/* CARD 2: RINGKASAN */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3.5">
            <span className="text-[11px] font-bold tracking-wider text-[#1b8055] uppercase block">
              RINGKASAN
            </span>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-slate-500">Tanggal</span>
                <span className="font-bold text-slate-900">
                  {formatDateSummary(article.publishedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-slate-500">Kategori</span>
                <span className="font-bold text-slate-900 text-right">
                  {article.categoryName || 'Pendidikan Madrasah'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Durasi baca</span>
                <span className="font-bold text-slate-900">
                  {calculateReadingTime()}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3: PUBLIKASI */}
          <div className="rounded-2xl overflow-hidden shadow-xs border border-slate-200/90">
            {/* Top header dark box */}
            <div className="bg-[#040915] text-white p-5 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase block">
                  PUBLIKASI
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white mt-1 leading-snug max-w-[210px]">
                  Kirim bahan berita kegiatan Anda
                </h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                <Newspaper className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            {/* Bottom white box */}
            <div className="bg-white p-5 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pegawai dan unit kerja dapat mengirim bahan kegiatan untuk diproses menjadi publikasi resmi Tim Humas.
              </p>
              <button
                type="button"
                onClick={onKirimBerita || onBack}
                className="w-full py-3 px-4 rounded-xl bg-[#006644] hover:bg-[#005237] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.99]"
              >
                <span>Kirim Berita</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
