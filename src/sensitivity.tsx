import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";
import { getWeaponProfile } from "./weaponProfiles";

// PUBG Mobile Sensitivity Object — matches in-game layout exactly
type SensObj = {
  tpp: number;     // TPP No Scope (180° for CQC)
  fpp: number;     // FPP No Scope (180° for CQC)
  red: number;     // Red Dot / Holographic
  scope2: number;  // 2x Scope
  scope3: number;  // 3x Scope
  scope4: number;  // 4x Scope
  scope6: number;  // 6x Scope
  scope8: number;  // 8x Scope
};

// PUBG Mobile ranges
const SENS_MAX = 300;    // Regular sensitivity: 1% - 300%
const GYRO_MAX = 400;    // Gyroscope sensitivity: 1% - 400%
const SENS_MIN = 1;

export type Sens = {
  cam: SensObj;
  ads: SensObj;
  gyroCam: SensObj;
  gyroAds: SensObj;
  freeLook: { cam: number; parashoot: number; vehicle: number };
  aiScore: number;
  factors: {
    fps: number;
    touchRate: number;
    screenSize: number;
    gyroQuality: string;
    deviceFactor: number;
    fingerFactor: number;
    styleFactor: number;
    weaponFactor: number;
  };
};

export type GyroMode = "off" | "scope" | "always";

export type SensParams = {
  deviceId: string;
  device: {
    name: string;
    fps: number;
    touchRate: number;
    screenSize: number;
    resolution: string;
    gyroQuality: "excellent" | "good" | "average";
  };
  brandId: string;
  fingers: number;
  styleId: string;
  gyroMode: GyroMode;
  weaponId: string;
  weaponName: string;
  weaponRecoil: number;
  weaponRange: number;
  weaponType: string;
};

const clamp = (n: number, min = SENS_MIN, max = SENS_MAX) => Math.max(min, Math.min(max, Math.round(n)));
const clampGyro = (n: number) => Math.max(SENS_MIN, Math.min(GYRO_MAX, Math.round(n)));

