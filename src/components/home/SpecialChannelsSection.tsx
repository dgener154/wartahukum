import React, { useState, useRef } from 'react';
import {
  Gavel,
  Shield,
  Briefcase,
  Landmark,
  AlertTriangle,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { Article } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface SpecialChannelsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const SpecialChannelsSection: React.FC<SpecialChannelsSectionProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  const publishedArticles = articles.filter((a) => a.status === 'published');

  const channels = [
    {
      id: 'hukum-peradilan',
      title: 'Hukum & Peradilan',
      icon: Gavel,
      color: '#ef4444',
      categoryIds: ['cat-hukum', 'cat-peradilan'],
      description: 'Dinamika persidangan, yurisprudensi Mahkamah Agung, dan konstitusi.',
    },
    {
      id: 'kriminal-kepolisian',
      title: 'Kriminal & Kepolisian',
      icon: Shield,
      color: '#3b82f6',
      categoryIds: ['cat-kriminal', 'cat-kepolisian'],
      description: 'Penindakan kejahatan siber, pidana umum, dan ketertiban masyarakat.',
    },
    {
      id: 'kejaksaan-hukum',
      title: 'Kejaksaan & Penegakan',
      icon: Briefcase,
      color: '#0891b2',
      categoryIds: ['cat-kejaksaan'],
      description: 'Langkah Jampidsus, tuntutan pidana, dan penelusuran aset korupsi.',
    },
    {
      id: 'korupsi-investigasi',
      title: 'Korupsi & Investigasi',
      icon: AlertTriangle,
      color: '#dc2626',
      categoryIds: ['cat-korupsi', 'cat-investigasi'],
      description: 'Operasi tangkap tangan KPK, audit kerugian negara, dan laporan investigatif.',
    },
    {
      id: 'politik-pemerintahan',
      title: 'Politik & Pemerintahan',
      icon: Landmark,
      color: '#6366f1',
      categoryIds: ['cat-politik', 'cat-pemerintahan'],
      description: 'Prolegnas, regulasi kementerian, dan etika penyelenggara negara.',
    },
  ];

  const [activeTab, setActiveTab] = useState(channels[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentChannel = channels.find((c) => c.id === activeTab) || channels[0];

  const filteredArticles = publishedArticles.filter((a) =>
    currentChannel.categoryIds.includes(a.categoryId)
  );

  const mainStory = filteredArticles[0];
  const sideStories = filteredArticles.slice(1, 4);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
      {/* 1. Header Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            Kanal Liputan Khusus
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
          Fokus Penegakan Hukum & Keadilan
        </h2>
      </div>

      {/* 2. Menu Kanal Liputan Khusus (DIPINDAHKAN DIBAWAH TEKS SESUAI GAMBAR) */}
      <div className="mb-6 bg-[#f0f9ff]/70 border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 shadow-2xs">
        <div className="relative flex items-center">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 px-1 no-scrollbar w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {channels.map((ch) => {
              const Icon = ch.icon;
              const isActive = activeTab === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveTab(ch.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all shadow-xs ${
                    isActive
                      ? 'bg-white text-slate-900 font-bold shadow-sm border border-slate-200/80'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/80 font-medium'
                  }`}
                >
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: isActive ? ch.color : '#64748b' }}
                  />
                  <span>{ch.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll Bar Track Indicator matching screenshot (with left and right arrow icons) */}
        <div className="mt-1 pt-1 border-t border-slate-200/60 flex items-center justify-between gap-2 px-1">
          <button
            onClick={() => handleScroll('left')}
            className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
            title="Geser Kiri"
            aria-label="Geser Kiri"
          >
            <span className="text-[10px] select-none">◀</span>
          </button>

          {/* Visual Track Bar */}
          <div className="flex-1 h-1 bg-slate-300/80 rounded-full overflow-hidden mx-1" />

          <button
            onClick={() => handleScroll('right')}
            className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
            title="Geser Kanan"
            aria-label="Geser Kanan"
          >
            <span className="text-[10px] select-none">▶</span>
          </button>
        </div>
      </div>

      {/* 3. Channel Content Layout */}
      {mainStory ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
          {/* Dominant Lead Story (7 cols) */}
          <div
            onClick={() => onSelectArticle(mainStory)}
            className="lg:col-span-7 group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 shadow-xs">
              <ImageWithFallback
                src={mainStory.coverImage}
                alt={mainStory.title}
                fallbackCategory={mainStory.categoryName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-slate-900/90 text-white backdrop-blur-xs">
                {mainStory.categoryName}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span>{mainStory.authorName}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Eye className="w-3 h-3 text-slate-400" />
                  {mainStory.viewsCount} pembaca
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-red-600 transition-colors leading-tight mb-2">
                {mainStory.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                {mainStory.summary}
              </p>
            </div>
          </div>

          {/* Side Articles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-slate-200">
            {sideStories.length > 0 ? (
              sideStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectArticle(story)}
                  className="py-4 first:pt-0 last:pb-0 group cursor-pointer flex gap-4 items-center"
                >
                  <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-200 shadow-2xs">
                    <ImageWithFallback
                      src={story.coverImage}
                      alt={story.title}
                      fallbackCategory={story.categoryName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">
                      {story.categoryName}
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                      {story.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block truncate">
                      {story.authorName}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                Belum ada berita pendamping pada kanal ini.
              </div>
            )}

            {/* View All Button for Current Category */}
            <div className="pt-4 mt-auto">
              <button
                onClick={() => onSelectCategory(currentChannel.categoryIds[0])}
                className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>Lihat Seluruh Berita Kanal {currentChannel.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-slate-400 text-sm bg-slate-50 rounded-2xl border border-slate-200">
          Tidak ada artikel pada kanal ini.
        </div>
      )}
    </section>
  );
};
