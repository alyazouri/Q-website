import { useEffect, useMemo, useState } from "react";
import { BRANDS, WEAPONS, STYLES, FINGERS } from "./data";
import { computeSensitivity, SensitivityTable, FactorsPanel, CopyButton, type Sens, type SensParams } from "./sensitivity";
import { PingMonitor } from "./PingMonitor";
import { PacSection } from "./PacSection";
import { HudPreview } from "./HudPreview";
import { Hero } from "./Hero";
import { StatusBar } from "./StatusBar";
import { Particles } from "./Particles";
import { RevealSection, RatingSection, ShareButton, AIPredictions, NightModeToggle } from "./Features";
import { TouchTest } from "./TouchTest";
import { QuickSearch } from "./QuickSearch";
import { PWABanner } from "./PWABanner";
import { ScreenRecorder } from "./ScreenRecorder";
import { DPICalculator } from "./DPICalculator";
import { MusicPlayer } from "./MusicPlayer";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

type SavedProfile = {
  id: string;
  name: string;
  params: SensParams;
  savedAt: number;
};

const LS_KEY = "alyazouri_profiles_v1";

function loadProfiles(): SavedProfile[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SavedProfile[]) : [];
  } catch {
    return [];
  }
}

function saveProfiles(list: SavedProfile[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, 5)));
}