export function computeSensitivity(p: SensParams): Sens {
  // ════════════════════════════════════════════════════════════
  //  المعادلة النهائية — بروفايل حقيقي لكل سلاح
  //  مرجع: iPad Pro 11" · 120FPS · 240Hz · 4 أصابع · Gyro Always On
  //  ثم تعديل حسب: جهاز + أصابع + أسلوب + جايرو
  // ════════════════════════════════════════════════════════════

  // ──── 1) جلب بروفايل السلاح المرجعي ────
  const wp = getWeaponProfile(p.weaponName, p.weaponRecoil, p.weaponRange, p.weaponType);
  // wp.cam/ads/gyro/gyroAds = [TPP, FPP, Red, 2x, 3x, 4x, 6x, 8x]
  // هذه القيم مضبوطة لـ iPad Pro 11" · 120FPS · 240Hz · 4 أصابع

  // ──── 2) عامل الجهاز ────
  // المرجع: iPad Pro 11" → 120 FPS, 240Hz, 11.0", excellent
  const refFps = 120, refTouch = 240, refScreen = 11.0;
  const fps = p.device.fps;
  const touch = p.device.touchRate;
  const screen = p.device.screenSize;
  const gyroQ = p.device.gyroQuality;

  // FPS أقل → حساسية أعلى (تعويض)، FPS أعلى → حساسية أقل (أدق)
  const fpsMul = refFps / fps; // 120/60=2.0, 120/120=1.0, 120/165=0.73
  const fpsFactor = 0.65 + fpsMul * 0.35; // normalize: 0.90..1.35

  // Touch rate أقل → حساسية أعلى
  const touchMul = refTouch / touch;
  const touchFactor = 0.80 + touchMul * 0.20; // 0.85..1.20

  // شاشة أصغر → حساسية أقل (مسافة سحب أقل)
  // شاشة أكبر → حساسية أعلى (مسافة سحب أطول)
  const screenFactor = screen / refScreen; // 6.5/11=0.59, 11/11=1.0, 13/11=1.18

  // الجايرو
  const gyroQualityMul = gyroQ === "excellent" ? 1.0 : gyroQ === "good" ? 0.92 : 0.80;

  // عامل الجهاز الكلي لللمس (Camera + ADS)
  const deviceMul = fpsFactor * touchFactor * screenFactor;

  // عامل الجهاز للجايرو (يتأثر بجودة الجايرو أيضاً)
  const deviceGyroMul = deviceMul * gyroQualityMul;

  // ──── 3) عامل الأصابع ────
  // المرجع: 4 أصابع = 1.0
  // 2 أصابع → حساسية أعلى (عمل أكثر لكل إصبع)
  // 6 أصابع → حساسية أقل (أصابع مخصصة)
  const fingerMul: Record<number, number> = {
    2: 1.15, 3: 1.06, 4: 1.0, 5: 0.95, 6: 0.90,
  };
  const fMul = fingerMul[p.fingers] ?? 1.0;

  // ──── 4) عامل أسلوب اللعب ────
  // يؤثر على CQC (TPP/FPP) والسكوبات بشكل مختلف
  const styleCQC: Record<string, number> = {
    headshot: 0.96, spray: 1.05, competitive: 1.0,
    close: 1.12, reflex: 1.08, conqueror: 0.98,
  };
  const styleScope: Record<string, number> = {
    headshot: 0.94, spray: 1.04, competitive: 1.0,
    close: 1.06, reflex: 1.02, conqueror: 0.96,
  };
  const styleGyro: Record<string, number> = {
    headshot: 1.06, spray: 1.02, competitive: 1.0,
    close: 1.04, reflex: 1.03, conqueror: 0.98,
  };
  const sCQC = styleCQC[p.styleId] ?? 1.0;
  const sScope = styleScope[p.styleId] ?? 1.0;
  const sGyro = styleGyro[p.styleId] ?? 1.0;

  // ──── 5) عامل الجايرو لـ TPP/FPP ────
  // إذا الجايرو OFF أو Scope On → TPP/FPP أسرع (اللمس فقط للمواجهات)
  const gyroOffBoost = (p.gyroMode === "off" || p.gyroMode === "scope") ? 1.15 : 1.0;

  // ──── 6) عامل تتبع الأهداف المتحركة (Vehicle Tracking) ────
  // TPP/FPP + Red Dot + 2x تحتاج حساسية أعلى لتلحق الخصم بالسيارة
  // السكوبات العالية (4x-8x) لا تحتاج رفع (لا تستخدم ضد سيارات قريبة)
  const VEHICLE_TRACK_CQC = 1.18;   // +18% لـ TPP/FPP
  const VEHICLE_TRACK_RED = 1.14;   // +14% لـ Red Dot
  const VEHICLE_TRACK_2X = 1.10;    // +10% لـ 2x
  const VEHICLE_TRACK_3X = 1.05;    // +5% لـ 3x

  // ════════════════════════════════════════════════════════════
  //  تطبيق المعاملات على بروفايل السلاح
  // ════════════════════════════════════════════════════════════

  const cqcMul = deviceMul * fMul * sCQC * gyroOffBoost * VEHICLE_TRACK_CQC;
  const scopeMul = deviceMul * fMul * sScope;
  const gMul = deviceGyroMul * fMul * sGyro;

  // Camera — مع تتبع الأهداف المتحركة
  const cam: SensObj = {
    tpp:    clamp(wp.cam[0] * cqcMul),
    fpp:    clamp(wp.cam[1] * cqcMul),
    red:    clamp(wp.cam[2] * scopeMul * VEHICLE_TRACK_RED),
    scope2: clamp(wp.cam[3] * scopeMul * VEHICLE_TRACK_2X),
    scope3: clamp(wp.cam[4] * scopeMul * VEHICLE_TRACK_3X),
    scope4: clamp(wp.cam[5] * scopeMul),
    scope6: clamp(wp.cam[6] * scopeMul),
    scope8: clamp(wp.cam[7] * scopeMul),
  };

  // ADS — مع تتبع الأهداف المتحركة
  const ads: SensObj = {
    tpp:    clamp(wp.ads[0] * cqcMul),
    fpp:    clamp(wp.ads[1] * cqcMul),
    red:    clamp(wp.ads[2] * scopeMul * VEHICLE_TRACK_RED),
    scope2: clamp(wp.ads[3] * scopeMul * VEHICLE_TRACK_2X),
    scope3: clamp(wp.ads[4] * scopeMul * VEHICLE_TRACK_3X),
    scope4: clamp(wp.ads[5] * scopeMul),
    scope6: clamp(wp.ads[6] * scopeMul),
    scope8: clamp(wp.ads[7] * scopeMul),
  };

  // Gyroscope
  const useGyroAll = p.gyroMode === "always";
  const useGyroAny = p.gyroMode !== "off";

  // Gyro — تتبع محسّن للأهداف المتحركة (السيارات)
  const GYRO_TRACK_CQC = 1.15;  // +15% جايرو TPP/FPP لتتبع السيارات
  const GYRO_TRACK_RED = 1.12;  // +12% جايرو Red Dot
  const GYRO_TRACK_2X = 1.08;   // +8% جايرو 2x

  const gyroCam: SensObj = {
    tpp:    useGyroAll ? clampGyro(wp.gyro[0] * gMul * GYRO_TRACK_CQC) : 0,
    fpp:    useGyroAll ? clampGyro(wp.gyro[1] * gMul * GYRO_TRACK_CQC) : 0,
    red:    useGyroAll ? clampGyro(wp.gyro[2] * gMul * GYRO_TRACK_RED) : 0,
    scope2: useGyroAny ? clampGyro(wp.gyro[3] * gMul * GYRO_TRACK_2X) : 0,
    scope3: useGyroAny ? clampGyro(wp.gyro[4] * gMul) : 0,
    scope4: useGyroAny ? clampGyro(wp.gyro[5] * gMul) : 0,
    scope6: useGyroAny ? clampGyro(wp.gyro[6] * gMul) : 0,
    scope8: useGyroAny ? clampGyro(wp.gyro[7] * gMul) : 0,
  };

  const gyroAds: SensObj = {
    tpp:    useGyroAll ? clampGyro(wp.gyroAds[0] * gMul * GYRO_TRACK_CQC) : 0,
    fpp:    useGyroAll ? clampGyro(wp.gyroAds[1] * gMul * GYRO_TRACK_CQC) : 0,
    red:    useGyroAll ? clampGyro(wp.gyroAds[2] * gMul * GYRO_TRACK_RED) : 0,
    scope2: useGyroAny ? clampGyro(wp.gyroAds[3] * gMul * GYRO_TRACK_2X) : 0,
    scope3: useGyroAny ? clampGyro(wp.gyroAds[4] * gMul) : 0,
    scope4: useGyroAny ? clampGyro(wp.gyroAds[5] * gMul) : 0,
    scope6: useGyroAny ? clampGyro(wp.gyroAds[6] * gMul) : 0,
    scope8: useGyroAny ? clampGyro(wp.gyroAds[7] * gMul) : 0,
  };

  // Free Look
  const freeLook = {
    cam: clamp(115 * deviceMul * fMul, 60, 200),
    parashoot: clamp(85 * deviceMul * fMul, 50, 160),
    vehicle: clamp(130 * deviceMul * fMul, 80, 220),
  };

  // AI Score
  const fpsScore = fps >= 120 ? 20 : fps >= 90 ? 12 : 6;
  const touchScore = touch >= 480 ? 15 : touch >= 240 ? 10 : 5;
  const gyroScore = gyroQ === "excellent" ? 12 : gyroQ === "good" ? 8 : 4;
  const fingerScore = p.fingers >= 4 ? 12 : p.fingers >= 3 ? 8 : 4;
  const styleScore = p.styleId === "conqueror" ? 12 : p.styleId === "competitive" ? 10 : 6;
  const weaponScore = p.weaponRecoil <= 50 ? 10 : p.weaponRecoil <= 70 ? 7 : 4;
  const aiScore = Math.min(100, Math.max(30, 20 + fpsScore + touchScore + gyroScore + fingerScore + styleScore + weaponScore));

  return {
    cam, ads, gyroCam, gyroAds, freeLook, aiScore,
    factors: {
      fps, touchRate: touch, screenSize: screen, gyroQuality: gyroQ,
      deviceFactor: Math.round(deviceMul * 100) / 100,
      fingerFactor: Math.round(fMul * 100) / 100,
      styleFactor: Math.round(sCQC * 100) / 100,
      weaponFactor: Math.round((1 / (p.weaponRecoil / 72)) * 100) / 100,
    },
  };
}

