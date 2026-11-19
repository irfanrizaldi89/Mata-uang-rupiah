import React from 'react';
import { ShopItemIconId } from '../data/rupiahData';

interface ShopItemVisualProps {
  iconId: ShopItemIconId;
  className?: string;
}

export const ShopItemVisual: React.FC<ShopItemVisualProps> = ({ iconId, className = 'w-20 h-20' }) => {
  switch (iconId) {
    case 'pensil':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#FEF3C7" />
          <g transform="rotate(-35 48 48)">
            <rect x="40" y="18" width="16" height="46" rx="2" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
            <rect x="40" y="14" width="16" height="8" rx="2" fill="#FB7185" stroke="#9F1239" strokeWidth="2" />
            <rect x="40" y="21" width="16" height="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
            <polygon points="40,64 56,64 48,80" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
            <polygon points="45,74 51,74 48,80" fill="#1E293B" />
          </g>
        </svg>
      );
    case 'roti':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#FFEDD5" />
          <path
            d="M22 50 C22 30, 74 30, 74 50 L74 64 C74 68, 70 72, 65 72 L31 72 C26 72, 22 68, 22 64 Z"
            fill="#F59E0B"
            stroke="#9A3412"
            strokeWidth="2.5"
          />
          <path d="M24 50 Q48 42 72 50" fill="none" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
          <path d="M38 36 L44 43 M50 35 L55 43 M61 38 L64 44" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'susu':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#E0F2FE" />
          <path d="M62 18 L70 14 L70 28" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="34,32 62,32 56,22 40,22" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2.2" />
          <rect x="34" y="32" width="28" height="44" rx="4" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.2" />
          <rect x="34" y="44" width="28" height="18" fill="#0284C7" />
          <circle cx="48" cy="53" r="5" fill="#FEF08A" />
        </svg>
      );
    case 'buku':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#DBEAFE" />
          <rect x="26" y="20" width="44" height="56" rx="5" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.5" />
          <rect x="26" y="20" width="9" height="56" rx="2" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="2" />
          <rect x="41" y="31" width="22" height="14" rx="2" fill="#FFFFFF" />
          <line x1="44" y1="36" x2="60" y2="36" stroke="#94A3B8" strokeWidth="2" />
          <line x1="44" y1="41" x2="56" y2="41" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );
    case 'penghapus':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#FFE4E6" />
          <g transform="rotate(-20 48 48)">
            <rect x="24" y="34" width="48" height="28" rx="5" fill="#FB7185" stroke="#9F1239" strokeWidth="2.5" />
            <rect x="48" y="34" width="24" height="28" rx="4" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          </g>
        </svg>
      );
    case 'eskrim':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#FCE7F3" />
          <polygon points="36,48 60,48 48,80" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="40" cy="42" r="12" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          <circle cx="56" cy="42" r="12" fill="#F9A8D4" stroke="#BE185D" strokeWidth="2" />
          <circle cx="48" cy="30" r="12" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          <circle cx="48" cy="17" r="4" fill="#EF4444" />
        </svg>
      );
    case 'jus':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#FEF3C7" />
          <line x1="56" y1="20" x2="50" y2="42" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="33,34 63,34 58,74 38,74" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" strokeLinejoin="round" />
          <ellipse cx="48" cy="34" rx="15" ry="4" fill="#FDBA74" stroke="#9A3412" strokeWidth="2" />
          <circle cx="63" cy="34" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
        </svg>
      );
    case 'penggaris':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#CCFBF1" />
          <g transform="rotate(-30 48 48)">
            <rect x="18" y="38" width="60" height="20" rx="3" fill="#2DD4BF" stroke="#0F766E" strokeWidth="2.5" />
            <line x1="26" y1="38" x2="26" y2="46" stroke="#0F766E" strokeWidth="2" />
            <line x1="34" y1="38" x2="34" y2="44" stroke="#0F766E" strokeWidth="2" />
            <line x1="42" y1="38" x2="42" y2="46" stroke="#0F766E" strokeWidth="2" />
            <line x1="50" y1="38" x2="50" y2="44" stroke="#0F766E" strokeWidth="2" />
            <line x1="58" y1="38" x2="58" y2="46" stroke="#0F766E" strokeWidth="2" />
            <line x1="66" y1="38" x2="66" y2="44" stroke="#0F766E" strokeWidth="2" />
          </g>
        </svg>
      );
    case 'donat':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#FEF3C7" />
          <circle cx="48" cy="48" r="26" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <path
            d="M24 44 C26 28, 70 28, 72 44 C66 50, 60 44, 54 49 C48 54, 42 44, 36 49 C30 52, 26 48, 24 44 Z"
            fill="#F472B6"
          />
          <circle cx="48" cy="48" r="9" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="38" cy="34" r="2" fill="#FFFFFF" />
          <circle cx="56" cy="33" r="2" fill="#FEF08A" />
          <circle cx="62" cy="41" r="2" fill="#38BDF8" />
        </svg>
      );
    case 'permen':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#F3E8FF" />
          <g transform="rotate(-25 48 48)">
            <polygon points="18,40 32,48 18,56" fill="#C084FC" stroke="#6B21A8" strokeWidth="2" />
            <polygon points="78,40 64,48 78,56" fill="#C084FC" stroke="#6B21A8" strokeWidth="2" />
            <circle cx="48" cy="48" r="17" fill="#A855F7" stroke="#581C87" strokeWidth="2.5" />
            <path d="M38 40 Q48 48 58 40" fill="none" stroke="#F3E8FF" strokeWidth="3" strokeLinecap="round" />
            <path d="M38 56 Q48 48 58 56" fill="none" stroke="#F3E8FF" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    case 'bukugambar':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#D1FAE5" />
          <rect x="22" y="24" width="52" height="48" rx="4" fill="#FFFFFF" stroke="#047857" strokeWidth="2.5" />
          <path d="M26 62 L40 44 L52 56 L62 48 L70 62 Z" fill="#10B981" />
          <circle cx="60" cy="36" r="6" fill="#FBBF24" />
        </svg>
      );
    case 'taspensil':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="42" fill="#E0E7FF" />
          <rect x="20" y="34" width="56" height="32" rx="10" fill="#4F46E5" stroke="#312E81" strokeWidth="2.5" />
          <line x1="24" y1="44" x2="72" y2="44" stroke="#FBBF24" strokeWidth="3" />
          <rect x="64" y="41" width="8" height="6" rx="2" fill="#FEF08A" stroke="#92400E" strokeWidth="1.5" />
        </svg>
      );
  }
};
