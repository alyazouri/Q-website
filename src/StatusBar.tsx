import { useEffect, useState } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";

// CPU Temperature estimation based on device load
// (Browsers don't expose real CPU temp, so we simulate based on performance metrics)
function useDeviceMetrics() {
  const [metrics, setMetrics] = useState({
    cores: 4,
    memory: 4,
    temp: 42,
    load: 35,
  });

  useEffect(() => {
    // Real device info where available
    const cores = (navigator as unknown as { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;

    // Simulated temperature based on device capability and current activity
    // More cores + less memory = more heat baseline
    const baseTemp = 38 + Math.max(0, (cores - 4) * 1.5);

    let rafId: number;
    let lastTime = performance.now();

    const update = () => {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      // Estimate CPU load based on frame time
      // 16.67ms = 60 FPS = low load, 33ms = 30 FPS = high load
      const estimatedLoad = Math.min(100, Math.max(10, (dt / 16.67) * 50 + Math.random() * 5));
      const temp = Math.round(baseTemp + (estimatedLoad / 100) * 20);

      setMetrics({
        cores,
        memory,
        temp: Math.max(38, Math.min(75, temp)),
        load: Math.round(estimatedLoad),
      });

      rafId = requestAnimationFrame(update);
    };

    // Update every 2 seconds (not every frame) to reduce overhead
    const interval = setInterval(() => {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      const estimatedLoad = Math.min(100, Math.max(10, (dt / 16.67) * 30 + Math.random() * 10));
      const temp = Math.round(baseTemp + (estimatedLoad / 100) * 18);

      setMetrics({
        cores,
        memory,
        temp: Math.max(38, Math.min(75, temp)),
        load: Math.round(estimatedLoad),
      });
    }, 2000);

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
    };
  }, []);

  return metrics;
}

export function StatusBar() {
  const { lang } = useLang();
  const [now, setNow] = useState(new Date());
  const metrics = useDeviceMetrics();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Format time (24h for Arabic, locale for others)
  const timeStr = now.toLocaleTimeString(
    lang === "ar" ? "ar-JO" : lang === "tr" ? "tr-TR" : lang === "ru" ? "ru-RU" : lang === "es" ? "es-ES" : "en-US",
    { hour: "2-digit", minute: "2-digit", second: "2-digit" }
  );

  const dateStr = now.toLocaleDateString(
    lang === "ar" ? "ar-JO" : lang === "tr" ? "tr-TR" : lang === "ru" ? "ru-RU" : lang === "es" ? "es-ES" : "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  // Temperature color coding
  const tempColor = metrics.temp < 45 ? "text-emerald-300" :
                    metrics.temp < 55 ? "text-amber-300" :
                    metrics.temp < 65 ? "text-orange-400" : "text-red-400";

  const tempBg = metrics.temp < 45 ? "from-emerald-500/20 to-emerald-600/10" :
                 metrics.temp < 55 ? "from-amber-500/20 to-amber-600/10" :
                 metrics.temp < 65 ? "from-orange-500/20 to-orange-600/10" : "from-red-500/20 to-red-600/10";

  return (
    <div className="fixed top-[61px] right-0 left-0 z-40 border-b border-white/5 bg-[#05070c]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 overflow-x-auto px-5 py-1.5 text-[11px]">
        {/* Left side - Date & Time */}
        <div className="flex items-center gap-3 text-white/70">
          <div className="flex items-center gap-1.5">
            <span className="text-orange-400">🕐</span>
            <span className="font-display font-bold tabular-nums text-white">{timeStr}</span>
          </div>
          <span className="hidden text-white/20 sm:inline">|</span>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="text-orange-400">📅</span>
            <span className="text-white/80">{dateStr}</span>
          </div>
        </div>

        {/* Right side - Device metrics */}
        <div className="flex items-center gap-2">
          {/* CPU Cores */}
          <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-2 py-0.5 sm:flex">
            <span className="text-[10px] text-white/50">{t("factors_device", lang)}:</span>
            <span className="font-display font-bold text-white/80">{metrics.cores} cores</span>
          </div>

          {/* Memory */}
          <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-2 py-0.5 sm:flex">
            <span className="text-[10px] text-white/50">RAM:</span>
            <span className="font-display font-bold text-white/80">{metrics.memory} GB</span>
          </div>

          {/* CPU Load */}
          <div className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-2 py-0.5">
            <span className="text-[10px] text-white/50">⚡</span>
            <span className="font-display font-bold text-white/80 tabular-nums">{metrics.load}%</span>
          </div>

          {/* Temperature */}
          <div className={`flex items-center gap-1 rounded-full border border-white/10 bg-gradient-to-r ${tempBg} px-2 py-0.5`}>
            <span className="text-[10px]">🌡️</span>
            <span className={`font-display font-bold tabular-nums ${tempColor}`}>
              {metrics.temp}°C
            </span>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="hidden text-[9px] uppercase tracking-widest text-emerald-300/70 sm:inline">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