export function CopyButton({ sens, lang }: { sens: Sens; lang: string }) {
  const [copied, setCopied] = useState(false);
  const buildText = () => {
    return [
      `═══ ALYAZOURI SENSITIVITY 2026 ═══`, ``,
      `📷 Camera:`, `  TPP: ${sens.cam.tpp}%  |  FPP: ${sens.cam.fpp}%`,
      `  Red Dot: ${sens.cam.red}%`, `  ×2: ${sens.cam.scope2}%  |  ×3: ${sens.cam.scope3}%`,
      `  ×4: ${sens.cam.scope4}%  |  ×6: ${sens.cam.scope6}%  |  ×8: ${sens.cam.scope8}%`, ``,
      `🎯 ADS:`, `  TPP: ${sens.ads.tpp}%  |  FPP: ${sens.ads.fpp}%`,
      `  Red Dot: ${sens.ads.red}%`, `  ×2: ${sens.ads.scope2}%  |  ×3: ${sens.ads.scope3}%`,
      `  ×4: ${sens.ads.scope4}%  |  ×6: ${sens.ads.scope6}%  |  ×8: ${sens.ads.scope8}%`, ``,
      `🔄 Gyro Cam: TPP ${sens.gyroCam.tpp}% | FPP ${sens.gyroCam.fpp}%`,
      `🔄 Gyro ADS: TPP ${sens.gyroAds.tpp}% | FPP ${sens.gyroAds.fpp}%`, ``,
      `👁️ Free Look: ${sens.freeLook.cam}% | ${sens.freeLook.parashoot}% | ${sens.freeLook.vehicle}%`, ``,
      `🏆 AI Score: ${sens.aiScore}/100`, ``, `Generated by ALYAZOURI 2026`,
    ].join("\n");
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* */ }
  };
  return (
    <button onClick={handleCopy} className={`btn-primary w-full rounded-xl px-5 py-3 text-sm transition-all ${copied ? "copied-flash !bg-emerald-600" : ""}`}>
      {copied ? `✅ ${lang === "ar" ? "تم النسخ!" : "Copied!"}` : `📋 ${lang === "ar" ? "نسخ جميع الحساسيات" : "Copy All Sensitivity"}`}
    </button>
  );
}

