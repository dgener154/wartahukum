import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Headphones,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface VoicePlayerProps {
  title: string;
  textToRead: string;
  variant?: 'full' | 'compact' | 'card-side' | 'button-only';
  authorName?: string;
  className?: string;
}

// Helper to strip HTML tags for clean speech synthesis
function cleanTextForSpeech(htmlOrText: string): string {
  if (!htmlOrText) return '';
  return htmlOrText
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Split into natural sentences so browser speech synthesis never times out
function splitIntoSentences(text: string): string[] {
  if (!text) return [];
  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g);
  return sentences ? sentences.map((s) => s.trim()).filter(Boolean) : [text];
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({
  title,
  textToRead,
  variant = 'full',
  authorName,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const sentencesRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const rateRef = useRef(1.0);

  useEffect(() => {
    rateRef.current = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      // Clean up audio on unmount
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const prepareUtterances = () => {
    const rawClean = cleanTextForSpeech(textToRead);
    const titleClean = cleanTextForSpeech(title);
    const fullSpeechText = titleClean
      ? `Berita: ${titleClean}. ${rawClean}`
      : rawClean;

    const splitted = splitIntoSentences(fullSpeechText);
    sentencesRef.current = splitted;
    setTotalSentences(splitted.length);
    currentIndexRef.current = 0;
    setCurrentSentenceIndex(0);
  };

  const speakSentenceAtIndex = (index: number) => {
    if (!('speechSynthesis' in window)) return;
    const sentences = sentencesRef.current;
    if (index >= sentences.length) {
      // Finished reading
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
      currentIndexRef.current = 0;
      setCurrentSentenceIndex(0);
      return;
    }

    currentIndexRef.current = index;
    setCurrentSentenceIndex(index);

    const utterance = new SpeechSynthesisUtterance(sentences[index]);
    utterance.lang = 'id-ID'; // Indonesian voice if available
    utterance.rate = rateRef.current;

    // Pick Indonesian voice if browser provides one
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(
      (v) => v.lang.startsWith('id') || v.lang.includes('ID')
    );
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        speakSentenceAtIndex(index + 1);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('SpeechSynthesis error:', e);
      }
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (!isSupported) return;

    if (isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      isPlayingRef.current = true;
      return;
    }

    // Start fresh
    window.speechSynthesis.cancel();
    prepareUtterances();
    setIsPlaying(true);
    setIsPaused(false);
    isPlayingRef.current = true;

    // Slight timeout to let cancel finish in some browsers
    setTimeout(() => {
      speakSentenceAtIndex(0);
    }, 50);
  };

  const handlePause = () => {
    if (!isSupported) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    isPlayingRef.current = false;
    currentIndexRef.current = 0;
    setCurrentSentenceIndex(0);
  };

  const handleChangeRate = (rate: number) => {
    setPlaybackRate(rate);
    rateRef.current = rate;
    if (isPlaying) {
      // Restart current sentence at new speed
      window.speechSynthesis.cancel();
      setTimeout(() => {
        speakSentenceAtIndex(currentIndexRef.current);
      }, 50);
    }
  };

  const progressPercent =
    totalSentences > 0
      ? Math.min(100, Math.round(((currentSentenceIndex + 1) / totalSentences) * 100))
      : 0;

  if (!isSupported) {
    return null;
  }

  // Button-only variant (integrated seamlessly into existing card bars like the font-size accessibility bar)
  if (variant === 'button-only') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={isPlaying ? handlePause : handlePlay}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-xs ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
              : isPaused
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={
            isPlaying
              ? 'Jeda Naskah Suara'
              : isPaused
              ? 'Lanjutkan Naskah Suara'
              : 'Putar Naskah Suara (Voice Play)'
          }
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Jeda</span>
            </>
          ) : isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Lanjut</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play</span>
            </>
          )}
        </button>

        {(isPlaying || isPaused) && (
          <button
            type="button"
            onClick={handleStop}
            className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
            title="Hentikan Pembacaan"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        )}
      </div>
    );
  }

  // Compact variant (e.g. for card headers or inline preview)
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white rounded-xl px-2.5 py-1 text-xs font-semibold shadow-xs">
        <Headphones className="w-3.5 h-3.5 text-red-400" />
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className="flex items-center gap-1 hover:text-red-300 transition-colors"
          title={isPlaying ? 'Jeda Suara' : 'Putar Suara Berita'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Jeda</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Dengarkan</span>
            </>
          )}
        </button>
        {isPlaying && (
          <button
            onClick={handleStop}
            className="hover:text-red-400 transition-colors ml-0.5"
            title="Hentikan Suara"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        )}
      </div>
    );
  }

  // Card side variant for news creation sidebar
  if (variant === 'card-side') {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 rounded-2xl shadow-sm border border-slate-700/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>Voice Play Pembaca</span>
                {isPlaying && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </h4>
              <p className="text-[10px] text-slate-400">Uji narasi audio untuk pembaca</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
            Bahasa Indonesia (id-ID)
          </span>
        </div>

        {/* Playback Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>
              {isPlaying
                ? 'Sedang Membaca...'
                : isPaused
                ? 'Dijeda'
                : 'Siap Diputar'}
            </span>
            <span>{totalSentences > 0 ? `${progressPercent}%` : '0%'}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-500 to-amber-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Audio Wave Visualizer Animation */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-1 py-1 h-6">
            <span className="w-1 bg-red-500 rounded-full animate-bounce h-3"></span>
            <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.1s] h-5"></span>
            <span className="w-1 bg-red-400 rounded-full animate-bounce [animation-delay:0.2s] h-4"></span>
            <span className="w-1 bg-amber-300 rounded-full animate-bounce [animation-delay:0.3s] h-6"></span>
            <span className="w-1 bg-red-500 rounded-full animate-bounce [animation-delay:0.15s] h-3"></span>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                type="button"
                onClick={handlePlay}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPaused ? 'Lanjutkan' : 'Putar Voice'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePause}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Jeda</span>
              </button>
            )}

            {(isPlaying || isPaused) && (
              <button
                type="button"
                onClick={handleStop}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                title="Berhenti"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Stop</span>
              </button>
            )}
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-400">Kecepatan:</span>
            {[1.0, 1.25].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => handleChangeRate(rate)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  playbackRate === rate
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Full variant for Article Detail Page
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700 shadow-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Info & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide uppercase">
                Dengarkan Naskah Berita Ini
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 font-bold border border-red-500/40">
                Voice Play
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {authorName ? `Narasi dibaca otomatis · Penulis: ${authorName}` : 'Dengarkan suara narator membacakan berita ini'}
            </p>
          </div>
        </div>

        {/* Right: Controls & Speed */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                type="button"
                onClick={handlePlay}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPaused ? 'Lanjutkan Membaca' : 'Putar Suara (Play)'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePause}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>Jeda (Pause)</span>
              </button>
            )}

            {(isPlaying || isPaused) && (
              <button
                type="button"
                onClick={handleStop}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                title="Hentikan dan Ulangi"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ulangi</span>
              </button>
            )}
          </div>

          {/* Speed multipliers */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            {[0.75, 1.0, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => handleChangeRate(rate)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                  playbackRate === rate
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Playback progress & active state */}
      {(isPlaying || isPaused) && (
        <div className="mt-3.5 pt-3 border-t border-slate-700/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-slate-300 font-medium">
                {isPlaying ? 'Sedang membacakan naskah berita...' : 'Pembacaan suara dijeda'}
              </span>
            </div>
            <span className="font-mono text-slate-400">
              {progressPercent}% dibaca
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-500 via-amber-400 to-red-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
