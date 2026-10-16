import React from 'react';
import { usePortal } from '../../context/PortalContext';

interface WartaHukumLogoProps {
  variant?: 'masthead' | 'header' | 'compact' | 'footer';
  className?: string;
  showTagline?: boolean;
  customLogoUrl?: string;
}

export const WartaHukumLogo: React.FC<WartaHukumLogoProps> = ({
  variant = 'header',
  className = '',
  showTagline = true,
  customLogoUrl,
}) => {
  let settingsLogoUrl: string | undefined = customLogoUrl;
  let mediaName = 'WARTA HUKUM';
  let mediaTagline = 'Tranparansi Publikasi Tajam dan Akurat';

  try {
    const portal = usePortal();
    if (portal?.settings) {
      if (!settingsLogoUrl && portal.settings.logoUrl) {
        settingsLogoUrl = portal.settings.logoUrl;
      }
      if (portal.settings.name) mediaName = portal.settings.name;
      if (portal.settings.tagline) mediaTagline = portal.settings.tagline;
    }
  } catch {
    // Fallback if rendered outside PortalProvider
  }

  const isFooter = variant === 'footer';
  const isCompact = variant === 'compact';
  const isMasthead = variant === 'masthead';

  // If a custom logo image was uploaded, render the uploaded image as the logo / app name
  if (settingsLogoUrl) {
    const imgHeightClass = isCompact
      ? 'h-8 sm:h-9 max-w-[190px]'
      : isMasthead
      ? 'h-16 sm:h-20 max-w-[420px]'
      : 'h-10 sm:h-12 max-w-[280px]';

    return (
      <div
        className={`inline-flex flex-col select-none ${
          isFooter ? 'text-white' : 'text-slate-900'
        } ${className}`}
      >
        <div className="flex items-center">
          <img
            src={settingsLogoUrl}
            alt={mediaName}
            className={`w-auto object-contain transition-all duration-300 ${imgHeightClass} ${
              isFooter ? 'brightness-110 drop-shadow-[0_2px_4px_rgba(255,255,255,0.15)]' : ''
            }`}
          />
        </div>
        {showTagline && mediaTagline && isMasthead && (
          <span
            className={`font-serif italic text-xs sm:text-sm mt-1.5 ${
              isFooter ? 'text-amber-300' : 'text-red-600'
            }`}
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {mediaTagline}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col select-none ${
        isFooter ? 'text-white' : 'text-slate-900'
      } ${className}`}
    >
      {/* Top Meta Row: Surat Kabar Umum (Left) & News (Right) */}
      <div className="flex items-center justify-between w-full px-0.5 leading-none mb-0.5">
        <span
          className={`font-serif tracking-normal ${
            isFooter ? 'text-slate-200' : 'text-black'
          } ${
            isCompact
              ? 'text-[9px] font-medium'
              : isMasthead
              ? 'text-sm sm:text-base font-semibold'
              : 'text-[11px] sm:text-xs font-semibold'
          }`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Surat Kabar Umum
        </span>
        <span
          className={`font-sans font-black tracking-tight ${
            isFooter ? 'text-slate-100' : 'text-black'
          } ${
            isCompact
              ? 'text-[11px]'
              : isMasthead
              ? 'text-lg sm:text-xl'
              : 'text-sm sm:text-base'
          }`}
        >
          News
        </span>
      </div>

      {/* Main Logo Row: Warta [Gavel] Hukum */}
      <div className="relative flex items-center leading-none">
        {/* "Warta" in heavy black */}
        <span
          className={`font-sans font-black tracking-tighter ${
            isFooter ? 'text-white' : 'text-black'
          } ${
            isCompact
              ? 'text-2xl sm:text-3xl'
              : isMasthead
              ? 'text-5xl sm:text-6xl md:text-7xl'
              : 'text-3xl sm:text-4xl lg:text-5xl'
          }`}
          style={{ letterSpacing: '-0.04em' }}
        >
          Wart
        </span>

        {/* The Judicial Gavel (Palu Sidang Hakim) */}
        <div
          className={`relative z-10 shrink-0 mx-[-0.08em] flex items-center justify-center ${
            isCompact
              ? 'w-7 h-7 -my-1'
              : isMasthead
              ? 'w-16 h-16 sm:w-20 sm:h-20 -my-3'
              : 'w-10 h-10 sm:w-12 sm:h-12 -my-2'
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-sm overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gold cylinder gradient for center band */}
              <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF59D" />
                <stop offset="35%" stopColor="#FFD700" />
                <stop offset="70%" stopColor="#FFA000" />
                <stop offset="100%" stopColor="#FF8F00" />
              </linearGradient>

              {/* Wooden head gradient */}
              <linearGradient id="woodHead" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3E2723" />
                <stop offset="50%" stopColor="#1B0000" />
                <stop offset="100%" stopColor="#0D0000" />
              </linearGradient>

              {/* Handle gradient with purple reflection highlight */}
              <linearGradient id="handleGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="25%" stopColor="#7E22CE" />
                <stop offset="55%" stopColor="#2A1B18" />
                <stop offset="100%" stopColor="#120A08" />
              </linearGradient>

              {/* Radial glow for striking ring */}
              <radialGradient id="brassGlow" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="40%" stopColor="#FBC02D" />
                <stop offset="90%" stopColor="#F57F17" />
                <stop offset="100%" stopColor="#D84315" />
              </radialGradient>
            </defs>

            {/* Sound block (base) below gavel */}
            <ellipse
              cx="58"
              cy="74"
              rx="18"
              ry="7"
              fill="#1A0D0A"
              stroke="#0A0503"
              strokeWidth="1.5"
            />
            <ellipse cx="58" cy="72" rx="16" ry="5.5" fill="#2E1C14" />
            <ellipse cx="58" cy="70" rx="13" ry="4" fill="#4E342E" opacity="0.8" />

            {/* Handle angled at ~ -42 degrees */}
            <g transform="rotate(-40 50 50)">
              {/* Handle stick */}
              <path
                d="M 46 45 L 46 92 C 46 94 48 95 50 95 C 52 95 54 94 54 92 L 54 45 Z"
                fill="url(#handleGrad)"
                stroke="#0F0806"
                strokeWidth="1"
              />
              {/* Turned handle knobs */}
              <circle cx="50" cy="88" r="4.5" fill="#9333EA" opacity="0.9" />
              <circle cx="50" cy="88" r="3" fill="#C084FC" />
              <circle cx="50" cy="72" r="3.5" fill="#3E2723" />
              <rect x="47" y="56" width="6" height="3" rx="1" fill="#FFD700" />

              {/* Gavel Head Barrel */}
              {/* Top wooden bell */}
              <path
                d="M 33 22 C 33 19 67 19 67 22 L 65 30 L 35 30 Z"
                fill="url(#woodHead)"
                stroke="#0A0504"
                strokeWidth="1.2"
              />
              <ellipse cx="50" cy="20" rx="17" ry="4.5" fill="#4E342E" />

              {/* Central Golden Brass Band */}
              <rect
                x="34"
                y="30"
                width="32"
                height="15"
                rx="1"
                fill="url(#brassGlow)"
                stroke="#B78103"
                strokeWidth="1"
              />
              {/* Metallic highlight on gold band */}
              <rect x="42" y="30" width="4" height="15" fill="#FFFFFF" opacity="0.6" />
              <line x1="34" y1="34" x2="66" y2="34" stroke="#FFF9C4" strokeWidth="0.8" />
              <line x1="34" y1="41" x2="66" y2="41" stroke="#E65100" strokeWidth="0.8" />

              {/* Bottom wooden striking face */}
              <path
                d="M 35 45 L 65 45 L 67 53 C 67 56 33 56 33 53 Z"
                fill="url(#woodHead)"
                stroke="#0A0504"
                strokeWidth="1.2"
              />
              <ellipse cx="50" cy="53" rx="17" ry="4.5" fill="#1A0D0A" />
            </g>
          </svg>
        </div>

        {/* Letter 'a' seamlessly attached */}
        <span
          className={`font-sans font-black tracking-tighter ${
            isFooter ? 'text-white' : 'text-black'
          } ${
            isCompact
              ? 'text-2xl sm:text-3xl'
              : isMasthead
              ? 'text-5xl sm:text-6xl md:text-7xl'
              : 'text-3xl sm:text-4xl lg:text-5xl'
          }`}
          style={{ letterSpacing: '-0.04em', marginLeft: '-0.08em' }}
        >
          a
        </span>

        {/* "Hukum" in bright bold red */}
        <span
          className={`font-sans font-black tracking-tighter text-[#E60000] ${
            isCompact
              ? 'text-2xl sm:text-3xl'
              : isMasthead
              ? 'text-5xl sm:text-6xl md:text-7xl'
              : 'text-3xl sm:text-4xl lg:text-5xl'
          }`}
          style={{ letterSpacing: '-0.04em', marginLeft: '0.04em' }}
        >
          Hukum
        </span>
      </div>

      {/* Bottom Tagline: "Tranparansi Publikasi Tajam dan Akurat" */}
      {showTagline && (
        <div className="w-full text-center mt-0.5">
          <p
            className={`font-serif italic font-bold tracking-tight ${
              isFooter ? 'text-slate-300' : 'text-black'
            } ${
              isCompact
                ? 'text-[9px]'
                : isMasthead
                ? 'text-base sm:text-lg md:text-xl'
                : 'text-[11px] sm:text-xs'
            }`}
            style={{
              fontFamily: "'Dancing Script', 'Caveat', 'Playfair Display', cursive, serif",
              textShadow: isFooter ? 'none' : '0.5px 0.5px 0px rgba(0,0,0,0.15)',
              transform: 'skewX(-4deg)',
            }}
          >
            Tranparansi Publikasi Tajam dan Akurat
          </p>
        </div>
      )}
    </div>
  );
};
