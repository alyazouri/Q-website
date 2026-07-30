import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "./LanguageContext";
import type { Sens } from "./sensitivity";

// ============ SCROLL REVEAL HOOK ============
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay === 1 ? "reveal-delay-1" : delay === 2 ? "reveal-delay-2" : delay === 3 ? "reveal-delay-3" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ============ GAMING NIGHT MODE ============
const NIGHT_KEY = "alyazouri_night_mode";

export function useNightMode() {
  const [night, setNight] = useState(() => {
    try { return localStorage.getItem(NIGHT_KEY) === "true"; } catch { return false; }
  });
  useEffect(() => {
    document.body.classList.toggle("gaming-mode", night);
    try { localStorage.setItem(NIGHT_KEY, String(night)); } catch { /* */ }
  }, [night]);
  return { night, toggleNight: () => setNight((n) => !n) };
}

export function NightModeToggle() {
  const { lang } = useLang();
  const { night, toggleNight } = useNightMode();
  const isAr = lang === "ar";
  return (
    <button
      onClick={toggleNight}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
        night
          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
          : "btn-ghost"
      }`}
      title={isAr ? "وضع الألعاب الليلي" : "Gaming Night Mode"}
    >
      <span className="text-lg">{night ? "🌙" : "☀️"}</span>
    </button>
  );
}

// ============ RATING SYSTEM ============
const RATING_KEY = "alyazouri_rating_v1";

interface RatingData {
  rating: number;
  comment: string;
  savedAt: number;
}

export function RatingSection() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState<RatingData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RATING_KEY);
      if (raw) {
        const data = JSON.parse(raw) as RatingData;
        setSaved(data);
        setRating(data.rating);
        setComment(data.comment);
        setSubmitted(true);
      }
    } catch { /* */ }
  }, []);

  const handleSubmit = () => {
    if (rating === 0) return;
    const data: RatingData = { rating, comment, savedAt: Date.now() };
    try { localStorage.setItem(RATING_KEY, JSON.stringify(data)); } catch { /* */ }
    setSaved(data);
    setSubmitted(true);
  };

  const stars = [1, 2, 3, 4, 5];
  const activeRating = hoverRating || rating;

  return (
    <div className="card neon-box rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">💬</span>
        <h3 className="font-display text-lg font-bold text-white">
          {isAr ? "قيّم تجربتك" : "Rate Your Experience"}
        </h3>
      </div>

      {submitted && saved ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-3">🎉</div>
          <div className="text-lg font-bold text-white mb-1">
            {isAr ? "شكراً لتقييمك!" : "Thanks for your rating!"}
          </div>
          <div className="flex justify-center gap-1 mb-3">
            {stars.map((s) => (
              <span key={s} className={`text-2xl ${s <= saved.rating ? "opacity-100" : "opacity-20"}`}>⭐</span>
            ))}
          </div>
          {saved.comment && (
            <div className="rounded-xl border border-white/5 bg-black/30 p-3 text-sm text-white/70 max-w-sm mx-auto">
              "{saved.comment}"
            </div>
          )}
          <button
            onClick={() => { setSubmitted(false); setSaved(null); }}
            className="mt-4 text-xs text-orange-300 hover:text-orange-200"
          >
            {isAr ? "تعديل التقييم" : "Edit rating"}
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-2 mb-4">
            {stars.map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className={`text-3xl transition-transform hover:scale-125 ${s <= activeRating ? "opacity-100 scale-110" : "opacity-30"}`}
              >
                ⭐
              </button>
            ))}
          </div>
          <div className="text-center text-xs text-white/50 mb-4">
            {activeRating === 1 && (isAr ? "ضعيف" : "Poor")}
            {activeRating === 2 && (isAr ? "مقبول" : "Fair")}
            {activeRating === 3 && (isAr ? "جيد" : "Good")}
            {activeRating === 4 && (isAr ? "ممتاز" : "Excellent")}
            {activeRating === 5 && (isAr ? "🏆 أسطوري!" : "🏆 Legendary!")}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={isAr ? "اكتب تعليقك هنا... (اختياري)" : "Write your comment... (optional)"}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white placeholder-white/30 resize-none h-20 focus:border-orange-400/50 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="btn-primary mt-3 w-full rounded-xl px-5 py-3 text-sm disabled:opacity-40"
          >
            {isAr ? "إرسال التقييم" : "Submit Rating"}
          </button>
        </>
      )}
    </div>
  );
}

// ============ SHARE BUTTON ============
export function ShareButton({ sens, deviceName, weaponName }: { sens: Sens; deviceName: string; weaponName: string }) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [shared, setShared] = useState(false);

  const buildShareText = useCallback(() => {
    return [
      isAr ? "🎯 حساسيتي من ALYAZOURI 2026" : "🎯 My Sensitivity from ALYAZOURI 2026",
      `📱 ${deviceName} · 🔫 ${weaponName}`,
      ``,
      `📷 Camera: TPP ${sens.cam.tpp}% | FPP ${sens.cam.fpp}%`,
      `🎯 ADS: TPP ${sens.ads.tpp}% | FPP ${sens.ads.fpp}%`,
      `Red Dot: ${sens.cam.red}% | ×4: ${sens.cam.scope4}%`,
      `🏆 AI Score: ${sens.aiScore}/100`,
      ``,
      `🔗 alyazouri.com`,
    ].join("\n");
  }, [sens, deviceName, weaponName, isAr]);

  const handleShare = async () => {
    const text = buildShareText();
    try {
      if (navigator.share) {
        await navigator.share({ title: "ALYAZOURI Sensitivity", text });
        setShared(true);
      } else {
        await navigator.clipboard.writeText(text);
        setShared(true);
      }
      setTimeout(() => setShared(false), 3000);
    } catch { /* cancelled */ }
  };

  return (
    <button
      onClick={handleShare}
      className={`btn-ghost w-full rounded-xl px-5 py-3 text-sm transition-all ${shared ? "!border-emerald-400/50 !text-emerald-300" : ""}`}
    >
      {shared
        ? `✅ ${isAr ? "تمت المشاركة!" : "Shared!"}`
        : `📤 ${isAr ? "مشاركة الحساسية" : "Share Sensitivity"}`}
    </button>
  );
}

// ============ AI PREDICTIONS ============
export function AIPredictions({ deviceName, fingers, styleId, weaponName }: {
  deviceName: string; fingers: number; styleId: string; weaponName: string;
}) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const tips = [];

  // Device-based tips
  if (deviceName.includes("iPad") || deviceName.includes("Tab")) {
    tips.push({
      icon: "📱",
      text: isAr ? "شاشتك كبيرة — استفد من الأصابع الإضافية لتحكم أدق" : "Large screen detected — use more fingers for better control",
    });
  }

  // Finger-based
  if (fingers <= 2) {
    tips.push({
      icon: "🖐️",
      text: isAr ? "ننصحك بالانتقال لـ 3-4 أصابع لتحسين الأداء بشكل كبير" : "Consider upgrading to 3-4 fingers for major improvement",
    });
  }
  if (fingers >= 5) {
    tips.push({
      icon: "⚡",
      text: isAr ? "أنت لاعب محترف! ركّز على ضبط Peek و Scope لأقصى سرعة" : "Pro player! Focus on peek & scope for maximum speed",
    });
  }

  // Style-based
  if (styleId === "headshot") {
    tips.push({
      icon: "🎯",
      text: isAr ? "لأسلوب الهيدشوت: فعّل الجايرو Always On وتدرّب على السحب للأسفل" : "For headshot style: enable Always On gyro and practice pull-down",
    });
  }
  if (styleId === "spray") {
    tips.push({
      icon: "🔫",
      text: isAr ? "لأسلوب السبراي: تدرّب على التحكم بالارتداد الأفقي مع الجايرو" : "For spray: practice horizontal recoil with gyro control",
    });
  }
  if (styleId === "conqueror") {
    tips.push({
      icon: "👑",
      text: isAr ? "لوصول الكونكر: اثبت على هذه الحساسية أسبوعين كاملين قبل التغيير" : "For Conqueror: stick with this sensitivity for 2 weeks before changing",
    });
  }
  if (styleId === "close") {
    tips.push({
      icon: "⚡",
      text: isAr ? "للقتال القريب: TPP/FPP عالية ضرورية — تدرّب على لفة 180° سريعة" : "For CQC: high TPP/FPP is essential — practice fast 180° turns",
    });
  }

  // Weapon-based
  if (weaponName === "AKM" || weaponName === "M762") {
    tips.push({
      icon: "💪",
      text: isAr ? `${weaponName} ارتداده قوي — فعّل الجايرو على السكوب وتدرّب على السحب` : `${weaponName} has high recoil — enable scope gyro and practice pull-down`,
    });
  }
  if (weaponName === "AWM" || weaponName === "M24" || weaponName === "Kar98k") {
    tips.push({
      icon: "🏹",
      text: isAr ? `${weaponName}: ركّز على حساسية ×6 و ×8 — لا تحتاج جايرو عالي` : `${weaponName}: focus on ×6 and ×8 sensitivity — no need for high gyro`,
    });
  }

  // General
  tips.push({
    icon: "🧠",
    text: isAr ? "نصيحة ذهبية: العب TDM لمدة 30 دقيقة يومياً للتعود على الحساسية الجديدة" : "Pro tip: Play TDM 30 min daily to get used to new sensitivity",
  });

  return (
    <div className="card neon-box rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <h4 className="font-display text-sm font-bold tracking-widest text-white">
          {isAr ? "توقعات الذكاء الاصطناعي" : "AI Predictions"}
        </h4>
      </div>
      <div className="space-y-2">
        {tips.slice(0, 4).map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/30 p-3 transition-all hover:border-orange-400/30"
          >
            <span className="mt-0.5 text-lg">{tip.icon}</span>
            <span className="text-xs leading-relaxed text-white/70">{tip.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
