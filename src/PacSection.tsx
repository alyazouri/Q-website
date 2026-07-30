import { useState } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";

const PAC_URL = "http://raw.githubusercontent.com/alyazouri/Website/refs/heads/main/pubg-jordan.pac";

export function PacSection() {
  const { lang } = useLang();
  const [enabled, setEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"android" | "ios" | "windows">("android");
  const [showRestart, setShowRestart] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(PAC_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setShowRestart(true), 600);
    } catch {
      // ignore
    }
  };

  const getSteps = (platform: "android" | "ios" | "windows"): string[] => {
    if (platform === "android") return [
      t("pac_step_android_1", lang),
      t("pac_step_android_2", lang),
      t("pac_step_android_3", lang),
      t("pac_step_android_4", lang),
    ];
    if (platform === "ios") return [
      t("pac_step_ios_1", lang),
      t("pac_step_ios_2", lang),
      t("pac_step_ios_3", lang),
      t("pac_step_ios_4", lang),
    ];
    return [
      t("pac_step_windows_1", lang),
      t("pac_step_windows_2", lang),
      t("pac_step_windows_3", lang),
    ];
  };

  const platformInfo = {
    android: { title: "Android", icon: "🤖" },
    ios: { title: "iOS", icon: "🍎" },
    windows: { title: "Windows", icon: "🪟" },
  };

  const currentPlatform = platformInfo[activeTab];
  const currentSteps = getSteps(activeTab);

  return (
    <div className="card relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-display text-xs tracking-[0.3em] text-orange-400">{t("pac_eyebrow", lang)}</div>
            <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">{t("pac_title", lang)}</h3>
            <p className="mt-1 max-w-2xl text-sm text-white/60">
              {t("pac_sub", lang)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-white/50">{t("pac_status", lang)}</div>
              <div className={`font-display text-sm font-bold ${enabled ? "text-emerald-400" : "text-white/40"}`}>
                {enabled ? t("pac_enabled", lang) : t("pac_disabled", lang)}
              </div>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative h-14 w-28 rounded-full border-2 transition-all duration-300 ${
                enabled
                  ? "border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_-5px_rgba(52,211,153,0.6)]"
                  : "border-white/15 bg-black/40"
              }`}
              aria-label="Toggle Jordan Server"
            >
              <div
                className={`absolute top-1 h-10 w-10 rounded-full transition-all duration-300 ${
                  enabled ? "bg-gradient-to-br from-emerald-400 to-teal-500" : "bg-white/30"
                }`}
                style={{
                  right: enabled ? "0.25rem" : "calc(100% - 2.75rem)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-around px-3">
                <span className={`font-display text-[10px] font-bold tracking-widest ${enabled ? "text-emerald-300" : "text-white/40"}`}>
                  {t("pac_toggle_on", lang)}
                </span>
                <span className={`font-display text-[10px] font-bold tracking-widest ${enabled ? "text-white/30" : "text-white/60"}`}>
                  {t("pac_toggle_off", lang)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* When enabled — show link + instructions */}
        {enabled ? (
          <div className="mt-6 space-y-5">
            {/* Link box */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-5">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-emerald-500/20 px-3 py-1 font-display text-[10px] font-bold tracking-widest text-emerald-300">
                {t("pac_ready", lang)}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/60">{t("pac_link_label", lang)}</div>
              <div
                dir="ltr"
                className="mt-2 select-all break-all rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-xs text-orange-200"
              >
                {PAC_URL}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={copyLink} className="btn-primary rounded-xl px-5 py-2.5 text-sm">
                  {copied ? t("pac_copied", lang) : t("pac_copy", lang)}
                </button>
                <a
                  href={PAC_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost rounded-xl px-5 py-2.5 text-sm"
                >
                  {t("pac_open", lang)}
                </a>
              </div>
            </div>

            {/* Platform tabs */}
            <div>
              <div className="mb-3 flex gap-2">
                {(Object.keys(platformInfo) as ("android" | "ios" | "windows")[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setActiveTab(k)}
                    className={`chip flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
                      activeTab === k ? "active" : ""
                    }`}
                  >
                    <span className="text-lg">{platformInfo[k].icon}</span>
                    {platformInfo[k].title}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{currentPlatform.icon}</span>
                  <div>
                    <div className="text-lg font-bold text-white">{t("pac_install_title", lang)}{currentPlatform.title}</div>
                    <div className="text-[11px] text-white/50">{t("pac_install_sub", lang)}</div>
                  </div>
                </div>
                <ol className="space-y-3">
                  {currentSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/30 p-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 font-display text-xs font-black text-white">
                        {i + 1}
                      </span>
                      <span dir="auto" className="pt-0.5 text-sm text-white/80">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 space-y-2">
                  <div className="rounded-xl border border-orange-400/20 bg-orange-500/5 p-3 text-[11px] text-orange-200/80">
                    {t("pac_tip", lang)}
                  </div>
                  <div className="rounded-xl border border-red-400/30 bg-gradient-to-r from-red-500/10 to-orange-500/10 p-3 text-[11px] text-red-200">
                    {t("pac_restart_warn", lang)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-white/5 bg-black/30 p-8 text-center">
            <div className="text-5xl">📡</div>
            <div className="mt-3 font-display text-lg font-bold text-white">{t("pac_disabled_title", lang)}</div>
            <div className="mt-1 text-sm text-white/50">
              {t("pac_disabled_msg", lang)}
            </div>
            <button
              onClick={() => setEnabled(true)}
              className="btn-primary mt-5 rounded-xl px-6 py-3 text-sm"
            >
              {t("pac_enable_btn", lang)}
            </button>
          </div>
        )}

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: t("pac_location", lang), v: "🇯🇴 Jordan" },
            { k: t("pac_protocol", lang), v: "PAC Script" },
            { k: t("pac_coverage", lang), v: "Zain · Orange · Umniah" },
            { k: t("pac_servers", lang), v: "AWS ME · Tencent" },
          ].map((f) => (
            <div key={f.k} className="rounded-xl border border-white/5 bg-black/30 p-3">
              <div className="text-[10px] uppercase tracking-widest text-white/40">{f.k}</div>
              <div className="mt-1 text-sm font-bold text-white">{f.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Restart Modal */}
      {showRestart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowRestart(false)}
        >
          <div
            className="card relative max-w-md w-full rounded-3xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRestart(false)}
              className="absolute top-4 left-4 text-white/50 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/30">
                <span className="text-4xl">🔄</span>
              </div>
              <h3 className="mt-4 text-xl font-black text-white">{t("restart_title", lang)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t("restart_msg", lang)}
              </p>
              <div className="mt-5 grid gap-2 text-right text-xs text-white/60">
                <div className="flex items-start gap-2 rounded-lg bg-black/30 p-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>{t("restart_step1", lang)}</span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-black/30 p-2.5">
                  <span className="text-amber-400">→</span>
                  <span>{t("restart_step2", lang)}</span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-black/30 p-2.5">
                  <span className="text-red-400">!</span>
                  <span>{t("restart_step3", lang)}</span>
                </div>
              </div>
              <button
                onClick={() => setShowRestart(false)}
                className="btn-primary mt-6 w-full rounded-xl px-6 py-3 text-sm"
              >
                {t("restart_confirm", lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
