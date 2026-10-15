import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Image,
  MapPin,
  Scale,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

interface MainHeaderProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigateHome: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  onNavigateStaticPage: (slug: string) => void;
  onNavigateGallery: () => void;
  onNavigateAgenda: () => void;
  onNavigateRegional: () => void;
  activeCategory?: string | null;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  onSelectCategory,
  onNavigateHome,
  onOpenSearch,
  onNavigateGallery,
  onNavigateAgenda,
  onNavigateRegional,
  activeCategory,
}) => {
  const { categories } = usePortal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Active categories for primary nav
  const activeCategories = categories.filter((c) => c.active).sort((a, b) => a.order - b.order);
  const primaryNavCategories = activeCategories.slice(0, 9);
  const secondaryNavCategories = activeCategories.slice(9);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Brand & Actions Row */}
        <div className="py-3 flex items-center justify-between gap-4">
          {/* Logo & Brand matching screenshot */}
          <div
            onClick={onNavigateHome}
            className="cursor-pointer flex items-center gap-3 transition-transform active:scale-98 select-none"
          >
            {/* Dark Squarish Emblem with golden scales and orange dot */}
            <div className="relative w-11 h-11 rounded-xl bg-[#0f172a] text-amber-400 flex items-center justify-center shadow-md ring-1 ring-slate-800">
              <Scale className="w-6 h-6 text-amber-400" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#f97316] ring-2 ring-white" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="font-serif font-black text-2xl tracking-tight text-slate-900">
                  WARTA
                </span>
                <span className="font-serif font-black text-2xl tracking-tight bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                  HUKUM
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-1">
                PORTAL BERITA HUKUM & KRIMINAL NASIONAL
              </span>
            </div>
          </div>

          {/* Center/Right Action Controls matching screenshot */}
          <div className="flex items-center gap-3">
            {/* Search Pill Input */}
            <div
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 text-xs cursor-pointer transition-colors w-56 lg:w-64 shadow-2xs group"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
              <span className="text-slate-500 text-[11px]">Cari Berita Hukum...</span>
            </div>

            {/* Berita Daerah Button (Red Pin Pill) */}
            <button
              onClick={onNavigateRegional}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-red-600 px-3.5 py-1.5 rounded-full border border-red-200 hover:border-red-300 hover:bg-red-50/50 transition-all shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Berita Daerah</span>
            </button>

            {/* Galeri & Video Button (Purple Camera Pill) */}
            <button
              onClick={onNavigateGallery}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-purple-600 px-3.5 py-1.5 rounded-full border border-purple-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all shadow-2xs"
            >
              <Image className="w-3.5 h-3.5 text-purple-600" />
              <span>Galeri & Video</span>
            </button>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Primary Horizontal Category Bar (Desktop) matching screenshot */}
        <nav className="hidden lg:flex items-center justify-between border-t border-slate-100 py-2 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {/* Beranda Pill Active */}
            <button
              onClick={onNavigateHome}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-colors ${
                !activeCategory
                  ? 'bg-[#0f172a] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Beranda
            </button>

            {primaryNavCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}

            {/* Kanal Lainnya Dropdown */}
            {secondaryNavCategories.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span>Kanal Lainnya</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isMoreOpen && (
                  <div
                    onMouseLeave={() => setIsMoreOpen(false)}
                    className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    {secondaryNavCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setIsMoreOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-red-600 font-medium flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Agenda Sidang link matching screenshot */}
          <button
            onClick={onNavigateAgenda}
            className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 font-medium pl-4 shrink-0 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Agenda Sidang</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onNavigateHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white"
              >
                Beranda
              </button>
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                    activeCategory === cat.id
                      ? 'bg-red-50 border-red-300 text-red-700 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigateRegional();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 rounded-lg bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Berita Daerah</span>
              </button>
              <button
                onClick={() => {
                  onNavigateGallery();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 rounded-lg bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <Image className="w-3.5 h-3.5 text-purple-600" />
                <span>Galeri & Video</span>
              </button>
              <button
                onClick={() => {
                  onNavigateAgenda();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 rounded-lg bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Agenda Sidang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
