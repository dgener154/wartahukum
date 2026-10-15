import React, { useState } from 'react';
import { Newspaper, Scale, ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  className?: string;
  alt: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackCategory = 'Warta Hukum',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 text-slate-300 ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-400 mb-2 border border-white/10 shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-300/90 line-clamp-1">
            {fallbackCategory}
          </span>
          <span className="text-[11px] text-slate-400 line-clamp-1 max-w-[200px] mt-0.5">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <Newspaper className="w-8 h-8 text-slate-400 opacity-40 animate-pulse" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
