import { useLang } from "./LanguageContext";
import { t } from "./i18n";

export function Hero({ ping }: { ping: number | null }) {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-radial-spot" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-[420px] w-[420px] rounded-full bg-red-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
              {t("hero_badge", lang)}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              <span className="block text-white">{t("hero_title1", lang)}</span>
              <span className="mt-2 block font-display shimmer-text">{t("hero_title2", lang)}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg">
              {t("hero_desc", lang)} <b className="text-orange-300">{t("hero_devices", lang)}</b> {lang === "ar" ? "و" : lang === "es" ? "y" : lang === "ru" ? "и" : lang === "tr" ? "ve" : "and"} <b className="text-orange-300">{t("hero_weapons", lang)}</b>.
            </p>

            {/* Quick stats */}
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                { k: t("hero_stats_devices", lang), v: "77", sub: t("hero_devices_sub", lang) },
                { k: t("hero_stats_weapons", lang), v: "44", sub: t("hero_weapons_sub", lang) },
                { k: t("hero_stats_servers", lang), v: "7", sub: t("hero_servers_sub", lang) },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur">
                  <div className="font-display text-2xl font-black text-white sm:text-3xl">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-widest text-orange-300/80">{s.k}</div>
                  <div className="mt-1 text-[10px] text-white/50">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#generator" className="btn-primary rounded-xl px-6 py-3 text-sm">
                {t("hero_cta1", lang)}
              </a>
              <a href="#pac" className="btn-ghost rounded-xl px-6 py-3 text-sm">
                {t("hero_cta2", lang)}
              </a>
            </div>



            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/60">
              <a href="https://tiktok.com/@saeedalyazouri0" target="_blank" rel="noreferrer" className="hover:text-orange-300">
                <span className="text-white/40">{t("hero_tiktok", lang)}</span> <b>@saeedalyazouri0</b>
              </a>
              <a href="https://instagram.com/saeedjor11" target="_blank" rel="noreferrer" className="hover:text-orange-300">
                <span className="text-white/40">{t("hero_instagram", lang)}</span> <b>@saeedjor11</b>
              </a>
              <span>
                <span className="text-white/40">{t("hero_pubg_id", lang)}</span> <b className="font-display">5744469523</b>
              </span>
            </div>
          </div>

          {/* Right card */}
          <div className="relative">
            <div className="card relative overflow-hidden rounded-3xl p-6">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-[11px] tracking-[0.3em] text-orange-400">{t("hero_live_status", lang)}</div>
                    <div className="mt-1 text-lg font-bold text-white">{t("hero_network", lang)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-xs text-emerald-300">{t("hero_connected", lang)}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 to-red-500/5 p-6">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-white/60">{t("hero_nearest", lang)}</div>
                  <div className="mt-2 flex items-end gap-3">
                    <span className="font-display text-6xl font-black text-white tabular-nums">
                      {ping == null ? "—" : ping}
                    </span>
                    <span className="pb-2 font-display text-lg text-orange-300">ms</span>
                  </div>
                  <div className="mt-4 stat-bar h-2">
                    <span style={{ width: ping == null ? "0%" : `${Math.max(10, 100 - (ping || 0) / 2.5)}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-white/40">
                    <span>0 ms</span>
                    <span className={ping != null && ping < 60 ? "text-emerald-300" : "text-white/50"}>
                      {ping == null ? t("hero_measuring", lang) : ping < 60 ? t("hero_excellent", lang) : ping < 120 ? t("hero_good", lang) : t("hero_medium", lang)}
                    </span>
                    <span>250 ms</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg border border-white/5 bg-black/30 p-3">
                    <div className="text-white/40">{t("hero_recruitment", lang)}</div>
                    <div className="mt-1 font-display text-lg font-bold text-white">~3s</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-black/30 p-3">
                    <div className="text-white/40">{t("hero_geolocation", lang)}</div>
                    <div className="mt-1 font-display text-lg font-bold text-white">JO ✓</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-black/30 p-3">
                    <div className="text-white/40">{t("hero_isp", lang)}</div>
                    <div className="mt-1 font-display text-lg font-bold text-white">Auto</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="float absolute -top-4 -right-4 hidden rounded-2xl border border-orange-400/40 bg-[#0a0a14]/90 px-4 py-2 text-xs font-bold text-orange-300 shadow-xl backdrop-blur md:block">
              {t("hero_conqueror_build", lang)}
            </div>
            <div className="float absolute -bottom-4 -left-4 hidden rounded-2xl border border-emerald-400/30 bg-[#0a0a14]/90 px-4 py-2 text-xs font-bold text-emerald-300 shadow-xl backdrop-blur md:block" style={{ animationDelay: "1s" }}>
              {t("hero_fps_ready", lang)}
            </div>
          </div>
        </div>
      </div>

      <div className="divider mx-auto max-w-7xl" />
    </section>
  );
}
