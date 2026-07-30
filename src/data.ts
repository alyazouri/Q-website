export type Device = {
  name: string;
  fps: number;
  touchRate: number; // Hz
  screenSize: number; // inches
  resolution: string;
  gyroQuality: "excellent" | "good" | "average";
};

export type DeviceBrand = {
  id: string;
  name: string;
  icon: string;
  accent: string;
  devices: Device[];
};

const d = (name: string, fps: number, touchRate: number, screenSize: number, resolution: string, gyroQuality: Device["gyroQuality"]): Device =>
  ({ name, fps, touchRate, screenSize, resolution, gyroQuality });

export const BRANDS: DeviceBrand[] = [
  {
    id: "apple",
    name: "Apple",
    icon: "🍎",
    accent: "from-slate-300 to-slate-500",
    devices: [
      d("iPhone 16 Pro Max", 120, 240, 6.9, "2868×1320", "excellent"),
      d("iPhone 16 Pro", 120, 240, 6.3, "2622×1206", "excellent"),
      d("iPhone 16 Plus", 60, 120, 6.7, "2796×1290", "excellent"),
      d("iPhone 16", 60, 120, 6.1, "2556×1179", "excellent"),
      d("iPhone 15 Pro Max", 120, 240, 6.7, "2796×1290", "excellent"),
      d("iPhone 15 Pro", 120, 240, 6.1, "2556×1179", "excellent"),
      d("iPhone 15 Plus", 60, 120, 6.7, "2796×1290", "excellent"),
      d("iPhone 15", 60, 120, 6.1, "2556×1179", "excellent"),
      d("iPhone 14 Pro Max", 120, 240, 6.7, "2796×1290", "excellent"),
      d("iPhone 14 Pro", 120, 240, 6.1, "2556×1179", "excellent"),
      d("iPhone 14 Plus", 60, 120, 6.7, "2778×1284", "excellent"),
      d("iPhone 13 Pro Max", 120, 240, 6.7, "2778×1284", "excellent"),
      d("iPhone 13 Pro", 120, 240, 6.1, "2532×1170", "excellent"),
      d("iPhone 13", 60, 120, 6.1, "2532×1170", "excellent"),
      d("iPhone 12 Pro", 60, 120, 6.1, "2532×1170", "good"),
      d("iPhone 11 Pro Max", 60, 120, 6.5, "2688×1242", "good"),
      d("iPhone 11", 60, 120, 6.1, "1792×828", "good"),
      d("iPad Pro 13 (M4)", 120, 240, 13.0, "2752×2064", "excellent"),
      d("iPad Pro 12.9 (M2)", 120, 240, 12.9, "2732×2048", "excellent"),
      d("iPad Pro 11 (M4)", 120, 240, 11.0, "2420×1668", "excellent"),
      d("iPad Air M2", 60, 120, 11.0, "2360×1640", "excellent"),
      d("iPad Air 5", 60, 120, 10.9, "2360×1640", "good"),
      d("iPad Mini 6", 60, 120, 8.3, "2266×1488", "good"),
      d("iPad 10", 60, 60, 10.9, "2360×1640", "average"),
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    icon: "📱",
    accent: "from-blue-400 to-indigo-600",
    devices: [
      d("Galaxy S25 Ultra", 120, 240, 6.9, "3120×1440", "excellent"),
      d("Galaxy S25+", 120, 240, 6.7, "3120×1440", "excellent"),
      d("Galaxy S25", 120, 240, 6.2, "2340×1080", "excellent"),
      d("Galaxy S24 Ultra", 120, 240, 6.8, "3120×1440", "excellent"),
      d("Galaxy S24+", 120, 240, 6.7, "3120×1440", "excellent"),
      d("Galaxy S24", 120, 240, 6.2, "2340×1080", "excellent"),
      d("Galaxy S23 Ultra", 120, 240, 6.8, "3088×1440", "excellent"),
      d("Galaxy S22 Ultra", 120, 240, 6.8, "3088×1440", "excellent"),
      d("Galaxy S23+", 120, 240, 6.6, "2340×1080", "excellent"),
      d("Galaxy S23", 120, 240, 6.1, "2340×1080", "excellent"),
      d("Galaxy Z Fold 6", 120, 240, 7.6, "2160×1856", "excellent"),
      d("Galaxy Z Flip 6", 120, 240, 6.7, "2640×1080", "good"),
      d("Galaxy Tab S10 Ultra", 120, 240, 14.6, "2960×1848", "excellent"),
      d("Galaxy Tab S9 Ultra", 120, 240, 14.6, "2960×1848", "excellent"),
      d("Galaxy Tab S9+", 120, 240, 12.4, "2800×1752", "excellent"),
      d("Galaxy Tab S9", 120, 240, 11.0, "2560×1600", "excellent"),
    ],
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    icon: "📲",
    accent: "from-orange-400 to-red-500",
    devices: [
      d("Xiaomi 15 Ultra", 120, 240, 6.73, "3200×1440", "excellent"),
      d("Xiaomi 14 Ultra", 120, 240, 6.73, "3200×1440", "excellent"),
      d("Xiaomi 14 Pro", 120, 240, 6.73, "3200×1440", "excellent"),
      d("Xiaomi 14", 120, 240, 6.36, "2670×1200", "excellent"),
      d("Xiaomi 13T Pro", 144, 480, 6.67, "2712×1220", "excellent"),
      d("Redmi K70 Pro", 120, 480, 6.67, "3200×1440", "excellent"),
      d("Redmi K70", 120, 480, 6.67, "2712×1220", "excellent"),
      d("Poco F7 Pro", 120, 480, 6.67, "3200×1440", "excellent"),
      d("Poco F6 Pro", 120, 480, 6.67, "3200×1440", "excellent"),
      d("Poco F6", 120, 240, 6.67, "2712×1220", "good"),
      d("Poco X6 Pro", 120, 240, 6.67, "2712×1220", "good"),
      d("Redmi Note 13 Pro+", 120, 240, 6.67, "2712×1220", "good"),
      d("Redmi Note 13", 120, 240, 6.67, "2400×1080", "average"),
    ],
  },
  {
    id: "rog",
    name: "ASUS ROG",
    icon: "🎮",
    accent: "from-red-500 to-rose-700",
    devices: [
      d("ROG Phone 9 Ultimate", 185, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 9 Pro", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 8 Pro", 165, 720, 6.78, "2400×1080", "excellent"),
      d("ROG Phone 7 Ultimate", 165, 720, 6.78, "2400×1080", "excellent"),
    ],
  },
  {
    id: "oneplus",
    name: "OnePlus",
    icon: "⚡",
    accent: "from-red-400 to-pink-600",
    devices: [
      d("OnePlus 13", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OnePlus 12", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OnePlus 11", 120, 240, 6.7, "3216×1440", "excellent"),
      d("OnePlus 12R", 120, 240, 6.78, "2780×1264", "good"),
      d("OnePlus Nord 4", 120, 240, 6.74, "2772×1240", "good"),
    ],
  },
  {
    id: "oppo",
    name: "OPPO",
    icon: "📸",
    accent: "from-emerald-400 to-teal-600",
    devices: [
      d("OPPO Find X8 Pro", 120, 240, 6.78, "2780×1264", "excellent"),
      d("OPPO Find X7 Ultra", 120, 240, 6.82, "3168×1440", "excellent"),
      d("OPPO Reno 12 Pro", 120, 240, 6.7, "2412×1080", "good"),
      d("OPPO Reno 12", 120, 240, 6.7, "2412×1080", "good"),
    ],
  },
  {
    id: "realme",
    name: "Realme",
    icon: "🌟",
    accent: "from-yellow-400 to-amber-600",
    devices: [
      d("Realme GT 7 Pro", 120, 480, 6.78, "2780×1264", "excellent"),
      d("Realme GT 6", 120, 240, 6.78, "2780×1264", "good"),
      d("Realme GT Neo 6", 120, 240, 6.78, "2780×1264", "good"),
    ],
  },
  {
    id: "huawei",
    name: "Huawei",
    icon: "🛰️",
    accent: "from-rose-400 to-red-600",
    devices: [
      d("Huawei Mate 60 Pro", 120, 240, 6.82, "2720×1260", "good"),
      d("Huawei P60 Pro", 120, 240, 6.67, "2700×1220", "good"),
      d("Huawei Mate X5", 120, 240, 7.85, "2496×2224", "good"),
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: "🕹️",
    accent: "from-fuchsia-500 to-purple-700",
    devices: [
      d("RedMagic 10 Pro", 144, 960, 6.85, "2688×1216", "excellent"),
      d("RedMagic 9 Pro", 120, 960, 6.8, "2480×1116", "excellent"),
      d("RedMagic 8 Pro", 120, 960, 6.8, "2480×1116", "excellent"),
      d("Lenovo Legion Y700", 144, 240, 8.8, "2560×1600", "excellent"),
      d("Lenovo Legion Phone 2 Pro", 144, 720, 6.92, "2460×1080", "excellent"),
    ],
  },
];

export type WeaponCategory = {
  id: string;
  name: string;
  icon: string;
  weapons: { name: string; recoil: number; range: number; type: string }[];
};

export const WEAPONS: WeaponCategory[] = [
  {
    id: "ar",
    name: "بنادق AR",
    icon: "🔫",
    weapons: [
      { name: "M416", recoil: 72, range: 65, type: "AR" },
      { name: "AKM", recoil: 85, range: 68, type: "AR" },
      { name: "M762", recoil: 88, range: 70, type: "AR" },
      { name: "SCAR-L", recoil: 62, range: 60, type: "AR" },
      { name: "G36C", recoil: 65, range: 62, type: "AR" },
      { name: "AUG", recoil: 60, range: 64, type: "AR" },
      { name: "QBZ", recoil: 64, range: 60, type: "AR" },
      { name: "M16A4", recoil: 55, range: 75, type: "AR" },
      { name: "FAMAS", recoil: 68, range: 58, type: "AR" },
      { name: "ACE32", recoil: 78, range: 66, type: "AR" },
      { name: "Groza", recoil: 82, range: 62, type: "AR" },
      { name: "Honey Badger", recoil: 70, range: 58, type: "AR" },
      { name: "Mk47 Mutant", recoil: 58, range: 72, type: "AR" },
      { name: "K2", recoil: 66, range: 62, type: "AR" },
    ],
  },
  {
    id: "smg",
    name: "SMG",
    icon: "💥",
    weapons: [
      { name: "UZI", recoil: 55, range: 30, type: "SMG" },
      { name: "UMP45", recoil: 45, range: 40, type: "SMG" },
      { name: "Vector", recoil: 58, range: 32, type: "SMG" },
      { name: "MP5K", recoil: 48, range: 36, type: "SMG" },
      { name: "Tommy Gun", recoil: 52, range: 35, type: "SMG" },
      { name: "P90", recoil: 40, range: 38, type: "SMG" },
      { name: "JS9", recoil: 42, range: 35, type: "SMG" },
      { name: "PP-19 Bizon", recoil: 44, range: 34, type: "SMG" },
      { name: "MP9", recoil: 50, range: 28, type: "SMG" },
    ],
  },
  {
    id: "sniper",
    name: "Sniper",
    icon: "🎯",
    weapons: [
      { name: "AWM", recoil: 95, range: 100, type: "Sniper" },
      { name: "M24", recoil: 82, range: 92, type: "Sniper" },
      { name: "Kar98k", recoil: 78, range: 88, type: "Sniper" },
      { name: "Win94", recoil: 70, range: 70, type: "Sniper" },
      { name: "Mosin-Nagant", recoil: 78, range: 88, type: "Sniper" },
      { name: "Lynx AMR", recoil: 98, range: 100, type: "Sniper" },
      { name: "M1 Garand", recoil: 72, range: 85, type: "Sniper" },
    ],
  },
  {
    id: "dmr",
    name: "DMR",
    icon: "🔭",
    weapons: [
      { name: "Mini14", recoil: 50, range: 82, type: "DMR" },
      { name: "SKS", recoil: 60, range: 80, type: "DMR" },
      { name: "SLR", recoil: 72, range: 85, type: "DMR" },
      { name: "Mk14", recoil: 78, range: 88, type: "DMR" },
      { name: "QBU", recoil: 55, range: 82, type: "DMR" },
      { name: "VSS", recoil: 40, range: 60, type: "DMR" },
      { name: "Mk12", recoil: 52, range: 84, type: "DMR" },
      { name: "Dragunov", recoil: 65, range: 86, type: "DMR" },
    ],
  },
  {
    id: "lmg",
    name: "LMG",
    icon: "💣",
    weapons: [
      { name: "M249", recoil: 68, range: 55, type: "LMG" },
      { name: "DP-28", recoil: 62, range: 58, type: "LMG" },
      { name: "MG3", recoil: 75, range: 60, type: "LMG" },
    ],
  },
  {
    id: "shotgun",
    name: "Shotgun",
    icon: "🧨",
    weapons: [
      { name: "S12K", recoil: 80, range: 20, type: "Shotgun" },
      { name: "S1897", recoil: 85, range: 18, type: "Shotgun" },
      { name: "S686", recoil: 88, range: 15, type: "Shotgun" },
      { name: "DBS", recoil: 90, range: 22, type: "Shotgun" },
      { name: "M1014", recoil: 82, range: 20, type: "Shotgun" },
      { name: "NS2000", recoil: 86, range: 17, type: "Shotgun" },
      { name: "O12", recoil: 84, range: 19, type: "Shotgun" },
    ],
  },
];

// PUBG Mobile Official Servers
export const SERVERS = [
  { id: "jordan", name: "Jordan", flag: "🇯🇴", ping: 35 },
  { id: "middle-east", name: "Middle East", flag: "🇦🇪", ping: 48 },
  { id: "europe", name: "Europe", flag: "🇪🇺", ping: 118 },
  { id: "asia", name: "Asia", flag: "🌏", ping: 145 },
  { id: "north-america", name: "North America", flag: "🇺🇸", ping: 185 },
  { id: "south-america", name: "South America", flag: "🇧🇷", ping: 210 },
  { id: "krjp", name: "KRJP", flag: "🇰🇷", ping: 245 },
];

export const STYLES = [
  { id: "headshot", name: "هيدشوت", icon: "🎯" },
  { id: "spray", name: "سبراي", icon: "🔫" },
  { id: "competitive", name: "تنافسي", icon: "🏆" },
  { id: "close", name: "قريب المدى", icon: "⚡" },
  { id: "reflex", name: "ردود فعل", icon: "💨" },
  { id: "conqueror", name: "كونكر", icon: "👑" },
];

export const FINGERS = [2, 3, 4, 5, 6] as const;
