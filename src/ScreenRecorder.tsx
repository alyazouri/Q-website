import { useState, useRef, useCallback } from "react";
import { useLang } from "./LanguageContext";

export function ScreenRecorder() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [countdown, setCountdown] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);

  const startRecording = useCallback(async () => {
    // Countdown 3-2-1
    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      await new Promise((r) => setTimeout(r, 800));
    }
    setCountdown(0);

    try {
      // Scroll to generator section
      document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
      await new Promise((r) => setTimeout(r, 500));

      // Capture the screen
      const stream = await (navigator.mediaDevices as MediaDevices & {
        getDisplayMedia: (opts: MediaStreamConstraints) => Promise<MediaStream>;
      }).getDisplayMedia({
        video: { frameRate: 30 },
        audio: false,
      });

      // Pick best mimeType
      let mimeType = "video/webm;codecs=vp9";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "video/webm;codecs=vp8";
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = "video/webm";
        }
      }

      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 5_000_000,
      });
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType.split(";")[0] });
        if (blob.size > 0) {
          blobRef.current = blob;
          setVideoUrl(URL.createObjectURL(blob));
          setRecorded(true);
        }
        setRecording(false);
      };

      // Stop when user stops sharing
      stream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== "inactive") recorder.stop();
      };

      recorder.start(1000);
      setRecording(true);
      setRecorded(false);

      // Auto-stop after 60 seconds
      setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, 60000);

    } catch {
      setRecording(false);
      setCountdown(0);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recorderRef.current?.state !== "inactive") {
      recorderRef.current?.stop();
    }
  }, []);

  const downloadRecording = useCallback(() => {
    if (!blobRef.current) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blobRef.current);
    a.download = `alyazouri_sensitivity_${Date.now()}.webm`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 200);
  }, []);

  const shareRecording = useCallback(async () => {
    if (!blobRef.current) return;
    try {
      const file = new File([blobRef.current], "alyazouri_sensitivity.webm", { type: "video/webm" });
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], title: "ALYAZOURI Sensitivity" });
      } else {
        downloadRecording();
      }
    } catch {
      downloadRecording();
    }
  }, [downloadRecording]);

  const resetRecording = useCallback(() => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl("");
    setRecorded(false);
    blobRef.current = null;
  }, [videoUrl]);

  // Check if screen capture is supported
  const isSupported = typeof navigator !== "undefined" &&
    "mediaDevices" in navigator &&
    "getDisplayMedia" in (navigator.mediaDevices || {});

  if (!isSupported) return null;

  return (
    <div className="card neon-box rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🎥</span>
        <h3 className="font-display text-sm font-bold tracking-widest text-white">
          {isAr ? "تسجيل شاشة النتائج" : "Record Results Screen"}
        </h3>
      </div>

      {/* Countdown overlay */}
      {countdown > 0 && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-center">
            <div className="font-display text-8xl font-black text-orange-400 animate-pulse">{countdown}</div>
            <div className="mt-4 text-lg text-white/70">
              {isAr ? "جاري البدء..." : "Starting..."}
            </div>
          </div>
        </div>
      )}

      {recorded && videoUrl ? (
        /* Recorded video */
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
            <video src={videoUrl} controls playsInline className="w-full" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={downloadRecording} className="btn-primary rounded-xl px-3 py-2.5 text-xs">
              ⬇️ {isAr ? "تحميل" : "Download"}
            </button>
            <button onClick={shareRecording} className="btn-ghost rounded-xl px-3 py-2.5 text-xs">
              📤 {isAr ? "مشاركة" : "Share"}
            </button>
            <button onClick={resetRecording} className="btn-ghost rounded-xl px-3 py-2.5 text-xs">
              🔄 {isAr ? "جديد" : "New"}
            </button>
          </div>
          <div className="text-center text-[10px] text-white/40">
            {isAr ? "جاهز للنشر على TikTok / Instagram / YouTube" : "Ready for TikTok / Instagram / YouTube"}
          </div>
        </div>
      ) : recording ? (
        /* Recording in progress */
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
            <span className="font-display text-sm font-bold text-red-400">
              {isAr ? "جاري التسجيل..." : "Recording..."}
            </span>
          </div>
          <p className="text-xs text-white/50">
            {isAr ? "تصفّح الموقع — كل شيء يُسجَّل الآن" : "Browse the site — everything is being recorded"}
          </p>
          <button onClick={stopRecording} className="w-full rounded-xl border-2 border-red-400/50 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 hover:bg-red-500/20">
            ⏹️ {isAr ? "إيقاف التسجيل" : "Stop Recording"}
          </button>
        </div>
      ) : (
        /* Ready to record */
        <div className="space-y-3">
          <p className="text-xs text-white/60">
            {isAr
              ? "سجّل شاشة النتائج كفيديو قصير جاهز للنشر على السوشيال ميديا."
              : "Record your results screen as a short video ready for social media."}
          </p>
          <button onClick={startRecording} className="btn-primary w-full rounded-xl px-5 py-3 text-sm">
            🎥 {isAr ? "ابدأ التسجيل" : "Start Recording"}
          </button>
          <div className="flex items-center justify-center gap-3 text-[10px] text-white/40">
            <span>📱 TikTok</span>
            <span>·</span>
            <span>📸 Instagram</span>
            <span>·</span>
            <span>▶️ YouTube</span>
          </div>
        </div>
      )}
    </div>
  );
}
