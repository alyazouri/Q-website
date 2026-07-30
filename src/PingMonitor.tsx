import { useEffect, useMemo, useState } from "react";
import { SERVERS } from "./data";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";

export function PingMonitor() {
  const { lang } = useLang();
  const [pings, setPings] = useState<Record<string, number>>({});
  const [jitter, setJitter] = useState<Record<string, number>>({});
  const [loss, setLoss] = useState<Record<string, number>>({});
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const best = useMemo(() => {
    const entries = Object.entries(pings);
    if (!entries.length) return null;
    return entries.reduce((a, b) => (b[1] < a[1] ? b : a));
  }, [pings]);

  const run = () => {
    setRunning(true); setDone(false);
    setPings({}); setJitter({}); setLoss({});
    SERVERS.forEach((s, i) => {
      setTimeout(() => {
        const variance = (Math.random() - 0.5) * 18;
        const p = Math.max(20, Math.round(s.ping + variance));
        const j = Math.round(2 + Math.random() * 10);
        const l = Math.round(Math.random() * (s.ping > 150 ? 4 : 1.5) * 10) / 10;
        setPings((prev) => ({ ...prev, [s.id]: p }));
        setJitter((prev) => ({ ...prev, [s.id]: j }));
        setLoss((prev) => ({ ...prev, [s.id]: l }));
        if (i === SERVERS.length - 1) {
          setTimeout(() => { setRunning(false); setDone(true); }, 300);
        }
      }, 250 * (i + 1));
    });
  };

  useEffect(() => { run(); /* eslint-disable-next-line */ }, []);

  const bestServer = best ? SERVERS.find((s) => s.id === best[0]) : null;

  return (
    <div className="card relative overflow-hidden rounded-2xl p-6">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-grid" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-display text-xs tracking-[0.3em] text-orange-400">{t("ping_live", lang)}</div>
            <h3 className="mt-1 text-xl font-bold text-white">{t("ping_live_title", lang)}</h3>
            <p className="mt-1 text-sm text-white/60">
              {t("ping_live_desc", lang)}
            </p>
          </div>
          <button onClick={run} disabled={running} className="btn-primary rounded-xl px-4 py-2.5 text-sm disabled:opacity-50">
            {running ? t("ping_btn_measuring", lang) : t("ping_btn_remeasure", lang)}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVERS.map((s) => {
            const p = pings[s.id];
            const j = jitter[s.id];
            const l = loss[s.id];
            const isBest = bestServer?.id === s.id && done;
            const quality = p == null ? "" : p < 60 ? t("ping_quality_excellent", lang) : p < 120 ? t("ping_quality_good", lang) : p < 200 ? t("ping_quality_medium", lang) : t("ping_quality_poor", lang);
            const color = p == null ? "bg-white/10" : p < 60 ? "bg-emerald-500" : p < 120 ? "bg-amber-400" : p < 200 ? "bg-orange-500" : "bg-red-500";
            return (
              <div
                key={s.id}
                className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
                  isBest
                    ? "border-orange-400/60 bg-gradient-to-br from-orange-500/10 to-red-500/10 shadow-[0_0_30px_-10px_rgba(255,122,0,0.6)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {isBest && (
                  <div className="absolute top-2 left-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white pulse-glow">
                    {t("ping_best", lang)}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{s.flag}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{s.name}</div>
                      <div className="text-[11px] text-white/50">{quality}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold text-white tabular-nums">
                      {p == null ? <span className="text-white/30">—</span> : p}
                    </div>
                    <div className="text-[10px] text-white/50">ms</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                  <div className="rounded bg-black/30 p-1.5 text-center">
                    <div className="text-white/40">{t("ping_ping", lang)}</div>
                    <div className="font-display text-white tabular-nums">{p ?? "—"}</div>
                  </div>
                  <div className="rounded bg-black/30 p-1.5 text-center">
                    <div className="text-white/40">{t("ping_jitter", lang)}</div>
                    <div className="font-display text-white tabular-nums">{j ?? "—"}</div>
                  </div>
                  <div className="rounded bg-black/30 p-1.5 text-center">
                    <div className="text-white/40">{t("ping_loss", lang)}</div>
                    <div className="font-display text-white tabular-nums">{l ?? "—"}%</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${color} ${running ? "animate-pulse" : ""}`} />
                  <div className="stat-bar flex-1 h-1.5">
                    <span style={{ width: p == null ? "0%" : `${Math.max(5, 100 - p / 3)}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
