import React from 'react';
import { RupiahDenomination } from '../data/rupiahData';

interface CurrencyVisualProps {
  item: RupiahDenomination;
  hideNominal?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CurrencyVisual: React.FC<CurrencyVisualProps> = ({
  item,
  hideNominal = false,
  size = 'md',
  className = '',
}) => {
  const { palette, type, shortLabel, words, id } = item;

  if (type === 'logam') {
    const isBimetallic = id === 'logam-1000';
    const sizeClasses =
      size === 'sm'
        ? 'w-14 h-14'
        : size === 'lg'
          ? 'w-36 h-36 sm:w-44 sm:h-44'
          : 'w-24 h-24 sm:w-28 sm:h-28';

    const gradId = `coin-grad-${id}-${size}-${hideNominal ? 'q' : 'v'}`;
    const innerGradId = `coin-inner-${id}-${size}-${hideNominal ? 'q' : 'v'}`;

    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-sm select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isBimetallic ? '#FDE68A' : palette.bgPrimary} />
              <stop offset="50%" stopColor={palette.bgSecondary} />
              <stop offset="100%" stopColor={palette.border} />
            </linearGradient>
            <linearGradient id={innerGradId} x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor={isBimetallic ? '#F8FAFC' : palette.bgPrimary} />
              <stop offset="100%" stopColor={isBimetallic ? '#CBD5E1' : palette.bgSecondary} />
            </linearGradient>
          </defs>

          {/* Outer Coin Edge */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill={`url(#${gradId})`}
            stroke={palette.border}
            strokeWidth="2.5"
          />

          {/* Milled inner dashed ring */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={palette.accent}
            strokeWidth="1.2"
            strokeDasharray="2.5 2.5"
            opacity="0.55"
          />

          {/* Inner Core (especially prominent on bimetallic Rp1.000) */}
          <circle
            cx="60"
            cy="60"
            r={isBimetallic ? '37' : '43'}
            fill={`url(#${innerGradId})`}
            stroke={palette.border}
            strokeWidth={isBimetallic ? '2' : '1'}
            opacity={isBimetallic ? '1' : '0.85'}
          />

          {/* Top label */}
          <text
            x="60"
            y="30"
            textAnchor="middle"
            fill={palette.text}
            fontSize="7.2"
            fontWeight="700"
            letterSpacing="0.8"
            opacity="0.75"
          >
            BANK INDONESIA
          </text>

          {/* Subtle stylized motif */}
          <circle cx="60" cy="60" r="24" fill={palette.accent} opacity="0.06" />

          {/* Nominal Value or Mystery ? */}
          {hideNominal ? (
            <text
              x="60"
              y="72"
              textAnchor="middle"
              fill={palette.text}
              fontSize="36"
              fontWeight="800"
              fontFamily="Outfit, sans-serif"
            >
              ?
            </text>
          ) : (
            <>
              <text
                x="60"
                y="67"
                textAnchor="middle"
                fill={palette.text}
                fontSize={shortLabel.length >= 5 ? '21' : '27'}
                fontWeight="800"
                fontFamily="Outfit, sans-serif"
              >
                {shortLabel}
              </text>
              <text
                x="60"
                y="84"
                textAnchor="middle"
                fill={palette.text}
                fontSize="8.5"
                fontWeight="700"
                letterSpacing="1"
                opacity="0.85"
              >
                RUPIAH
              </text>
            </>
          )}
        </svg>
      </div>
    );
  }

  // UANG KERTAS (BANKNOTE)
  const noteSizeClasses =
    size === 'sm'
      ? 'w-28 h-14'
      : size === 'lg'
        ? 'w-full max-w-[340px] aspect-[2/1]'
        : 'w-full max-w-[230px] aspect-[2/1]';

  const noteGradId = `note-grad-${id}-${size}-${hideNominal ? 'q' : 'v'}`;

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${noteSizeClasses} ${className}`}>
      <svg
        viewBox="0 0 260 130"
        className="w-full h-full drop-shadow-sm select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={noteGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.bgPrimary} />
            <stop offset="65%" stopColor={palette.bgSecondary} />
            <stop offset="100%" stopColor={palette.bgPrimary} />
          </linearGradient>
        </defs>

        {/* Banknote Base */}
        <rect
          x="2"
          y="2"
          width="256"
          height="126"
          rx="10"
          fill={`url(#${noteGradId})`}
          stroke={palette.border}
          strokeWidth="2"
        />

        {/* Inner Security Frame */}
        <rect
          x="9"
          y="9"
          width="242"
          height="112"
          rx="6"
          fill="none"
          stroke={palette.border}
          strokeWidth="1"
          strokeOpacity="0.45"
        />

        {/* Decorative Guilloche Left Strip */}
        <rect
          x="13"
          y="13"
          width="26"
          height="104"
          rx="4"
          fill={palette.accent}
          fillOpacity="0.16"
        />
        <circle cx="26" cy="30" r="5" fill={palette.accent} fillOpacity="0.24" />
        <circle cx="26" cy="65" r="7" fill={palette.accent} fillOpacity="0.2" />
        <circle cx="26" cy="100" r="5" fill={palette.accent} fillOpacity="0.24" />

        {/* Watermark Circle */}
        <circle
          cx="116"
          cy="68"
          r="28"
          fill="#FFFFFF"
          fillOpacity="0.28"
          stroke={palette.accent}
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="3 3"
        />

        {/* Stylized Hero Portrait Medallion on Right */}
        <g transform="translate(182, 34)">
          <rect
            x="0"
            y="0"
            width="58"
            height="68"
            rx="8"
            fill="#FFFFFF"
            fillOpacity="0.34"
            stroke={palette.border}
            strokeOpacity="0.35"
          />
          {/* Stylized bust silhouette */}
          <circle cx="29" cy="24" r="11" fill={palette.accent} fillOpacity="0.48" />
          <path
            d="M12 60 C12 44, 46 44, 46 60 Z"
            fill={palette.accent}
            fillOpacity="0.48"
          />
        </g>

        {/* Top Header */}
        <text
          x="48"
          y="26"
          fill={palette.text}
          fontSize="8.5"
          fontWeight="800"
          letterSpacing="0.9"
          opacity="0.85"
        >
          BANK INDONESIA
        </text>

        {/* Top Right Nominal or ? */}
        <text
          x="240"
          y="27"
          textAnchor="end"
          fill={palette.text}
          fontSize="13"
          fontWeight="800"
          fontFamily="Outfit, sans-serif"
        >
          {hideNominal ? '?' : shortLabel}
        </text>

        {/* Center Main Nominal */}
        {hideNominal ? (
          <g>
            <rect
              x="54"
              y="44"
              width="106"
              height="44"
              rx="8"
              fill="#FFFFFF"
              fillOpacity="0.55"
              stroke={palette.border}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x="107"
              y="76"
              textAnchor="middle"
              fill={palette.text}
              fontSize="28"
              fontWeight="800"
              fontFamily="Outfit, sans-serif"
            >
              Rp ?
            </text>
          </g>
        ) : (
          <g>
            <text
              x="48"
              y="72"
              fill={palette.text}
              fontSize={shortLabel.length >= 7 ? '24' : shortLabel.length >= 6 ? '27' : '30'}
              fontWeight="800"
              fontFamily="Outfit, sans-serif"
            >
              {shortLabel}
            </text>
            <text
              x="48"
              y="88"
              fill={palette.text}
              fontSize="8.5"
              fontWeight="700"
              opacity="0.85"
            >
              {words.toUpperCase()}
            </text>
          </g>
        )}

        {/* Bottom Footer */}
        <text
          x="48"
          y="112"
          fill={palette.text}
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="0.5"
          opacity="0.65"
        >
          NEGARA KESATUAN REPUBLIK INDONESIA
        </text>
      </svg>
    </div>
  );
};
