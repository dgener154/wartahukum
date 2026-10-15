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
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Article, ArticleStatus } from '../../types';

interface GuruDashboardProps {
  onBackToPublic: () => void;
  onPreviewArticle?: (article: Article) => void;
}

export const GuruDashboard: React.FC<GuruDashboardProps> = ({
  onBackToPublic,
  onPreviewArticle,
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
  } = usePortal();

  const [activeTab, setActiveTab] = useState<'overview' | 'my-articles' | 'write' | 'my-agendas' | 'profile'>('overview');

  // Articles authored by current contributor
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
    // Only allow editing if draft, submitted, or needs_revision
    if (art.status === 'published') {
      alert('Artikel yang telah terbit tidak dapat disunting sepihak. Silakan hubungi Redaksi.');
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
      setFormFeedback({ type: 'error', message: 'Judul dan isi artikel wajib diisi!' });
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
          ? 'Artikel berhasil diajukan ke Redaksi untuk ditinjau!'
          : 'Draf artikel Anda berhasil diperbarui.',
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
        authorId: currentUser?.id || 'guru',
        authorName: currentUser?.name || 'Kontributor Guru',
        authorRole: 'GURU',
        publishedAt: null,
        status: targetStatus,
        readTimeMinutes: Math.max(2, Math.ceil(content.length / 500)),
      });
      setFormFeedback({
        type: 'success',
        message: submitToAdmin
          ? 'Naskah berhasil dikirim ke Redaksi! Anda dapat memantau status peninjauan di menu Berita Saya.'
          : 'Naskah berhasil disimpan sebagai Draf.',
      });
      handleResetForm();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            WH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm tracking-wide">
                WARTA HUKUM — Portal Kontributor Guru
              </span>
              <span className="text-[10px] bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 px-1.5 py-0.2 rounded uppercase font-bold">
                KONTRIBUTOR TERBATAS
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Penulis: {currentUser?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Portal Publik</span>
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
        {/* Contributor Sidebar Navigation */}
        <aside className="w-full md:w-60 bg-white border-r border-slate-200 p-4 space-y-1 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Menu Kontributor
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>Ringkasan Saya</span>
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
              <span>Berita Saya</span>
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
            <span>Agenda Saya</span>
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
            <span>Profil Akun</span>
          </button>

          <div className="pt-6">
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-[11px] text-indigo-900 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Alur Editorial</span>
              </div>
              Naskah yang Anda kirim akan ditelaah oleh Dewan Redaksi sebelum diterbitkan ke portal publik.
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Selamat Datang, {currentUser?.name}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Pantau status naskah liputan, catatan revisi editor, dan ajukan karya jurnalistik Anda.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Draf Anda</span>
                  <div className="text-2xl font-mono font-bold text-slate-700 mt-1">{draftCount}</div>
                  <span className="text-[10px] text-slate-400">Belum diajukan</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-purple-600">Dalam Peninjauan</span>
                  <div className="text-2xl font-mono font-bold text-purple-600 mt-1">{submittedCount}</div>
                  <span className="text-[10px] text-purple-500">Sedang diperiksa Redaksi</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-rose-600">Perlu Revisi</span>
                  <div className="text-2xl font-mono font-bold text-rose-600 mt-1">{revisionCount}</div>
                  <span className="text-[10px] text-rose-500">Ada catatan editor</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-emerald-600">Telah Terbit</span>
                  <div className="text-2xl font-mono font-bold text-emerald-600 mt-1">{publishedCount}</div>
                  <span className="text-[10px] text-emerald-500">Aktif dibaca publik</span>
                </div>
              </div>

              {/* Revision Alerts */}
              {revisionCount > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Perhatian: Terdapat naskah yang memerlukan perbaikan revisi</span>
                  </div>
                  <div className="space-y-1.5">
                    {myArticles
                      .filter((a) => a.status === 'needs_revision')
                      .map((art) => (
                        <div
                          key={art.id}
                          className="p-3 bg-white rounded-xl border border-rose-200 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="font-bold text-xs text-slate-900">{art.title}</h4>
                            <p className="text-[11px] text-rose-700 italic mt-0.5">
                              Catatan Redaksi: "{art.editorNotes}"
                            </p>
                          </div>
                          <button
                            onClick={() => handleStartEdit(art)}
                            className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700"
                          >
                            Perbaiki
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BERITA SAYA */}
          {activeTab === 'my-articles' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Daftar Berita & Naskah Saya
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Seluruh naskah yang Anda buat, status persetujuan, dan catatan dari editor redaksi.
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleResetForm();
                    setActiveTab('write');
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-indigo-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                {myArticles.length > 0 ? (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Judul Artikel</th>
                        <th className="py-3 px-4">Kanal</th>
                        <th className="py-3 px-4">Status Redaksi</th>
                        <th className="py-3 px-4">Catatan Editor</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 max-w-xs font-bold text-slate-900">
                            <div className="line-clamp-1">{art.title}</div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Dibuat: {new Date(art.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{art.categoryName}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                art.status === 'published'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : art.status === 'submitted'
                                  ? 'bg-purple-100 text-purple-800'
                                  : art.status === 'needs_revision'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {art.status === 'published'
                                ? 'Terbit'
                                : art.status === 'submitted'
                                ? 'Diajukan'
                                : art.status === 'needs_revision'
                                ? 'Perlu Revisi'
                                : 'Draf'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 italic max-w-xs truncate">
                            {art.editorNotes || '-'}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            {art.status !== 'published' && (
                              <button
                                onClick={() => handleStartEdit(art)}
                                className="text-blue-600 hover:underline font-semibold"
                              >
                                Sunting
                              </button>
                            )}
                            {art.status === 'published' && (
                              <span className="text-emerald-600 font-semibold text-[11px]">
                                {art.viewsCount} pembaca
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    Anda belum menulis berita. Klik tombol "Tulis Berita Baru" untuk memulai!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TULIS BERITA BARU */}
          {activeTab === 'write' && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    {editingId ? 'Sunting Draf Berita' : 'Tulis Berita Baru'}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Tulis informasi berita faktual. Simpan sebagai draf atau ajukan langsung ke Redaksi.
                  </p>
                </div>
              </div>

              {formFeedback && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    formFeedback.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border border-rose-200 text-rose-800'
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

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Berita *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul lugas dan informatif..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ringkasan Berita (Lead) *
                  </label>
                  <textarea
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Ringkasan singkat 2-3 kalimat..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kanal Kategori *
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
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
                      URL Foto Sampul
                    </label>
                    <input
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Provinsi (Jika Berita Daerah)
                    </label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Jawa Barat, Banten..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
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
                      placeholder="Bandung, Tangerang..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Isi Artikel Lengkap *
                  </label>
                  <textarea
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan isi berita secara lengkap..."
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleSubmitArticle(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Simpan sebagai Draf
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmitArticle(true)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke Redaksi (Ajukan)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AGENDA SAYA */}
          {activeTab === 'my-agendas' && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Agenda Kegiatan & Seminar Hukum
              </h1>
              <p className="text-xs text-slate-500">
                Informasi agenda yang Anda daftarkan untuk kalender kegiatan WARTA HUKUM.
              </p>

              <div className="space-y-3">
                {agendas
                  .filter((a) => a.createdBy === currentUser?.id || a.createdByName === currentUser?.name)
                  .map((ag) => (
                    <div key={ag.id} className="p-4 bg-white rounded-xl border border-slate-200">
                      <h4 className="font-bold text-xs text-slate-900">{ag.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {ag.date} · {ag.time} | {ag.location}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFIL AKUN */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-md animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Profil Akun Kontributor
              </h1>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Nama Lengkap</span>
                  <p className="text-sm font-bold text-slate-800">{currentUser?.name}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Surel Akun</span>
                  <p className="text-sm text-slate-700">{currentUser?.email}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Peran Sistem</span>
                  <p className="text-xs font-semibold text-indigo-700">Guru (Kontributor Berita Terdaftar)</p>
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
