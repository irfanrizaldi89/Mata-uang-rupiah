import React, { useState, useCallback } from 'react';
import { CheckCircle2, HelpCircle, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { RUPIAH_DENOMINATIONS, RupiahDenomination } from '../data/rupiahData';
import { CurrencyVisual } from './CurrencyVisual';
import { soundFx } from '../utils/soundFx';

interface QuizModeProps {
  onAddStars: (amount: number) => void;
}

type QuizScope = 'semua' | 'kertas' | 'logam';

interface QuizQuestion {
  target: RupiahDenomination;
  options: RupiahDenomination[];
}

function createQuestion(scope: QuizScope, previousId?: string): QuizQuestion {
  const pool = RUPIAH_DENOMINATIONS.filter((item) =>
    scope === 'semua' ? true : item.type === scope
  );

  const candidates = pool.filter((item) => item.id !== previousId);
  const targetPool = candidates.length > 0 ? candidates : pool;
  const target = targetPool[Math.floor(Math.random() * targetPool.length)];

  // Pick 3 distractors preferring same type first for meaningful learning
  const sameType = RUPIAH_DENOMINATIONS.filter(
    (item) => item.id !== target.id && item.type === target.type
  );
  const otherType = RUPIAH_DENOMINATIONS.filter(
    (item) => item.id !== target.id && item.type !== target.type
  );

  const shuffledSame = [...sameType].sort(() => Math.random() - 0.5);
  const shuffledOther = [...otherType].sort(() => Math.random() - 0.5);
  const distractors = [...shuffledSame, ...shuffledOther].slice(0, 3);

  const options = [target, ...distractors].sort((a, b) => a.value - b.value || a.type.localeCompare(b.type));
  return { target, options };
}

export const QuizMode: React.FC<QuizModeProps> = ({ onAddStars }) => {
  const [scope, setScope] = useState<QuizScope>('semua');
  const [question, setQuestion] = useState<QuizQuestion>(() => createQuestion('semua'));
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [lastTriedId, setLastTriedId] = useState<string | null>(null);

  const loadNextQuestion = useCallback(
    (nextScope: QuizScope = scope, increment = true) => {
      const next = createQuestion(nextScope, question.target.id);
      setQuestion(next);
      setWrongIds([]);
      setIsSolved(false);
      setShowHint(false);
      setLastTriedId(null);
      if (increment) {
        setQuestionCount((prev) => prev + 1);
      }
    },
    [question.target.id, scope]
  );

  const handleScopeChange = (newScope: QuizScope) => {
    soundFx.playTap();
    setScope(newScope);
    const next = createQuestion(newScope);
    setQuestion(next);
    setWrongIds([]);
    setIsSolved(false);
    setShowHint(false);
    setLastTriedId(null);
    setQuestionCount(1);
  };

  const handleAnswer = (choice: RupiahDenomination) => {
    if (isSolved) return;

    if (choice.id === question.target.id) {
      setIsSolved(true);
      soundFx.playCorrect();
      onAddStars(1);
    } else {
      soundFx.playGentleRetry();
      setLastTriedId(choice.id);
      if (!wrongIds.includes(choice.id)) {
        setWrongIds((prev) => [...prev, choice.id]);
      }
    }
  };

  const { target, options } = question;
  const typeLabel = target.type === 'kertas' ? 'uang kertas' : 'uang logam';

  return (
    <section aria-label="Mode Tebak Nominal Rupiah" className="space-y-6">
      {/* Scope & Question Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(
            [
              { id: 'semua', label: 'Semua Pecahan' },
              { id: 'kertas', label: 'Uang Kertas' },
              { id: 'logam', label: 'Uang Logam' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleScopeChange(tab.id)}
              className={`px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600 ${
                scope === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
          <span className="tabular-nums">Soal ke-{questionCount}</span>
          <button
            type="button"
            onClick={() => {
              soundFx.playTap();
              setShowHint(true);
            }}
            disabled={showHint || isSolved}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-amber-600" aria-hidden="true" />
            Petunjuk
          </button>
        </div>
      </div>

      {/* Main Quiz Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Mystery Currency Card */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center justify-between text-center space-y-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-sky-700">
              Tebak Pecahan Rupiah Ini
            </p>
            <h2 className="text-2xl font-bold text-slate-900 font-display text-balance">
              Berapakah nilai uang di bawah ini?
            </h2>
          </div>

          <div className="w-full py-8 px-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center min-h-[210px]">
            <div className={isSolved ? 'animate-celebrate' : ''}>
              <CurrencyVisual item={target} hideNominal={!isSolved} size="lg" />
            </div>
          </div>

          {/* Optional Hint Box */}
          {showHint && !isSolved && (
            <div className="w-full p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-950 text-left animate-pop">
              <span className="font-bold">Petunjuk:</span> Ini adalah{' '}
              <span className="font-semibold">{typeLabel}</span> berwarna{' '}
              <span className="font-semibold">{target.colorName}</span> dengan motif{' '}
              <span className="font-semibold">{target.motifName}</span>.
            </div>
          )}

          {!showHint && !isSolved && (
            <p className="text-sm text-slate-500">
              Perhatikan warna khas dan bentuknya ya. Angka sengaja disembunyikan!
            </p>
          )}
        </div>

        {/* Right: Answer Options & Friendly Feedback */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-700">
              Pilih jawaban yang paling tepat:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {options.map((choice) => {
                const isCorrectChoice = isSolved && choice.id === target.id;
                const isTriedWrong = wrongIds.includes(choice.id);

                let btnStyle =
                  'bg-white border-slate-200 text-slate-900 hover:border-sky-400 hover:bg-sky-50/40';
                if (isCorrectChoice) {
                  btnStyle =
                    'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/25';
                } else if (isTriedWrong) {
                  btnStyle = 'bg-amber-50/60 border-amber-300 text-slate-500';
                }

                return (
                  <button
                    key={choice.id}
                    type="button"
                    disabled={isSolved || isTriedWrong}
                    onClick={() => handleAnswer(choice)}
                    className={`p-4 min-h-[76px] rounded-xl border-2 text-left transition-all duration-150 flex flex-col justify-center cursor-pointer disabled:cursor-default focus-visible:outline-2 focus-visible:outline-sky-600 ${btnStyle}`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span className="text-xl font-extrabold font-display tabular-nums">
                        {choice.formatted}
                      </span>
                      {isCorrectChoice && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                      )}
                      {isTriedWrong && (
                        <span className="text-xs font-semibold text-amber-800">Coba lagi</span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-600 mt-0.5">
                      {choice.type === 'kertas' ? 'Uang Kertas' : 'Uang Logam'} · {choice.words}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Supportive Feedback Banner */}
          <div className="min-h-[120px] flex flex-col justify-end">
            {isSolved ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-4 animate-pop">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="font-bold text-emerald-950 text-base">
                      Tepat sekali! +1 Bintang
                    </p>
                    <p className="text-sm text-emerald-900 leading-relaxed">
                      Ini adalah {typeLabel} <strong className="tabular-nums">{target.formatted}</strong> ({target.words}) berwarna{' '}
                      <strong>{target.colorName}</strong>.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playTap();
                    loadNextQuestion(scope, true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-800"
                >
                  <span>Soal Berikutnya</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            ) : lastTriedId ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 animate-pop">
                <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-amber-950 leading-relaxed">
                  <p className="font-bold">Belum tepat, yuk coba pilih jawaban lain!</p>
                  <p className="mt-0.5">
                    Coba perhatikan warnanya yang <strong>{target.colorName}</strong> dan bentuknya sebagai{' '}
                    <strong>{typeLabel}</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-sm text-slate-600">
                <span>Tidak perlu terburu-buru. Kalau salah, kamu boleh mencoba lagi!</span>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playTap();
                    loadNextQuestion(scope, false);
                  }}
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  Ganti Soal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
