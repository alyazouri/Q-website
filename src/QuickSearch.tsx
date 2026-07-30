import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { BRANDS, WEAPONS } from "./data";
import { useLang } from "./LanguageContext";

interface SearchResult {
  type: "device" | "weapon";
  name: string;
  brandIdx?: number;
  deviceIdx?: number;
  weaponCatIdx?: number;
  weaponIdx?: number;
  sub: string;
  icon: string;
}

export function QuickSearch({
  onSelectDevice,
  onSelectWeapon,
}: {
  onSelectDevice: (brandId: string, deviceIdx: number) => void;
  onSelectWeapon: (catId: string, weaponIdx: number) => void;
}) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  // Build search index
  const allItems = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];

    BRANDS.forEach((b) => {
      b.devices.forEach((d, di) => {
        items.push({
          type: "device",
          name: d.name,
          brandIdx: BRANDS.indexOf(b),
          deviceIdx: di,
          sub: `${b.icon} ${b.name} · ${d.fps} FPS · ${d.touchRate}Hz`,
          icon: b.icon,
        });
      });
    });

    WEAPONS.forEach((cat) => {
      cat.weapons.forEach((w, wi) => {
        items.push({
          type: "weapon",
          name: w.name,
          weaponCatIdx: WEAPONS.indexOf(cat),
          weaponIdx: wi,
          sub: `${cat.icon} ${cat.name} · 🔥${w.recoil} · 🎯${w.range}`,
          icon: cat.icon,
        });
      });
    });

    return items;
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [query, allItems]);

  const handleSelect = useCallback((item: SearchResult) => {
    if (item.type === "device" && item.brandIdx !== undefined && item.deviceIdx !== undefined) {
      const brand = BRANDS[item.brandIdx];
      onSelectDevice(brand.id, item.deviceIdx);
    } else if (item.type === "weapon" && item.weaponCatIdx !== undefined && item.weaponIdx !== undefined) {
      const cat = WEAPONS[item.weaponCatIdx];
      onSelectWeapon(cat.id, item.weaponIdx);
    }
    setOpen(false);
    // Scroll to generator
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  }, [onSelectDevice, onSelectWeapon]);

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="btn-ghost flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
        title="Ctrl+K"
      >
        <span>🔍</span>
        <span className="hidden sm:inline">{isAr ? "بحث" : "Search"}</span>
        <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 font-display text-[9px] text-white/40 sm:inline">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/80 pt-[15vh] backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            ref={modalRef}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14] shadow-2xl"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-white/5 p-4">
              <span className="text-xl text-orange-400">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAr ? "ابحث عن جهاز أو سلاح..." : "Search device or weapon..."}
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                autoComplete="off"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-white/50 hover:bg-white/10"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-white/40">
                  {isAr ? "لا توجد نتائج" : "No results found"}
                </div>
              ) : (
                <>
                  {/* Devices */}
                  {filtered.some((f) => f.type === "device") && (
                    <div className="mb-1 px-3 pt-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      📱 {isAr ? "الأجهزة" : "Devices"}
                    </div>
                  )}
                  {filtered
                    .filter((f) => f.type === "device")
                    .map((item) => (
                      <button
                        key={`d-${item.name}`}
                        onClick={() => handleSelect(item)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition-colors hover:bg-white/5"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white truncate">{item.name}</div>
                          <div className="text-[10px] text-white/40 truncate">{item.sub}</div>
                        </div>
                        <span className="rounded bg-sky-500/15 px-2 py-0.5 text-[9px] font-bold text-sky-300">
                          {isAr ? "جهاز" : "DEVICE"}
                        </span>
                      </button>
                    ))}

                  {/* Weapons */}
                  {filtered.some((f) => f.type === "weapon") && (
                    <div className="mb-1 px-3 pt-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      🔫 {isAr ? "الأسلحة" : "Weapons"}
                    </div>
                  )}
                  {filtered
                    .filter((f) => f.type === "weapon")
                    .map((item) => (
                      <button
                        key={`w-${item.name}`}
                        onClick={() => handleSelect(item)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition-colors hover:bg-white/5"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white truncate">{item.name}</div>
                          <div className="text-[10px] text-white/40 truncate">{item.sub}</div>
                        </div>
                        <span className="rounded bg-orange-500/15 px-2 py-0.5 text-[9px] font-bold text-orange-300">
                          {isAr ? "سلاح" : "WEAPON"}
                        </span>
                      </button>
                    ))}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/5 px-4 py-2.5 text-[10px] text-white/30">
              <span>{filtered.length} {isAr ? "نتيجة" : "results"}</span>
              <div className="flex gap-2">
                <span>↑↓ {isAr ? "تنقل" : "Navigate"}</span>
                <span>↵ {isAr ? "اختيار" : "Select"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
