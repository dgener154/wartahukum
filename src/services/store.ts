import { useState, useEffect } from 'react';
import {
  Article,
  ArticleCategory,
  MediaSettings,
  StaticPage,
  AgendaItem,
  GalleryItem,
  User,
  ActivityLog,
  BreakingNewsItem,
  NewsletterSubscriber,
  ArticleStatus,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CATEGORIES,
  INITIAL_SETTINGS,
  INITIAL_ARTICLES,
  INITIAL_BREAKING_NEWS,
  INITIAL_AGENDAS,
  INITIAL_GALLERY,
  INITIAL_STATIC_PAGES,
  INITIAL_ACTIVITY_LOGS,
} from './mockData';

const STORAGE_KEYS = {
  USERS: 'wartahukum_users_v1',
  CURRENT_USER: 'wartahukum_current_user_v1',
  CATEGORIES: 'wartahukum_categories_v1',
  SETTINGS: 'wartahukum_settings_v1',
  ARTICLES: 'wartahukum_articles_v1',
  BREAKING_NEWS: 'wartahukum_breaking_news_v1',
  AGENDAS: 'wartahukum_agendas_v1',
  GALLERY: 'wartahukum_gallery_v1',
  STATIC_PAGES: 'wartahukum_static_pages_v1',
  LOGS: 'wartahukum_logs_v1',
  SUBSCRIBERS: 'wartahukum_subscribers_v1',
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error loading ${key} from storage:`, err);
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export function usePortalStore() {
  const [users, setUsers] = useState<User[]>(() => loadStorage(STORAGE_KEYS.USERS, INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = loadStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    return saved; // null means guest/public visitor
  });
  const [categories, setCategories] = useState<ArticleCategory[]>(() =>
    loadStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES)
  );
  const [settings, setSettings] = useState<MediaSettings>(() =>
    loadStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );
  const [articles, setArticles] = useState<Article[]>(() =>
    loadStorage(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES)
  );
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>(() =>
    loadStorage(STORAGE_KEYS.BREAKING_NEWS, INITIAL_BREAKING_NEWS)
  );
  const [agendas, setAgendas] = useState<AgendaItem[]>(() =>
    loadStorage(STORAGE_KEYS.AGENDAS, INITIAL_AGENDAS)
  );
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    loadStorage(STORAGE_KEYS.GALLERY, INITIAL_GALLERY)
  );
  const [staticPages, setStaticPages] = useState<StaticPage[]>(() =>
    loadStorage(STORAGE_KEYS.STATIC_PAGES, INITIAL_STATIC_PAGES)
  );
  const [logs, setLogs] = useState<ActivityLog[]>(() =>
    loadStorage(STORAGE_KEYS.LOGS, INITIAL_ACTIVITY_LOGS)
  );
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() =>
    loadStorage(STORAGE_KEYS.SUBSCRIBERS, [])
  );

  // Sync to storage
  useEffect(() => saveStorage(STORAGE_KEYS.USERS, users), [users]);
  useEffect(() => saveStorage(STORAGE_KEYS.CURRENT_USER, currentUser), [currentUser]);
  useEffect(() => saveStorage(STORAGE_KEYS.CATEGORIES, categories), [categories]);
  useEffect(() => saveStorage(STORAGE_KEYS.SETTINGS, settings), [settings]);
  useEffect(() => saveStorage(STORAGE_KEYS.ARTICLES, articles), [articles]);
  useEffect(() => saveStorage(STORAGE_KEYS.BREAKING_NEWS, breakingNews), [breakingNews]);
  useEffect(() => saveStorage(STORAGE_KEYS.AGENDAS, agendas), [agendas]);
  useEffect(() => saveStorage(STORAGE_KEYS.GALLERY, gallery), [gallery]);
  useEffect(() => saveStorage(STORAGE_KEYS.STATIC_PAGES, staticPages), [staticPages]);
  useEffect(() => saveStorage(STORAGE_KEYS.LOGS, logs), [logs]);
  useEffect(() => saveStorage(STORAGE_KEYS.SUBSCRIBERS, subscribers), [subscribers]);

  const addLog = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Publik / Sistem',
      userRole: currentUser?.role || 'GURU',
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  // Auth operations
  const login = (email: string, role?: 'ADMIN' | 'GURU') => {
    let matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!matched && role) {
      matched = users.find((u) => u.role === role);
    }
    if (matched) {
      setCurrentUser(matched);
      addLog('LOGIN', `Pengguna ${matched.name} (${matched.role}) berhasil masuk ke sistem.`);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      addLog('LOGOUT', `Pengguna ${currentUser.name} keluar dari sesi.`);
    }
    setCurrentUser(null);
  };

  // Article operations
  const addArticle = (newArticle: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount'>) => {
    const category = categories.find((c) => c.id === newArticle.categoryId);
    const created: Article = {
      ...newArticle,
      id: 'art-' + Date.now(),
      categoryName: category?.name || 'Umum',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewsCount: 0,
      slug: newArticle.slug || newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    setArticles((prev) => [created, ...prev]);
    addLog(
      'CREATE_ARTICLE',
      `Membuat artikel baru: "${created.title}" [Status: ${created.status}] oleh ${created.authorName}`
    );
    return created;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const category = updates.categoryId
            ? categories.find((c) => c.id === updates.categoryId)
            : undefined;
          const updated: Article = {
            ...item,
            ...updates,
            categoryName: category ? category.name : item.categoryName,
            updatedAt: new Date().toISOString(),
          };
          addLog(
            'UPDATE_ARTICLE',
            `Memperbarui artikel "${item.title}" [Status: ${updated.status}]`
          );
          return updated;
        }
        return item;
      })
    );
  };

  const updateArticleStatus = (
    id: string,
    status: ArticleStatus,
    options?: { editorNotes?: string; rejectionReason?: string; editorName?: string }
  ) => {
    setArticles((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const now = new Date().toISOString();
          const publishedAt = status === 'published' ? (item.publishedAt || now) : item.publishedAt;
          const updated: Article = {
            ...item,
            status,
            publishedAt,
            updatedAt: now,
            editorNotes: options?.editorNotes ?? item.editorNotes,
            rejectionReason: options?.rejectionReason ?? item.rejectionReason,
            editorName: options?.editorName ?? (currentUser?.name || item.editorName),
          };
          addLog(
            'STATUS_CHANGE',
            `Status artikel "${item.title}" diubah dari ${item.status} menjadi ${status}`
          );
          return updated;
        }
        return item;
      })
    );
  };

  const deleteArticle = (id: string) => {
    const target = articles.find((a) => a.id === id);
    if (target) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      addLog('DELETE_ARTICLE', `Menghapus artikel "${target.title}"`);
    }
  };

  const incrementArticleViews = (id: string) => {
    setArticles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, viewsCount: (item.viewsCount || 0) + 1 } : item))
    );
  };

  // Categories
  const addCategory = (cat: Omit<ArticleCategory, 'id'>) => {
    const created: ArticleCategory = {
      ...cat,
      id: 'cat-' + Date.now(),
    };
    setCategories((prev) => [...prev, created]);
    addLog('ADD_CATEGORY', `Menambahkan kategori baru "${created.name}"`);
  };

  const updateCategory = (id: string, updates: Partial<ArticleCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    addLog('UPDATE_CATEGORY', `Memperbarui kategori ID: ${id}`);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addLog('DELETE_CATEGORY', `Menghapus kategori ID: ${id}`);
  };

  // Breaking News
  const addBreakingNews = (item: Omit<BreakingNewsItem, 'id' | 'createdAt'>) => {
    const created: BreakingNewsItem = {
      ...item,
      id: 'bn-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setBreakingNews((prev) => [created, ...prev]);
    addLog('ADD_BREAKING_NEWS', `Menambahkan breaking news: "${created.title}"`);
  };

  const toggleBreakingNews = (id: string) => {
    setBreakingNews((prev) =>
      prev.map((bn) => (bn.id === id ? { ...bn, active: !bn.active } : bn))
    );
  };

  const deleteBreakingNews = (id: string) => {
    setBreakingNews((prev) => prev.filter((bn) => bn.id !== id));
  };

  // Agendas
  const addAgenda = (agenda: Omit<AgendaItem, 'id'>) => {
    const created: AgendaItem = {
      ...agenda,
      id: 'age-' + Date.now(),
    };
    setAgendas((prev) => [created, ...prev]);
    addLog('ADD_AGENDA', `Menambahkan agenda baru: "${created.title}"`);
  };

  const updateAgenda = (id: string, updates: Partial<AgendaItem>) => {
    setAgendas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const deleteAgenda = (id: string) => {
    setAgendas((prev) => prev.filter((a) => a.id !== id));
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const created: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now(),
    };
    setGallery((prev) => [created, ...prev]);
    addLog('ADD_GALLERY', `Menambahkan galeri media: "${created.title}"`);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // Users
  const addUser = (newUser: Omit<User, 'id' | 'createdAt'>) => {
    const created: User = {
      ...newUser,
      id: 'user-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, created]);
    addLog('ADD_USER', `Menambahkan akun baru: ${created.name} (${created.role})`);
    return created;
  };

  const toggleUserActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  // Settings
  const updateSettings = (updates: Partial<MediaSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addLog('UPDATE_SETTINGS', 'Memperbarui pengaturan identitas media dan visual');
  };

  // Static Pages
  const updateStaticPage = (id: string, content: string, title?: string, subtitle?: string) => {
    setStaticPages((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              content,
              title: title || p.title,
              subtitle: subtitle || p.subtitle,
              lastUpdated: new Date().toISOString(),
            }
          : p
      )
    );
    addLog('UPDATE_STATIC_PAGE', `Memperbarui isi halaman statis ID: ${id}`);
  };

  // Newsletter
  const subscribeNewsletter = (email: string) => {
    const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'Alamat email ini sudah terdaftar sebagai pelanggan buletin Warta Hukum.' };
    }
    const newSub: NewsletterSubscriber = {
      id: 'sub-' + Date.now(),
      email,
      subscribedAt: new Date().toISOString(),
      active: true,
    };
    setSubscribers((prev) => [newSub, ...prev]);
    addLog('NEWSLETTER_SUBSCRIPTION', `Pendaftaran berlangganan buletin baru: ${email}`);
    return { success: true, message: 'Terima kasih telah berlangganan buletin berita terverifikasi Warta Hukum.' };
  };

  const resetToDefault = () => {
    setUsers(INITIAL_USERS);
    setCategories(INITIAL_CATEGORIES);
    setSettings(INITIAL_SETTINGS);
    setArticles(INITIAL_ARTICLES);
    setBreakingNews(INITIAL_BREAKING_NEWS);
    setAgendas(INITIAL_AGENDAS);
    setGallery(INITIAL_GALLERY);
    setStaticPages(INITIAL_STATIC_PAGES);
    setLogs(INITIAL_ACTIVITY_LOGS);
    setSubscribers([]);
    addLog('RESET_SYSTEM', 'Sistem diatur ulang ke data awal.');
  };

  return {
    currentUser,
    users,
    categories,
    settings,
    articles,
    breakingNews,
    agendas,
    gallery,
    staticPages,
    logs,
    subscribers,
    login,
    logout,
    setCurrentUser,
    addArticle,
    updateArticle,
    updateArticleStatus,
    deleteArticle,
    incrementArticleViews,
    addCategory,
    updateCategory,
    deleteCategory,
    addBreakingNews,
    toggleBreakingNews,
    deleteBreakingNews,
    addAgenda,
    updateAgenda,
    deleteAgenda,
    addGalleryItem,
    deleteGalleryItem,
    addUser,
    toggleUserActive,
    updateSettings,
    updateStaticPage,
    subscribeNewsletter,
    resetToDefault,
  };
}
