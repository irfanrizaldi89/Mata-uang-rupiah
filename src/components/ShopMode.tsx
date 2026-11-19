import React, { useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  AlertCircle,
  Wallet,
  X,
} from 'lucide-react';
import {
  RUPIAH_DENOMINATIONS,
  RupiahDenomination,
  SHOP_ITEMS,
  ShopItem,
  formatRupiah,
} from '../data/rupiahData';
import { CurrencyVisual } from './CurrencyVisual';
import { ShopItemVisual } from './ShopItemVisual';
import { soundFx } from '../utils/soundFx';

interface ShopModeProps {
  onAddStars: (amount: number) => void;
}

interface PlacedMoney {
  uid: string;
  denomination: RupiahDenomination;
}

type PaymentFeedback =
  | { status: 'idle' }
  | { status: 'empty' }
  | { status: 'kurang'; diff: number }
  | { status: 'lebih'; diff: number }
  | { status: 'pas' };

export const ShopMode: React.FC<ShopModeProps> = ({ onAddStars }) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [tray, setTray] = useState<PlacedMoney[]>([]);
  const [feedback, setFeedback] = useState<PaymentFeedback>({ status: 'idle' });
  const [completedItems, setCompletedItems] = useState(0);

  const currentItem: ShopItem = SHOP_ITEMS[itemIndex];
  const currentTotal = tray.reduce((sum, entry) => sum + entry.denomination.value, 0);

  const kertasList = RUPIAH_DENOMINATIONS.filter((d) => d.type === 'kertas');
  const logamList = RUPIAH_DENOMINATIONS.filter((d) => d.type === 'logam');

  const handleAddMoney = (denomination: RupiahDenomination) => {
    if (feedback.status === 'pas') return;
    soundFx.playCoinAdd();
    setTray((prev) => [
      ...prev,
      {
        uid: `${denomination.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        denomination,
      },
    ]);
    if (feedback.status !== 'idle') {
      setFeedback({ status: 'idle' });
    }
  };

  const handleRemoveMoney = (uid: string) => {
    if (feedback.status === 'pas') return;
    soundFx.playRemove();
    setTray((prev) => prev.filter((entry) => entry.uid !== uid));
    setFeedback({ status: 'idle' });
  };

  const handleReset = () => {
    soundFx.playRemove();
    setTray([]);
    setFeedback({ status: 'idle' });
  };

  const handlePay = () => {
    if (tray.length === 0) {
      soundFx.playGentleRetry();
      setFeedback({ status: 'empty' });
      return;
    }

    if (currentTotal === currentItem.price) {
      soundFx.playCelebrate();
      setFeedback({ status: 'pas' });
      setCompletedItems((prev) => prev + 1);
      onAddStars(2);
    } else if (currentTotal < currentItem.price) {
      soundFx.playGentleRetry();
      setFeedback({ status: 'kurang', diff: currentItem.price - currentTotal });
    } else {
      soundFx.playGentleRetry();
      setFeedback({ status: 'lebih', diff: currentTotal - currentItem.price });
    }
  };

  const handleNextItem = () => {
    soundFx.playTap();
    setItemIndex((prev) => (prev + 1) % SHOP_ITEMS.length);
    setTray([]);
    setFeedback({ status: 'idle' });
  };

  const handleJumpToItem = (idx: number) => {
    soundFx.playTap();
    setItemIndex(idx);
    setTray([]);
    setFeedback({ status: 'idle' });
  };

  return (
    <section aria-label="Mode Belanja Hitung Uang Pas" className="space-y-6">
      {/* Item Selector Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap shrink-0 mr-1">
            Pilih Barang:
          </span>
          {SHOP_ITEMS.slice(0, 6).map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleJumpToItem(idx)}
              className={`px-3 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                itemIndex === idx
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.name} · {item.formattedPrice}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-500 tabular-nums whitespace-nowrap shrink-0">
          Berhasil Dibeli: {completedItems} barang
        </span>
      </div>

      {/* Main Two-Column Cashier & Wallet Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Product & Cashier Tray */}
        <div className="lg:col-span-5 space-y-5">
          {/* Product Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="text-xs font-semibold text-slate-500">
                {currentItem.category} · Kantin & Toko Sekolah
              </div>
              <button
                type="button"
                onClick={handleNextItem}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ganti Barang
              </button>
            </div>

            <div className="flex items-center gap-5">
              <div
                className={`p-2 rounded-2xl bg-slate-50 border border-slate-100 shrink-0 ${
                  feedback.status === 'pas' ? 'animate-celebrate' : ''
                }`}
              >
                <ShopItemVisual iconId={currentItem.iconId} className="w-24 h-24" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <h2 className="text-2xl font-bold text-slate-900 font-display leading-tight">
                  {currentItem.name}
                </h2>
                <p className="text-sm text-slate-600 leading-snug">
                  {currentItem.description}
                </p>
                <div className="pt-1">
                  <span className="text-xs font-semibold text-slate-500 block">
                    Harga yang harus dibayar:
                  </span>
                  <span className="text-3xl font-extrabold text-sky-700 font-display tabular-nums">
                    {currentItem.formattedPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cashier Tray */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Total Uang Dipilih
                </p>
                <p
                  className={`text-3xl font-extrabold font-display tabular-nums mt-0.5 ${
                    feedback.status === 'pas'
                      ? 'text-emerald-600'
                      : currentTotal > currentItem.price
                        ? 'text-amber-600'
                        : 'text-slate-900'
                  }`}
                >
                  {formatRupiah(currentTotal)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500">Target Harga</p>
                <p className="text-lg font-bold text-slate-700 font-display tabular-nums mt-0.5">
                  {currentItem.formattedPrice}
                </p>
              </div>
            </div>

            {/* Placed Money Chips */}
            <div className="min-h-[108px] rounded-xl bg-slate-50 border border-dashed border-slate-300 p-3.5">
              {tray.length === 0 ? (
                <div className="h-full min-h-[80px] flex flex-col items-center justify-center text-center text-sm text-slate-500 px-3">
                  <ShoppingBag className="w-5 h-5 text-slate-400 mb-1.5" aria-hidden="true" />
                  <span>Meja pembayaran masih kosong. Klik pecahan uang di dompet untuk membayar.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500">
                    Uang di meja ({tray.length} keping/lembar — klik untuk mengambil kembali):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tray.map((entry) => (
                      <button
                        key={entry.uid}
                        type="button"
                        disabled={feedback.status === 'pas'}
                        onClick={() => handleRemoveMoney(entry.uid)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 text-sm font-bold text-slate-800 shadow-2xs transition-colors cursor-pointer disabled:cursor-default tabular-nums"
                        title="Klik untuk menghapus pecahan ini"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-xs shrink-0"
                          style={{ backgroundColor: entry.denomination.palette.bgSecondary }}
                          aria-hidden="true"
                        />
                        <span>{entry.denomination.formatted}</span>
                        {feedback.status !== 'pas' && (
                          <X className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {feedback.status === 'pas' ? (
              <button
                type="button"
                onClick={handleNextItem}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[52px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-800"
              >
                <span>Belanja Barang Berikutnya</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={tray.length === 0}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 min-h-[50px] rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base transition-colors disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Hapus / Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 min-h-[50px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-800"
                >
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  <span>Bayar</span>
                </button>
              </div>
            )}

            {/* Friendly Feedback Messages */}
            {feedback.status === 'pas' && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 animate-pop">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-emerald-950 leading-relaxed">
                  <p className="font-bold text-base">Hore, Uang Pas! +2 Bintang</p>
                  <p className="mt-0.5">
                    Hebat sekali! Kamu berhasil membayar <strong>{currentItem.name}</strong> dengan uang pas sebesar{' '}
                    <strong className="tabular-nums">{currentItem.formattedPrice}</strong>.
                  </p>
                </div>
              </div>
            )}

            {feedback.status === 'kurang' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 animate-pop">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-amber-950 leading-relaxed">
                  <p className="font-bold">Uangnya masih kurang!</p>
                  <p className="mt-0.5">
                    Tambahkan <strong className="tabular-nums">{formatRupiah(feedback.diff)}</strong> lagi agar jumlahnya pas{' '}
                    <strong className="tabular-nums">{currentItem.formattedPrice}</strong> ya.
                  </p>
                </div>
              </div>
            )}

            {feedback.status === 'lebih' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 animate-pop">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-amber-950 leading-relaxed">
                  <p className="font-bold">Wah, uangnya kelebihan!</p>
                  <p className="mt-0.5">
                    Kelebihan <strong className="tabular-nums">{formatRupiah(feedback.diff)}</strong>. Klik pecahan di meja pembayaran untuk mengurangi, atau tekan <strong>Hapus / Reset</strong>.
                  </p>
                </div>
              </div>
            )}

            {feedback.status === 'empty' && (
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-3 animate-pop">
                <Wallet className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-sky-950 leading-relaxed">
                  Pilih pecahan uang dari dompet di sebelah kanan dulu sebelum menekan tombol <strong>Bayar</strong> ya!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Zone: Rupiah Wallet */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-5 h-5 text-sky-600" aria-hidden="true" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Dompet Pecahan Rupiah
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Ketuk uang untuk memasukkan ke meja kasir
            </span>
          </div>

          {/* Banknotes Grid */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-500 tracking-wide">
              Uang Kertas
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {kertasList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={feedback.status === 'pas'}
                  onClick={() => handleAddMoney(item)}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-sky-50/60 hover:border-sky-400 active:scale-[0.98] transition-all flex flex-col items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-sky-600"
                >
                  <CurrencyVisual item={item} size="sm" />
                  <span className="text-sm font-bold text-slate-900 font-display tabular-nums">
                    + {item.formatted}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Coins Grid */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500 tracking-wide">
              Uang Logam (Koin)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {logamList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={feedback.status === 'pas'}
                  onClick={() => handleAddMoney(item)}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-amber-50/50 hover:border-amber-400 active:scale-[0.98] transition-all flex flex-col items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-sky-600"
                >
                  <CurrencyVisual item={item} size="sm" />
                  <span className="text-sm font-bold text-slate-900 font-display tabular-nums">
                    + {item.formatted}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
