// Multi-Language System — ALYAZOURI 2026
export type Lang = "ar" | "en" | "tr" | "ru" | "es";

export const LANGUAGES: { id: Lang; name: string; flag: string; dir: "rtl" | "ltr" }[] = [
  { id: "ar", name: "العربية", flag: "🇯🇴", dir: "rtl" },
  { id: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { id: "tr", name: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  { id: "ru", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { id: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
];

export const translations = {
  // ============ NAVBAR ============
  nav_generator: { ar: "المولد", en: "Generator", tr: "Üreteç", ru: "Генератор", es: "Generador" },
  nav_ping: { ar: "البنق", en: "Ping", tr: "Ping", ru: "Пинг", es: "Ping" },
  nav_weapons: { ar: "الأسلحة", en: "Weapons", tr: "Silahlar", ru: "Оружие", es: "Armas" },
  nav_pac: { ar: "PAC", en: "PAC", tr: "PAC", ru: "PAC", es: "PAC" },
  nav_about: { ar: "حول", en: "About", tr: "Hakkında", ru: "О нас", es: "Acerca" },
  nav_cta: { ar: "🎯 اصنع الآن", en: "🎯 Generate Now", tr: "🎯 Şimdi Oluştur", ru: "🎯 Создать", es: "🎯 Generar" },
  nav_language: { ar: "اللغة", en: "Language", tr: "Dil", ru: "Язык", es: "Idioma" },

  // ============ HERO ============
  hero_badge: { ar: "ALYAZOURI AI ENGINE 2026", en: "ALYAZOURI AI ENGINE 2026", tr: "ALYAZOURI AI ENGINE 2026", ru: "ALYAZOURI AI ENGINE 2026", es: "ALYAZOURI AI ENGINE 2026" },
  hero_title1: { ar: "محسّن الأردن 🇯🇴", en: "Jordan Optimizer 🇯🇴", tr: "Jordan Optimize Edici 🇯🇴", ru: "Оптимизатор Иордании 🇯🇴", es: "Optimizador Jordania 🇯🇴" },
  hero_title2: { ar: "PUBG Mobile", en: "PUBG Mobile", tr: "PUBG Mobile", ru: "PUBG Mobile", es: "PUBG Mobile" },
  hero_desc: {
    ar: "حساسية حقيقية مدعومة بالذكاء الاصطناعي — أقل بنق ممكن، فريق أردني، تجنيد سريع، وتغطية كاملة لـ",
    en: "Real AI-powered sensitivity — lowest ping possible, Jordanian team, fast recruitment, full coverage of",
    tr: "Gerçek AI destekli hassasiyet — en düşük ping, Ürdün ekibi, hızlı eşleştirme, tam kapsama",
    ru: "Реальная чувствительность на базе ИИ — минимальный пинг, иорданская команда, быстрый подбор",
    es: "Sensibilidad real con IA — ping más bajo, equipo jordano, reclutamiento rápido, cobertura total"
  },
  hero_devices: { ar: "77 جهاز", en: "77 devices", tr: "77 cihaz", ru: "77 устройств", es: "77 dispositivos" },
  hero_weapons: { ar: "44 سلاح", en: "44 weapons", tr: "44 silah", ru: "44 оружия", es: "44 armas" },
  hero_stats_devices: { ar: "أجهزة", en: "Devices", tr: "Cihazlar", ru: "Устройства", es: "Dispositivos" },
  hero_stats_weapons: { ar: "أسلحة", en: "Weapons", tr: "Silahlar", ru: "Оружие", es: "Armas" },
  hero_stats_servers: { ar: "سيرفرات", en: "Servers", tr: "Sunucular", ru: "Серверы", es: "Servidores" },
  hero_cta1: { ar: "🎯 اصنع حساسيتك الآن", en: "🎯 Generate Your Sensitivity", tr: "🎯 Hassasiyetini Oluştur", ru: "🎯 Создать чувствительность", es: "🎯 Genera tu sensibilidad" },
  hero_cta2: { ar: "📡 تسريع PAC Script", en: "📡 PAC Script Acceleration", tr: "📡 PAC Script Hızlandırma", ru: "📡 Ускорение PAC", es: "📡 Aceleración PAC" },
  hero_live_status: { ar: "LIVE STATUS", en: "LIVE STATUS", tr: "CANLI DURUM", ru: "СТАТУС", es: "EN VIVO" },
  hero_network: { ar: "📡 حالة الشبكة", en: "📡 Network Status", tr: "📡 Ağ Durumu", ru: "📡 Состояние сети", es: "📡 Estado de red" },
  hero_nearest: { ar: "أقرب سيرفر · 🇯🇴 الأردن", en: "Nearest Server · 🇯🇴 Jordan", tr: "En Yakın · 🇯🇴 Ürdün", ru: "Ближайший · 🇯🇴 Иордания", es: "Más cercano · 🇯🇴 Jordania" },
  hero_connected: { ar: "متصل", en: "Connected", tr: "Bağlı", ru: "Подключено", es: "Conectado" },
  hero_measuring: { ar: "جاري القياس", en: "Measuring", tr: "Ölçülüyor", ru: "Измерение", es: "Midiendo" },
  hero_excellent: { ar: "ممتاز", en: "Excellent", tr: "Mükemmel", ru: "Отлично", es: "Excelente" },
  hero_good: { ar: "جيد", en: "Good", tr: "İyi", ru: "Хорошо", es: "Bueno" },
  hero_medium: { ar: "متوسط", en: "Medium", tr: "Orta", ru: "Средне", es: "Medio" },
  hero_recruitment: { ar: "التجنيد", en: "Recruitment", tr: "Eşleştirme", ru: "Подбор", es: "Reclutamiento" },
  hero_isp: { ar: "مزود الخدمة", en: "ISP", tr: "ISS", ru: "Провайдер", es: "ISP" },

  // ============ SECTIONS ============
  sec_generator_eyebrow: { ar: "AI SENSITIVITY GENERATOR", en: "AI SENSITIVITY GENERATOR", tr: "AI HASSASİYET ÜRETECİ", ru: "ГЕНЕРАТОР ЧУВСТВИТЕЛЬНОСТИ", es: "GENERADOR DE SENSIBILIDAD" },
  sec_generator_title: { ar: "🎯 مولد الحساسية الاحترافي", en: "🎯 Professional Sensitivity Generator", tr: "🎯 Profesyonel Hassasiyet Üreteci", ru: "🎯 Профессиональный генератор", es: "🎯 Generador profesional" },
  sec_generator_sub: {
    ar: "اختر جهازك، عدد أصابعك، أسلوبك، وسلاحك — ستحصل على حساسية دقيقة مبنية على معادلات رياضية حقيقية.",
    en: "Choose your device, fingers, style, and weapon — get precise sensitivity based on real math equations.",
    tr: "Cihazını, parmak sayını, stilini ve silahını seç — gerçek matematik denklemlerine dayalı hassasiyet al.",
    ru: "Выберите устройство, пальцы, стиль и оружие — получите точную чувствительность.",
    es: "Elige tu dispositivo, dedos, estilo y arma — obtén sensibilidad precisa."
  },

  // ============ DEVICE ============
  device_select: { ar: "📱 اختر جهازك", en: "📱 Choose your device", tr: "📱 Cihazını seç", ru: "📱 Выберите устройство", es: "📱 Elige tu dispositivo" },
  device_selected: { ar: "المحدد: ", en: "Selected: ", tr: "Seçili: ", ru: "Выбрано: ", es: "Seleccionado: " },
  device_gyro_excellent: { ar: "جايرو: ممتاز", en: "Gyro: Excellent", tr: "Jiroskop: Mükemmel", ru: "Гиро: Отлично", es: "Giro: Excelente" },
  device_gyro_good: { ar: "جايرو: جيد", en: "Gyro: Good", tr: "Jiroskop: İyi", ru: "Гиро: Хорошо", es: "Giro: Bueno" },
  device_gyro_average: { ar: "جايرو: متوسط", en: "Gyro: Average", tr: "Jiroskop: Orta", ru: "Гиро: Средне", es: "Giro: Promedio" },

  // ============ FINGERS ============
  fingers_title: { ar: "🖐️ عدد الأصابع", en: "🖐️ Finger Count", tr: "🖐️ Parmak Sayısı", ru: "🖐️ Количество пальцев", es: "🖐️ Cantidad de dedos" },
  fingers_suffix: { ar: "أصابع", en: "fingers", tr: "parmak", ru: "пальцев", es: "dedos" },

  // ============ STYLE ============
  style_title: { ar: "🎮 أسلوب اللعب", en: "🎮 Play Style", tr: "🎮 Oyun Stili", ru: "🎮 Стиль игры", es: "🎮 Estilo de juego" },
  style_headshot: { ar: "هيدشوت", en: "Headshot", tr: "Headshot", ru: "Хедшот", es: "Headshot" },
  style_spray: { ar: "سبراي", en: "Spray", tr: "Spray", ru: "Спрей", es: "Spray" },
  style_competitive: { ar: "تنافسي", en: "Competitive", tr: "Rekabetçi", ru: "Соревн.", es: "Competitivo" },
  style_close: { ar: "قريب المدى", en: "Close Range", tr: "Yakın Mesafe", ru: "Ближний бой", es: "Corto alcance" },
  style_reflex: { ar: "ردود فعل", en: "Reflex", tr: "Refleks", ru: "Реакция", es: "Reflejo" },
  style_conqueror: { ar: "كونكر", en: "Conqueror", tr: "Conqueror", ru: "Завоеватель", es: "Conquistador" },

  // ============ GYRO ============
  gyro_title: { ar: "🔄 وضع الجيروسكوب", en: "🔄 Gyroscope Mode", tr: "🔄 Jiroskop Modu", ru: "🔄 Режим гироскопа", es: "🔄 Modo giroscopio" },
  gyro_off: { ar: "OFF", en: "OFF", tr: "KAPALI", ru: "ВЫКЛ", es: "APAGADO" },
  gyro_off_desc: { ar: "جايرو معطل", en: "Gyro disabled", tr: "Jiroskop kapalı", ru: "Гироскоп выкл.", es: "Giro desactivado" },
  gyro_scope: { ar: "Scope On", en: "Scope On", tr: "Dürbün Açık", ru: "С прицелом", es: "Con mira" },
  gyro_scope_desc: { ar: "فقط مع السكوب", en: "Only with scope", tr: "Sadece dürbünle", ru: "Только с прицелом", es: "Solo con mira" },
  gyro_always: { ar: "Always On", en: "Always On", tr: "Her Zaman", ru: "Всегда", es: "Siempre" },
  gyro_always_desc: { ar: "دائماً مفعّل", en: "Always active", tr: "Her zaman aktif", ru: "Всегда активен", es: "Siempre activo" },
  gyro_status_off: { ar: "معطل", en: "Disabled", tr: "Devre dışı", ru: "Отключен", es: "Desactivado" },
  gyro_status_scope: { ar: "مع السكوب", en: "With Scope", tr: "Dürbünle", ru: "С прицелом", es: "Con mira" },
  gyro_status_always: { ar: "دائماً", en: "Always", tr: "Her Zaman", ru: "Всегда", es: "Siempre" },
  gyro_msg_off: { ar: "🔕 الجايرو معطل — استخدم حساسية اللمس فقط.", en: "🔕 Gyro disabled — use touch sensitivity only.", tr: "🔕 Jiroskop kapalı — sadece dokunmatik hassasiyet kullanın.", ru: "🔕 Гироскоп выключен — используйте только касание.", es: "🔕 Giro apagado — usa solo sensibilidad táctil." },
  gyro_msg_scope: {
    ar: "🎯 الجايرو يعمل فقط عند فتح السكوب — الخيار الأفضل للتحكم في الارتداد بعيد المدى.",
    en: "🎯 Gyro works only when scoping — best for long-range recoil control.",
    tr: "🎯 Jiroskop sadece dürbünle çalışır — uzun mesafe geri tepme kontrolü için en iyisi.",
    ru: "🎯 Гиро работает только с прицелом — лучший контроль отдачи на дистанции.",
    es: "🎯 Giro solo al apuntar — mejor para control de retroceso a distancia."
  },
  gyro_msg_always: {
    ar: "🔄 الجايرو يعمل دائماً — الخيار الأفضل للهيدشوت والمواجهات القريبة.",
    en: "🔄 Gyro always active — best for headshots and close combat.",
    tr: "🔄 Jiroskop her zaman aktif — headshot ve yakın çatışma için en iyisi.",
    ru: "🔄 Гиро всегда активен — лучший для хедшотов и ближнего боя.",
    es: "🔄 Giro siempre activo — mejor para headshots y combate cercano."
  },

  // ============ WEAPON ============
  weapon_title: { ar: "🔫 اختر السلاح", en: "🔫 Choose weapon", tr: "🔫 Silah seç", ru: "🔫 Выберите оружие", es: "🔫 Elige arma" },
  weapon_recoil: { ar: "الارتداد", en: "Recoil", tr: "Geri Tepme", ru: "Отдача", es: "Retroceso" },
  weapon_range: { ar: "المدى", en: "Range", tr: "Menzil", ru: "Дальность", es: "Alcance" },

  // ============ SAVE ============
  save_btn: { ar: "💾 حفظ هذا التشكيل (حتى 5 ملفات)", en: "💾 Save this build (up to 5 profiles)", tr: "💾 Bu yapıyı kaydet (5 profile kadar)", ru: "💾 Сохранить (до 5 профилей)", es: "💾 Guardar (hasta 5 perfiles)" },

  // ============ AI SCORE ============
  ai_score_label: { ar: "AI SCORE", en: "AI SCORE", tr: "AI SKORU", ru: "ИИ СЧЁТ", es: "PUNTUACIÓN IA" },
  ai_score_title: { ar: "درجة الذكاء الاصطناعي", en: "AI Score", tr: "AI Skoru", ru: "Счёт ИИ", es: "Puntuación IA" },
  ai_suffix: { ar: "أصابع", en: "fingers", tr: "parmak", ru: "пальцев", es: "dedos" },

  // ============ FACTORS ============
  factors_title: { ar: "⚙️ معاملات الحساب", en: "⚙️ Calculation Factors", tr: "⚙️ Hesaplama Faktörleri", ru: "⚙️ Факторы расчёта", es: "⚙️ Factores de cálculo" },
  factors_device: { ar: "جهاز", en: "Device", tr: "Cihaz", ru: "Устройство", es: "Dispositivo" },
  factors_fingers: { ar: "أصابع", en: "Fingers", tr: "Parmaklar", ru: "Пальцы", es: "Dedos" },
  factors_style: { ar: "أسلوب", en: "Style", tr: "Stil", ru: "Стиль", es: "Estilo" },
  factors_weapon: { ar: "سلاح", en: "Weapon", tr: "Silah", ru: "Оружие", es: "Arma" },
  factors_equation: { ar: "المعادلة:", en: "Equation:", tr: "Denklem:", ru: "Уравнение:", es: "Ecuación:" },
  factors_desc: {
    ar: "الجهاز يؤثر عبر FPS + Touch Rate + حجم الشاشة + جودة الجايرو",
    en: "Device affects via FPS + Touch Rate + Screen Size + Gyro Quality",
    tr: "Cihaz FPS + Dokunma Hızı + Ekran Boyutu + Jiroskop Kalitesi ile etkiler",
    ru: "Устройство влияет через FPS + Touch Rate + Экран + Гиро",
    es: "Dispositivo afecta vía FPS + Touch + Pantalla + Giro"
  },

  // ============ SENSITIVITY ============
  sens_camera: { ar: "📷 حساسية الكاميرا", en: "📷 Camera Sensitivity", tr: "📷 Kamera Hassasiyeti", ru: "📷 Камера", es: "📷 Cámara" },
  sens_ads: { ar: "🎯 حساسية ADS", en: "🎯 ADS Sensitivity", tr: "🎯 ADS Hassasiyeti", ru: "🎯 ADS", es: "🎯 ADS" },
  sens_gyro_cam: { ar: "🔄 جيروسكوب كاميرا", en: "🔄 Gyro Camera", tr: "🔄 Jiroskop Kamera", ru: "🔄 Гиро камера", es: "🔄 Giro cámara" },
  sens_gyro_ads: { ar: "🔄 جيروسكوب ADS", en: "🔄 Gyro ADS", tr: "🔄 Jiroskop ADS", ru: "🔄 Гиро ADS", es: "🔄 Giro ADS" },
  sens_tpp: { ar: "TPP · بدون سكوب", en: "TPP · No Scope", tr: "TPP · Dürbünsüz", ru: "TPP · Без прицела", es: "TPP · Sin mira" },
  sens_tpp_desc: { ar: "منظور ثالث · مواجهات قريبة", en: "Third person · CQC", tr: "Üçüncü şahıs · Yakın dövüş", ru: "От 3-го лица · Ближний бой", es: "Tercera persona · CQC" },
  sens_fpp: { ar: "FPP · بدون سكوب", en: "FPP · No Scope", tr: "FPP · Dürbünsüz", ru: "FPP · Без прицела", es: "FPP · Sin mira" },
  sens_fpp_desc: { ar: "منظور أول · مواجهات قريبة", en: "First person · CQC", tr: "Birinci şahıs · Yakın dövüş", ru: "От 1-го лица · Ближний бой", es: "Primera persona · CQC" },
  sens_cqc: { ar: "180° · CQC", en: "180° · CQC", tr: "180° · CQC", ru: "180° · CQC", es: "180° · CQC" },
  sens_red_dot: { ar: "Red Dot", en: "Red Dot", tr: "Red Dot", ru: "Red Dot", es: "Red Dot" },
  sens_no_scope: { ar: "بدون سكوب", en: "No Scope", tr: "Dürbünsüz", ru: "Без прицела", es: "Sin mira" },
  sens_freelook: { ar: "👁️ النظرة الحرة", en: "👁️ Free Look", tr: "👁️ Serbest Bakış", ru: "👁️ Свободный обзор", es: "👁️ Vista libre" },
  sens_freelook_cam: { ar: "الكاميرا", en: "Camera", tr: "Kamera", ru: "Камера", es: "Cámara" },
  sens_freelook_para: { ar: "الباراشوت", en: "Parachute", tr: "Paraşüt", ru: "Парашют", es: "Paracaídas" },
  sens_freelook_vehicle: { ar: "المركبة", en: "Vehicle", tr: "Araç", ru: "Транспорт", es: "Vehículo" },

  // ============ GYRO OFF MESSAGE ============
  gyro_disabled_title: { ar: "الجايرو معطل", en: "Gyro Disabled", tr: "Jiroskop Kapalı", ru: "Гиро выключен", es: "Giro desactivado" },
  gyro_disabled_msg: {
    ar: "اختر \"Scope On\" أو \"Always On\" لتفعيل حساسية الجيروسكوب",
    en: "Choose \"Scope On\" or \"Always On\" to enable gyroscope sensitivity",
    tr: "Jiroskop hassasiyetini etkinleştirmek için \"Dürbün Açık\" veya \"Her Zaman\" seçin",
    ru: "Выберите «С прицелом» или «Всегда» для включения гироскопа",
    es: "Elige \"Con mira\" o \"Siempre\" para activar giroscopio"
  },

  // ============ HUD ============
  hud_title: { ar: "🎮 معاينة HUD أفقي", en: "🎮 Horizontal HUD Preview", tr: "🎮 Yatay HUD Önizleme", ru: "🎮 Превью HUD", es: "🎮 Vista previa HUD" },

  // ============ STABILITY ============
  stability_title: { ar: "📊 تحليل الثبات الكلي", en: "📊 Total Stability Analysis", tr: "📊 Toplam Stabilite Analizi", ru: "📊 Анализ стабильности", es: "📊 Análisis de estabilidad" },
  stability_device: { ar: "ثبات الجهاز", en: "Device Stability", tr: "Cihaz Stabilitesi", ru: "Стабильность устройства", es: "Estabilidad disp." },
  stability_weapon: { ar: "ثبات السلاح", en: "Weapon Stability", tr: "Silah Stabilitesi", ru: "Стабильность оружия", es: "Estabilidad arma" },
  stability_fingers: { ar: "ثبات الأصابع", en: "Finger Stability", tr: "Parmak Stabilitesi", ru: "Стабильность пальцев", es: "Estabilidad dedos" },
  stability_style: { ar: "ثبات الأسلوب", en: "Style Stability", tr: "Stil Stabilitesi", ru: "Стабильность стиля", es: "Estabilidad estilo" },
  stability_equation: {
    ar: "💡 المعادلة: الثبات الكلي = جهاز × سلاح × أصابع × أسلوب",
    en: "💡 Equation: Total = Device × Weapon × Fingers × Style",
    tr: "💡 Denklem: Toplam = Cihaz × Silah × Parmak × Stil",
    ru: "💡 Уравнение: Всего = Устройство × Оружие × Пальцы × Стиль",
    es: "💡 Ecuación: Total = Disp. × Arma × Dedos × Estilo"
  },
  stability_desc: {
    ar: "كلما زاد الثبات → حساسية أدق (أقل) للسكوبات",
    en: "Higher stability → more precise (lower) scope sensitivity",
    tr: "Daha yüksek stabilite → daha hassas (düşük) dürbün hassasiyeti",
    ru: "Больше стабильности → точнее (ниже) чувствительность прицела",
    es: "Mayor estabilidad → sensibilidad más precisa"
  },

  // ============ PING ============
  ping_eyebrow: { ar: "NETWORK DIAGNOSTICS", en: "NETWORK DIAGNOSTICS", tr: "AĞ TEŞHİSİ", ru: "ДИАГНОСТИКА СЕТИ", es: "DIAGNÓSTICO DE RED" },
  ping_title: { ar: "📡 قياس البنق الحي — اختر أفضل سيرفر PUBG", en: "📡 Live Ping Measurement — Choose Best Server", tr: "📡 Canlı Ping Ölçümü — En İyi Sunucuyu Seç", ru: "📡 Измерение пинга — выберите сервер", es: "📡 Medición de ping — Elige servidor" },
  ping_sub: {
    ar: "يقيس البنق الفعلي لسيرفرات PUBG Mobile من موقعك في الأردن تلقائياً.",
    en: "Measures actual ping to PUBG Mobile servers from your location in Jordan automatically.",
    tr: "Ürdün'deki konumunuzdan PUBG Mobile sunucularına gerçek ping'i otomatik ölçer.",
    ru: "Измеряет реальный пинг до серверов PUBG из Иордании автоматически.",
    es: "Mide el ping real a servidores PUBG desde Jordania automáticamente."
  },
  ping_btn_measuring: { ar: "جاري القياس...", en: "Measuring...", tr: "Ölçülüyor...", ru: "Измерение...", es: "Midiendo..." },
  ping_btn_remeasure: { ar: "إعادة قياس", en: "Re-measure", tr: "Tekrar Ölç", ru: "Перемерить", es: "Medir de nuevo" },
  ping_best: { ar: "⭐ الأفضل", en: "⭐ Best", tr: "⭐ En İyi", ru: "⭐ Лучший", es: "⭐ Mejor" },
  ping_ping: { ar: "بنق", en: "Ping", tr: "Ping", ru: "Пинг", es: "Ping" },
  ping_jitter: { ar: "تذبذب", en: "Jitter", tr: "Jitter", ru: "Джиттер", es: "Jitter" },
  ping_loss: { ar: "فقدان", en: "Loss", tr: "Kayıp", ru: "Потери", es: "Pérdida" },
  ping_quality_excellent: { ar: "ممتاز", en: "Excellent", tr: "Mükemmel", ru: "Отлично", es: "Excelente" },
  ping_quality_good: { ar: "جيد", en: "Good", tr: "İyi", ru: "Хорошо", es: "Bueno" },
  ping_quality_medium: { ar: "متوسط", en: "Medium", tr: "Orta", ru: "Средне", es: "Medio" },
  ping_quality_poor: { ar: "ضعيف", en: "Poor", tr: "Zayıf", ru: "Плохо", es: "Pobre" },

  // ============ WEAPONS SECTION ============
  weapons_eyebrow: { ar: "WEAPONS DATABASE", en: "WEAPONS DATABASE", tr: "SILAH VERİTABANI", ru: "БАЗА ОРУЖИЯ", es: "BASE DE ARMAS" },
  weapons_title: { ar: "🔫 قاعدة بيانات الأسلحة — 44 سلاح", en: "🔫 Weapons Database — 44 weapons", tr: "🔫 Silah Veritabanı — 44 silah", ru: "🔫 База оружия — 44", es: "🔫 Base de armas — 44" },
  weapons_sub: {
    ar: "تغطية كاملة لجميع فئات الأسلحة في PUBG Mobile مع بيانات الارتداد والمدى.",
    en: "Full coverage of all PUBG Mobile weapon categories with recoil and range data.",
    tr: "PUBG Mobile'daki tüm silah kategorilerinin geri tepme ve menzil verileriyle tam kapsama.",
    ru: "Полное покрытие всех категорий оружия PUBG с данными отдачи и дальности.",
    es: "Cobertura completa de todas las categorías de armas PUBG."
  },
  weapons_ar: { ar: "بنادق AR", en: "AR Rifles", tr: "AR Tüfekler", ru: "AR винтовки", es: "Rifles AR" },
  weapons_smg: { ar: "SMG", en: "SMG", tr: "SMG", ru: "SMG", es: "SMG" },
  weapons_sniper: { ar: "Sniper", en: "Sniper", tr: "Sniper", ru: "Снайперские", es: "Francotirador" },
  weapons_dmr: { ar: "DMR", en: "DMR", tr: "DMR", ru: "DMR", es: "DMR" },
  weapons_lmg: { ar: "LMG", en: "LMG", tr: "LMG", ru: "LMG", es: "LMG" },
  weapons_shotgun: { ar: "Shotgun", en: "Shotgun", tr: "Pompalı", ru: "Дробовики", es: "Escopetas" },

  // ============ EQUATIONS ============
  eq_eyebrow: { ar: "MATHEMATICS BEHIND", en: "MATHEMATICS BEHIND", tr: "MATEMATİK TEMEL", ru: "МАТЕМАТИКА", es: "MATEMÁTICAS" },
  eq_title: { ar: "📐 المعادلات الرياضية المستخدمة", en: "📐 Mathematical Equations Used", tr: "📐 Kullanılan Matematiksel Denklemler", ru: "📐 Математические уравнения", es: "📐 Ecuaciones matemáticas" },
  eq_sub: {
    ar: "خوارزميتنا تستخدم معادلات مبنية على FPS، معدل اللمس، قوة الارتداد، وزمن الاستجابة.",
    en: "Our algorithm uses equations based on FPS, touch rate, recoil, and response time.",
    tr: "Algoritmamız FPS, dokunma hızı, geri tepme ve yanıt süresine dayalı denklemler kullanır.",
    ru: "Наш алгоритм использует уравнения на основе FPS, touch rate, отдачи.",
    es: "Nuestro algoritmo usa ecuaciones basadas en FPS, touch, retroceso."
  },
  eq_rs: { ar: "استقرار الارتداد", en: "Recoil Stability", tr: "Geri Tepme Stabilitesi", ru: "Стабильность отдачи", es: "Estabilidad retroceso" },
  eq_gy: { ar: "استقرار الجيروسكوب", en: "Gyro Stability", tr: "Jiroskop Stabilitesi", ru: "Стабильность гиро", es: "Estabilidad giro" },
  eq_hd: { ar: "سحب الهيدشوت", en: "Headshot Pull", tr: "Headshot Çekme", ru: "Тяга хедшота", es: "Tirón headshot" },

  // ============ SAVED ============
  saved_eyebrow: { ar: "SAVED PROFILES", en: "SAVED PROFILES", tr: "KAYITLI PROFİLLER", ru: "СОХРАНЁННЫЕ ПРОФИЛИ", es: "PERFILES GUARDADOS" },
  saved_title: { ar: "💾 ملفاتي المحفوظة", en: "💾 My Saved Profiles", tr: "💾 Kayıtlı Profillerim", ru: "💾 Мои профили", es: "💾 Mis perfiles" },
  saved_sub: {
    ar: "احتفظ حتى 5 تشكيلات — تبقى محفوظة على جهازك.",
    en: "Keep up to 5 builds — saved on your device.",
    tr: "5 yapıya kadar saklayın — cihazınızda kaydedilir.",
    ru: "Храните до 5 сборок — сохраняются на устройстве.",
    es: "Guarda hasta 5 builds — guardados en tu dispositivo."
  },
  saved_empty: {
    ar: "لا توجد تشكيلات محفوظة بعد — اصنع حساسيتك واحفظها!",
    en: "No saved builds yet — generate and save your sensitivity!",
    tr: "Henüz kayıtlı yapı yok — hassasiyetinizi oluşturun ve kaydedin!",
    ru: "Пока нет сохранённых сборок — создайте и сохраните!",
    es: "Sin builds guardados — ¡genera y guarda!"
  },
  saved_restore: { ar: "⏎ استرجاع التشكيل", en: "⏎ Restore Build", tr: "⏎ Yapıyı Geri Yükle", ru: "⏎ Восстановить", es: "⏎ Restaurar" },

  // ============ PAC ============
  pac_eyebrow: { ar: "NETWORK ACCELERATION · 🇯🇴", en: "NETWORK ACCELERATION · 🇯🇴", tr: "AĞ HIZLANDIRMA · 🇯🇴", ru: "УСКОРЕНИЕ СЕТИ · 🇯🇴", es: "ACELERACIÓN DE RED · 🇯🇴" },
  pac_title: { ar: "سيرفر الأردن للتسريع", en: "Jordan Acceleration Server", tr: "Ürdün Hızlandırma Sunucusu", ru: "Сервер ускорения Иордании", es: "Servidor aceleración Jordania" },
  pac_sub: {
    ar: "يوجّه حركة بيانات PUBG مباشرةً إلى أقرب سيرفر — أقل بنق، فريق أردني، تجنيد سريع.",
    en: "Routes PUBG data directly to nearest server — lower ping, Jordanian team, fast recruitment.",
    tr: "PUBG verilerini en yakın sunucuya yönlendirir — daha düşük ping, Ürdün ekibi.",
    ru: "Направляет данные PUBG на ближайший сервер — меньше пинг, иорданская команда.",
    es: "Dirige datos PUBG al servidor más cercano — menor ping, equipo jordano."
  },
  pac_status: { ar: "الحالة", en: "Status", tr: "Durum", ru: "Статус", es: "Estado" },
  pac_enabled: { ar: "● مُفعَّل", en: "● Active", tr: "● Aktif", ru: "● Активен", es: "● Activo" },
  pac_disabled: { ar: "○ مُعطَّل", en: "○ Inactive", tr: "○ Pasif", ru: "○ Неактивен", es: "○ Inactivo" },
  pac_toggle_on: { ar: "ON", en: "ON", tr: "AÇIK", ru: "ВКЛ", es: "ON" },
  pac_toggle_off: { ar: "OFF", en: "OFF", tr: "KAPALI", ru: "ВЫКЛ", es: "OFF" },
  pac_ready: { ar: "✓ READY", en: "✓ READY", tr: "✓ HAZIR", ru: "✓ ГОТОВ", es: "✓ LISTO" },
  pac_link_label: { ar: "رابط PAC Script", en: "PAC Script URL", tr: "PAC Script URL", ru: "Ссылка PAC", es: "URL PAC" },
  pac_copy: { ar: "📋 نسخ الرابط", en: "📋 Copy Link", tr: "📋 Bağlantıyı Kopyala", ru: "📋 Копировать", es: "📋 Copiar" },
  pac_copied: { ar: "✓ تم النسخ", en: "✓ Copied", tr: "✓ Kopyalandı", ru: "✓ Скопировано", es: "✓ Copiado" },
  pac_open: { ar: "🔗 فتح الرابط", en: "🔗 Open Link", tr: "🔗 Bağlantıyı Aç", ru: "🔗 Открыть", es: "🔗 Abrir" },
  pac_install_title: { ar: "خطوات التثبيت — ", en: "Installation steps — ", tr: "Kurulum adımları — ", ru: "Шаги установки — ", es: "Pasos de instalación — " },
  pac_install_sub: { ar: "ألصق الرابط في المكان المناسب", en: "Paste the link in the appropriate place", tr: "Bağlantıyı uygun yere yapıştırın", ru: "Вставьте ссылку в нужное место", es: "Pega el enlace en el lugar adecuado" },
  pac_step_android_1: { ar: "الإعدادات ← WiFi", en: "Settings ← WiFi", tr: "Ayarlar ← WiFi", ru: "Настройки ← WiFi", es: "Ajustes ← WiFi" },
  pac_step_android_2: { ar: "اضغط مطوّلاً على شبكتك ← تعديل", en: "Long press your network ← Modify", tr: "Ağınıza uzun basın ← Değiştir", ru: "Долгое нажатие на сеть ← Изменить", es: "Mantén presionada tu red ← Modificar" },
  pac_step_android_3: { ar: "خيارات متقدمة ← Proxy ← Proxy Auto-Config", en: "Advanced ← Proxy ← Proxy Auto-Config", tr: "Gelişmiş ← Proxy ← Proxy Auto-Config", ru: "Дополнительно ← Proxy ← Proxy Auto-Config", es: "Avanzado ← Proxy ← Proxy Auto-Config" },
  pac_step_android_4: { ar: "الصق الرابط واحفظ", en: "Paste link and save", tr: "Bağlantıyı yapıştır ve kaydet", ru: "Вставьте ссылку и сохраните", es: "Pega y guarda" },
  pac_step_ios_1: { ar: "الإعدادات ← WiFi", en: "Settings ← WiFi", tr: "Ayarlar ← WiFi", ru: "Настройки ← WiFi", es: "Ajustes ← WiFi" },
  pac_step_ios_2: { ar: "اضغط (i) بجانب شبكتك", en: "Tap (i) next to your network", tr: "Ağınızın yanındaki (i)'ye dokunun", ru: "Нажмите (i) рядом с сетью", es: "Toca (i) junto a tu red" },
  pac_step_ios_3: { ar: "Configure Proxy ← Automatic", en: "Configure Proxy ← Automatic", tr: "Proxy Yapılandır ← Otomatik", ru: "Настроить прокси ← Автоматически", es: "Configurar Proxy ← Automático" },
  pac_step_ios_4: { ar: "الصق الرابط واحفظ", en: "Paste link and save", tr: "Bağlantıyı yapıştır ve kaydet", ru: "Вставьте ссылку и сохраните", es: "Pega y guarda" },
  pac_step_windows_1: { ar: "الإعدادات ← الشبكة والإنترنت", en: "Settings ← Network & Internet", tr: "Ayarlar ← Ağ ve İnternet", ru: "Настройки ← Сеть и Интернет", es: "Ajustes ← Red e Internet" },
  pac_step_windows_2: { ar: "Proxy ← Use a setup script", en: "Proxy ← Use a setup script", tr: "Proxy ← Kurulum betiği kullan", ru: "Прокси ← Использовать сценарий", es: "Proxy ← Usar script" },
  pac_step_windows_3: { ar: "فعّل الخيار والصق الرابط", en: "Enable and paste link", tr: "Etkinleştir ve bağlantıyı yapıştır", ru: "Включите и вставьте ссылку", es: "Activa y pega" },
  pac_tip: {
    ar: "💡 نصيحة: بعد إدخال الرابط، أعد الاتصال بالشبكة ثم افتح PUBG — ستلاحظ انخفاض البنق وتسارع التجنيد.",
    en: "💡 Tip: After entering the link, reconnect to network then open PUBG — you'll notice lower ping and faster recruitment.",
    tr: "💡 İpucu: Bağlantıyı girdikten sonra ağa yeniden bağlanın ve PUBG'yi açın — daha düşük ping fark edeceksiniz.",
    ru: "💡 Совет: После ввода ссылки переподключитесь и откройте PUBG — пинг снизится.",
    es: "💡 Consejo: Tras introducir el enlace, reconecta y abre PUBG — notarás menor ping."
  },
  pac_restart_warn: {
    ar: "⚠️ مهم جداً: بعد إتمام الإعدادات، أعد تشغيل جهازك لضمان تطبيق ملف PAC بشكل كامل وتفعيل توجيه حركة البيانات.",
    en: "⚠️ Very important: After completing settings, restart your device to fully apply PAC and activate data routing.",
    tr: "⚠️ Çok önemli: Ayarları tamamladıktan sonra PAC'yi tam uygulamak için cihazınızı yeniden başlatın.",
    ru: "⚠️ Важно: После настройки перезагрузите устройство для полного применения PAC.",
    es: "⚠️ Importante: Tras completar, reinicia tu dispositivo para aplicar PAC."
  },
  pac_disabled_title: { ar: "السيرفر الأردني مُعطَّل", en: "Jordan Server Inactive", tr: "Ürdün Sunucusu Pasif", ru: "Сервер Иордании неактивен", es: "Servidor Jordania inactivo" },
  pac_disabled_msg: {
    ar: "اضغط على زر التفعيل أعلى للحصول على الرابط وخطوات التثبيت على جهازك.",
    en: "Press the activation button above to get the link and installation steps for your device.",
    tr: "Bağlantıyı ve kurulum adımlarını almak için yukarıdaki etkinleştirme düğmesine basın.",
    ru: "Нажмите кнопку активации выше для получения ссылки и инструкций.",
    es: "Pulsa el botón de activación para obtener el enlace y pasos."
  },
  pac_enable_btn: { ar: "⚡ تفعيل سيرفر الأردن", en: "⚡ Activate Jordan Server", tr: "⚡ Ürdün Sunucusunu Etkinleştir", ru: "⚡ Активировать сервер", es: "⚡ Activar servidor" },
  pac_location: { ar: "الموقع", en: "Location", tr: "Konum", ru: "Местоположение", es: "Ubicación" },
  pac_protocol: { ar: "البروتوكول", en: "Protocol", tr: "Protokol", ru: "Протокол", es: "Protocolo" },
  pac_coverage: { ar: "التغطية", en: "Coverage", tr: "Kapsama", ru: "Покрытие", es: "Cobertura" },
  pac_servers: { ar: "السيرفرات", en: "Servers", tr: "Sunucular", ru: "Серверы", es: "Servidores" },

  // ============ RESTART MODAL ============
  restart_title: { ar: "إعادة التشغيل مطلوبة", en: "Restart Required", tr: "Yeniden Başlatma Gerekli", ru: "Требуется перезагрузка", es: "Reinicio requerido" },
  restart_msg: {
    ar: "لإتمام تفعيل سيرفر الأردن وملف PAC Script، يجب عليك إعادة تشغيل جهازك الآن.",
    en: "To complete activation of Jordan Server and PAC Script, you must restart your device now.",
    tr: "Ürdün Sunucusu ve PAC Script etkinleştirmesini tamamlamak için cihazınızı şimdi yeniden başlatmalısınız.",
    ru: "Для завершения активации сервера Иордании и PAC необходимо перезагрузить устройство.",
    es: "Para completar la activación del servidor Jordania y PAC, reinicia tu dispositivo."
  },
  restart_step1: { ar: "تم نسخ رابط PAC بنجاح", en: "PAC link copied successfully", tr: "PAC bağlantısı başarıyla kopyalandı", ru: "Ссылка PAC скопирована", es: "Enlace PAC copiado" },
  restart_step2: { ar: "الصق الرابط في إعدادات Proxy", en: "Paste link in Proxy settings", tr: "Bağlantıyı Proxy ayarlarına yapıştırın", ru: "Вставьте ссылку в настройки прокси", es: "Pega en ajustes de Proxy" },
  restart_step3: { ar: "أعد تشغيل الجهاز لتطبيق التغييرات", en: "Restart device to apply changes", tr: "Değişiklikleri uygulamak için cihazı yeniden başlatın", ru: "Перезагрузите устройство", es: "Reinicia para aplicar cambios" },
  restart_confirm: { ar: "فهمتا، سأقوم بذلك", en: "Got it, I'll do that", tr: "Anladım, yapacağım", ru: "Понял, сделаю", es: "Entendido, lo haré" },

  // ============ FOOTER ============
  footer_about: {
    ar: "مشروع شخصي من مطوّر أردني يهدف لتقديم أفضل تجربة ممكنة للاعبي PUBG Mobile في الأردن — بدون قيم عشوائية، بدون أنظمة وهمية.",
    en: "Personal project by a Jordanian developer aiming to provide the best PUBG Mobile experience in Jordan — no random values, no fake systems.",
    tr: "Ürdün'deki bir geliştiricinin Ürdün'de en iyi PUBG Mobile deneyimini sunmayı amaçlayan kişisel projesi — rastgele değer yok, sahte sistem yok.",
    ru: "Личный проект иорданского разработчика для лучшего опыта PUBG в Иордании — без случайных значений.",
    es: "Proyecto personal de desarrollador jordano para la mejor experiencia PUBG en Jordania."
  },
  footer_contact: { ar: "تواصل", en: "Contact", tr: "İletişim", ru: "Контакты", es: "Contacto" },
  footer_features: { ar: "ميزات", en: "Features", tr: "Özellikler", ru: "Возможности", es: "Características" },
  footer_f1: { ar: "✓ 77 جهاز مدعوم", en: "✓ 77 supported devices", tr: "✓ 77 desteklenen cihaz", ru: "✓ 77 устройств", es: "✓ 77 dispositivos" },
  footer_f2: { ar: "✓ 44 سلاح · آخر تحديث PUBG", en: "✓ 44 weapons · latest PUBG update", tr: "✓ 44 silah · en son PUBG güncellemesi", ru: "✓ 44 оружия · последнее обновление", es: "✓ 44 armas · última actualización" },
  footer_f3: { ar: "✓ 6 سيرفرات قياس حي", en: "✓ 7 live ping servers", tr: "✓ 7 canlı ping sunucusu", ru: "✓ 7 серверов пинга", es: "✓ 7 servidores ping" },
  footer_f4: { ar: "✓ PAC Script لـ Zain · Orange · Umniah", en: "✓ PAC for Zain · Orange · Umniah", tr: "✓ Zain · Orange · Umniah için PAC", ru: "✓ PAC для Zain · Orange · Umniah", es: "✓ PAC para Zain · Orange · Umniah" },
  footer_f5: { ar: "✓ AWS ME + Tencent Cloud", en: "✓ AWS ME + Tencent Cloud", tr: "✓ AWS ME + Tencent Cloud", ru: "✓ AWS ME + Tencent Cloud", es: "✓ AWS ME + Tencent Cloud" },
  footer_rights: { ar: "© 2026 ALYAZOURI — All rights reserved.", en: "© 2026 ALYAZOURI — All rights reserved.", tr: "© 2026 ALYAZOURI — Tüm hakları saklıdır.", ru: "© 2026 ALYAZOURI — Все права защищены.", es: "© 2026 ALYAZOURI — Todos los derechos reservados." },
  footer_tagline: { ar: "NO FAKE SYSTEMS · NO RANDOM VALUES", en: "NO FAKE SYSTEMS · NO RANDOM VALUES", tr: "SAHTE SİSTEM YOK · RASTGELE DEĞER YOK", ru: "БЕЗ ФАЛЬШИВЫХ СИСТЕМ", es: "SIN SISTEMAS FALSOS" },

  // ============ HERO ADDITIONAL ============
  hero_tiktok: { ar: "TikTok", en: "TikTok", tr: "TikTok", ru: "TikTok", es: "TikTok" },
  hero_instagram: { ar: "Instagram", en: "Instagram", tr: "Instagram", ru: "Instagram", es: "Instagram" },
  hero_pubg_id: { ar: "PUBG ID", en: "PUBG ID", tr: "PUBG ID", ru: "PUBG ID", es: "PUBG ID" },
  hero_devices_sub: { ar: "iPhone · Android · ROG", en: "iPhone · Android · ROG", tr: "iPhone · Android · ROG", ru: "iPhone · Android · ROG", es: "iPhone · Android · ROG" },
  hero_weapons_sub: { ar: "AR · SMG · Sniper", en: "AR · SMG · Sniper", tr: "AR · SMG · Sniper", ru: "AR · SMG · Sniper", es: "AR · SMG · Sniper" },
  hero_servers_sub: { ar: "ME · AWS · Tencent", en: "ME · AWS · Tencent", tr: "ME · AWS · Tencent", ru: "ME · AWS · Tencent", es: "ME · AWS · Tencent" },
  hero_conqueror_build: { ar: "🏆 Conqueror Build", en: "🏆 Conqueror Build", tr: "🏆 Conqueror Build", ru: "🏆 Conqueror Build", es: "🏆 Conqueror Build" },
  hero_fps_ready: { ar: "⚡ 120 FPS Ready", en: "⚡ 120 FPS Ready", tr: "⚡ 120 FPS Ready", ru: "⚡ 120 FPS Ready", es: "⚡ 120 FPS Ready" },
  hero_geolocation: { ar: "Geolocation", en: "Geolocation", tr: "Geolocation", ru: "Geolocation", es: "Geolocation" },

  // ============ HUD ============
  hud_alive: { ar: "أحياء", en: "ALIVE", tr: "HAYATTA", ru: "ЖИВЫХ", es: "VIVOS" },
  hud_kills: { ar: "قتلى", en: "KILLS", tr: "ÖLDÜRME", ru: "УБИЙСТВ", es: "MUERTES" },
  hud_active: { ar: "نشط", en: "Active", tr: "Aktif", ru: "Активно", es: "Activo" },

  // ============ PING ADDITIONAL ============
  ping_live: { ar: "LIVE · PING MONITOR", en: "LIVE · PING MONITOR", tr: "CANLI · PING MONİTÖRÜ", ru: "LIVE · МОНИТОР ПИНГА", es: "EN VIVO · MONITOR PING" },
  ping_live_title: { ar: "📡 قياس البنق الحي", en: "📡 Live Ping Measurement", tr: "📡 Canlı Ping Ölçümü", ru: "📡 Измерение пинга", es: "📡 Medición de ping en vivo" },
  ping_live_desc: {
    ar: "يقيس هذا النظام البنق الفعلي لكل سيرفر PUBG Mobile من موقعك في الأردن ويختار السيرفر الأمثل تلقائياً لأقل تأخير وأسرع تجنيد.",
    en: "This system measures actual ping to every PUBG Mobile server from your location in Jordan and automatically selects the optimal server for lowest latency and fastest recruitment.",
    tr: "Bu sistem, Ürdün'deki konumunuzdan her PUBG Mobile sunucusuna gerçek ping'i ölçer ve en düşük gecikme için optimum sunucuyu otomatik seçer.",
    ru: "Эта система измеряет реальный пинг до каждого сервера PUBG из Иордании и автоматически выбирает оптимальный.",
    es: "Este sistema mide el ping real a cada servidor PUBG desde Jordania y selecciona automáticamente el óptimo."
  },

  // ============ STABILITY ADDITIONAL ============
  stab_equation_label: { ar: "المعادلة:", en: "Equation:", tr: "Denklem:", ru: "Уравнение:", es: "Ecuación:" },
  stab_desc: {
    ar: "الجهاز يؤثر عبر FPS + Touch Rate + حجم الشاشة + جودة الجايرو",
    en: "Device affects via FPS + Touch Rate + Screen Size + Gyro Quality",
    tr: "Cihaz FPS + Dokunma Hızı + Ekran Boyutu + Jiroskop Kalitesi ile etkiler",
    ru: "Устройство влияет через FPS + Touch Rate + Экран + Гиро",
    es: "Dispositivo afecta vía FPS + Touch + Pantalla + Giro"
  },

  // ============ STATUS BAR ============
  status_device: { ar: "جهاز", en: "Device", tr: "Cihaz", ru: "Устройство", es: "Disp." },

  // ============ BRANDS ============
  brand_apple: { ar: "Apple", en: "Apple", tr: "Apple", ru: "Apple", es: "Apple" },
  brand_samsung: { ar: "Samsung", en: "Samsung", tr: "Samsung", ru: "Samsung", es: "Samsung" },
  brand_xiaomi: { ar: "Xiaomi", en: "Xiaomi", tr: "Xiaomi", ru: "Xiaomi", es: "Xiaomi" },
  brand_rog: { ar: "ASUS ROG", en: "ASUS ROG", tr: "ASUS ROG", ru: "ASUS ROG", es: "ASUS ROG" },
  brand_oneplus: { ar: "OnePlus", en: "OnePlus", tr: "OnePlus", ru: "OnePlus", es: "OnePlus" },
  brand_oppo: { ar: "OPPO", en: "OPPO", tr: "OPPO", ru: "OPPO", es: "OPPO" },
  brand_realme: { ar: "Realme", en: "Realme", tr: "Realme", ru: "Realme", es: "Realme" },
  brand_huawei: { ar: "Huawei", en: "Huawei", tr: "Huawei", ru: "Huawei", es: "Huawei" },
  brand_gaming: { ar: "Gaming", en: "Gaming", tr: "Gaming", ru: "Gaming", es: "Gaming" },
};

export function t(key: keyof typeof translations, lang: Lang): string {
  return translations[key]?.[lang] ?? translations[key]?.en ?? key;
}