export function SensitivityTable({
  label, data, color = "orange", showTppFpp = true,
}: {
  label: string;
  data: SensObj;
  color?: "orange" | "sky";
  showTppFpp?: boolean;
}) {
  const { lang } = useLang();
  // PUBG Mobile exact layout
  const rows: [string, number][] = [
    [t("sens_red_dot", lang), data.red],
    ["×2", data.scope2],
    ["×3", data.scope3],
    ["×4", data.scope4],
    ["×6", data.scope6],
    ["×8", data.scope8],
  ];
  const barClass = color === "orange"
    ? "bg-gradient-to-r from-orange-500 to-amber-300"
    : "bg-gradient-to-r from-sky-400 to-indigo-400";
  const dotClass = barClass;

  return (
    <div className="card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dotClass}`} />
        <h4 className="font-display text-sm font-bold tracking-wider text-white/90">{label}</h4>
      </div>

      {/* TPP & FPP 180° Hero — hide if values are 0 (gyro off/scope mode) */}
      {showTppFpp && data.tpp > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="relative overflow-hidden rounded-xl border border-orange-400/30 bg-gradient-to-br from-orange-500/15 to-red-500/10 p-3">
            <div className="absolute top-0 right-0 rounded-bl-lg bg-orange-500/20 px-2 py-0.5 font-display text-[9px] font-bold tracking-widest text-orange-300">
              {t("sens_cqc", lang)}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">{t("sens_tpp", lang)}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-2xl font-black text-orange-300 tabular-nums">{data.tpp}</span>
              <span className="text-xs text-white/40">%</span>
            </div>
            <div className="text-[9px] text-white/40">{t("sens_tpp_desc", lang)}</div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-amber-400/30 bg-gradient-to-br from-amber-500/15 to-orange-500/10 p-3">
            <div className="absolute top-0 right-0 rounded-bl-lg bg-amber-500/20 px-2 py-0.5 font-display text-[9px] font-bold tracking-widest text-amber-300">
              {t("sens_cqc", lang)}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">{t("sens_fpp", lang)}</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-2xl font-black text-amber-300 tabular-nums">{data.fpp}</span>
              <span className="text-xs text-white/40">%</span>
            </div>
            <div className="text-[9px] text-white/40">{t("sens_fpp_desc", lang)}</div>
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-white/60">{k}</span>
            <div className="stat-bar flex-1 h-2">
              <span className={barClass} style={{ width: `${Math.min(100, (v / 400) * 100)}%` }} />
            </div>
            <span className="font-display w-12 text-right text-sm font-bold text-white tabular-nums">{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecoilSimulator({
  sens, weapon,
}: {
  sens: Sens;
  weapon: { name: string; recoil: number; type: string };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running && tick === 0) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = cvs.clientWidth;
    const h = cvs.clientHeight;
    cvs.width = w * dpr;
    cvs.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255,122,0,0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 24) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 24) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255,122,0,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w / 2 - 10, h / 2); ctx.lineTo(w / 2 + 10, h / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w / 2, h / 2 - 10); ctx.lineTo(w / 2, h / 2 + 10); ctx.stroke();

    const recoilK = weapon.recoil / 100;
    const pullStrength = (sens.ads.scope3 / 100) * 1.3;
    const shots = 30;
    let x = w / 2, y = h - 20;
    const points: [number, number][] = [];
    for (let i = 0; i < shots; i++) {
      const jitterX = (Math.random() - 0.5) * 10 * recoilK;
      const pull = pullStrength * (1 + i * 0.04);
      x += jitterX;
      y -= 6 * (1 - pull * 0.6) - 2;
      points.push([x, y]);
    }

    ctx.strokeStyle = "rgba(255,180,80,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)));
    ctx.stroke();

    points.forEach(([px, py], i) => {
      ctx.fillStyle = i === 0 ? "#ffd166" : `rgba(255,122,0,${0.3 + 0.7 * (i / shots)})`;
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    setRunning(false);
  }, [running, tick, sens, weapon]);

  return (
    <div>
      <div className="relative h-56 overflow-hidden rounded-xl border border-white/10 bg-[#07090f]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute top-2 right-2 rounded bg-black/60 px-2 py-0.5 font-display text-[10px] tracking-widest text-orange-300">
          {weapon.name} · RECOIL
        </div>
        <button
          onClick={() => { setRunning(true); setTick((t) => t + 1); }}
          className="absolute bottom-2 left-2 rounded-md bg-orange-500/90 px-3 py-1 text-xs font-bold text-white hover:bg-orange-400"
        >
          ▶ Run
        </button>
      </div>
    </div>
  );
}

export function FactorsPanel({ sens }: { sens: Sens }) {
  const { lang } = useLang();
  const factors = [
    { k: t("factors_device", lang), v: sens.factors.deviceFactor.toFixed(2), sub: `${sens.factors.fps} FPS · ${sens.factors.touchRate} Hz`, icon: "📱" },
    { k: t("factors_fingers", lang), v: sens.factors.fingerFactor.toFixed(2), sub: "Claw grip", icon: "🖐️" },
    { k: t("factors_style", lang), v: sens.factors.styleFactor.toFixed(2), sub: "Play style", icon: "🎮" },
    { k: t("factors_weapon", lang), v: sens.factors.weaponFactor.toFixed(2), sub: "Recoil + range", icon: "🔫" },
  ];
  return (
    <div className="card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
        <h4 className="font-display text-sm font-bold tracking-widest text-white/90">{t("factors_title", lang)}</h4>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {factors.map((f) => (
          <div key={f.k} className="rounded-xl border border-white/5 bg-black/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-lg">{f.icon}</span>
              <span className="font-display text-lg font-black text-orange-300 tabular-nums">×{f.v}</span>
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{f.k}</div>
            <div className="text-[10px] text-white/40">{f.sub}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-white/5 bg-black/20 p-3 text-[11px] leading-relaxed text-white/60">
        <span className="text-orange-300">{t("factors_equation", lang)}</span> <span dir="ltr" className="font-mono">Sens = Base × Device × Finger × Style × Weapon</span>
        <br />
        <span className="text-white/40">{t("factors_desc", lang)}</span>
      </div>
    </div>
  );
}
