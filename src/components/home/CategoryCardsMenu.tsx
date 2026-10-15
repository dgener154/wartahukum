import React from 'react';
import {
  Scale,
  ShieldAlert,
  Landmark,
  Globe,
  MapPin,
  Building2,
  Gavel,
  Briefcase,
  BadgeCheck,
  AlertTriangle,
  TrendingUp,
  Users,
  GraduationCap,
  Zap,
  BookOpen,
  Search,
  BellRing,
  Layers,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

interface CategoryCardsMenuProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId?: string | null;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Scale,
  ShieldAlert,
  Landmark,
  Globe,
  MapPin,
  Building2,
  Gavel,
  Briefcase,
  BadgeCheck,
  AlertTriangle,
  TrendingUp,
  Users,
  GraduationCap,
  Zap,
  BookOpen,
  Search,
  BellRing,
};

export const CategoryCardsMenu: React.FC<CategoryCardsMenuProps> = ({
  onSelectCategory,
  selectedCategoryId,
}) => {
  const { categories, articles } = usePortal();

  const activeCategories = categories
    .filter((c) => c.active)
    .sort((a, b) => a.order - b.order);

  // Rainbow accents palette to distribute across category cards
  const rainbowGradients = [
    'from-red-500/10 via-orange-500/10 to-transparent hover:border-red-400',
    'from-orange-500/10 via-amber-500/10 to-transparent hover:border-orange-400',
    'from-amber-500/10 via-yellow-500/10 to-transparent hover:border-amber-400',
    'from-emerald-500/10 via-green-500/10 to-transparent hover:border-emerald-400',
    'from-cyan-500/10 via-blue-500/10 to-transparent hover:border-cyan-400',
    'from-blue-500/10 via-indigo-500/10 to-transparent hover:border-blue-400',
    'from-indigo-500/10 via-purple-500/10 to-transparent hover:border-indigo-400',
    'from-purple-500/10 via-pink-500/10 to-transparent hover:border-purple-400',
  ];

  return (
    <section className="relative w-full pt-4 pb-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching user screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
          <div className="flex items-center gap-2.5">
            {/* Rainbow bar icon */}
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-red-500 via-amber-500 to-indigo-500 shadow-xs" />
            <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 tracking-tight">
              Menu Kanal & Kartu Kategori Berita
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Pilih kanal berita sesuai topik perkara
          </span>
        </div>

        {/* Responsive Grid Cards with Modern Rainbow Gradient Card styling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
          {activeCategories.map((cat, idx) => {
            const IconComponent = ICON_MAP[cat.iconName] || Layers;
            const articleCount = articles.filter(
              (a) => a.categoryId === cat.id && a.status === 'published'
            ).length;
            const isSelected = selectedCategoryId === cat.id;
            const gradientStyle = rainbowGradients[idx % rainbowGradients.length];

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative text-left p-3.5 rounded-2xl border transition-all duration-300 overflow-hidden bg-white shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${gradientStyle} ${
                  isSelected
                    ? 'ring-2 ring-red-500 border-red-500 bg-red-50/40'
                    : 'border-slate-200/90 hover:bg-white'
                }`}
              >
                {/* Rainbow top line accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: cat.color }}
                />

                <div className="flex items-center justify-between mb-2 mt-0.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                    {articleCount} art
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900 group-hover:text-red-600 transition-colors truncate">
                  {cat.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {cat.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
