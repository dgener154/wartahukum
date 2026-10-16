import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  CheckSquare,
  FolderTree,
  Tag,
  Zap,
  Sliders,
  MapPin,
  Image,
  Calendar,
  Users,
  FileCode,
  Settings,
  History,
  LogOut,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Shield,
  Clock,
  Sparkles,
  Menu,
  Headphones,
  ShieldCheck,
  BarChart3,
  Check,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Article, ArticleCategory, ArticleStatus, AgendaItem, GalleryItem, User } from '../../types';
import { VoicePlayer } from '../common/VoicePlayer';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { WartaHukumLogo } from '../common/WartaHukumLogo';

interface AdminDashboardProps {
  onBackToPublic: () => void;
  onPreviewArticle?: (article: Article) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToPublic,
  onPreviewArticle,
}) => {
  const {
    currentUser,
    logout,
    articles,
    categories,
    settings,
    agendas,
    gallery,
    staticPages,
    logs,
    users,
    breakingNews,
    addArticle,
    updateArticle,
    updateArticleStatus,
    deleteArticle,
    addCategory,
    updateCategory,
    deleteCategory,
    addAgenda,
    updateAgenda,
    deleteAgenda,
    addGalleryItem,
    deleteGalleryItem,
    addUser,
    toggleUserActive,
    updateSettings,
    updateStaticPage,
    addBreakingNews,
    toggleBreakingNews,
    deleteBreakingNews,
  } = usePortal();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Article Form State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artSlug, setArtSlug] = useState('');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artCategory, setArtCategory] = useState(categories[0]?.id || '');
  const [artTags, setArtTags] = useState('');
  const [artProvince, setArtProvince] = useState('');
  const [artCity, setArtCity] = useState('');
  const [artCover, setArtCover] = useState('');
  const [artCaption, setArtCaption] = useState('');
  const [artCredit, setArtCredit] = useState('');
  const [artStatus, setArtStatus] = useState<ArticleStatus>('published');
  const [artIsFeatured, setArtIsFeatured] = useState(false);
  const [artIsBreaking, setArtIsBreaking] = useState(false);
  const [artIsOpinion, setArtIsOpinion] = useState(false);
  const [artOpinionBio, setArtOpinionBio] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Approval review modal state
  const [reviewingArticle, setReviewingArticle] = useState<Article | null>(null);
  const [editorNoteInput, setEditorNoteInput] = useState('');
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');

  // Settings State
  const [setName, setSetName] = useState(settings.name);
  const [setTagline, setSetTagline] = useState(settings.tagline);
  const [setLogoUrl, setSetLogoUrl] = useState(settings.logoUrl || '');
  const [logoUploadError, setLogoUploadError] = useState('');
  const [setLegalEntity, setSetLegalEntity] = useState(settings.legalEntityName);
  const [setEditorInChief, setSetEditorInChief] = useState(settings.editorInChief);
  const [setAddress, setSetAddress] = useState(settings.editorialAddress);
  const [setEmail, setSetEmail] = useState(settings.email);
  const [setPhone, setSetPhone] = useState(settings.phone);
  const [setWhatsapp, setSetWhatsapp] = useState(settings.whatsapp);
  const [setTickerText, setSetTickerText] = useState(settings.tickerCustomText);
  const [settingsSuccess, setSettingsSuccess] = useState('');

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setLogoUploadError('File harus berupa format gambar (PNG, JPG, WebP, SVG).');
      return;
    }

    // Max 3MB for base64 storage
    if (file.size > 3 * 1024 * 1024) {
      setLogoUploadError('Ukuran file logo maksimal 3 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setSetLogoUrl(result);
    };
    reader.onerror = () => {
      setLogoUploadError('Gagal memproses file gambar logo.');
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setSetLogoUrl('');
    setLogoUploadError('');
  };

  // New Category State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatColor, setNewCatColor] = useState('#ef4444');

  // New User State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'REDAKSI' | 'ADMIN'>('REDAKSI');
  const [newUserBio, setNewUserBio] = useState('');

  // New Agenda State
  const [newAgendaTitle, setNewAgendaTitle] = useState('');
  const [newAgendaDate, setNewAgendaDate] = useState('');
  const [newAgendaTime, setNewAgendaTime] = useState('');
  const [newAgendaLocation, setNewAgendaLocation] = useState('');
  const [newAgendaDesc, setNewAgendaDesc] = useState('');
  const [newAgendaOrg, setNewAgendaOrg] = useState('');

  // New Gallery State
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalType, setNewGalType] = useState<'photo' | 'video'>('photo');
  const [newGalAlbum, setNewGalAlbum] = useState('');
  const [newGalUrl, setNewGalUrl] = useState('');
  const [newGalCaption, setNewGalCaption] = useState('');
  const [newGalCredit, setNewGalCredit] = useState('');
  const [newGalCategory, setNewGalCategory] = useState('Hukum');

  // Stats calculation
  const totalArticles = articles.length;
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const reviewingCount = articles.filter((a) => a.status === 'submitted' || a.status === 'reviewing').length;
  const revisionCount = articles.filter((a) => a.status === 'needs_revision').length;

  // Filter article list in tab "articles"
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [articleStatusFilter, setArticleStatusFilter] = useState<string>('all');
  const filteredArticles = articles.filter((a) => {
    const matchQuery = articleSearchQuery
      ? a.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
        a.authorName.toLowerCase().includes(articleSearchQuery.toLowerCase())
      : true;
    const matchStatus = articleStatusFilter === 'all' ? true : a.status === articleStatusFilter;
    return matchQuery && matchStatus;
  });

  // Handle Edit Article Populate
  const handleStartEdit = (article: Article) => {
    setEditingArticleId(article.id);
    setArtTitle(article.title);
    setArtSlug(article.slug);
    setArtSummary(article.summary);
    setArtContent(article.content);
    setArtCategory(article.categoryId);
    setArtTags(article.tags?.join(', ') || '');
    setArtProvince(article.location?.province || '');
    setArtCity(article.location?.city || '');
    setArtCover(article.coverImage);
    setArtCaption(article.caption || '');
    setArtCredit(article.imageCredit || '');
    setArtStatus(article.status);
    setArtIsFeatured(Boolean(article.isFeatured));
    setArtIsBreaking(Boolean(article.isBreaking));
    setArtIsOpinion(Boolean(article.isOpinion));
    setArtOpinionBio(article.opinionAuthorBio || '');
    setActiveTab('add-article');
  };

  const handleResetArticleForm = () => {
    setEditingArticleId(null);
    setArtTitle('');
    setArtSlug('');
    setArtSummary('');
    setArtContent('');
    setArtTags('');
    setArtProvince('');
    setArtCity('');
    setArtCover('');
    setArtCaption('');
    setArtCredit('');
    setArtStatus('published');
    setArtIsFeatured(false);
    setArtIsBreaking(false);
    setArtIsOpinion(false);
    setArtOpinionBio('');
    setFormSuccess('');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent.trim()) {
      alert('Judul dan isi artikel tidak boleh kosong!');
      return;
    }

    const tagsArray = artTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const locationObj =
      artProvince.trim() && artCity.trim()
        ? { province: artProvince.trim(), city: artCity.trim() }
        : undefined;

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: artTitle,
        slug: artSlug || artTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary: artSummary,
        content: artContent,
        categoryId: artCategory,
        tags: tagsArray,
        location: locationObj,
        coverImage: artCover || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        caption: artCaption,
        imageCredit: artCredit,
        status: artStatus,
        isFeatured: artIsFeatured,
        isBreaking: artIsBreaking,
        isOpinion: artIsOpinion,
        opinionAuthorBio: artOpinionBio,
        readTimeMinutes: Math.max(2, Math.ceil(artContent.length / 500)),
      });
      setFormSuccess('Artikel berhasil diperbarui secara permanen!');
    } else {
      addArticle({
        title: artTitle,
        slug: artSlug || artTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary: artSummary,
        content: artContent,
        categoryId: artCategory,
        tags: tagsArray,
        location: locationObj,
        coverImage: artCover || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        caption: artCaption,
        imageCredit: artCredit,
        authorId: currentUser?.id || 'admin',
        authorName: currentUser?.name || 'Administrator',
        authorRole: 'ADMIN',
        editorName: currentUser?.name,
        publishedAt: artStatus === 'published' ? new Date().toISOString() : null,
        status: artStatus,
        isFeatured: artIsFeatured,
        isBreaking: artIsBreaking,
        isOpinion: artIsOpinion,
        opinionAuthorBio: artOpinionBio,
        readTimeMinutes: Math.max(2, Math.ceil(artContent.length / 500)),
      });
      setFormSuccess('Artikel baru berhasil diterbitkan/disimpan!');
      handleResetArticleForm();
    }

    setTimeout(() => setFormSuccess(''), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name: setName,
      tagline: setTagline,
      logoUrl: setLogoUrl,
      legalEntityName: setLegalEntity,
      editorInChief: setEditorInChief,
      editorialAddress: setAddress,
      email: setEmail,
      phone: setPhone,
      whatsapp: setWhatsapp,
      tickerCustomText: setTickerText,
    });
    setSettingsSuccess('Profil identitas dan logo aplikasi WARTA HUKUM berhasil diperbarui!');
    setTimeout(() => setSettingsSuccess(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          {settings.logoUrl ? (
            <img
              src={settings.logoUrl}
              alt={settings.name}
              className="h-8 max-w-[140px] object-contain rounded bg-white/10 px-1 py-0.5"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xs">
              WH
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm tracking-wide">
                {settings.name} — Panel Kontrol Redaksi
              </span>
              <span className="text-[10px] bg-red-500/30 text-red-400 border border-red-500/40 px-1.5 py-0.2 rounded uppercase font-bold">
                ADMIN ACCESS
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pengguna: {currentUser?.name} ({currentUser?.role})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
          >
            <Menu className="w-3.5 h-3.5 text-red-500" />
            <span>Pilih Menu (12)</span>
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
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1 shrink-0 overflow-y-auto max-h-[50vh] md:max-h-none`}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Menu Utama
          </div>

          <button
            onClick={() => selectTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-red-500" />
            <span>Ringkasan Dashboard</span>
          </button>

          <button
            onClick={() => selectTab('articles')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'articles'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Semua Berita</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded">
              {totalArticles}
            </span>
          </button>

          <button
            onClick={() => {
              handleResetArticleForm();
              selectTab('add-article');
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'add-article'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-500" />
            <span>Tambah Berita Baru</span>
          </button>

          <button
            onClick={() => selectTab('approvals')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'approvals'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckSquare className="w-4 h-4 text-purple-500" />
              <span>Persetujuan Artikel</span>
            </div>
            {reviewingCount > 0 && (
              <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded animate-pulse">
                {reviewingCount}
              </span>
            )}
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Rubrik & Tampilan
          </div>

          <button
            onClick={() => selectTab('categories')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'categories'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FolderTree className="w-4 h-4 text-blue-500" />
            <span>Kategori Berita</span>
          </button>

          <button
            onClick={() => selectTab('ticker')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'ticker'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-4 h-4 text-red-500" />
            <span>Breaking & Running Text</span>
          </button>

          <button
            onClick={() => selectTab('gallery')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'gallery'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Image className="w-4 h-4 text-pink-500" />
            <span>Galeri Foto & Video</span>
          </button>

          <button
            onClick={() => selectTab('agenda')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'agenda'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Agenda Sidang & Media</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
            Sistem & Kebijakan
          </div>

          <button
            onClick={() => selectTab('users')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-teal-500" />
            <span>Manajemen Pengguna</span>
          </button>

          <button
            onClick={() => selectTab('static-pages')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'static-pages'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileCode className="w-4 h-4 text-amber-500" />
            <span>Halaman Kebijakan Pers</span>
          </button>

          <button
            onClick={() => selectTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Profil Identitas Media</span>
          </button>

          <button
            onClick={() => selectTab('logs')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'logs'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Log Aktivitas Sistem</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Dashboard Redaksi & Manajemen Portal
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Ringkasan status penerbitan berita, antrean kurasi, dan operasional portal WARTA HUKUM.
                </p>
              </div>

              {/* Rainbow Gradient Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rainbow-gradient-border p-5 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Total Berita
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 mt-1">
                    {totalArticles}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    {publishedCount} terbit ke publik
                  </span>
                </div>

                <div className="rainbow-gradient-border p-5 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Menunggu Peninjauan
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-600 mt-1">
                    {reviewingCount}
                  </div>
                  <button
                    onClick={() => setActiveTab('approvals')}
                    className="text-[11px] text-amber-700 font-semibold underline mt-0.5"
                  >
                    Buka Antrean Persetujuan →
                  </button>
                </div>

                <div className="rainbow-gradient-border p-5 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Perlu Revisi
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-rose-600 mt-1">
                    {revisionCount}
                  </div>
                  <span className="text-[11px] text-slate-500">Menunggu perbaikan kontributor</span>
                </div>

                <div className="rainbow-gradient-border p-5 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Kategori & Agenda
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600 mt-1">
                    {categories.length} / {agendas.length}
                  </div>
                  <span className="text-[11px] text-slate-500">Kanal liputan & agenda sidang</span>
                </div>
              </div>

              {/* Quick Actions & Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      Berita Menunggu Persetujuan Redaksi
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">{reviewingCount} berkas</span>
                  </div>

                  {reviewingCount > 0 ? (
                    <div className="space-y-3">
                      {articles
                        .filter((a) => a.status === 'submitted' || a.status === 'reviewing')
                        .slice(0, 4)
                        .map((art) => (
                          <div
                            key={art.id}
                            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                                {art.categoryName}
                              </span>
                              <h4 className="font-bold text-xs text-slate-900 truncate mt-1">
                                {art.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Diajukan oleh: {art.authorName}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setReviewingArticle(art);
                                setEditorNoteInput(art.editorNotes || '');
                                setActiveTab('approvals');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0"
                            >
                              Tinjau
                            </button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      Tidak ada naskah yang sedang menunggu persetujuan saat ini.
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-serif font-bold text-base text-slate-900">
                      Log Aktivitas Terbaru
                    </h3>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className="text-xs text-red-600 font-semibold hover:underline"
                    >
                      Lihat Semua
                    </button>
                  </div>

                  <div className="space-y-3">
                    {logs.slice(0, 5).map((log) => (
                      <div key={log.id} className="text-xs border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] mb-0.5">
                          <span className="font-semibold text-slate-600">{log.userName}</span>
                          <span>{new Date(log.timestamp).toLocaleTimeString('id-ID')}</span>
                        </div>
                        <p className="text-slate-700 line-clamp-1">{log.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SEMUA BERITA */}
          {activeTab === 'articles' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Pengelolaan Seluruh Berita
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Kelola draf, artikel terbit, ubah status naskah, atau sunting berita yang ada.
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleResetArticleForm();
                    setActiveTab('add-article');
                  }}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={articleSearchQuery}
                    onChange={(e) => setArticleSearchQuery(e.target.value)}
                    placeholder="Cari judul berita atau nama penulis..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <select
                  value={articleStatusFilter}
                  onChange={(e) => setArticleStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-700"
                >
                  <option value="all">Semua Status</option>
                  <option value="published">Terbit (Published)</option>
                  <option value="draft">Draf</option>
                  <option value="submitted">Diajukan</option>
                  <option value="needs_revision">Perlu Revisi</option>
                  <option value="archived">Diarsipkan</option>
                </select>
              </div>

              {/* Table of Articles */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Judul Artikel</th>
                        <th className="py-3 px-4">Kanal</th>
                        <th className="py-3 px-4">Penulis</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Kunjungan</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 max-w-xs sm:max-w-md">
                            <div className="font-bold text-slate-900 line-clamp-1">{art.title}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>ID: {art.id}</span>
                              {art.isBreaking && (
                                <span className="text-red-600 font-bold uppercase">Breaking</span>
                              )}
                              {art.isFeatured && (
                                <span className="text-amber-600 font-bold uppercase">Unggulan</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-medium text-slate-700">{art.categoryName}</span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                            {art.authorName}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                                art.status === 'published'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : art.status === 'submitted'
                                  ? 'bg-purple-100 text-purple-800'
                                  : art.status === 'needs_revision'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {art.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-600">
                            {art.viewsCount.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                            <button
                              onClick={() => handleStartEdit(art)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Sunting Artikel"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus artikel "${art.title}"?`)) {
                                  deleteArticle(art.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Hapus Artikel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TAMBAH / SUNTING BERITA */}
          {activeTab === 'add-article' && (() => {
            const selectedCat = categories.find((c) => c.id === artCategory) || categories[0];
            const wordCount = artContent ? artContent.trim().split(/\s+/).filter(Boolean).length : 0;
            const charCount = artContent ? artContent.length : 0;
            const readTimeEst = Math.max(1, Math.ceil(wordCount / 180));
            const completenessScore = Math.min(
              100,
              (artTitle.trim().length >= 10 ? 25 : 0) +
                (artSummary.trim().length >= 20 ? 25 : 0) +
                (artContent.trim().length >= 50 ? 25 : 0) +
                (artCover.trim().length >= 5 ? 15 : 0) +
                (artTags.trim().length >= 2 ? 10 : 0)
            );

            return (
              <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      {editingArticleId ? 'Sunting Artikel Berita' : 'Tulis Berita Baru'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Lengkapi naskah liputan sesuai pedoman redaksi WARTA HUKUM dan kode etik jurnalistik.
                    </p>
                  </div>
                  {editingArticleId && (
                    <button
                      onClick={handleResetArticleForm}
                      className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    >
                      Batal Edit (Buat Baru)
                    </button>
                  )}
                </div>

                {formSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleSaveArticle}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT / MAIN COLUMN: Editor Form (8 cols) */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                      {/* Title */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Judul Berita (Headline) *
                        </label>
                        <input
                          type="text"
                          required
                          value={artTitle}
                          onChange={(e) => setArtTitle(e.target.value)}
                          placeholder="Contoh: Majelis Hakim Vonis Terdakwa Perkara Tipikor..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-serif font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      {/* Summary / Lead */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Ringkasan Berita (Lead Paragraf 5W+1H) *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={artSummary}
                          onChange={(e) => setArtSummary(e.target.value)}
                          placeholder="Tuliskan 2-3 kalimat ringkasan inti peristiwa fakta hukum (5W+1H)..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      {/* Category & Status */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Kanal Kategori *
                          </label>
                          <select
                            value={artCategory}
                            onChange={(e) => setArtCategory(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Status Publikasi *
                          </label>
                          <select
                            value={artStatus}
                            onChange={(e) => setArtStatus(e.target.value as ArticleStatus)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="published">Terbit Langsung (Tampil di Publik)</option>
                            <option value="draft">Simpan sebagai Draf</option>
                            <option value="submitted">Ajukan ke Meja Redaksi</option>
                            <option value="needs_revision">Perlu Revisi</option>
                            <option value="archived">Arsipkan</option>
                          </select>
                        </div>
                      </div>

                      {/* Location (Province & City for Regional News) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Provinsi (Opsional untuk Berita Nusantara)
                          </label>
                          <input
                            type="text"
                            value={artProvince}
                            onChange={(e) => setArtProvince(e.target.value)}
                            placeholder="Contoh: Jawa Barat, DKI Jakarta, Jawa Timur..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Kabupaten / Kota
                          </label>
                          <input
                            type="text"
                            value={artCity}
                            onChange={(e) => setArtCity(e.target.value)}
                            placeholder="Contoh: Bandung, Surabaya, Medan..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                          />
                        </div>
                      </div>

                      {/* Cover Image, Caption, and Photo Credit */}
                      <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Tautan URL Foto Sampul (Cover Image) *
                          </label>
                          <input
                            type="url"
                            value={artCover}
                            onChange={(e) => setArtCover(e.target.value)}
                            placeholder="https://images.unsplash.com/... atau URL foto terverifikasi"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              Keterangan Foto (Caption)
                            </label>
                            <input
                              type="text"
                              value={artCaption}
                              onChange={(e) => setArtCaption(e.target.value)}
                              placeholder="Contoh: Suasana ruang sidang pleno..."
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              Kredit Fotografer / Sumber
                            </label>
                            <input
                              type="text"
                              value={artCredit}
                              onChange={(e) => setArtCredit(e.target.value)}
                              placeholder="Contoh: Dok. Puspenkum Kejagung / Warta Hukum"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Article Full Body */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Isi Artikel Lengkap * (Mendukung paragraf HTML)
                        </label>
                        <textarea
                          rows={11}
                          required
                          value={artContent}
                          onChange={(e) => setArtContent(e.target.value)}
                          placeholder="Tuliskan naskah berita lengkap di sini..."
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                        />
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Tag Berita (Pisahkan dengan koma)
                        </label>
                        <input
                          type="text"
                          value={artTags}
                          onChange={(e) => setArtTags(e.target.value)}
                          placeholder="Mahkamah Agung, Tipikor, Restorative Justice, Kejagung"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      {/* Flags / Checkboxes */}
                      <div className="flex flex-wrap items-center gap-5 pt-2">
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={artIsFeatured}
                            onChange={(e) => setArtIsFeatured(e.target.checked)}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span>Berita Unggulan (Featured)</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={artIsBreaking}
                            onChange={(e) => setArtIsBreaking(e.target.checked)}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                          <span>Breaking News</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={artIsOpinion}
                            onChange={(e) => setArtIsOpinion(e.target.checked)}
                            className="rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>Kolom Opini / Analisis Pakar</span>
                        </label>
                      </div>

                      {artIsOpinion && (
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                          <label className="block text-xs font-bold text-amber-900 mb-1">
                            Biografi Singkat Penulis Opini
                          </label>
                          <input
                            type="text"
                            value={artOpinionBio}
                            onChange={(e) => setArtOpinionBio(e.target.value)}
                            placeholder="Contoh: Pakar Hukum Pidana Universitas Indonesia"
                            className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs bg-white"
                          />
                        </div>
                      )}

                      {/* Submit Actions inside left form for mobile convenience */}
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={handleResetArticleForm}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors"
                        >
                          {editingArticleId ? 'Perbarui Berita' : 'Terbitkan Berita'}
                        </button>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Right-hand cards (Pratinjau Card, Voice Play, Kualitas) */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-5 lg:sticky lg:top-20">
                      {/* CARD 1: LIVE CARD PREVIEW BERITA */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                        <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">
                              Pratinjau Kartu Berita
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                            Live Preview
                          </span>
                        </div>

                        {/* Card Image */}
                        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                          <ImageWithFallback
                            src={artCover}
                            alt={artTitle || 'Pratinjau'}
                            fallbackCategory={selectedCat?.name || 'Hukum'}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-600 text-white shadow-xs">
                              {selectedCat?.name || 'Kanal Berita'}
                            </span>
                            {artIsBreaking && (
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950 shadow-xs animate-pulse">
                                BREAKING
                              </span>
                            )}
                            {artIsOpinion && (
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-600 text-white shadow-xs">
                                OPINI
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Content Body */}
                        <div className="p-4 space-y-2.5">
                          <h3 className="font-serif font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                            {artTitle.trim() || 'Judul naskah berita akan langsung tertampil di sini secara dinamis...'}
                          </h3>

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {artSummary.trim() || 'Lead berita 5W+1H akan muncul di bagian ringkasan kartu pembaca...'}
                          </p>

                          {/* Quick Voice Play button on card */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <VoicePlayer
                              title={artTitle}
                              textToRead={`${artSummary}. ${artContent}`}
                              variant="compact"
                            />
                            <div className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{readTimeEst} mnt baca</span>
                            </div>
                          </div>

                          {/* Author & Status Byline */}
                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                            <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                              {currentUser?.name || 'Redaksi Warta Hukum'}
                            </span>
                            <span className="text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                              {artStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CARD 2: VOICE PLAY NARATOR (Audio Playback) */}
                      <VoicePlayer
                        title={artTitle}
                        textToRead={`${artSummary}. ${artContent}`}
                        variant="card-side"
                        authorName={currentUser?.name}
                      />

                      {/* CARD 3: PUBLIKASI CEPAT */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Tindakan Publikasi</span>
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                            {artStatus.toUpperCase()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
                          >
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>{editingArticleId ? 'Perbarui Naskah' : 'Terbitkan Berita'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setArtStatus('draft');
                              setTimeout(() => {
                                const form = document.querySelector('form');
                                if (form) form.requestSubmit();
                              }, 50);
                            }}
                            className="w-full py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                          >
                            Simpan Sebagai Draf
                          </button>
                        </div>
                      </div>

                      {/* CARD 4: STATISTIK & KUALITAS NASKAH */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Statistik & Kelengkapan</span>
                          </h4>
                          <span className="text-xs font-bold font-mono text-emerald-600">
                            {completenessScore}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              completenessScore >= 80
                                ? 'bg-emerald-500'
                                : completenessScore >= 50
                                ? 'bg-amber-500'
                                : 'bg-red-500'
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

                      {/* CARD 5: STANDAR REDAKSI & KODE ETIK */}
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Standar Redaksi Warta Hukum</span>
                        </div>
                        <ul className="text-[11px] text-slate-600 space-y-1.5 pl-1 leading-relaxed">
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>Memenuhi unsur 5W+1H yang berimbang dan faktual.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>Menjunjung asas praduga tak bersalah dalam perkara hukum.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>Mencantumkan sumber resmi & hak jawab bagi pihak terkait.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            );
          })()}

          {/* TAB 4: PERSETUJUAN ARTIKEL (APPROVAL WORKFLOW) */}
          {activeTab === 'approvals' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Persetujuan & Kurasi Redaksi (Editorial Approval)
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Verifikasi akurasi fakta, sumber rujukan, dan kelayakan hukum artikel yang diajukan oleh wartawan dan tim redaksi.
                </p>
              </div>

              {/* Reviewing list */}
              <div className="space-y-4">
                {articles
                  .filter((a) => a.status === 'submitted' || a.status === 'reviewing' || a.status === 'needs_revision')
                  .map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              article.status === 'submitted'
                                ? 'bg-purple-100 text-purple-700'
                                : article.status === 'needs_revision'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {article.status === 'submitted'
                              ? 'Menunggu Tinjauan'
                              : article.status === 'needs_revision'
                              ? 'Perlu Revisi'
                              : article.status}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Kanal: {article.categoryName}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          Penulis: <strong>{article.authorName}</strong> ({article.authorRole})
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {article.summary}
                        </p>
                        <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono line-clamp-3">
                          {article.content.replace(/<[^>]+>/g, '')}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs">
                          {article.editorNotes && (
                            <span className="text-slate-500 italic">
                              Catatan Sebelumnya: "{article.editorNotes}"
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const note = prompt('Tulis catatan revisi untuk kontributor:', article.editorNotes || '');
                              if (note) {
                                updateArticleStatus(article.id, 'needs_revision', {
                                  editorNotes: note,
                                  rejectionReason: 'Perlu penyempurnaan naskah sesuai catatan redaksi.',
                                });
                                alert('Artikel dikembalikan ke kontributor untuk direvisi.');
                              }
                            }}
                            className="px-3.5 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                          >
                            Minta Revisi
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Setujui dan terbitkan langsung artikel "${article.title}" ke publik?`)) {
                                updateArticleStatus(article.id, 'published', {
                                  editorName: currentUser?.name || 'Redaksi Warta Hukum',
                                });
                                alert('Artikel berhasil disetujui dan kini terbit di portal publik!');
                              }
                            }}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                          >
                            Setujui & Terbitkan
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {articles.filter(
                  (a) => a.status === 'submitted' || a.status === 'reviewing' || a.status === 'needs_revision'
                ).length === 0 && (
                  <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                    <h3 className="font-bold text-sm text-slate-800">
                      Seluruh Naskah Telah Ditinjau
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Tidak ada naskah yang menunggu kurasi saat ini.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: KATEGORI BERITA */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Kategori & Kanal Berita
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Tambah, edit urutan, ubah warna aksen pelangi, atau aktifkan/nonaktifkan kanal.
                  </p>
                </div>
              </div>

              {/* Add Category Form */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Tambah Kategori Baru
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => {
                      setNewCatName(e.target.value);
                      setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }}
                    placeholder="Nama Kategori (cth: Hak Asasi Manusia)"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Deskripsi singkat kanal..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newCatColor}
                      onChange={(e) => setNewCatColor(e.target.value)}
                      className="w-10 h-8 rounded border border-slate-200 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-600">{newCatColor}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!newCatName.trim()) return;
                      addCategory({
                        name: newCatName,
                        slug: newCatSlug || newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        description: newCatDesc,
                        color: newCatColor,
                        order: categories.length + 1,
                        active: true,
                        iconName: 'Scale',
                      });
                      setNewCatName('');
                      setNewCatDesc('');
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
                  >
                    Tambah Kategori
                  </button>
                </div>
              </div>

              {/* Category List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.order}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{cat.name}</h4>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{cat.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCategory(cat.id, { active: !cat.active })}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          cat.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {cat.active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BREAKING NEWS & RUNNING TEXT TICKER */}
          {activeTab === 'ticker' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Pengaturan Running Text Ticker & Breaking News
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Atur teks berjalan di atas kartu kategori dan siaran breaking news darurat.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-sm text-slate-900">
                  Teks Berjalan Utama (Running Text)
                </h3>
                <textarea
                  rows={3}
                  value={setTickerText}
                  onChange={(e) => setSetTickerText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono"
                />
                <button
                  onClick={() => {
                    updateSettings({ tickerCustomText: setTickerText });
                    alert('Running text berhasil diperbarui!');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Simpan Teks Berjalan
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-sm text-slate-900">
                  Daftar Headline Breaking News
                </h3>
                <div className="space-y-2">
                  {breakingNews.map((bn) => (
                    <div
                      key={bn.id}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            bn.priority === 'urgent' ? 'bg-red-600 animate-ping' : 'bg-amber-500'
                          }`}
                        />
                        <span className="text-xs font-semibold text-slate-800">{bn.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBreakingNews(bn.id)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            bn.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {bn.active ? 'Aktif' : 'Nonaktif'}
                        </button>
                        <button
                          onClick={() => deleteBreakingNews(bn.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: GALERI FOTO & VIDEO */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Dokumentasi Visual Jurnalistik (Galeri Foto & Video)
              </h1>

              {/* Add Media Item */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tambah Media Dokumentasi
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newGalTitle}
                    onChange={(e) => setNewGalTitle(e.target.value)}
                    placeholder="Judul foto / video..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={newGalAlbum}
                    onChange={(e) => setNewGalAlbum(e.target.value)}
                    placeholder="Nama album (cth: Dokumentasi Sidang Tipikor)"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="url"
                    value={newGalUrl}
                    onChange={(e) => setNewGalUrl(e.target.value)}
                    placeholder="URL Gambar / Thumbnail (https://...)"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={newGalCredit}
                    onChange={(e) => setNewGalCredit(e.target.value)}
                    placeholder="Kredit Fotografer (cth: Biro Humas MA)"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newGalTitle || !newGalUrl) return;
                    addGalleryItem({
                      title: newGalTitle,
                      type: newGalType,
                      albumName: newGalAlbum || 'Umum',
                      mediaUrl: newGalUrl,
                      caption: newGalTitle,
                      photographerCredit: newGalCredit || 'Warta Hukum',
                      date: new Date().toISOString().split('T')[0],
                      category: newGalCategory,
                    });
                    setNewGalTitle('');
                    setNewGalUrl('');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Simpan Media
                </button>
              </div>

              {/* Existing Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden p-3 space-y-2">
                    <img src={g.mediaUrl} alt={g.title} className="w-full aspect-[4/3] object-cover rounded-lg" />
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{g.title}</h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{g.albumName}</span>
                      <button onClick={() => deleteGalleryItem(g.id)} className="text-red-600 hover:underline">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: AGENDA PERSIDANGAN & MEDIA */}
          {activeTab === 'agenda' && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Agenda Sidang & Liputan Media
              </h1>

              {/* Add Agenda Form */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tambah Agenda Baru
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newAgendaTitle}
                    onChange={(e) => setNewAgendaTitle(e.target.value)}
                    placeholder="Judul agenda (cth: Sidang Pembacaan Vonis Kasus X)..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs sm:col-span-2"
                  />
                  <input
                    type="date"
                    value={newAgendaDate}
                    onChange={(e) => setNewAgendaDate(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={newAgendaTime}
                    onChange={(e) => setNewAgendaTime(e.target.value)}
                    placeholder="Waktu (cth: 09:30 WIB)"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={newAgendaLocation}
                    onChange={(e) => setNewAgendaLocation(e.target.value)}
                    placeholder="Lokasi (cth: Pengadilan Negeri Bandung Ruang 2)"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs sm:col-span-2"
                  />
                  <textarea
                    rows={2}
                    value={newAgendaDesc}
                    onChange={(e) => setNewAgendaDesc(e.target.value)}
                    placeholder="Deskripsi agenda..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs sm:col-span-2"
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newAgendaTitle) return;
                    addAgenda({
                      title: newAgendaTitle,
                      date: newAgendaDate || new Date().toISOString().split('T')[0],
                      time: newAgendaTime || '10:00 WIB',
                      location: newAgendaLocation || 'Pengadilan Negeri',
                      description: newAgendaDesc || '',
                      organizer: 'Warta Hukum Redaksi',
                      status: 'upcoming',
                      isPublic: true,
                      createdBy: currentUser?.id || 'admin',
                      createdByName: currentUser?.name || 'Administrator',
                    });
                    setNewAgendaTitle('');
                    setNewAgendaLocation('');
                    setNewAgendaDesc('');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Tambah Agenda
                </button>
              </div>

              {/* Agenda List */}
              <div className="space-y-3">
                {agendas.map((a) => (
                  <div key={a.id} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {a.date} · {a.time}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{a.title}</h4>
                      <p className="text-[11px] text-slate-500">{a.location}</p>
                    </div>
                    <button onClick={() => deleteAgenda(a.id)} className="text-red-600 hover:underline text-xs">
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: MANAJEMEN PENGGUNA (USERS & TIM REDAKSI) */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Manajemen Pengguna & Tim Redaksi
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Kelola akun wartawan, staf redaksi, dan hak akses penuh administrator portal WARTA HUKUM.
                </p>
              </div>

              {/* Add User Form */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Buat Akun Tim Redaksi Baru
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Nama Lengkap & Gelar..."
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="surel@wartahukum.id"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  >
                    <option value="REDAKSI">Redaksi (Wartawan / Jurnalis)</option>
                    <option value="ADMIN">Admin (Akses Penuh)</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (!newUserName || !newUserEmail) return;
                    addUser({
                      name: newUserName,
                      email: newUserEmail,
                      role: newUserRole,
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                      bio: newUserBio || 'Wartawan Liputan Berita Hukum',
                      active: true,
                    });
                    setNewUserName('');
                    setNewUserEmail('');
                    alert('Akun pengguna berhasil dibuat!');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Buat Pengguna
                </button>
              </div>

              {/* Users List */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Nama Pengguna</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Peran (Role)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                        <td className="py-3 px-4 text-slate-600">{u.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {u.role === 'ADMIN' ? 'Admin (Akses Penuh)' : 'Wartawan / Redaksi'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold ${u.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {u.active ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => toggleUserActive(u.id)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            {u.active ? 'Nonaktifkan' : 'Aktifkan'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS / IDENTITAS MEDIA */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl animate-in fade-in">
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Pengaturan Identitas Media & Logo Aplikasi
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Kelola logo visual aplikasi dan informasi identitas media. Logo yang diunggah akan otomatis tampil di seluruh header, footer, dan kartu media portal.
                </p>
              </div>

              {settingsSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{settingsSuccess}</span>
                </div>
              )}

              {/* UPLOAD LOGO & NAMA APLIKASI (IMAGE MASTHEAD) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Image className="w-5 h-5 text-red-600" />
                      <span>Upload Logo & Nama Aplikasi</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Unggah file logo atau nama aplikasi dalam bentuk gambar. Portal akan langsung menampilkan gambar ini sebagai logo resmi di header dan footer.
                    </p>
                  </div>
                  {setLogoUrl ? (
                    <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full shrink-0">
                      Logo Kustom Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full shrink-0">
                      Logo Bawaan (Default)
                    </span>
                  )}
                </div>

                {/* Live Preview Box */}
                <div className="space-y-2">
                  <span className="block text-xs font-bold text-slate-700">
                    Pratinjau Tampilan Logo Aplikasi:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Light background preview (Header) */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center min-h-[110px] shadow-xs">
                      <span className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                        Di Atas Latar Terang (Header)
                      </span>
                      {setLogoUrl ? (
                        <img
                          src={setLogoUrl}
                          alt="Preview Logo"
                          className="max-h-14 max-w-full object-contain"
                        />
                      ) : (
                        <WartaHukumLogo variant="header" />
                      )}
                    </div>

                    {/* Dark background preview (Footer / Dark Bar) */}
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center min-h-[110px] shadow-xs">
                      <span className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                        Di Atas Latar Gelap (Footer)
                      </span>
                      {setLogoUrl ? (
                        <img
                          src={setLogoUrl}
                          alt="Preview Logo Dark"
                          className="max-h-14 max-w-full object-contain brightness-110 drop-shadow-sm"
                        />
                      ) : (
                        <WartaHukumLogo variant="footer" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Upload Control Area */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="admin-logo-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors active:scale-98"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{setLogoUrl ? 'Ganti File Gambar Logo' : 'Pilih & Unggah File Logo'}</span>
                    </label>
                    <input
                      id="admin-logo-upload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                      onChange={handleLogoFileChange}
                      className="hidden"
                    />

                    {setLogoUrl && (
                      <button
                        type="button"
                        onClick={handleResetLogo}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                        <span>Hapus & Reset ke Logo Bawaan</span>
                      </button>
                    )}
                  </div>

                  {logoUploadError && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{logoUploadError}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Mendukung format PNG transparan, JPG, WebP, dan SVG (Rekomendasi aspek rasio horizontal 3:1 hingga 5:1).</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Logo (Opsional jika berupa URL online)</label>
                  <input
                    type="text"
                    value={setLogoUrl}
                    onChange={(e) => setSetLogoUrl(e.target.value)}
                    placeholder="https://... atau data:image/..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Media Resmi</label>
                  <input
                    type="text"
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Media</label>
                  <input
                    type="text"
                    value={setTagline}
                    onChange={(e) => setSetTagline(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Perusahaan Pers / Badan Hukum</label>
                  <input
                    type="text"
                    value={setLegalEntity}
                    onChange={(e) => setSetLegalEntity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Penanggung Jawab / Pemimpin Redaksi</label>
                  <input
                    type="text"
                    value={setEditorInChief}
                    onChange={(e) => setSetEditorInChief(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Kantor Redaksi</label>
                  <textarea
                    rows={2}
                    value={setAddress}
                    onChange={(e) => setSetAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Surel (Email) Redaksi</label>
                    <input
                      type="email"
                      value={setEmail}
                      onChange={(e) => setSetEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Redaksi</label>
                    <input
                      type="text"
                      value={setWhatsapp}
                      onChange={(e) => setSetWhatsapp(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                  >
                    Simpan Perubahan Identitas
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 11: HALAMAN STATIS */}
          {activeTab === 'static-pages' && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Pengelolaan Halaman Kebijakan & Pedoman Media
              </h1>

              <div className="space-y-4">
                {staticPages.map((page) => (
                  <div key={page.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-sm text-slate-900">{page.title}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">Slug: /{page.slug}</span>
                    </div>
                    <p className="text-xs text-slate-500">{page.subtitle}</p>
                    <button
                      onClick={() => {
                        const newContent = prompt(`Edit isi untuk "${page.title}":`, page.content);
                        if (newContent) {
                          updateStaticPage(page.id, newContent);
                          alert('Dokumen halaman statis berhasil disimpan!');
                        }
                      }}
                      className="text-xs font-bold text-red-600 hover:underline pt-2 block"
                    >
                      Sunting Isi Halaman Dokumen →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: LOG AKTIVITAS */}
          {activeTab === 'logs' && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Audit Trail & Log Aktivitas Sistem
              </h1>
              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {logs.map((log) => (
                  <div key={log.id} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-800">{log.userName}</span>
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-mono text-slate-600">
                          {log.action}
                        </span>
                      </div>
                      <p className="text-slate-600">{log.details}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-4">
                      {new Date(log.timestamp).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
