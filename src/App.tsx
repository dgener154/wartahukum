import React, { useState } from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { TopBar } from './components/layout/TopBar';
import { MainHeader } from './components/layout/MainHeader';
import { Footer } from './components/layout/Footer';
import { RunningTicker } from './components/common/RunningTicker';
import { KilasBeritaStrip } from './components/home/KilasBeritaStrip';
import { HeroSection } from './components/home/HeroSection';
import { LatestNewsSection } from './components/home/LatestNewsSection';
import { SpecialChannelsSection } from './components/home/SpecialChannelsSection';
import { RegionalNewsSection } from './components/home/RegionalNewsSection';
import { OpinionSection } from './components/home/OpinionSection';
import { AgendaSection } from './components/home/AgendaSection';
import { GallerySection } from './components/home/GallerySection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { ArticleDetailPage } from './components/article/ArticleDetailPage';
import { SearchResultsPage } from './components/search/SearchResultsPage';
import { StaticPageView } from './components/static/StaticPageView';
import { LoginModal } from './components/auth/LoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { GuruDashboard } from './components/contributor/GuruDashboard';
import { Article, StaticPage } from './types';

type ActiveView =
  | 'home'
  | 'article'
  | 'category'
  | 'search'
  | 'static-page'
  | 'admin-dashboard'
  | 'guru-dashboard'
  | 'regional'
  | 'agenda'
  | 'gallery';

function MainAppContent() {
  const {
    currentUser,
    settings,
    articles,
    agendas,
    gallery,
    staticPages,
  } = usePortal();

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedStaticPage, setSelectedStaticPage] = useState<StaticPage | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Navigation handlers
  const handleNavigateHome = () => {
    setActiveView('home');
    setSelectedArticle(null);
    setSelectedCategoryId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = (initialQuery = '') => {
    setSearchInitialQuery(initialQuery);
    setActiveView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateStaticPage = (slug: string) => {
    const page = staticPages.find((p) => p.slug === slug) || staticPages[0];
    if (page) {
      setSelectedStaticPage(page);
      setActiveView('static-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToDashboard = () => {
    if (currentUser?.role === 'ADMIN') {
      setActiveView('admin-dashboard');
    } else if (currentUser?.role === 'GURU') {
      setActiveView('guru-dashboard');
    } else {
      setIsLoginModalOpen(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Dashboard view
  if (activeView === 'admin-dashboard') {
    return (
      <AdminDashboard
        onBackToPublic={handleNavigateHome}
        onPreviewArticle={handleSelectArticle}
      />
    );
  }

  // If in Guru / Contributor Dashboard view
  if (activeView === 'guru-dashboard') {
    return (
      <GuruDashboard
        onBackToPublic={handleNavigateHome}
        onPreviewArticle={handleSelectArticle}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      {/* 1. Top Bar with Indonesian live date, social links, and Login action */}
      <TopBar
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenSearch={() => handleOpenSearch('')}
        onGoToDashboard={handleGoToDashboard}
      />

      {/* 2. Main Header with Brand, Logo, Categories Navigation & Search */}
      <MainHeader
        onNavigateHome={handleNavigateHome}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => handleOpenSearch('')}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onNavigateStaticPage={handleNavigateStaticPage}
        onNavigateGallery={() => {
          // Scroll or filter gallery
          setActiveView('gallery');
        }}
        onNavigateAgenda={() => {
          setActiveView('agenda');
        }}
        onNavigateRegional={() => {
          setActiveView('regional');
        }}
        activeCategory={activeView === 'category' ? selectedCategoryId : null}
      />

      {/* 3. Main Views Routing */}
      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeView === 'home' && (
          <>
            {/* 1. Kilas Berita Strip (Above Slide Foto matching screenshot) */}
            <KilasBeritaStrip
              articles={articles}
              onSelectArticle={handleSelectArticle}
            />

            {/* 2. Slide Foto Utama (Full-Width Hero Slider sesuai gambar) */}
            <HeroSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* 3. Running Text Ticker (Tepat di bawah Slide Foto) */}
            {settings.enableTicker && (
              <RunningTicker
                customText={settings.tickerCustomText}
                onItemClick={() => {
                  const breaking = articles.find((a) => a.isBreaking && a.status === 'published');
                  if (breaking) handleSelectArticle(breaking);
                }}
              />
            )}

            {/* 4. Berita Terbaru dengan Pagination */}
            <LatestNewsSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* 6. Kanal Liputan Khusus */}
            <SpecialChannelsSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* 7. Berita Daerah */}
            <RegionalNewsSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* 8. Opini & Analisis Hukum */}
            <OpinionSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />

            {/* 9. Agenda & Peristiwa Mendatang */}
            <AgendaSection
              agendas={agendas}
              onViewAllAgenda={() => setActiveView('agenda')}
            />

            {/* 10. Galeri Foto & Video Jurnalistik */}
            <GallerySection
              gallery={gallery}
              onViewAllGallery={() => setActiveView('gallery')}
            />

            {/* 11. Buletin / Newsletter */}
            <NewsletterSection />
          </>
        )}

        {/* VIEW: ARTICLE DETAIL */}
        {activeView === 'article' && selectedArticle && (
          <ArticleDetailPage
            article={selectedArticle}
            onBack={handleNavigateHome}
            onSelectArticle={handleSelectArticle}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {/* VIEW: CATEGORY FILTER / SEARCH */}
        {(activeView === 'category' || activeView === 'search') && (
          <SearchResultsPage
            initialCategoryId={selectedCategoryId}
            initialQuery={searchInitialQuery}
            onBack={handleNavigateHome}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {/* VIEW: REGIONAL NEWS */}
        {activeView === 'regional' && (
          <div className="py-6">
            <RegionalNewsSection
              articles={articles}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        )}

        {/* VIEW: FULL AGENDA */}
        {activeView === 'agenda' && (
          <div className="py-6">
            <AgendaSection
              agendas={agendas}
              onViewAllAgenda={() => {}}
            />
          </div>
        )}

        {/* VIEW: FULL GALLERY */}
        {activeView === 'gallery' && (
          <div className="py-6">
            <GallerySection
              gallery={gallery}
              onViewAllGallery={() => {}}
            />
          </div>
        )}

        {/* VIEW: STATIC PAGE (Pedoman Media Siber, Hak Jawab, etc.) */}
        {activeView === 'static-page' && selectedStaticPage && (
          <StaticPageView
            page={selectedStaticPage}
            onBack={handleNavigateHome}
          />
        )}
      </main>

      {/* 4. Footer */}
      <Footer
        onNavigateStaticPage={handleNavigateStaticPage}
        onSelectCategory={handleSelectCategory}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* 5. Login / Editorial Portal Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          // Redirect to appropriate dashboard
          if (currentUser?.role === 'ADMIN') {
            setActiveView('admin-dashboard');
          } else {
            setActiveView('guru-dashboard');
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortalProvider>
      <MainAppContent />
    </PortalProvider>
  );
}
