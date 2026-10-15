import React, { useState } from 'react';
import { Camera, Video, Eye, ArrowRight, X, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface GallerySectionProps {
  gallery: GalleryItem[];
  onViewAllGallery: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  gallery,
  onViewAllGallery,
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  if (gallery.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-700">
              Dokumentasi Visual Jurnalistik
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Galeri Foto Peristiwa & Rekaman Liputan
          </h2>
        </div>

        <button
          onClick={onViewAllGallery}
          className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
        >
          <span>Seluruh Galeri</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {gallery.slice(0, 4).map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all cursor-pointer"
          >
            <ImageWithFallback
              src={item.mediaUrl}
              alt={item.title}
              fallbackCategory={item.category}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-85 group-hover:opacity-100"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Badge: Type & Category */}
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white shadow-2xs flex items-center gap-1">
                {item.type === 'video' ? <Video className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                <span>{item.type === 'video' ? 'Video' : 'Foto'}</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-black/60 text-slate-200 backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Bottom Caption & Credit */}
            <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10 text-white">
              <h4 className="text-xs font-bold line-clamp-2 leading-snug group-hover:text-purple-200 transition-colors">
                {item.title}
              </h4>
              <p className="text-[10px] text-slate-300 line-clamp-1 mt-1 opacity-90">
                {item.photographerCredit}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image viewer */}
            <div className="relative aspect-[16/10] bg-black">
              <ImageWithFallback
                src={selectedItem.mediaUrl}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Metadata Footer */}
            <div className="p-5 bg-slate-900 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  {selectedItem.albumName}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedItem.date}</span>
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {selectedItem.caption}
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                {selectedItem.photographerCredit}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
