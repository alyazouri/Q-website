import { useMemo } from "react";
import { useLang } from "./LanguageContext";
import { t } from "./i18n";

type HudProps = {
  fingers: number;
  style: string;
};

type Btn = { id: string; label: string; x: number; y: number; w: number; h: number; color: string; finger?: string };

export function HudPreview({ fingers, style }: HudProps) {
  const { lang } = useLang();

  const buttons = useMemo<Btn[]>(() => {
    const base: Btn[] = [
      { id: "joystick", label: "", x: 8, y: 58, w: 22, h: 38, color: "from-white/10 to-white/5", finger: "L1" },
      { id: "fire", label: "🔥", x: 78, y: 45, w: 18, h: 32, color: "from-red-500/70 to-orange-600/70", finger: "R1" },
      { id: "scope", label: "🎯", x: 66, y: 30, w: 8, h: 12, color: "from-sky-500/60 to-indigo-500/60", finger: "R2" },
      { id: "reload", label: "↻", x: 60, y: 60, w: 7, h: 10, color: "from-amber-500/60 to-orange-500/60", finger: "R3" },
      { id: "jump", label: "↑", x: 76, y: 70, w: 7, h: 10, color: "from-emerald-500/60 to-green-500/60", finger: "R4" },
      { id: "crouch", label: "⤓", x: 84, y: 70, w: 7, h: 10, color: "from-violet-500/60 to-purple-500/60", finger: "R5" },
      { id: "prone", label: "⤵", x: 92, y: 70, w: 7, h: 10, color: "from-fuchsia-500/60 to-pink-500/60", finger: "R6" },
      { id: "peek-l", label: "◀", x: 35, y: 55, w: 6, h: 10, color: "from-cyan-500/60 to-blue-500/60", finger: "L2" },
      { id: "peek-r", label: "▶", x: 42, y: 55, w: 6, h: 10, color: "from-cyan-500/60 to-blue-500/60", finger: "L3" },
      { id: "heal", label: "💊", x: 90, y: 25, w: 6, h: 9, color: "from-lime-500/60 to-emerald-500/60", finger: "" },
      { id: "map", label: "🗺", x: 92, y: 8, w: 6, h: 9, color: "from-white/20 to-white/10", finger: "" },
    ];
    return base;
  }, []);

  const visible = useMemo(() => {
    const show: Record<number, string[]> = {
      2: ["joystick", "fire", "scope", "reload", "jump", "heal", "map"],
      3: ["joystick", "fire", "scope", "reload", "jump", "crouch", "heal", "map", "peek-l"],
      4: ["joystick", "fire", "scope", "reload", "jump", "crouch", "heal", "map", "peek-l", "peek-r"],
      5: ["joystick", "fire", "scope", "reload", "jump", "crouch", "prone", "heal", "map", "peek-l", "peek-r"],
      6: ["joystick", "fire", "scope", "reload", "jump", "crouch", "prone", "heal", "map", "peek-l", "peek-r"],
    };
    return new Set(show[fingers] ?? show[4]);
  }, [fingers]);

  const shift = style === "close" || style === "headshot" ? -2 : 0;

  return (
    <div className="card relative overflow-hidden rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-display text-sm font-bold tracking-widest text-white/90">{t("hud_title", lang)}</h4>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-bold text-orange-300">
            {fingers} {t("fingers_suffix", lang)}
          </span>
        </div>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#0b0f18] via-[#0a0a14] to-[#050710]">
        <div className="scan-line pointer-events-none absolute inset-0" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.1),transparent_60%)]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-10 w-10">
            <div className="absolute top-1/2 left-0 h-[1px] w-3 -translate-y-1/2 bg-orange-400" />
            <div className="absolute top-1/2 right-0 h-[1px] w-3 -translate-y-1/2 bg-orange-400" />
            <div className="absolute left-1/2 top-0 h-3 w-[1px] -translate-x-1/2 bg-orange-400" />
            <div className="absolute left-1/2 bottom-0 h-3 w-[1px] -translate-x-1/2 bg-orange-400" />
            <div className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400" />
          </div>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-2 font-display text-[10px] tracking-widest">
          <span className="rounded bg-black/60 px-2 py-0.5 text-orange-300">{t("hud_alive", lang)}: 87</span>
          <span className="rounded bg-black/60 px-2 py-0.5 text-emerald-300">{t("hud_kills", lang)}: 4</span>
          <span className="rounded bg-black/60 px-2 py-0.5 text-white/60">120 FPS</span>
        </div>
        {buttons
          .filter((b) => visible.has(b.id))
          .map((b) => (
            <div
              key={b.id}
              className={`absolute flex items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br ${b.color} backdrop-blur-sm`}
              style={{
                left: `${b.x + shift}%`,
                top: `${b.y}%`,
                width: `${b.w}%`,
                height: `${b.h}%`,
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg">{b.label}</span>
                {b.finger && (
                  <span className="font-display text-[9px] font-bold text-white/80">{b.finger}</span>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-white/60 sm:grid-cols-6">
        {["L1", "L2", "L3", "R1", "R2", "R3"].slice(0, fingers).map((f) => (
          <div key={f} className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5">
            <span className="kbd">{f}</span>
            <span className="truncate">{t("hud_active", lang)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
