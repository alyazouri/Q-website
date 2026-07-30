import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const DISMISSED_KEY = "alyazouri_pwa_dismissed";

export function PWABanner() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    try {
      if (localStorage.getItem(DISMISSED_KEY) === "true") return;
    } catch { /* */ }

    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Listen for beforeinstallprompt (Chrome/Edge/Samsung)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after 5 seconds
      setTimeout(() => setShow(true), 5000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // For Safari/iOS — show manual instructions after delay
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isSafari || isIOS) {
      setTimeout(() => setShow(true), 8000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Chrome/Edge native prompt
      const promptEvent = deferredPrompt as Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
      try {
        await promptEvent.prompt();
        const result = await promptEvent.userChoice;
        if (result.outcome === "accepted") {
          setInstalled(true);
          setTimeout(() => setShow(false), 2000);
        }
      } catch { /* */ }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    try { localStorage.setItem(DISMISSED_KEY, "true"); } catch { /* */ }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-orange-400/30 bg-[#0a0a14]/95 p-5 shadow-2xl backdrop-blur-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5" />
        <button
          onClick={handleDismiss}
          className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-xs text-white/50 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        {installed ? (
          <div className="relative text-center py-2">
            <div className="text-3xl">✅</div>
            <div className="mt-2 font-bold text-emerald-300">
              {isAr ? "تم التثبيت بنجاح!" : "Installed successfully!"}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
                <span className="font-display text-lg font-black text-white">A</span>
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">
                  {isAr ? "أضف التطبيق" : "Install App"}
                </div>
                <div className="text-[11px] text-white/60">
                  {isAr
                    ? "أضف ALYAZOURI للشاشة الرئيسية"
                    : "Add ALYAZOURI to your home screen"}
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {deferredPrompt ? (
                <button
                  onClick={handleInstall}
                  className="btn-primary flex-1 rounded-xl px-4 py-2.5 text-sm"
                >
                  📲 {isAr ? "تثبيت الآن" : "Install Now"}
                </button>
              ) : (
                <div className="flex-1 rounded-xl border border-white/5 bg-black/30 p-3 text-[11px] text-white/60">
                  {isAr ? (
                    <>
                      📱 اضغط <span className="text-orange-300 font-bold">مشاركة ↗</span> ثم <span className="text-orange-300 font-bold">"أضف للشاشة الرئيسية"</span>
                    </>
                  ) : (
                    <>
                      📱 Tap <span className="text-orange-300 font-bold">Share ↗</span> then <span className="text-orange-300 font-bold">"Add to Home Screen"</span>
                    </>
                  )}
                </div>
              )}
              <button
                onClick={handleDismiss}
                className="btn-ghost shrink-0 rounded-xl px-3 py-2.5 text-xs"
              >
                {isAr ? "لاحقاً" : "Later"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