export default function App() {
  const { lang } = useLang();
  const [brandId, setBrandId] = useState(BRANDS[0].id);
  const [deviceIdx, setDeviceIdx] = useState(0);
  const [fingers, setFingers] = useState(4);
  const [styleId, setStyleId] = useState("headshot");
  const [weaponCatId, setWeaponCatId] = useState(WEAPONS[0].id);
  const [weaponIdx, setWeaponIdx] = useState(0);
  const [gyroMode, setGyroMode] = useState<"off" | "scope" | "always">("always");

  const [heroPing, setHeroPing] = useState<number | null>(null);

  const [profiles, setProfiles] = useState<SavedProfile[]>([]);

  useEffect(() => {
    setProfiles(loadProfiles());
    // Simulate initial ping for hero
    const t = setTimeout(() => setHeroPing(35 + Math.round(Math.random() * 8)), 800);
    return () => clearTimeout(t);
  }, []);

  const brand = BRANDS.find((b) => b.id === brandId)!;
  const device = brand.devices[deviceIdx] ?? brand.devices[0];
  const weaponCat = WEAPONS.find((c) => c.id === weaponCatId)!;
  const weapon = weaponCat.weapons[weaponIdx] ?? weaponCat.weapons[0];

  // Reset indices when changing brand / category
  useEffect(() => setDeviceIdx(0), [brandId]);
  useEffect(() => setWeaponIdx(0), [weaponCatId]);

  const params: SensParams = useMemo(
    () => ({
      deviceId: `${brandId}-${deviceIdx}`,
      device,
      brandId,
      fingers,
      styleId,
      gyroMode,
      weaponId: `${weaponCatId}-${weaponIdx}`,
      weaponName: weapon.name,
      weaponRecoil: weapon.recoil,
      weaponRange: weapon.range,
      weaponType: weapon.type,
    }),
    [brandId, deviceIdx, device, fingers, styleId, weaponCatId, weaponIdx, weapon]
  );

  const sens: Sens = useMemo(() => computeSensitivity(params), [params]);

  const saveCurrent = () => {
    const name = `${device.name} · ${weapon.name} · ${fingers}f`;
    const list: SavedProfile[] = [
      { id: `${Date.now()}`, name, params, savedAt: Date.now() },
      ...profiles,
    ].slice(0, 5);
    setProfiles(list);
    saveProfiles(list);
  };

  const removeProfile = (id: string) => {
    const list = profiles.filter((p) => p.id !== id);
    setProfiles(list);
    saveProfiles(list);
  };

  const loadProfile = (p: SavedProfile) => {
    setBrandId(p.params.brandId);
    setFingers(p.params.fingers);
    setStyleId(p.params.styleId);
    setGyroMode(p.params.gyroMode);
    setWeaponCatId(p.params.weaponId.split("-")[0]);
    setTimeout(() => {
      const brand = BRANDS.find((b) => b.id === p.params.brandId);
      if (brand) {
        const idx = brand.devices.findIndex((dv) => dv.name === p.params.device.name);
        setDeviceIdx(idx >= 0 ? idx : 0);
      }
      const cat = WEAPONS.find((c) => c.id === p.params.weaponId.split("-")[0]);
      if (cat) {
        const wIdx = cat.weapons.findIndex((w) => w.name === p.params.weaponName);
        setWeaponIdx(wIdx >= 0 ? wIdx : 0);
      }
    }, 0);
  };

  return (
    <div className="relative min-h-screen bg-[#05070c] text-white">
      <Particles />
      {/* Fixed Navbar */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#05070c]/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
              <span className="font-display text-lg font-black text-white">A</span>
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#05070c]" />
            </div>
            <div>
              <div className="font-display text-sm font-black tracking-widest text-white">ALYAZOURI</div>
              <div className="text-[10px] text-white/50">Jordan Optimizer · 2026</div>
            </div>
          </a>
          <div className="hidden items-center gap-1 text-sm md:flex">
            <a href="#generator" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_generator", lang)}
            </a>
            <a href="#ping" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_ping", lang)}
            </a>
            <a href="#weapons" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_weapons", lang)}
            </a>
            <a href="#pac" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_pac", lang)}
            </a>
            <a href="#about" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_about", lang)}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MusicPlayer />
            <QuickSearch
              onSelectDevice={(bId, dIdx) => { setBrandId(bId); setTimeout(() => setDeviceIdx(dIdx), 0); }}
              onSelectWeapon={(cId, wIdx) => { setWeaponCatId(cId); setTimeout(() => setWeaponIdx(wIdx), 0); }}
            />
            <NightModeToggle />
            <LanguageSwitcher />
            <a
              href="#generator"
              className="btn-primary hidden rounded-lg px-4 py-2 text-xs sm:inline-block"
            >
              {t("nav_cta", lang)}
            </a>
          </div>
        </div>
      </nav>

      <StatusBar />
      <div className="pt-8">
        <Hero ping={heroPing} />
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 pb-24">
        {/* Generator */}
        <section id="generator" className="mt-12 scroll-mt-20">
          <SectionHeader
            eyebrow={t("sec_generator_eyebrow", lang)}
            title={t("sec_generator_title", lang)}
            subtitle={t("sec_generator_sub", lang)}
          />

          <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            {/* Controls */}
            <div className="space-y-5">
              {/* Device */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <h3 className="font-display text-sm font-bold tracking-widest text-white">{t("device_select", lang)}</h3>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {BRANDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBrandId(b.id)}
                      className={`chip rounded-full px-3 py-1.5 text-xs font-semibold ${brandId === b.id ? "active" : ""}`}
                    >
                      <span className="ml-1">{b.icon}</span>
                      {b.name}
                    </button>
                  ))}
                </div>
                <div className="grid max-h-40 grid-cols-1 gap-1.5 overflow-y-auto sm:grid-cols-2">
                  {brand.devices.map((d, i) => (
                    <button
                      key={d.name}
                      onClick={() => setDeviceIdx(i)}
                      className={`chip flex flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-right text-xs ${deviceIdx === i ? "active" : ""}`}
                    >
                      <span className="font-semibold">{d.name}</span>
                      <span className="text-[10px] text-white/40">
                        {d.fps} FPS · {d.touchRate}Hz · {d.screenSize}"
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-lg border border-white/5 bg-black/30 p-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                  <span className="text-white/50">{t("device_selected", lang)}</span>
                  <b className="text-orange-300">{device.name}</b>
                </div>
                    <div className="flex gap-2 text-[10px] text-white/60">
                      <span className="rounded bg-black/40 px-2 py-0.5 font-display">{device.fps} FPS</span>
                      <span className="rounded bg-black/40 px-2 py-0.5 font-display">{device.touchRate} Hz</span>
                      <span className="rounded bg-black/40 px-2 py-0.5 font-display">{device.screenSize}"</span>
                      <span className={`rounded px-2 py-0.5 font-display ${
                        device.gyroQuality === "excellent" ? "bg-emerald-500/20 text-emerald-300" :
                        device.gyroQuality === "good" ? "bg-amber-500/20 text-amber-300" :
                        "bg-red-500/20 text-red-300"
                      }`}>
                        {device.gyroQuality === "excellent" ? t("device_gyro_excellent", lang) : device.gyroQuality === "good" ? t("device_gyro_good", lang) : t("device_gyro_average", lang)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gyro Mode */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold tracking-widest text-white">{t("gyro_title", lang)}</h3>
                  <span className="rounded-full bg-orange-500/15 px-2.5 py-0.5 text-[10px] font-bold text-orange-300">
                    {gyroMode === "off" ? t("gyro_status_off", lang) : gyroMode === "scope" ? t("gyro_status_scope", lang) : t("gyro_status_always", lang)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "off", icon: "⭕", label: t("gyro_off", lang), desc: t("gyro_off_desc", lang) },
                    { id: "scope", icon: "🎯", label: t("gyro_scope", lang), desc: t("gyro_scope_desc", lang) },
                    { id: "always", icon: "🔄", label: t("gyro_always", lang), desc: t("gyro_always_desc", lang) },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setGyroMode(m.id)}
                      className={`chip rounded-xl px-3 py-3 text-center ${gyroMode === m.id ? "active" : ""}`}
                    >
                      <div className="text-xl">{m.icon}</div>
                      <div className="mt-1 text-xs font-bold">{m.label}</div>
                      <div className="text-[10px] text-white/50">{m.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-lg border border-white/5 bg-black/30 p-3 text-[11px] leading-relaxed text-white/60">
                  {gyroMode === "off" && t("gyro_msg_off", lang)}
                  {gyroMode === "scope" && t("gyro_msg_scope", lang)}
                  {gyroMode === "always" && t("gyro_msg_always", lang)}
                </div>
              </div>

              {/* Fingers + Style */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="card rounded-2xl p-5">
                  <h3 className="mb-3 font-display text-sm font-bold tracking-widest text-white">{t("fingers_title", lang)}</h3>
                  <div className="flex flex-wrap gap-2">
                    {FINGERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFingers(f)}
                        className={`chip flex-1 rounded-lg px-3 py-2 text-sm font-bold ${fingers === f ? "active" : ""}`}
                      >
                        {f} {t("fingers_suffix", lang)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="card rounded-2xl p-5">
                  <h3 className="mb-3 font-display text-sm font-bold tracking-widest text-white">{t("style_title", lang)}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {STYLES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyleId(s.id)}
                        className={`chip rounded-lg px-2 py-2 text-xs font-semibold ${styleId === s.id ? "active" : ""}`}
                      >
                        <div className="text-base">{s.icon}</div>
                        {t(`style_${s.id}` as Parameters<typeof t>[0], lang)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weapon */}
              <div className="card rounded-2xl p-5">
                <h3 className="mb-3 font-display text-sm font-bold tracking-widest text-white">{t("weapon_title", lang)}</h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {WEAPONS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setWeaponCatId(c.id)}
                      className={`chip rounded-full px-3 py-1.5 text-xs font-semibold ${weaponCatId === c.id ? "active" : ""}`}
                    >
                      <span className="ml-1">{c.icon}</span>
                      {c.name}
                    </button>
                  ))}
                </div>
                <div className="grid max-h-40 grid-cols-2 gap-1.5 overflow-y-auto sm:grid-cols-3">
                  {weaponCat.weapons.map((w, i) => (
                    <button
                      key={w.name}
                      onClick={() => setWeaponIdx(i)}
                      className={`chip rounded-lg px-3 py-2 text-right text-xs font-semibold ${weaponIdx === i ? "active" : ""}`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-white/5 bg-black/30 p-2.5">
                    <div className="text-white/40">{t("weapon_recoil", lang)}</div>
                    <div className="stat-bar mt-1.5 h-1.5"><span style={{ width: `${weapon.recoil}%` }} /></div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-black/30 p-2.5">
                    <div className="text-white/40">{t("weapon_range", lang)}</div>
                    <div className="stat-bar mt-1.5 h-1.5"><span style={{ width: `${weapon.range}%` }} /></div>
                  </div>
                </div>
              </div>

              <CopyButton sens={sens} lang={lang} />
              <ShareButton sens={sens} deviceName={device.name} weaponName={weapon.name} />
              <button onClick={saveCurrent} className="btn-ghost w-full rounded-xl px-5 py-3 text-sm">
                {t("save_btn", lang)}
              </button>
            </div>

            {/* Output */}
            <div className="space-y-5">
              {/* AI Score */}
              <div className="card relative overflow-hidden rounded-2xl p-5">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="font-display text-[11px] tracking-[0.3em] text-orange-400">{t("ai_score_label", lang)}</div>
                    <div className="mt-1 text-xl font-bold text-white">{t("ai_score_title", lang)}</div>
                    <div className="mt-1 text-xs text-white/50">
                      {device.name} · {weapon.name} · {fingers} {t("ai_suffix", lang)}
                    </div>
                  </div>
                  <div className="relative h-28 w-28">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                      <circle
                        cx="50" cy="50" r="42"
                        stroke="url(#grad)" strokeWidth="8" fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(sens.aiScore / 100) * 264} 264`}
                      />
                      <defs>
                        <linearGradient id="grad" x1="0" x2="1">
                          <stop offset="0%" stopColor="#ff7a00" />
                          <stop offset="100%" stopColor="#ffd166" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="font-display text-3xl font-black text-white tabular-nums">{sens.aiScore}</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/50">AI SCORE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factors */}
              <FactorsPanel sens={sens} />

              {/* Sensitivity tables */}
              <div className="grid gap-4 sm:grid-cols-2">
                <SensitivityTable label={t("sens_camera", lang)} data={sens.cam} color="orange" />
                <SensitivityTable label={t("sens_ads", lang)} data={sens.ads} color="orange" />
                {gyroMode === "off" ? (
                  <div className="card flex flex-col items-center justify-center rounded-2xl p-8 text-center sm:col-span-2">
                    <div className="text-4xl">⭕</div>
                    <div className="mt-2 font-display text-sm font-bold text-white">{t("gyro_disabled_title", lang)}</div>
                    <div className="mt-1 text-xs text-white/50">
                      {t("gyro_disabled_msg", lang)}
                    </div>
                  </div>
                ) : (
                  <>
                    <SensitivityTable label={t("sens_gyro_cam", lang)} data={sens.gyroCam} color="sky" showTppFpp={gyroMode === "always"} />
                    <SensitivityTable label={t("sens_gyro_ads", lang)} data={sens.gyroAds} color="sky" showTppFpp={gyroMode === "always"} />
                  </>
                )}
              </div>

              {/* Free Look */}
              <div className="card rounded-2xl p-5">
                <h4 className="mb-3 font-display text-sm font-bold tracking-widest text-white/90">{t("sens_freelook", lang)}</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {Object.entries(sens.freeLook).map(([k, v]) => {
                    const labelKey = k === "cam" ? "sens_freelook_cam" : k === "parashoot" ? "sens_freelook_para" : "sens_freelook_vehicle";
                    return (
                      <div key={k} className="rounded-xl border border-white/5 bg-black/30 p-3">
                        <div className="text-[10px] uppercase tracking-widest text-white/40">{t(labelKey as Parameters<typeof t>[0], lang)}</div>
                        <div className="mt-1 font-display text-2xl font-black text-orange-300 tabular-nums">{v}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Predictions */}
              <AIPredictions deviceName={device.name} fingers={fingers} styleId={styleId} weaponName={weapon.name} />

              {/* Touch Speed Test */}
              <TouchTest />

              {/* DPI Calculator */}
              <DPICalculator />

              {/* Screen Recorder */}
              <ScreenRecorder />

              {/* HUD + Stability Analysis */}
              <div className="grid gap-4 lg:grid-cols-2">
                <HudPreview fingers={fingers} style={styleId} />
                <div className="card rounded-2xl p-5">
                  <h4 className="mb-3 font-display text-sm font-bold tracking-widest text-white/90">
                    {t("stability_title", lang)}
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: t("stability_device", lang), value: (sens.factors.deviceFactor * 100).toFixed(0), color: "from-orange-500 to-red-500" },
                      { label: t("stability_weapon", lang), value: (sens.factors.weaponFactor * 100).toFixed(0), color: "from-amber-500 to-orange-500" },
                      { label: t("stability_fingers", lang), value: (sens.factors.fingerFactor * 100).toFixed(0), color: "from-emerald-500 to-teal-500" },
                      { label: t("stability_style", lang), value: (sens.factors.styleFactor * 100).toFixed(0), color: "from-sky-500 to-indigo-500" },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/70">{item.label}</span>
                          <span className="font-display font-bold text-white tabular-nums">{item.value}%</span>
                        </div>
                        <div className="stat-bar h-2">
                          <span className={`bg-gradient-to-r ${item.color}`} style={{ width: `${Math.min(100, parseFloat(item.value))}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-orange-400/20 bg-orange-500/5 p-3 text-[11px] leading-relaxed text-orange-200/80">
                    {t("stability_equation", lang)}<br />
                    {t("stability_desc", lang)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ping */}
        <section id="ping" className="mt-20 scroll-mt-20">
          <SectionHeader
            eyebrow={t("ping_eyebrow", lang)}
            title={t("ping_title", lang)}
            subtitle={t("ping_sub", lang)}
          />
          <PingMonitor />
        </section>

        {/* Weapons database */}
        <section id="weapons" className="mt-20 scroll-mt-20">
          <SectionHeader
            eyebrow={t("weapons_eyebrow", lang)}
            title={t("weapons_title", lang)}
            subtitle={t("weapons_sub", lang)}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WEAPONS.map((c) => (
              <div key={c.id} className="card rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.icon}</span>
                    <h4 className="font-display text-sm font-bold tracking-widest text-white">{c.name}</h4>
                  </div>
                  <span className="rounded-full bg-orange-500/15 px-2.5 py-0.5 text-[10px] font-bold text-orange-300">
                    {c.weapons.length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {c.weapons.map((w) => (
                    <div
                      key={w.name}
                      className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2 text-xs"
                    >
                      <span className="font-semibold text-white">{w.name}</span>
                      <div className="flex items-center gap-3 text-white/50">
                        <span>🔥 {w.recoil}</span>
                        <span>🎯 {w.range}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Equations */}
        <section className="mt-20">
          <SectionHeader
            eyebrow={t("eq_eyebrow", lang)}
            title={t("eq_title", lang)}
            subtitle={t("eq_sub", lang)}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { k: "R_s", label: t("eq_rs", lang), eq: "(FPS × TSR × G_s) / (H_d × R_c)" },
              { k: "G_y", label: t("eq_gy", lang), eq: "(T_s × FPS) / (L_d + H_t)" },
              { k: "H_d", label: t("eq_hd", lang), eq: "(T_r × FPS) / D_l" },
            ].map((e) => (
              <div key={e.k} className="card rounded-2xl p-5">
                <div className="font-display text-2xl font-black text-orange-300">{e.k}</div>
                <div className="mt-1 text-sm text-white/70">{e.label}</div>
                <div
                  dir="ltr"
                  className="mt-3 rounded-lg border border-white/5 bg-black/40 p-3 text-center font-mono text-sm text-orange-100"
                >
                  {e.eq}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saved */}
        <section className="mt-20">
          <SectionHeader
            eyebrow={t("saved_eyebrow", lang)}
            title={t("saved_title", lang)}
            subtitle={t("saved_sub", lang)}
          />
          <div className="card rounded-2xl p-5">
            {profiles.length === 0 ? (
              <div className="py-10 text-center text-white/50">
                <div className="text-4xl">🗂️</div>
                <p className="mt-3 text-sm">{t("saved_empty", lang)}</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((p) => (
                  <div key={p.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-display text-sm font-bold text-white">{p.name}</div>
                        <div className="mt-0.5 text-[11px] text-white/50">
                          {new Date(p.savedAt).toLocaleString("ar-JO")}
                        </div>
                      </div>
                      <button
                        onClick={() => removeProfile(p.id)}
                        className="text-white/40 hover:text-red-400"
                        aria-label="delete"
                      >
                        ✕
                      </button>
                    </div>
                    <button
                      onClick={() => loadProfile(p)}
                      className="mt-3 w-full rounded-lg bg-orange-500/10 px-3 py-2 text-xs font-bold text-orange-300 hover:bg-orange-500/20"
                    >
                      {t("saved_restore", lang)}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PAC */}
        <section id="pac" className="mt-20 scroll-mt-20">
          <SectionHeader
            eyebrow={t("pac_eyebrow", lang)}
            title={t("pac_title", lang)}
            subtitle={t("pac_sub", lang)}
          />
          <PacSection />
        </section>

        {/* Rating */}
        <RevealSection className="mt-20">
          <RatingSection />
        </RevealSection>

        {/* About / Footer */}
        <section id="about" className="mt-20 scroll-mt-20">
          <div className="card rounded-3xl p-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                    <span className="font-display text-xl font-black text-white">A</span>
                  </div>
                  <div>
                    <div className="font-display text-lg font-black text-white">ALYAZOURI</div>
                    <div className="text-[11px] text-white/50">Jordan Gaming Optimizer 2026</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/60">
                  {t("footer_about", lang)}
                </p>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold tracking-widest text-orange-300">{t("footer_contact", lang)}</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><a href="https://tiktok.com/@saeedalyazouri0" target="_blank" rel="noreferrer" className="text-white/70 hover:text-orange-300">🎵 TikTok: @saeedalyazouri0</a></li>
                  <li><a href="https://instagram.com/saeedjor11" target="_blank" rel="noreferrer" className="text-white/70 hover:text-orange-300">📸 Instagram: @saeedjor11</a></li>
                  <li><span className="text-white/70">🎮 PUBG ID: </span><span className="font-display text-orange-300">5744469523</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold tracking-widest text-orange-300">{t("footer_features", lang)}</h4>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>{t("footer_f1", lang)}</li>
                  <li>{t("footer_f2", lang)}</li>
                  <li>{t("footer_f3", lang)}</li>
                  <li>{t("footer_f4", lang)}</li>
                  <li>{t("footer_f5", lang)}</li>
                </ul>
              </div>
            </div>
            <div className="divider my-6" />
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
              <span>{t("footer_rights", lang)}</span>
              <span className="font-display tracking-widest">{t("footer_tagline", lang)}</span>
            </div>
          </div>
        </section>
      </main>
      <PWABanner />
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="font-display text-xs tracking-[0.3em] text-orange-400">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-white/60">{subtitle}</p>
    </div>
  );
}
