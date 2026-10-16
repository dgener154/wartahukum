import React, { useState } from 'react';
import {
  FileText,
  PlusCircle,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  LogOut,
  ExternalLink,
  Edit,
  Send,
  Eye,
  Info,
  PenTool,
  ShieldAlert,
  ArrowRight,
  Headphones,
  ShieldCheck,
  BarChart3,
  Check,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Article, ArticleStatus } from '../../types';
import { VoicePlayer } from '../common/VoicePlayer';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface RedaksiDashboardProps {
  onBackToPublic: () => void;
  onPreviewArticle?: (article: Article) => void;
  onSwitchToAdmin?: () => void;
}

export const RedaksiDashboard: React.FC<RedaksiDashboardProps> = ({
  onBackToPublic,
  onPreviewArticle,
  onSwitchToAdmin,
}) => {
  const {
    currentUser,
    logout,
    articles,
    categories,
    agendas,
    addArticle,
    updateArticle,
    addAgenda,
    login,
    settings,
  } = usePortal();

  const [activeTab, setActiveTab] = useState<'overview' | 'my-articles' | 'write' | 'my-agendas' | 'profile'>('overview');

  // Articles authored by current journalist / editorial staff
  const myArticles = articles.filter(
    (a) => a.authorId === currentUser?.id || a.authorName === currentUser?.name
  );

  // Stats
  const draftCount = myArticles.filter((a) => a.status === 'draft').length;
  const submittedCount = myArticles.filter((a) => a.status === 'submitted' || a.status === 'reviewing').length;
  const revisionCount = myArticles.filter((a) => a.status === 'needs_revision').length;
  const publishedCount = myArticles.filter((a) => a.status === 'published').length;

  // Article Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [tags, setTags] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [caption, setCaption] = useState('');
  const [credit, setCredit] = useState('');
  const [formFeedback, setFormFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Handle Edit Own Article
  const handleStartEdit = (art: Article) => {
    if (art.status === 'published') {
      alert('Artikel yang telah terbit resmi tidak dapat disunting sepihak. Silakan hubungi Meja Redaksi / Pemimpin Redaksi.');
      return;
    }
    setEditingId(art.id);
    setTitle(art.title);
    setSummary(art.summary);
    setContent(art.content);
    setCategoryId(art.categoryId);
    setTags(art.tags?.join(', ') || '');
    setProvince(art.location?.province || '');
    setCity(art.location?.city || '');
    setCoverImage(art.coverImage);
    setCaption(art.caption || '');
    setCredit(art.imageCredit || '');
    setActiveTab('write');
  };

  const handleResetForm = () => {
    setEditingId(null);
    setTitle('');
    setSummary('');
    setContent('');
    setTags('');
    setProvince('');
    setCity('');
    setCoverImage('');
    setCaption('');
    setCredit('');
    setFormFeedback(null);
  };

  const handleSubmitArticle = (submitToAdmin: boolean) => {
    if (!title.trim() || !content.trim()) {
      setFormFeedback({ type: 'error', message: 'Judul dan isi liputan berita wajib diisi!' });
      return;
    }

    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const locationObj = province.trim() && city.trim() ? { province, city } : undefined;
    const targetStatus: ArticleStatus = submitToAdmin ? 'submitted' : 'draft';

    if (editingId) {
      updateArticle(editingId, {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary,
        content,
        categoryId,
        tags: tagsArray,
        location: locationObj,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        caption,
        imageCredit: credit,
        status: targetStatus,
      });
      setFormFeedback({
        type: 'success',
        message: submitToAdmin
          ? 'Liputan berhasil diajukan ke Meja Redaksi untuk diverifikasi & diterbitkan!'
          : 'Draf liputan berita Anda berhasil diperbarui.',
      });
    } else {
      addArticle({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary,
        content,
        categoryId,
        tags: tagsArray,
        location: locationObj,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        caption,
        imageCredit: credit,
        authorId: currentUser?.id || 'redaksi-1',
        authorName: currentUser?.name || 'Wartawan Redaksi',
        authorRole: 'REDAKSI',
        publishedAt: null,
        status: targetStatus,
        readTimeMinutes: Math.max(2, Math.ceil(content.length / 500)),
      });
      setFormFeedback({
        type: 'success',
        message: submitToAdmin
          ? 'Naskah berita liputan berhasil dikirim ke Meja Redaksi! Pantau status kurasi di Berita Saya.'
          : 'Naskah berhasil disimpan sebagai Draf.',
      });
      handleResetForm();
    }
  };

  const handleSwitchRoleToAdmin = () => {
    login('admin@wartahukum.id', 'ADMIN');
    if (onSwitchToAdmin) {
      onSwitchToAdmin();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt={settings.name}
              className="h-8 max-w-[140px] object-contain rounded bg-white/10 px-1 py-0.5"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              WH
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm tracking-wide">
                {settings.name} — Portal Wartawan & Redaksi
              </span>
              <span className="text-[10px] bg-blue-500/30 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded uppercase font-bold">
                REDAKSI / WARTAWAN
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Jurnalis: {currentUser?.name} ({currentUser?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Switch to Full Admin */}
          <button
            onClick={handleSwitchRoleToAdmin}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white transition-colors border border-red-500/30"
            title="Beralih ke hak akses Admin Penuh"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Beralih ke Panel Admin</span>
          </button>

          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Portal Publik</span>
          </button>
          <button
            onClick={() => {
              logout();
              onBackToPublic();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Editorial Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Menu Wartawan & Redaksi
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Ringkasan Liputan</span>
          </button>

          <button
            onClick={() => setActiveTab('my-articles')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'my-articles'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Naskah Berita Saya</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
              {myArticles.length}
            </span>
          </button>

          <button
            onClick={() => {
              handleResetForm();
              setActiveTab('write');
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'write'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-500" />
            <span>Tulis Berita Baru</span>
          </button>

          <button
            onClick={() => setActiveTab('my-agendas')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'my-agendas'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>Agenda Sidang & Liputan</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>Profil Jurnalis</span>
          </button>

          {/* Quick Notice Card */}
          <div className="pt-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>Pedoman Wartawan</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Naskah berita yang dikirim akan diverifikasi oleh Pemimpin Redaksi sesuai Kode Etik Jurnalistik dan Pedoman Media Siber.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Dashboard Kerja Wartawan & Tim Redaksi
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Selamat bertugas, <span className="font-semibold text-slate-800">{currentUser?.name}</span>. Pantau status naskah liputan dan penugasan redaksional Anda.
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('write');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Kirim Liputan Baru</span>
                </button>
              </div>

              {/* Status Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Draf Liputan</span>
                  <p className="text-2xl font-bold font-mono text-slate-700 mt-1">{draftCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-blue-600">Menunggu Kurasi</span>
                  <p className="text-2xl font-bold font-mono text-blue-800 mt-1">{submittedCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-amber-600">Perlu Revisi</span>
                  <p className="text-2xl font-bold font-mono text-amber-800 mt-1">{revisionCount}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-emerald-600">Sudah Terbit</span>
                  <p className="text-2xl font-bold font-mono text-emerald-800 mt-1">{publishedCount}</p>
                </div>
              </div>

              {/* Recent Articles Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-xs text-slate-800">Daftar Liputan Terkini Saya</h3>
                  <button
                    onClick={() => setActiveTab('my-articles')}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Lihat Semua ({myArticles.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {myArticles.slice(0, 5).map((art) => (
                    <div key={art.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {art.categoryName || 'Hukum'}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              art.status === 'published'
                                ? 'bg-emerald-100 text-emerald-700'
                                : art.status === 'needs_revision'
                                ? 'bg-amber-100 text-amber-700'
                                : art.status === 'submitted'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {art.status === 'published'
                              ? 'Terbit'
                              : art.status === 'needs_revision'
                              ? 'Revisi'
                              : art.status === 'submitted'
                              ? 'Meja Redaksi'
                              : 'Draf'}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {art.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Diperbarui: {new Date(art.updatedAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {onPreviewArticle && (
                          <button
                            onClick={() => onPreviewArticle(art)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200"
                            title="Pratinjau Berita"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {art.status !== 'published' && (
                          <button
                            onClick={() => handleStartEdit(art)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50"
                            title="Sunting Draf"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {myArticles.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-400">
                      Belum ada liputan berita yang Anda tulis. Klik tombol "Tulis Berita Baru" untuk memulai.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY ARTICLES */}
          {activeTab === 'my-articles' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Naskah Liputan Berita Saya
                  </h1>
                  <p className="text-xs text-slate-500">
                    Kelola draf berita dan pantau catatan kurasi dari Meja Redaksi.
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('write');
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Tulis Baru
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
                {myArticles.map((art) => (
                  <div key={art.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {art.categoryName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            art.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : art.status === 'needs_revision'
                              ? 'bg-amber-100 text-amber-800'
                              : art.status === 'submitted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          Status: {art.status.toUpperCase()}
                        </span>
                        {art.location && (
                          <span className="text-[10px] text-slate-400">
                            {art.location.city}, {art.location.province}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-slate-900">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {art.summary}
                      </p>

                      {art.editorNotes && (
                        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 mt-2">
                          <span className="font-bold">Catatan Meja Redaksi: </span>
                          <span>{art.editorNotes}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {onPreviewArticle && (
                        <button
                          onClick={() => onPreviewArticle(art)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat</span>
                        </button>
                      )}
                      {art.status !== 'published' && (
                        <button
                          onClick={() => handleStartEdit(art)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Sunting</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {myArticles.length === 0 && (
                  <div className="p-12 text-center text-xs text-slate-400">
                    Belum ada naskah berita.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: WRITE ARTICLE */}
          {activeTab === 'write' && (() => {
            const selectedCat = categories.find((c) => c.id === categoryId) || categories[0];
            const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
            const charCount = content ? content.length : 0;
            const readTimeEst = Math.max(1, Math.ceil(wordCount / 180));
            const completenessScore = Math.min(
              100,
              (title.trim().length >= 10 ? 25 : 0) +
                (summary.trim().length >= 20 ? 25 : 0) +
                (content.trim().length >= 50 ? 25 : 0) +
                (coverImage.trim().length >= 5 ? 15 : 0) +
                (tags.trim().length >= 2 ? 10 : 0)
            );

            return (
              <div className="space-y-6 max-w-7xl animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {editingId ? 'Sunting Draf Liputan Berita' : 'Tulis Liputan Berita Baru'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Kirimkan naskah fakta hukum berimbang sesuai standar pers WARTA HUKUM.
                    </p>
                  </div>
                  {editingId && (
                    <button
                      onClick={handleResetForm}
                      className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    >
                      Batal Edit (Tulis Baru)
                    </button>
                  )}
                </div>

                {formFeedback && (
                  <div
                    className={`p-3.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                      formFeedback.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {formFeedback.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{formFeedback.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* LEFT / MAIN COLUMN: Input Form */}
                  <div className="lg:col-span-7 xl:col-span-8 space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Judul Berita (Headline) *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Contoh: Kejari Tetapkan Dua Tersangka Dugaan Korupsi Proyek Jembatan..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Kanal / Rubrik Berita *
                        </label>
                        <select
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Kata Kunci / Tagar (Pisahkan koma)
                        </label>
                        <input
                          type="text"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="Kejaksaan, Korupsi, Jawa Barat"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Wilayah Provinsi
                        </label>
                        <input
                          type="text"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          placeholder="Contoh: DKI Jakarta / Jawa Barat"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Kota / Kabupaten
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Contoh: Jakarta Pusat / Bandung"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Ringkasan Berita (Lead Paragraf 5W+1H)
                      </label>
                      <textarea
                        rows={2}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Tuliskan rangkuman 1-2 kalimat fakta utama peristiwa..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Isi Lengkap Naskah Berita *
                      </label>
                      <textarea
                        rows={11}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tuliskan naskah berita liputan secara komprehensif, terstruktur 5W+1H, dan berimbang..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          URL Foto Dokumentasi
                        </label>
                        <input
                          type="text"
                          value={coverImage}
                          onChange={(e) => setCoverImage(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Keterangan Foto (Caption)
                        </label>
                        <input
                          type="text"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          placeholder="Suasana sidang putusan..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Kredit Foto / Wartawan
                        </label>
                        <input
                          type="text"
                          value={credit}
                          onChange={(e) => setCredit(e.target.value)}
                          placeholder="Warta Hukum / Tim Investigasi"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleSubmitArticle(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Simpan Draf Pribadi
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSubmitArticle(true)}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Ajukan ke Meja Redaksi</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-3 py-2 text-xs text-slate-400 hover:text-slate-600 ml-auto"
                      >
                        Atur Ulang Form
                      </button>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Cards (Live Card Preview, Voice Player, Quality) */}
                  <div className="lg:col-span-5 xl:col-span-4 space-y-5 lg:sticky lg:top-20">
                    {/* CARD 1: LIVE CARD PREVIEW BERITA */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                      <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Pratinjau Kartu Berita
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                          Live Card
                        </span>
                      </div>

                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <ImageWithFallback
                          src={coverImage}
                          alt={title || 'Pratinjau'}
                          fallbackCategory={selectedCat?.name || 'Hukum'}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                            {selectedCat?.name || 'Kanal Liputan'}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <h3 className="font-serif font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                          {title.trim() || 'Judul liputan jurnalistik yang sedang Anda tulis...'}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {summary.trim() || 'Lead ringkasan fakta 5W+1H akan muncul di kartu ini...'}
                        </p>

                        {/* Compact Voice Play button on card */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <VoicePlayer
                            title={title}
                            textToRead={`${summary}. ${content}`}
                            variant="compact"
                          />
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{readTimeEst} mnt baca</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                            {currentUser?.name || 'Wartawan'}
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {editingId ? 'Draf Disunting' : 'Naskah Baru'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CARD 2: VOICE PLAY NARATOR (Audio Narator) */}
                    <VoicePlayer
                      title={title}
                      textToRead={`${summary}. ${content}`}
                      variant="card-side"
                      authorName={currentUser?.name}
                    />

                    {/* CARD 3: TINDAKAN PUBLIKASI / SUBMISSION */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>Pengiriman Naskah</span>
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700">
                          REDAKSI
                        </span>
                      </div>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => handleSubmitArticle(true)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                        >
                          <Send className="w-4 h-4" />
                          <span>Ajukan ke Meja Redaksi</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSubmitArticle(false)}
                          className="w-full py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          Simpan Draf Pribadi
                        </button>
                      </div>
                    </div>

                    {/* CARD 4: STATISTIK & KELENGKAPAN */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Kelengkapan Jurnalistik</span>
                        </h4>
                        <span className="text-xs font-bold font-mono text-blue-700">
                          {completenessScore}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            completenessScore >= 80
                              ? 'bg-emerald-500'
                              : completenessScore >= 50
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${completenessScore}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Jumlah Kata</span>
                          <span className="text-xs font-bold font-mono text-slate-800">{wordCount}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Karakter</span>
                          <span className="text-xs font-bold font-mono text-slate-800">{charCount}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Waktu Baca</span>
                          <span className="text-xs font-bold font-mono text-slate-800">~{readTimeEst} mnt</span>
                        </div>
                      </div>
                    </div>

                    {/* CARD 5: KODE ETIK WARTAWAN */}
                    <div className="bg-blue-50/60 rounded-2xl border border-blue-200 p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Pedoman Wartawan Warta Hukum</span>
                      </div>
                      <ul className="text-[11px] text-blue-800 space-y-1.5 pl-1 leading-relaxed">
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span>Wajib memverifikasi kebenaran fakta dan konfirmasi pihak terkait.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span>Hormati asas praduga tak bersalah dan hak tolak narasumber.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">✓</span>
                          <span>Gunakan tombol Voice Play di atas untuk menguji kelancaran bahasa.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 4: AGENDAS */}
          {activeTab === 'my-agendas' && (
            <div className="space-y-6 max-w-3xl animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Agenda Sidang & Liputan Pers
              </h1>
              <p className="text-xs text-slate-500">
                Kalender jadwal sidang peradilan, rilis pers kejaksaan/kepolisian, dan kegiatan liputan hukum nasional.
              </p>

              <div className="space-y-3">
                {agendas.map((ag) => (
                  <div key={ag.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {ag.organizer}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {ag.date} · {ag.time} WIB
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{ag.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{ag.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-md animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Profil Akun Redaksi
              </h1>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Nama Lengkap</span>
                  <p className="text-sm font-bold text-slate-800">{currentUser?.name}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Surel Redaksi</span>
                  <p className="text-sm text-slate-700">{currentUser?.email}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Peran Sistem</span>
                  <p className="text-xs font-semibold text-blue-700">Wartawan & Tim Redaksi Terdaftar</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Biografi</span>
                  <p className="text-xs text-slate-600">{currentUser?.bio || '-'}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
