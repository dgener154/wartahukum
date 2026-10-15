import React from 'react';
import { Volume2 } from 'lucide-react';

interface RunningTickerProps {
  customText?: string;
  onItemClick?: () => void;
}

export const RunningTicker: React.FC<RunningTickerProps> = ({
  customText,
  onItemClick,
}) => {
  const defaultText =
    '🔴 BREAKING NEWS • WARTA HUKUM — Aktual Beritanya, Akurat Faktanya, Berimbang Pemberitaannya. Mengawal Kebenaran, Menyuarakan Keadilan, Menyajikan Informasi untuk Indonesia.';

  const displayText = customText || defaultText;

  // Quadruple the text segment for a seamless infinite CSS ticker loop
  const tickerItems = [
    displayText,
    displayText,
    displayText,
    displayText,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
      <div
        className="relative overflow-hidden rounded-2xl bg-[#090f1d] border border-slate-800 text-slate-100 shadow-md group"
        role="region"
        aria-label="Breaking News Ticker"
      >
        {/* Subtle rainbow top hairline accent */}
        <div className="h-0.5 w-full rainbow-gradient-bar opacity-80" />

        <div className="flex items-center">
          {/* Running Text Track (CSS pure animation, pause on hover) */}
          <div className="relative overflow-hidden w-full py-2.5">
            <div
              className="ticker-track flex items-center whitespace-nowrap cursor-pointer"
              onClick={onItemClick}
            >
              {tickerItems.map((text, idx) => (
                <div key={idx} className="flex items-center shrink-0 pr-12">
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-200 hover:text-white transition-colors">
                    {text}
                  </span>
                  <span
                    className="mx-6 text-amber-400 font-bold select-none opacity-80"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right subtle fade mask for smooth aesthetic */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#090f1d] to-transparent z-10" />
        </div>
      </div>
    </div>
  );
};
