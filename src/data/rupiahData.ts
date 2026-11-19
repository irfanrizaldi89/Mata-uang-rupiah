export type CurrencyType = 'kertas' | 'logam';

export interface RupiahPalette {
  bgPrimary: string;
  bgSecondary: string;
  border: string;
  accent: string;
  text: string;
  badgeBg: string;
}

export interface RupiahDenomination {
  id: string;
  value: number;
  formatted: string;
  shortLabel: string;
  words: string;
  type: CurrencyType;
  colorName: string;
  materialDesc: string;
  visualCue: string;
  funFact: string;
  motifName: string;
  coinSizePx?: number;
  palette: RupiahPalette;
}

export type ShopItemIconId =
  | 'pensil'
  | 'roti'
  | 'susu'
  | 'buku'
  | 'penghapus'
  | 'eskrim'
  | 'jus'
  | 'penggaris'
  | 'donat'
  | 'taspensil'
  | 'bukugambar'
  | 'permen';

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: string;
  iconId: ShopItemIconId;
  accentColor: string;
  description: string;
}

export function formatRupiah(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID');
}

export const RUPIAH_DENOMINATIONS: RupiahDenomination[] = [
  // UANG LOGAM
  {
    id: 'logam-100',
    value: 100,
    formatted: 'Rp100',
    shortLabel: '100',
    words: 'Seratus Rupiah',
    type: 'logam',
    colorName: 'perak mengkilap',
    materialDesc: 'Logam aluminium ringan berwarna perak',
    visualCue: 'Berbentuk bulat kecil dengan tepi halus dan angka 100 di bagian tengah.',
    funFact: 'Uang logam Rp100 bergambar burung Kakaktua Raja yang berasal dari Papua Barat.',
    motifName: 'Kakaktua Raja',
    coinSizePx: 74,
    palette: {
      bgPrimary: '#E2E8F0',
      bgSecondary: '#CBD5E1',
      border: '#94A3B8',
      accent: '#64748B',
      text: '#1E293B',
      badgeBg: '#F1F5F9',
    },
  },
  {
    id: 'logam-200',
    value: 200,
    formatted: 'Rp200',
    shortLabel: '200',
    words: 'Dua Ratus Rupiah',
    type: 'logam',
    colorName: 'perak keabu-abuan',
    materialDesc: 'Logam aluminium berwarna perak terang',
    visualCue: 'Berbentuk bulat, sedikit lebih lebar daripada uang logam Rp100.',
    funFact: 'Di uang logam Rp200 terdapat gambar burung Jalak Bali yang cantik dan langka.',
    motifName: 'Jalak Bali',
    coinSizePx: 82,
    palette: {
      bgPrimary: '#E5E7EB',
      bgSecondary: '#D1D5DB',
      border: '#9CA3AF',
      accent: '#4B5563',
      text: '#1F2937',
      badgeBg: '#F3F4F6',
    },
  },
  {
    id: 'logam-500',
    value: 500,
    formatted: 'Rp500',
    shortLabel: '500',
    words: 'Lima Ratus Rupiah',
    type: 'logam',
    colorName: 'kuning keemasan',
    materialDesc: 'Logam berwarna keemasan (atau perak aluminium seri terbaru)',
    visualCue: 'Berbentuk bulat lebih besar, sering dikenal dengan warna kuning keemasan dan gambar bunga melati.',
    funFact: 'Uang logam Rp500 memiliki gambar Bunga Melati Putih yang merupakan puspa bangsa Indonesia.',
    motifName: 'Bunga Melati',
    coinSizePx: 90,
    palette: {
      bgPrimary: '#FEF08A',
      bgSecondary: '#FACC15',
      border: '#CA8A04',
      accent: '#A16207',
      text: '#422006',
      badgeBg: '#FEF9C3',
    },
  },
  {
    id: 'logam-1000',
    value: 1000,
    formatted: 'Rp1.000',
    shortLabel: '1.000',
    words: 'Seribu Rupiah',
    type: 'logam',
    colorName: 'perak berpinggir emas',
    materialDesc: 'Logam nikel perak dengan pinggiran berwarna keemasan',
    visualCue: 'Koin paling berat dan tebal dengan dua warna khas: bagian tengah perak dan tepi kuning emas.',
    funFact: 'Pecahan Rp1.000 hadir dalam dua bentuk: uang logam dan uang kertas, nilainya sama-sama seribu rupiah!',
    motifName: 'Angklung & Gedung Sate',
    coinSizePx: 94,
    palette: {
      bgPrimary: '#E2E8F0',
      bgSecondary: '#FCD34D',
      border: '#D97706',
      accent: '#475569',
      text: '#1E293B',
      badgeBg: '#FEF3C7',
    },
  },
  // UANG KERTAS
  {
    id: 'kertas-1000',
    value: 1000,
    formatted: 'Rp1.000',
    shortLabel: '1.000',
    words: 'Seribu Rupiah',
    type: 'kertas',
    colorName: 'kuning kehijauan',
    materialDesc: 'Kertas serat kapas yang lentur dan tipis',
    visualCue: 'Uang kertas berwarna kuning kehijauan dengan angka 1.000 di sudut kartu.',
    funFact: 'Uang kertas Rp1.000 menampilkan pahlawan nasional Tjut Meutia dari Aceh dan pemandangan Banda Neira.',
    motifName: 'Tjut Meutia · Banda Neira',
    palette: {
      bgPrimary: '#EDE49A',
      bgSecondary: '#D1C762',
      border: '#A19633',
      accent: '#71691A',
      text: '#2B2808',
      badgeBg: '#FEFCE8',
    },
  },
  {
    id: 'kertas-2000',
    value: 2000,
    formatted: 'Rp2.000',
    shortLabel: '2.000',
    words: 'Dua Ribu Rupiah',
    type: 'kertas',
    colorName: 'abu-abu',
    materialDesc: 'Kertas serat kapas berwarna abu-abu kecokelatan',
    visualCue: 'Uang kertas berwarna abu-abu lembut, sangat sering dipakai untuk membeli jajan atau alat tulis kecil.',
    funFact: 'Di uang kertas Rp2.000 terdapat gambar Mohammad Hoesni Thamrin dan indahnya Ngarai Sianok.',
    motifName: 'M. Hoesni Thamrin · Ngarai Sianok',
    palette: {
      bgPrimary: '#E2E4E9',
      bgSecondary: '#B8BDC7',
      border: '#64748B',
      accent: '#475569',
      text: '#1E293B',
      badgeBg: '#F1F5F9',
    },
  },
  {
    id: 'kertas-5000',
    value: 5000,
    formatted: 'Rp5.000',
    shortLabel: '5.000',
    words: 'Lima Ribu Rupiah',
    type: 'kertas',
    colorName: 'cokelat muda',
    materialDesc: 'Kertas serat kapas berwarna cokelat hangat',
    visualCue: 'Uang kertas berwarna cokelat muda keemasan dengan angka 5.000 yang jelas.',
    funFact: 'Uang kertas Rp5.000 bergambar Dr. K.H. Idham Chalid serta pemandangan Gunung Bromo yang megah.',
    motifName: 'Idham Chalid · Gunung Bromo',
    palette: {
      bgPrimary: '#F3C79B',
      bgSecondary: '#D98E52',
      border: '#B45309',
      accent: '#92400E',
      text: '#451A03',
      badgeBg: '#FFF7ED',
    },
  },
  {
    id: 'kertas-10000',
    value: 10000,
    formatted: 'Rp10.000',
    shortLabel: '10.000',
    words: 'Sepuluh Ribu Rupiah',
    type: 'kertas',
    colorName: 'ungu',
    materialDesc: 'Kertas serat kapas berwarna ungu khas',
    visualCue: 'Uang kertas berwarna ungu cerah, mudah dikenali di antara uang lainnya.',
    funFact: 'Uang kertas Rp10.000 menampilkan Frans Kaisiepo dan keindahan alam Taman Nasional Wakatobi.',
    motifName: 'Frans Kaisiepo · Wakatobi',
    palette: {
      bgPrimary: '#DFC7EE',
      bgSecondary: '#A875C9',
      border: '#7E22CE',
      accent: '#6B21A8',
      text: '#3B0764',
      badgeBg: '#FAF5FF',
    },
  },
  {
    id: 'kertas-20000',
    value: 20000,
    formatted: 'Rp20.000',
    shortLabel: '20.000',
    words: 'Dua Puluh Ribu Rupiah',
    type: 'kertas',
    colorName: 'hijau',
    materialDesc: 'Kertas serat kapas berwarna hijau daun',
    visualCue: 'Uang kertas berwarna hijau segar, nilainya sama dengan dua lembar uang Rp10.000.',
    funFact: 'Di uang Rp20.000 ada gambar Dr. G.S.S.J. Ratulangi dan pesona laut Kepulauan Derawan.',
    motifName: 'Sam Ratulangi · Derawan',
    palette: {
      bgPrimary: '#BCE8CF',
      bgSecondary: '#54B483',
      border: '#15803D',
      accent: '#166534',
      text: '#052E16',
      badgeBg: '#F0FDF4',
    },
  },
  {
    id: 'kertas-50000',
    value: 50000,
    formatted: 'Rp50.000',
    shortLabel: '50.000',
    words: 'Lima Puluh Ribu Rupiah',
    type: 'kertas',
    colorName: 'biru',
    materialDesc: 'Kertas serat kapas berwarna biru cerah',
    visualCue: 'Uang kertas berwarna biru laut dengan ukuran lembar lebih panjang daripada uang pecahan kecil.',
    funFact: 'Uang Rp50.000 bergambar Ir. H. Djuanda Kartawidjaja dan Taman Nasional Komodo di Nusa Tenggara Timur.',
    motifName: 'Ir. H. Djuanda · Komodo',
    palette: {
      bgPrimary: '#BFDBFE',
      bgSecondary: '#589AE0',
      border: '#1D4ED8',
      accent: '#1E40AF',
      text: '#172554',
      badgeBg: '#EFF6FF',
    },
  },
  {
    id: 'kertas-100000',
    value: 100000,
    formatted: 'Rp100.000',
    shortLabel: '100.000',
    words: 'Seratus Ribu Rupiah',
    type: 'kertas',
    colorName: 'merah',
    materialDesc: 'Kertas serat kapas berwarna merah cerah',
    visualCue: 'Uang kertas pecahan terbesar di Indonesia yang berwarna merah menyala.',
    funFact: 'Uang Rp100.000 menampilkan dua proklamator Indonesia: Ir. Soekarno dan Drs. Mohammad Hatta, serta Raja Ampat.',
    motifName: 'Soekarno-Hatta · Raja Ampat',
    palette: {
      bgPrimary: '#FECACA',
      bgSecondary: '#E55B66',
      border: '#B91C1C',
      accent: '#991B1B',
      text: '#450A0A',
      badgeBg: '#FEF2F2',
    },
  },
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'pensil',
    name: 'Pensil Kayu',
    price: 2000,
    formattedPrice: 'Rp2.000',
    category: 'Alat Tulis',
    iconId: 'pensil',
    accentColor: '#D97706',
    description: 'Pensil grafit yang nyaman untuk menulis dan menggambar.',
  },
  {
    id: 'roti',
    name: 'Roti Keju Hangat',
    price: 3000,
    formattedPrice: 'Rp3.000',
    category: 'Kantin Sekolah',
    iconId: 'roti',
    accentColor: '#EA580C',
    description: 'Roti lembut isi keju yang cocok untuk bekal istirahat.',
  },
  {
    id: 'susu',
    name: 'Susu Kotak Cokelat',
    price: 5000,
    formattedPrice: 'Rp5.000',
    category: 'Kantin Sekolah',
    iconId: 'susu',
    accentColor: '#0284C7',
    description: 'Minuman susu segar rasa cokelat dengan sedotan.',
  },
  {
    id: 'buku',
    name: 'Buku Tulis Bergaris',
    price: 8000,
    formattedPrice: 'Rp8.000',
    category: 'Alat Tulis',
    iconId: 'buku',
    accentColor: '#2563EB',
    description: 'Buku catatan tebal berisi 40 lembar untuk pelajaran sekolah.',
  },
  {
    id: 'penghapus',
    name: 'Penghapus Bersih',
    price: 1500,
    formattedPrice: 'Rp1.500',
    category: 'Alat Tulis',
    iconId: 'penghapus',
    accentColor: '#E11D48',
    description: 'Penghapus lembut agar catatan tetap rapi.',
  },
  {
    id: 'eskrim',
    name: 'Es Krim Vanila',
    price: 4000,
    formattedPrice: 'Rp4.000',
    category: 'Kantin Sekolah',
    iconId: 'eskrim',
    accentColor: '#DB2777',
    description: 'Es krim manis dingin yang menyegarkan di siang hari.',
  },
  {
    id: 'penggaris',
    name: 'Penggaris 30 cm',
    price: 2500,
    formattedPrice: 'Rp2.500',
    category: 'Alat Tulis',
    iconId: 'penggaris',
    accentColor: '#0D9488',
    description: 'Penggaris bening untuk membantu menggambar garis lurus.',
  },
  {
    id: 'jus',
    name: 'Jus Jeruk Segar',
    price: 6000,
    formattedPrice: 'Rp6.000',
    category: 'Kantin Sekolah',
    iconId: 'jus',
    accentColor: '#D97706',
    description: 'Jus buah jeruk asli kaya vitamin C.',
  },
  {
    id: 'donat',
    name: 'Kue Donat Gula',
    price: 3500,
    formattedPrice: 'Rp3.500',
    category: 'Kantin Sekolah',
    iconId: 'donat',
    accentColor: '#B45309',
    description: 'Donat empuk dengan taburan gula halus manis.',
  },
  {
    id: 'permen',
    name: 'Permen Buah',
    price: 500,
    formattedPrice: 'Rp500',
    category: 'Kantin Sekolah',
    iconId: 'permen',
    accentColor: '#7C3AED',
    description: 'Permen buah rasa stroberi segar.',
  },
  {
    id: 'bukugambar',
    name: 'Buku Gambar A4',
    price: 12000,
    formattedPrice: 'Rp12.000',
    category: 'Alat Tulis',
    iconId: 'bukugambar',
    accentColor: '#059669',
    description: 'Kertas gambar tebal untuk mewarnai dengan krayon.',
  },
  {
    id: 'taspensil',
    name: 'Tempat Pensil Kain',
    price: 15000,
    formattedPrice: 'Rp15.000',
    category: 'Alat Tulis',
    iconId: 'taspensil',
    accentColor: '#4F46E5',
    description: 'Tempat pensil beritsleting untuk menyimpan alat tulis.',
  },
];
