export type UserRole = 'ADMIN' | 'GURU';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  phone?: string;
  active: boolean;
  createdAt: string;
}

export type ArticleStatus =
  | 'draft'
  | 'submitted'
  | 'reviewing'
  | 'needs_revision'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'archived';

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
  active: boolean;
  iconName: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleLocation {
  province: string;
  city: string;
  district?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categoryId: string;
  categoryName?: string;
  tags: string[];
  location?: ArticleLocation;
  coverImage: string;
  caption: string;
  imageCredit: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  editorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  scheduledAt?: string | null;
  status: ArticleStatus;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  isBreaking?: boolean;
  isPinnedHero?: boolean;
  editorNotes?: string;
  rejectionReason?: string;
  viewsCount: number;
  readTimeMinutes: number;
  isOpinion?: boolean;
  opinionAuthorBio?: string;
}

export interface ArticleRevision {
  id: string;
  articleId: string;
  modifiedBy: string;
  modifiedAt: string;
  note: string;
  statusBefore: ArticleStatus;
  statusAfter: ArticleStatus;
}

export interface BreakingNewsItem {
  id: string;
  title: string;
  articleId?: string;
  url?: string;
  priority: 'urgent' | 'high' | 'normal';
  active: boolean;
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  articleId: string;
  title: string;
  summary: string;
  category: string;
  coverImage: string;
  authorName: string;
  publishedAt: string;
  order: number;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  albumName: string;
  mediaUrl: string;
  caption: string;
  photographerCredit: string;
  date: string;
  category: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isPublic: boolean;
  createdBy: string;
  createdByName: string;
}

export interface StaticPage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  lastUpdated: string;
}

export interface MediaSettings {
  name: string;
  tagline: string;
  legalEntityName: string;
  companyRegistrationNote: string;
  editorInChief: string;
  editorialAddress: string;
  email: string;
  phone: string;
  whatsapp: string;
  complaintsEmail: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  copyright: string;
  rainbowIntensity: 'high' | 'medium' | 'subtle';
  enableTicker: boolean;
  tickerCustomText: string;
  homeArticlesLimit: number;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}
