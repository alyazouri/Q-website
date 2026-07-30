import { useRef, useState, useCallback } from "react";
import { useLang } from "./LanguageContext";

interface SwipeData {
  speed: number;      // px/ms
  distance: number;   // px
  time: number;       // ms
  recommended: number; // suggested sens %
}

export function TouchTest() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<SwipeData | null>(null);
  const [testing, setTesting] = useState(false);
  const [trail, setTrail] = useState<[number, number][]>([]);

  // Tracking refs
  const startPos = useRef<{ x: number; y: number; time: number } | null>(null);
  const pointsRef = useRef<[number, number][]>([]);

  const getPos = (e: React.TouchEvent | React.MouseEvent): { x: number; y: number } => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    if ("touches" in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    if ("clientX" in e) {
      return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
    }
    return { x: 0, y: 0 };
  };

  const handleStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const pos = getPos(e);
    startPos.current = { ...pos, time: Date.now() };
    pointsRef.current = [[pos.x, pos.y]];
    setTesting(true);
    setResult(null);
    setTrail([[pos.x, pos.y]]);
  }, []);

  const handleMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!startPos.current) return;
    e.preventDefault();
    const pos = getPos(e);
    pointsRef.current.push([pos.x, pos.y]);
    setTrail([...pointsRef.current]);
  }, []);

  const handleEnd = useCallback(() => {
    if (!startPos.current || pointsRef.current.length < 3) {
      startPos.current = null;
      setTesting(false);
      return;
    }

    const endTime = Date.now();
    const elapsed = endTime - startPos.current.time;
    const pts = pointsRef.current;
    const lastPt = pts[pts.length - 1];
    const dx = lastPt[0] - pts[0][0];
    const dy = lastPt[1] - pts[0][1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = distance / Math.max(elapsed, 1);

    // Recommend sens based on swipe speed
    // Fast swipe → player likes high sens
    // Slow swipe → player prefers low sens
    const recommended = Math.round(
      Math.max(30, Math.min(300,
        speed < 0.3 ? 60 :
        speed < 0.6 ? 90 :
        speed < 1.0 ? 120 :
        speed < 1.5 ? 160 :
        speed < 2.0 ? 200 :
        250
      ))
    );

    setResult({
      speed: Math.round(speed * 100) / 100,
      distance: Math.round(distance),
      time: elapsed,
      recommended,
    });

    startPos.current = null;
    setTesting(false);
  }, []);

  const speedLabel = !result ? "" :
    result.speed < 0.5 ? (isAr ? "بطيء — تحب الدقة" : "Slow — Precision player") :
    result.speed < 1.0 ? (isAr ? "متوسط — متوازن" : "Medium — Balanced") :
    result.speed < 1.5 ? (isAr ? "سريع — أسلوب عدواني" : "Fast — Aggressive") :
    (isAr ? "⚡ خاطف — لاعب محترف!" : "⚡ Lightning — Pro player!");

  const speedColor = !result ? "" :
    result.speed < 0.5 ? "text-sky-300" :
    result.speed < 1.0 ? "text-emerald-300" :
    result.speed < 1.5 ? "text-orange-300" :
    "text-red-300";

  return (
    <div className="card neon-box rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">👆</span>
        <h3 className="font-display text-sm font-bold tracking-widest text-white">
          {isAr ? "اختبار سرعة اللمس" : "Touch Speed Test"}
        </h3>
      </div>
      <p className="mb-4 text-xs text-white/60">
        {isAr
          ? "اسحب إصبعك بالسرعة التي تلعب بها — سنقترح لك حساسية مناسبة"
          : "Swipe at your gaming speed — we'll suggest the right sensitivity"}
      </p>

      {/* Test Area */}
      <div
        className={`relative h-44 overflow-hidden rounded-xl border-2 ${
          testing
            ? "border-orange-400/60 bg-gradient-to-br from-orange-500/10 to-red-500/10"
            : "border-white/10 bg-[#07090f]"
        } cursor-crosshair touch-none select-none`}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Draw trail */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 176" preserveAspectRatio="none">
          {trail.length > 1 && (
            <polyline
              points={trail.map(([x, y]) => `${x},${y}`).join(" ")}
              fill="none"
              stroke="rgba(255,122,0,0.8)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {trail.map(([x, y], i) => (
            <circle
              key={i}
              cx={x} cy={y} r={i === trail.length - 1 ? 5 : 2}
              fill={i === trail.length - 1 ? "#ff7a00" : `rgba(255,122,0,${0.3 + (i / trail.length) * 0.7})`}
            />
          ))}
        </svg>

        {/* Hint */}
        {!testing && trail.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl">👆</div>
              <div className="mt-2 text-xs text-white/50">
                {isAr ? "اسحب هنا" : "Swipe here"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-white/5 bg-black/30 p-2.5 text-center">
              <div className="text-[10px] text-white/40">{isAr ? "السرعة" : "Speed"}</div>
              <div className={`font-display text-lg font-bold tabular-nums ${speedColor}`}>{result.speed}</div>
              <div className="text-[9px] text-white/30">px/ms</div>
            </div>
            <div className="rounded-lg border border-white/5 bg-black/30 p-2.5 text-center">
              <div className="text-[10px] text-white/40">{isAr ? "المسافة" : "Distance"}</div>
              <div className="font-display text-lg font-bold text-white tabular-nums">{result.distance}</div>
              <div className="text-[9px] text-white/30">px</div>
            </div>
            <div className="rounded-lg border border-white/5 bg-black/30 p-2.5 text-center">
              <div className="text-[10px] text-white/40">{isAr ? "الوقت" : "Time"}</div>
              <div className="font-display text-lg font-bold text-white tabular-nums">{result.time}</div>
              <div className="text-[9px] text-white/30">ms</div>
            </div>
          </div>

          <div className="text-center text-xs font-semibold">
            <span className={speedColor}>{speedLabel}</span>
          </div>

          <div className="rounded-xl border border-orange-400/30 bg-gradient-to-br from-orange-500/10 to-red-500/5 p-4 text-center">
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              {isAr ? "الحساسية المقترحة" : "Recommended Sensitivity"}
            </div>
            <div className="mt-1 font-display text-3xl font-black text-orange-300 tabular-nums">
              {result.recommended}%
            </div>
            <div className="mt-1 text-[10px] text-white/40">
              {isAr ? "لـ TPP/FPP بدون سكوب" : "For TPP/FPP No Scope"}
            </div>
          </div>

          <button
            onClick={() => { setResult(null); setTrail([]); }}
            className="btn-ghost w-full rounded-xl px-4 py-2.5 text-xs"
          >
            🔄 {isAr ? "إعادة الاختبار" : "Test Again"}
          </button>
        </div>
      )}
    </div>
  );
}
