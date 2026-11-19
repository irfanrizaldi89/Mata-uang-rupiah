import React, { useRef, useState } from 'react';
import { Volume2, BookOpen, CheckCircle2, Coins, Banknote, ArrowLeftRight } from 'lucide-react';
import { RUPIAH_DENOMINATIONS, RupiahDenomination } from '../data/rupiahData';
import { CurrencyVisual } from './CurrencyVisual';
import { soundFx, speakIndonesian } from '../utils/soundFx';

interface ExploreModeProps {
  exploredIds: string[];
  onExploreDenomination: (id: string) => void;
}

type FilterType = 'semua' | 'kertas' | 'logam';

export const ExploreMode: React.FC<ExploreModeProps> = ({
  exploredIds,
  onExploreDenomination,
}) => {
  const [filter, setFilter] = useState<FilterType>('semua');
  const [selected, setSelected] = useState<RupiahDenomination>(RUPIAH_DENOMINATIONS[4]); // Default Rp1.000 kertas or Rp20.000
  const [showCompare, setShowCompare] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const filteredList = RUPIAH_DENOMINATIONS.filter((item) =>
    filter === 'semua' ? true : item.type === filter
  );

  const handleSelect = (item: RupiahDenomination) => {
    soundFx.playTap();
    setSelected(item);
    onExploreDenomination(item.id);
    if (window.innerWidth < 1024) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSpeak = () => {
    soundFx.playTap();
    const typeText = selected.type === 'kertas' ? 'Uang kertas' : 'Uang logam';
    speakIndonesian(`${typeText} ${selected.words}, berwarna ${selected.colorName}.`);
  };

  const kertasCount = RUPIAH_DENOMINATIONS.filter((d) => d.type === 'kertas').length;
  const logamCount = RUPIAH_DENOMINATIONS.filter((d) => d.type === 'logam').length;

  return (
    <section aria-label="Mode Kenal Uang Rupiah" className="space-y-6">
      {/* Toolbar: Filter & Comparison Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              soundFx.playTap();
              setFilter('semua');
            }}
            className={`px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
              filter === 'semua'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({RUPIAH_DENOMINATIONS.length})
          </button>
          <button
            type="button"
            onClick={() => {
              soundFx.playTap();
              setFilter('kertas');
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
              filter === 'kertas'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Banknote className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            Uang Kertas ({kertasCount})
          </button>
          <button
            type="button"
            onClick={() => {
              soundFx.playTap();
              setFilter('logam');
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
              filter === 'logam'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-600" aria-hidden="true" />
            Uang Logam ({logamCount})
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            setShowCompare((prev) => !prev);
          }}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
            showCompare
              ? 'bg-sky-50 border-sky-300 text-sky-900'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4 text-sky-600" aria-hidden="true" />
          {showCompare ? 'Tutup Perbandingan' : 'Beda Uang Kertas & Logam'}
        </button>
      </div>

      {/* Optional Visual Comparison Panel */}
      {showCompare && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs animate-pop">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Apa Beda Uang Kertas dan Uang Logam?
            </h2>
            <span className="text-xs font-medium text-slate-500">Panduan Visual</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2.5">
                <Banknote className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                <h3 className="text-base font-bold text-slate-900">Uang Kertas</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>• Terbuat dari bahan serat kapas yang lentur, tipis, dan ringan.</li>
                <li>• Berbentuk persegi panjang dengan warna khas di setiap nilai.</li>
                <li>• Nilainya mulai dari Rp1.000 sampai Rp100.000.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2.5">
                <Coins className="w-5 h-5 text-amber-700" aria-hidden="true" />
                <h3 className="text-base font-bold text-slate-900">Uang Logam (Koin)</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>• Terbuat dari logam aluminium atau nikel yang keras dan berkilau.</li>
                <li>• Berbentuk bulat dan berbunyi nyaring saat terjatuh.</li>
                <li>• Nilainya lebih kecil: Rp100, Rp200, Rp500, dan Rp1.000.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Two-Zone Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Currency Cards Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-medium text-slate-600">
              Klik salah satu kartu uang di bawah untuk melihat ciri-cirinya.
            </p>
            <span className="text-xs font-semibold text-slate-500 tabular-nums whitespace-nowrap shrink-0">
              Dikenal: {exploredIds.length}/{RUPIAH_DENOMINATIONS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredList.map((item) => {
              const isSelected = selected.id === item.id;
              const isExplored = exploredIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`group text-left p-4 rounded-2xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
                    isSelected
                      ? 'bg-white border-sky-500 ring-3 ring-sky-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-slate-500">
                      {item.type === 'kertas' ? 'Uang Kertas' : 'Uang Logam'} ·{' '}
                      <span className="capitalize">{item.colorName}</span>
                    </span>
                    {isExplored && (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        aria-label="Sudah dipelajari"
                      />
                    )}
                  </div>

                  <div className="h-28 flex items-center justify-center bg-slate-50/80 rounded-xl p-2 mb-3 group-hover:scale-[1.02] transition-transform duration-150">
                    <CurrencyVisual item={item} size="md" />
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl font-bold text-slate-900 font-display tabular-nums">
                      {item.formatted}
                    </span>
                    <span className="text-xs font-medium text-slate-600 truncate">
                      {item.words}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Zone: Selected Detail Inspector */}
        <div ref={detailRef} className="lg:col-span-5 lg:sticky lg:top-6">
          <div
            key={selected.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 animate-pop"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-sky-700 mb-1">
                  Detail Pecahan Terpilih
                </p>
                <h2 className="text-3xl font-extrabold text-slate-900 font-display tabular-nums">
                  {selected.formatted}
                </h2>
                <p className="text-base font-semibold text-slate-700 mt-0.5">
                  {selected.words}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSpeak}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-sm font-semibold transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600"
                title="Dengarkan pengucapan nominal"
              >
                <Volume2 className="w-4 h-4" aria-hidden="true" />
                <span>Dengarkan</span>
              </button>
            </div>

            {/* Large Visual Preview */}
            <div className="py-6 px-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center min-h-[180px]">
              <CurrencyVisual item={selected} size="lg" />
            </div>

            {/* Clean Typographic Breakdown */}
            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3 flex items-start justify-between gap-4">
                <span className="text-slate-500 font-medium shrink-0">Jenis Uang</span>
                <span className="font-semibold text-slate-900 text-right">
                  {selected.type === 'kertas' ? 'Uang Kertas (Persegi Panjang)' : 'Uang Logam (Bulat)'}
                </span>
              </div>
              <div className="py-3 flex items-start justify-between gap-4">
                <span className="text-slate-500 font-medium shrink-0">Warna Khas</span>
                <span className="font-semibold text-slate-900 text-right capitalize">
                  {selected.colorName}
                </span>
              </div>
              <div className="py-3 flex items-start justify-between gap-4">
                <span className="text-slate-500 font-medium shrink-0">Bahan</span>
                <span className="font-medium text-slate-800 text-right">
                  {selected.materialDesc}
                </span>
              </div>
              <div className="py-3 flex items-start justify-between gap-4">
                <span className="text-slate-500 font-medium shrink-0">Gambar / Motif</span>
                <span className="font-medium text-slate-800 text-right">
                  {selected.motifName}
                </span>
              </div>
            </div>

            {/* Child-Friendly Visual Cue & Fun Fact */}
            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 space-y-2">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-sky-600" aria-hidden="true" />
                <span>Ciri & Cerita Singkat</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{selected.visualCue}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{selected.funFact}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
