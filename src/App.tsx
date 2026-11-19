import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Star, Compass, HelpCircle, ShoppingBag } from 'lucide-react';
import { ExploreMode } from './components/ExploreMode';
import { QuizMode } from './components/QuizMode';
import { ShopMode } from './components/ShopMode';
import { soundFx } from './utils/soundFx';

type GameMode = 'kenal' | 'tebak' | 'belanja';

const MODE_META: Record<
  GameMode,
  { title: string; subtitle: string; label: string }
> = {
  kenal: {
    label: 'Kenal Uang',
    title: 'Kenal Pecahan Rupiah',
    subtitle:
      'Ketuk setiap kartu uang kertas dan uang logam untuk mengenal warna, nilai angka, dan cara membacanya.',
  },
  tebak: {
    label: 'Tebak Nominal',
    title: 'Tebak Nilai Rupiah',
    subtitle:
      'Perhatikan warna dan bentuk uang yang tampil, lalu pilih jawaban nominal yang paling tepat.',
  },
  belanja: {
    label: 'Belanja Pas',
    title: 'Belanja dengan Uang Pas',
    subtitle:
      'Pilih pecahan uang dari dompet agar jumlahnya tepat sama dengan harga barang yang ingin kamu beli.',
  },
};

export default function App() {
  const [mode, setMode] = useState<GameMode>('kenal');
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kenal_rupiah_stars');
      return saved ? Math.max(0, parseInt(saved, 10) || 0) : 0;
    } catch {
      return 0;
    }
  });
  const [exploredIds, setExploredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kenal_rupiah_explored');
      return saved ? (JSON.parse(saved) as string[]) : ['kertas-1000'];
    } catch {
      return ['kertas-1000'];
    }
  });
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kenal_rupiah_stars', String(stars));
    } catch {
      // Ignore storage errors
    }
  }, [stars]);

  useEffect(() => {
    try {
      localStorage.setItem('kenal_rupiah_explored', JSON.stringify(exploredIds));
    } catch {
      // Ignore storage errors
    }
  }, [exploredIds]);

  const handleModeChange = (nextMode: GameMode) => {
    soundFx.playTap();
    setMode(nextMode);
  };

  const handleToggleSound = () => {
    const nextMuted = !muted;
    soundFx.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playTap();
    }
  };

  const handleAddStars = (amount: number) => {
    setStars((prev) => prev + amount);
  };

  const handleExploreDenomination = (id: string) => {
    setExploredIds((prev) => {
      if (prev.includes(id)) return prev;
      setStars((s) => s + 1);
      return [...prev, id];
    });
  };

  const currentMeta = MODE_META[mode];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar: Clean 3-Zone Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleModeChange('kenal');
            }}
            className="text-xl font-extrabold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-600 rounded-md"
          >
            Kenal Rupiah
          </a>

          {/* Zone 2: Single-line Mode Navigation Links (Desktop) */}
          <nav
            aria-label="Mode Permainan"
            className="hidden md:flex items-center gap-7 text-sm font-semibold"
          >
            {(
              [
                { id: 'kenal', label: 'Kenal Uang' },
                { id: 'tebak', label: 'Tebak Nominal' },
                { id: 'belanja', label: 'Belanja Pas' },
              ] as const
            ).map((item) => {
              const isActive = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id)}
                  className={`py-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isActive
                      ? 'border-sky-600 text-sky-700'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Sound Control */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleToggleSound}
              aria-pressed={!muted}
              className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-slate-400" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4 text-sky-600" aria-hidden="true" />
              )}
              <span>{muted ? 'Suara Mati' : 'Suara Aktif'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Mobile & Tablet Mode Switcher */}
        <div
          role="tablist"
          aria-label="Pilih Mode Belajar"
          className="grid grid-cols-3 gap-2 md:hidden bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'kenal'}
            onClick={() => handleModeChange('kenal')}
            className={`flex items-center justify-center gap-1.5 px-2 py-3 min-h-[46px] rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'kenal'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Kenal Uang</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'tebak'}
            onClick={() => handleModeChange('tebak')}
            className={`flex items-center justify-center gap-1.5 px-2 py-3 min-h-[46px] rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'tebak'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Tebak</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'belanja'}
            onClick={() => handleModeChange('belanja')}
            className={`flex items-center justify-center gap-1.5 px-2 py-3 min-h-[46px] rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'belanja'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Belanja</span>
          </button>
        </div>

        {/* Mode Title & Star Reward Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display text-balance">
              {currentMeta.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {currentMeta.subtitle}
            </p>
          </div>

          <div
            aria-live="polite"
            className="flex items-center gap-3 self-start md:self-auto bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-2xs shrink-0"
          >
            <Star
              className="w-6 h-6 text-amber-500 fill-amber-400 shrink-0"
              aria-hidden="true"
            />
            <div>
              <span className="text-xs font-medium text-slate-500 block leading-none">
                Bintang Penghargaan
              </span>
              <span className="text-xl font-extrabold text-slate-900 font-display tabular-nums leading-tight">
                {stars} Bintang
              </span>
            </div>
          </div>
        </div>

        {/* Active Mode Stage */}
        {mode === 'kenal' && (
          <ExploreMode
            exploredIds={exploredIds}
            onExploreDenomination={handleExploreDenomination}
          />
        )}
        {mode === 'tebak' && <QuizMode onAddStars={handleAddStars} />}
        {mode === 'belanja' && <ShopMode onAddStars={handleAddStars} />}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Kenal Rupiah · Media Belajar Mata Uang Indonesia untuk Siswa SD</span>
          <span>Belajar santai, coba lagi jika salah, dan kumpulkan bintangmu.</span>
        </div>
      </footer>
    </div>
  );
}
