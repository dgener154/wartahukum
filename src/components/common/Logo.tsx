import React from 'react';
import { Scale } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  tagline?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  tagline = 'Aktual Beritanya, Akurat Faktanya, Berimbang Pemberitaannya',
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-3">
      {/* Emblem */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-amber-400 shadow-md ring-1 ring-amber-500/30 ${
          isSm ? 'w-9 h-9' : isLg ? 'w-14 h-14' : 'w-11 h-11'
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 via-amber-500/20 to-purple-500/20 opacity-70" />
        <Scale className={isSm ? 'w-5 h-5' : isLg ? 'w-8 h-8' : 'w-6 h-6'} />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-600 ring-2 ring-white" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-black tracking-tight font-serif text-slate-900 leading-none ${
              isSm ? 'text-lg' : isLg ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
            }`}
          >
            WARTA
          </span>
          <span
            className={`font-black tracking-tight font-serif rainbow-text leading-none ${
              isSm ? 'text-lg' : isLg ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
            }`}
          >
            HUKUM
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-red-600 bg-red-50 px-1 py-0.2 rounded border border-red-200">
            ID
          </span>
        </div>

        {showTagline && tagline && (
          <p
            className={`text-slate-500 font-medium tracking-tight mt-0.5 line-clamp-1 ${
              isSm ? 'text-[10px]' : isLg ? 'text-xs' : 'text-[11px]'
            }`}
          >
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
};
