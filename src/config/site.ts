export type Locale = "tr" | "en";

export type SocialLink = {
  label: string;
  handle: string;
  url: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  tags: string[];
  filters: string[];
};

export type ServiceFilterItem = {
  id: string;
  label: string;
};

export type CounterMetric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type ProofPillar = {
  title: string;
  detail: string;
};

export type StoryMoment = {
  year: string;
  title: string;
  detail: string;
};

export type ProofQuote = {
  quote: string;
  author: string;
  role: string;
};

export type TrustMetric = {
  label: string;
  value: number;
  summary: string;
};

export type PackageTier = {
  name: string;
  subtitle: string;
  points: string[];
  featured?: boolean;
};

export type BeforeAfterRow = {
  label: string;
  before: string;
  after: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type QuoteWizardConfig = {
  title: string;
  intro: string;
  stepLabels: string[];
  prompts: {
    service: string;
    budget: string;
    timeline: string;
    note: string;
  };
  options: {
    services: string[];
    budgets: string[];
    timelines: string[];
  };
  notePlaceholder: string;
  buttons: {
    back: string;
    next: string;
    send: string;
  };
  readyLabel: string;
};

export type ServiceComparison = {
  title: string;
  intro: string;
  standardLabel: string;
  premiumLabel: string;
  standardPoints: string[];
  premiumPoints: string[];
};

export type CaseStudy = {
  title: string;
  situation: string;
  solution: string;
  result: string;
  tags: string[];
};

export type SiteConfig = {
  displayName: string;
  nav: {
    home: string;
    about: string;
    work: string;
    process: string;
    proof: string;
    contact: string;
  };
  localeLabel: string;
  commandShortcutLabel: string;
  buttons: {
    primary: string;
    secondary: string;
    openCase: string;
  };
  tagline: string;
  microLine: string;
  slogan: string;
  statusChip: string;
  heroSignatureLine: string;
  aboutTitle: string;
  aboutEyebrow: string;
  aboutIntro: string;
  aboutParagraphs: string[];
  factsTitle: string;
  quickFacts: string[];
  workTitle: string;
  workEyebrow: string;
  workIntro: string;
  serviceFilters: ServiceFilterItem[];
  services: ServiceItem[];
  caseStudies: CaseStudy[];
  packageTitle: string;
  packageEyebrow: string;
  packageIntro: string;
  packageTiers: PackageTier[];
  beforeAfter: {
    title: string;
    eyebrow: string;
    beforeLabel: string;
    afterLabel: string;
    rows: BeforeAfterRow[];
  };
  processTitle: string;
  processEyebrow: string;
  processSteps: ProcessStep[];
  proofTitle: string;
  proofEyebrow: string;
  proofIntro: string;
  proofPillars: ProofPillar[];
  storyTitle: string;
  storyEyebrow: string;
  storyMoments: StoryMoment[];
  comparison: ServiceComparison;
  proofQuotes: ProofQuote[];
  reelWords: string[];
  trustMetrics: TrustMetric[];
  quoteWizard: QuoteWizardConfig;
  highlights: string[];
  counterMetrics: CounterMetric[];
  contactTitle: string;
  contactLine: string;
  contactHint: string;
  finalCtaEyebrow: string;
  finalCtaLine: string;
  faqTitle: string;
  faqEyebrow: string;
  faqIntro: string;
  faqItems: FaqItem[];
  faqCtaLabel: string;
  exitCtaTitle: string;
  exitCtaLine: string;
  exitCtaPrimary: string;
  exitCtaSecondary: string;
  commandTitle: string;
  commandHint: string;
  commandPlaceholder: string;
  commandEmpty: string;
  mobileCtaLabel: string;
  mobileCtaHint: string;
  caseLabels: {
    situation: string;
    solution: string;
    result: string;
    close: string;
    previous: string;
    next: string;
    progress: string;
    eyebrow: string;
    keyboardHint: string;
    sceneNote: string;
  };
  seo: {
    title: string;
    description: string;
    ogDescription: string;
    twitterDescription: string;
    keywords: string[];
  };
  socials: {
    telegram: SocialLink;
    instagram: SocialLink;
  };
};

const baseSocials = {
  telegram: {
    label: "Telegram",
    handle: "@donsalvatoree",
    url: "https://t.me/donsalvatoree",
  },
  instagram: {
    label: "Instagram",
    handle: "@donsalvatoore",
    url: "https://instagram.com/donsalvatoore",
  },
} satisfies SiteConfig["socials"];

const trConfig: SiteConfig = {
  displayName: "Salvatoré",
  nav: {
    home: "Ana Sayfa",
    about: "Ben Kimim",
    work: "Hizmetler",
    process: "Süreç",
    proof: "Güven",
    contact: "İletişim",
  },
  localeLabel: "TR / EN",
  commandShortcutLabel: "Kısayol",
  buttons: {
    primary: "İş Çıkaralım",
    secondary: "Neler Yapıyorum?",
    openCase: "Genişlet",
  },
  tagline: "Web, script, kripto ve finans tarafında düzenli çalışan operasyon altyapısı kurarım.",
  microLine: "2017’den beri aynı çizgi: net plan, hızlı teslim, temiz sonuç.",
  slogan: "Don Salvatore bir markadır.",
  statusChip: "İletişime Açık",
  heroSignatureLine: "Web • Script • Kripto • Finans • Reklam",
  aboutTitle: "Ben kimim?",
  aboutEyebrow: "hakkımda",
  aboutIntro:
    "Burada amaç havalı görünmek değil, müşterinin gerçekten işine yarayan düzeni kurmak. Çizgi net, sonuç odak net.",
  aboutParagraphs: [
    "2017’de Discord’da başladım, sonra Telegram’a geçtim. Platform değişti ama kalite standardım hiç değişmedi.",
    "Müşterinin ihtiyacı neyse oradan girerim: script paketi, kurulum, özelleştirme veya komple akış düzeni.",
    "Kripto, finans ve banka tarafındaki hareketleri daha okunur, daha düzenli bir yapıya çeviririm. Gereksiz karmaşayı temizler, kontrolü artırırım.",
    "Reklam tarafında da süreçleri izlenebilir hale getiririm; bütçe, akış ve sonuç aynı masada net görünür.",
  ],
  factsTitle: "Müşteri İçin Net Tablo",
  quickFacts: [
    "2017’den beri aktif",
    "Discord → Telegram geçişi",
    "Web altyapıları / script paketleri",
    "Özelleştirme + kurulum",
    "Kripto işlem akış takibi",
    "Finans + banka hareket düzeni",
    "Reklam süreçlerinde kontrol ve rapor",
    "Hızlı teslim",
    "İletişim net",
  ],
  workTitle: "Hizmet Alanları",
  workEyebrow: "hizmet kapsamı",
  workIntro:
    "Hedef: net operasyon, hızlı teslim ve sürdürülebilir düzen.",
  serviceFilters: [
    { id: "all", label: "Hepsi" },
    { id: "script", label: "Script" },
    { id: "crypto", label: "Kripto" },
    { id: "finance", label: "Finans" },
    { id: "ads", label: "Reklam" },
  ],
  services: [
    {
      title: "Website Altyapıları",
      description:
        "İş yüküne dayanıklı ve sürdürülebilir web altyapıları kurulup optimize edilir.",
      tags: ["Mimari", "Performans", "Ölçek"],
      filters: ["all", "script"],
    },
    {
      title: "Hazır Script Paketleri",
      description:
        "Modüler script paketleriyle devreye alma süreci hızlandırılır ve standart hale getirilir.",
      tags: ["Hazır Paket", "Modüler", "Hızlı Başlangıç"],
      filters: ["all", "script"],
    },
    {
      title: "Kurulum & Özelleştirme",
      description:
        "Kurulum sonrası ihtiyaçlara göre özelleştirme, test ve stabilizasyon uygulanır.",
      tags: ["Kurulum", "Özelleştirme", "Stabilite"],
      filters: ["all", "script"],
    },
    {
      title: "Kripto Süreç Kurgusu",
      description:
        "Kripto işlem akışı tek düzene alınır; izleme, kontrol ve karar görünürlüğü güçlendirilir.",
      tags: ["Kripto", "Takip", "Düzen"],
      filters: ["all", "crypto"],
    },
    {
      title: "Finans Akış Düzeni",
      description:
        "Finans ve banka hareketleri düzenli tablo ve rapor standardına taşınır.",
      tags: ["Finans", "Banka", "Rapor"],
      filters: ["all", "finance"],
    },
    {
      title: "Bakiye ve Hareket Takibi",
      description:
        "Bakiye ve hareket verisi tek görünümde toplanarak günlük kontrol kolaylaştırılır.",
      tags: ["Bakiye", "Takip", "Görünürlük"],
      filters: ["all", "finance", "crypto"],
    },
    {
      title: "Reklam Süreç Yönetimi",
      description:
        "Reklam bütçesi, süreç takibi ve performans çıktıları tek ritimde yönetilir.",
      tags: ["Reklam", "Bütçe", "Özet"],
      filters: ["all", "ads"],
    },
  ],
  caseStudies: [
    {
      title: "Script Satış Akışı Revizyonu",
      situation: "Müşteri tarafında script talepleri dağınık geliyordu ve cevap süreleri uzuyordu.",
      solution:
        "Katalog + hızlı yönlendirme + sipariş akışını tek düzen altında topladım, süreç adımlarını sadeleştirdim.",
      result: "Talep yönetimi netleşti, müşteri bekleme süresi düştü, satış tarafı daha stabil hale geldi.",
      tags: ["Script", "Akış", "Stabilite"],
    },
    {
      title: "Kripto Takip Panel Kurgusu",
      situation: "İşlem akışları farklı kanallara dağılmıştı, günlük kontrol süresi uzuyordu.",
      solution:
        "Takip ve durum görünürlüğünü tek panel düzeninde birleştirdim, kritik metrikleri öne aldım.",
      result: "Kontrol süresi kısaldı, hata payı düştü, operasyon kararları daha hızlı verilmeye başladı.",
      tags: ["Kripto", "Panel", "Kontrol"],
    },
    {
      title: "Finans + Banka Akış Toparlama",
      situation: "Hareketler okunmuyordu, raporlar geç hazırlanıyor ve gün sonu kontrolü zorlanıyordu.",
      solution: "Tablo yapısını sadeleştirip rapor şablonlarını standardize ettim, düzenli kontrol hattı kurdum.",
      result: "Gün sonu görünürlüğü arttı, rapor akışı hızlandı, karar süreci daha net hale geldi.",
      tags: ["Finans", "Banka", "Rapor"],
    },
    {
      title: "Reklam Süreç Yoğunluk Yönetimi",
      situation: "Kampanya trafiği artınca kontrol dağılmaya başladı.",
      solution:
        "Bütçe, dağıtım ve sonuç takibini tek ritimde toplayan kontrol ekranı ve rutin akış kurdum.",
      result: "Reklam yönetimi sakinleşti, bütçe görünürlüğü arttı, sonuç takibi hızlandı.",
      tags: ["Reklam", "Bütçe", "Takip"],
    },
  ],
  packageTitle: "Paket Seviyeleri",
  packageEyebrow: "seviye seçimi",
  packageIntro:
    "Fiyat etiketi değil, işin kapsam farkı. Müşteri hedefi büyüdükçe seviyeyi yükseltir, akış gücü katlanır.",
  packageTiers: [
    {
      name: "Core",
      subtitle: "Temel kurulum + hızlı başlangıç",
      points: [
        "Temel yapı kurulumu",
        "Hazır script paketi entegrasyonu",
        "Kısa teslim planı",
      ],
    },
    {
      name: "Pro",
      subtitle: "Kurulum + süreç düzeni",
      points: [
        "Kurulum ve özelleştirme",
        "Kripto/finans akışı için görünür kontrol",
        "Rapor düzeni ve süreç netliği",
      ],
    },
    {
      name: "Özel",
      subtitle: "Geniş kapsamlı operasyon sistemi",
      featured: true,
      points: [
        "Script + kripto + finans + reklam ritmi",
        "Operasyon akışının uçtan uca kurgusu",
        "Yüksek hızda düzenli teslim standardı",
      ],
    },
  ],
  beforeAfter: {
    title: "Dağınık Akıştan Kontrollü Akışa",
    eyebrow: "before / after",
    beforeLabel: "Önce",
    afterLabel: "Sonra",
    rows: [
      {
        label: "Talep Yönetimi",
        before: "Mesajlar dağınık, cevap süresi dengesiz",
        after: "Tek düzen, hızlı ve net dönüş",
      },
      {
        label: "Kripto + Finans",
        before: "Farklı kanallarda kopuk takip",
        after: "Panel düzeninde tek bakışta görünürlük",
      },
      {
        label: "Reklam Akışı",
        before: "Bütçe ve çıktı takibi yorucu",
        after: "Süreç ritmi net, kontrol sakin",
      },
      {
        label: "Gün Sonu",
        before: "Raporlama sonradan toparlanır",
        after: "Karar verdiren kısa ve temiz özet",
      },
    ],
  },
  processTitle: "Nasıl ilerliyorum?",
  processEyebrow: "süreç",
  processSteps: [
    {
      title: "Brief Netleşir",
      detail:
        "Hedef, öncelik ve beklentiyi hızlıca netliyoruz. Kimin ne istediği ilk dakikada belli oluyor.",
    },
    {
      title: "Plan Çıkar",
      detail:
        "Script, kripto-finans akışı ve reklam tarafı için uygulanabilir bir yol haritası kuruluyor.",
    },
    {
      title: "Kurulum + İnce Ayar",
      detail:
        "Sistem devreye alınır, işleyişe göre optimize edilir. Dağınık görüntü toparlanır, süreç akıcı hale gelir.",
    },
    {
      title: "Kontrol + Teslim",
      detail:
        "Son kontrol sonrası kullanım hazır teslim yapılır. Müşteri tarafında günlük yönetim yükü düşer.",
    },
  ],
  storyTitle: "Yolculuk",
  storyEyebrow: "2017'den bugüne",
  storyMoments: [
    {
      year: "2017",
      title: "Discord Sahnesi",
      detail: "İlk çekirdek burada kuruldu. İletişim hızlı, üretim disiplinli, kalite çizgisi nettir.",
    },
    {
      year: "2019",
      title: "Script Altyapıları Derinleşti",
      detail: "Hazır paketler ve özel kurulumlar daha güçlü bir standarda oturdu, teslim ritmi hızlandı.",
    },
    {
      year: "2021",
      title: "Telegram'a Geçiş",
      detail: "Kimlik aynı kaldı, kalite daha da keskinleşti. Süreçler daha düzenli, müşteri akışı daha oturmuş hale geldi.",
    },
    {
      year: "Bugün",
      title: "Script + Kripto + Finans + Reklam Akışı",
      detail:
        "Tek odak: müşterinin işini büyüten, karmaşayı azaltan ve günlük operasyonu kontrol altında tutan sistemler.",
    },
  ],
  comparison: {
    title: "Standart Kurulum / Özel Kurulum",
    intro: "Aynı başlık altında kapsam farkı teslim kalitesini doğrudan etkiler.",
    standardLabel: "Standart",
    premiumLabel: "Özel",
    standardPoints: [
      "Temel kurulum yapılır",
      "Parça parça takip gerekir",
      "Raporlama sonradan toparlanır",
      "İletişim çoğu zaman dağınık ilerler",
    ],
    premiumPoints: [
      "Kurulum ve süreç kurgusu birlikte planlanır",
      "Kripto, finans ve reklam tarafı tek düzende izlenir",
      "Kontrol panosu ve takip düzeni ilk günden aktif olur",
      "Hızlı dönüş, net iletişim, düzenli teslim standardı",
    ],
  },
  proofTitle: "Neden güven veriyor?",
  proofEyebrow: "güven unsurları",
  proofIntro:
    "Müşteri içeride kaldığında sebep tasarım değil sadece; akışın netliği, teslimin hızı ve sürecin güven vermesi.",
  proofPillars: [
    {
      title: "Kalite Disiplini",
      detail: "Her işte aynı kalite standardı. Parça parça değil, sistemli ve kontrollü teslim.",
    },
    {
      title: "Hızlı Dönüş",
      detail: "Müşteri beklemez. Talepler kısa sürede net plana dönüşür ve süreç hızlı başlar.",
    },
    {
      title: "Güvenli İletişim",
      detail: "Konular uzamaz; net, sakin ve iş odaklı iletişimle süreç gereksiz gerginliğe girmez.",
    },
    {
      title: "Sonuç Odak",
      detail: "Amaç yalnızca gösterişli ekran değil, müşterinin operasyonunu gerçekten kolaylaştıran sonuç.",
    },
  ],
  proofQuotes: [
    {
      quote: "Script tarafında hızlandıktan sonra müşteri dönüşlerimiz çok daha kontrollü hale geldi.",
      author: "A.K.",
      role: "Dijital Servis",
    },
    {
      quote: "Kripto ve finans akışını tek düzende görmek karar almayı ciddi şekilde kolaylaştırdı.",
      author: "M.Y.",
      role: "Operasyon Yönetimi",
    },
    {
      quote: "Reklam süreçlerinde dağınıklık bitti, artık neye ne kadar çıktığımız net.",
      author: "S.E.",
      role: "Büyüme Ekibi",
    },
    {
      quote: "İletişim kısa ve net. Konu uzamadan çözüm masaya geliyor.",
      author: "B.T.",
      role: "Kurucu",
    },
  ],
  reelWords: [
    "Script satış düzeni",
    "Kripto süreç kontrolü",
    "Finans + banka görünürlüğü",
    "Reklam operasyon ritmi",
    "Düzenli teslim standardı",
  ],
  trustMetrics: [
    {
      label: "Hızlı Dönüş",
      value: 96,
      summary: "DM sonrası kısa sürede net plan",
    },
    {
      label: "Süreç Görünürlüğü",
      value: 94,
      summary: "Kripto + finans + reklam aynı panel düzeninde",
    },
    {
      label: "Teslim Disiplini",
      value: 98,
      summary: "Planlanan çizgide temiz teslim standardı",
    },
  ],
  quoteWizard: {
    title: "Hızlı Talep Formu",
    intro: "Kısa bilgilerle talebini ilet, net planla hızlıca başlayalım.",
    stepLabels: ["Hizmet", "Bütçe", "Süre", "Not"],
    prompts: {
      service: "Hangi ana başlık lazım?",
      budget: "Bütçe aralığın nedir?",
      timeline: "Ne kadar sürede başlamamız lazım?",
      note: "Kısa not bırak (opsiyonel)",
    },
    options: {
      services: [
        "Script paketi / kurulum",
        "Kripto süreç düzeni",
        "Finans + banka akış düzeni",
        "Reklam süreç yönetimi",
      ],
      budgets: ["10k - 25k", "25k - 50k", "50k - 100k", "100k+"],
      timelines: ["Acil (24 saat)", "Bu hafta", "Bu ay", "Planlı başlatım"],
    },
    notePlaceholder: "Hedefini tek cümle yazman yeterli.",
    buttons: {
      back: "Geri",
      next: "Devam",
      send: "Telegram'a Gönder",
    },
    readyLabel: "Hazır mesaj",
  },
  highlights: [
    "Script satış düzeni",
    "Kripto takip düzeni",
    "Finans + banka görünürlüğü",
    "Reklam süreç kontrolü",
    "Düzenli teslim",
  ],
  counterMetrics: [
    { label: "Sahnede", value: 2017, suffix: "+" },
    { label: "Teslim", value: 24, suffix: "s" },
    { label: "Odak", value: 100, suffix: "%" },
    { label: "Kalite", value: 1, suffix: "st" },
  ],
  contactTitle: "İletişim",
  contactLine: "İhtiyacını net yaz, kapsamı birlikte belirleyelim ve süreci hızlıca başlatalım.",
  contactHint: "İlk mesaj: hizmet türü + hedef + teslim süresi",
  finalCtaEyebrow: "Hızlı Başlangıç",
  finalCtaLine: "Hedefi net yaz, en doğru akışı hızlıca çıkaralım. Karmaşayı değil sonucu konuşalım.",
  faqTitle: "Sık Sorulanlar",
  faqEyebrow: "itiraz kırıcı",
  faqIntro: "Kararsız kalan müşterinin aklındaki sorulara kısa ve net cevaplar.",
  faqItems: [
    {
      question: "Teslim gerçekten hızlı mı?",
      answer: "Evet. İş kapsamı netleştiği an plan çıkıyor ve bekletmeden devreye alınıyor.",
    },
    {
      question: "Süreç boyunca iletişim nasıl ilerliyor?",
      answer: "Kısa, net ve sonuç odaklı. Konu uzamadan karar noktaları hızlı kapanıyor.",
    },
    {
      question: "Sadece script mi, yoksa süreç yönetimi de var mı?",
      answer: "Scriptin yanında kripto, finans ve reklam akışı için operasyon düzeni de kurulur.",
    },
    {
      question: "Kurulumdan sonra yalnız mı kalıyorum?",
      answer: "Hayır. Kullanım hattı net bırakılır, kritik geçişler kontrollü tamamlanır.",
    },
    {
      question: "Bu yapı küçük ekiplerde de çalışır mı?",
      answer: "Evet. Karmaşayı azaltıp görünürlüğü artırdığı için küçük ekipte daha da hızlı sonuç verir.",
    },
  ],
  faqCtaLabel: "Talep formunu aç",
  exitCtaTitle: "Hazırsan başlatalım",
  exitCtaLine: "Çıkmadan önce hedefini yaz, Telegram’dan hızlı planı atalım.",
  exitCtaPrimary: "Telegram'dan Başlat",
  exitCtaSecondary: "Bana Teklif Çıkar",
  commandTitle: "Kısa Yol",
  commandHint: "Ctrl/Cmd + K",
  commandPlaceholder: "Bölüm ara...",
  commandEmpty: "Komut bulunamadı.",
  mobileCtaLabel: "Telegram'dan Yaz",
  mobileCtaHint: "Hızlı dönüş",
  caseLabels: {
    situation: "Durum",
    solution: "Çözüm",
    result: "Sonuç",
    close: "Kapat",
    previous: "Önceki",
    next: "Sonraki",
    progress: "İlerleme",
    eyebrow: "vaka özeti",
    keyboardHint: "Esc kapatır • Ok tuşları kartları gezer",
    sceneNote: "Bu kart, müşterinin dağınık akıştan kontrollü düzene geçişinin kısa operasyon özetidir.",
  },
  seo: {
    title: "Don Salvatore bir markadır | Script, Kripto ve Finans",
    description:
      "Salvatoré: 2017’den beri script paketleri, kripto-finans süreç düzeni, reklam akışı ve web altyapısında net, hızlı, temiz çözümler.",
    ogDescription:
      "Discord’dan Telegram’a taşınan aynı kalite: script paketleri, kripto-finans düzeni, reklam süreç kontrolü ve web altyapı kurgusu.",
    twitterDescription:
      "Script paketleri, kripto-finans süreç düzeni ve reklam yönetimine odaklanan profesyonel profil sayfası.",
    keywords: [
      "Salvatore",
      "script paketleri",
      "kripto süreç düzeni",
      "finans akış yönetimi",
      "reklam süreç yönetimi",
    ],
  },
  socials: baseSocials,
};

const enConfig: SiteConfig = {
  displayName: "Salvatoré",
  nav: {
    home: "Home",
    about: "About",
    work: "Services",
    process: "Process",
    proof: "Trust",
    contact: "Contact",
  },
  localeLabel: "EN / TR",
  commandShortcutLabel: "Shortcut",
  buttons: {
    primary: "Let's Build",
    secondary: "What I Do",
    openCase: "Expand",
  },
  tagline: "I build structured web and operations systems across script, crypto, finance, and ads.",
  microLine: "Since 2017: clear plans, fast delivery, clean execution.",
  slogan: "Don Salvatore is a brand.",
  statusChip: "Available",
  heroSignatureLine: "Web • Script • Crypto • Finance • Ads",
  aboutTitle: "Who am I?",
  aboutEyebrow: "about",
  aboutIntro:
    "This page is not about looking cool. It is about creating a structure that truly works for clients.",
  aboutParagraphs: [
    "I started on Discord in 2017, then moved to Telegram. Platforms changed, quality standards did not.",
    "I enter where the client needs support: script packs, setup, customization, or a full process structure.",
    "I turn crypto, finance, and banking flows into cleaner and more readable operations with better control.",
    "I also structure ad workflows so budget, flow, and outcomes stay visible on one clear board.",
  ],
  factsTitle: "Client-Centric Snapshot",
  quickFacts: [
    "Active since 2017",
    "Discord to Telegram transition",
    "Web infrastructure / script packs",
    "Customization + setup",
    "Crypto process tracking",
    "Finance + banking flow structure",
    "Ad process control and reporting",
    "Fast delivery",
    "Clear communication",
  ],
  workTitle: "Service Scope",
  workEyebrow: "operations",
  workIntro:
    "Focused on clear operations, fast delivery, and sustainable structure.",
  serviceFilters: [
    { id: "all", label: "All" },
    { id: "script", label: "Script" },
    { id: "crypto", label: "Crypto" },
    { id: "finance", label: "Finance" },
    { id: "ads", label: "Ads" },
  ],
  services: [
    {
      title: "Website Infrastructure",
      description: "I build and optimize resilient web infrastructure for stable, scalable execution.",
      tags: ["Architecture", "Performance", "Scale"],
      filters: ["all", "script"],
    },
    {
      title: "Ready Script Packs",
      description: "Modular script packages that accelerate launch and standardize delivery.",
      tags: ["Ready Pack", "Modular", "Fast Start"],
      filters: ["all", "script"],
    },
    {
      title: "Setup & Customization",
      description: "Setup, operational customization, and stabilization aligned to your workflow.",
      tags: ["Setup", "Customization", "Stability"],
      filters: ["all", "script"],
    },
    {
      title: "Crypto Process Design",
      description: "Crypto transaction flow is structured into a single, controlled, readable process.",
      tags: ["Crypto", "Tracking", "Structure"],
      filters: ["all", "crypto"],
    },
    {
      title: "Finance Flow Structure",
      description: "Finance and banking movements are aligned into clear reporting and faster control cycles.",
      tags: ["Finance", "Banking", "Reports"],
      filters: ["all", "finance"],
    },
    {
      title: "Balance & Movement Tracking",
      description: "Balance and movement visibility is centralized for faster daily decisions.",
      tags: ["Balance", "Tracking", "Visibility"],
      filters: ["all", "finance", "crypto"],
    },
    {
      title: "Ad Operations Management",
      description: "Ad budget, execution, and output monitoring are managed in one clear control loop.",
      tags: ["Ads", "Budget", "Control"],
      filters: ["all", "ads"],
    },
  ],
  caseStudies: [
    {
      title: "Script Sales Flow Overhaul",
      situation: "Script requests were fragmented and response times were inconsistent.",
      solution: "I built a unified catalog and order flow with simplified steps.",
      result: "Client wait time dropped and sales operations became more stable.",
      tags: ["Script", "Flow", "Stability"],
    },
    {
      title: "Crypto Tracking Control Panel",
      situation: "Transaction tracking lived across scattered channels.",
      solution: "I consolidated status and key metrics into one clean control view.",
      result: "Daily control time decreased and decisions became faster.",
      tags: ["Crypto", "Panel", "Control"],
    },
    {
      title: "Finance + Banking Streamline",
      situation: "Movements were hard to read and reporting took too long.",
      solution: "I standardized table logic and reporting structure.",
      result: "End-of-day visibility improved and reporting speed increased.",
      tags: ["Finance", "Banking", "Reports"],
    },
    {
      title: "Ad Workflow Stabilization",
      situation: "Campaign scale increased and control started to drift.",
      solution: "I set a rhythm for budget, delivery, and outcome monitoring.",
      result: "Ad operations became calmer with stronger budget visibility.",
      tags: ["Ads", "Budget", "Tracking"],
    },
  ],
  packageTitle: "Package Levels",
  packageEyebrow: "tier selection",
  packageIntro:
    "Not about pricing labels, about scope power. As the target grows, the tier upgrades and control quality compounds.",
  packageTiers: [
    {
      name: "Core",
      subtitle: "Base setup + fast launch",
      points: [
        "Foundation setup",
        "Ready script pack integration",
        "Fast delivery plan",
      ],
    },
    {
      name: "Pro",
      subtitle: "Setup + process structure",
      points: [
        "Setup and customization",
        "Visible control for crypto/finance flow",
        "Reporting rhythm and process clarity",
      ],
    },
    {
      name: "Advanced",
      subtitle: "Extended operations system",
      featured: true,
      points: [
        "Script + crypto + finance + ad rhythm",
        "End-to-end operation architecture",
        "High-speed and consistent delivery standard",
      ],
    },
  ],
  beforeAfter: {
    title: "From Chaotic Flow to Controlled Flow",
    eyebrow: "before / after",
    beforeLabel: "Before",
    afterLabel: "After",
    rows: [
      {
        label: "Request Management",
        before: "Scattered messages, inconsistent response times",
        after: "One clear flow with fast and direct response",
      },
      {
        label: "Crypto + Finance",
        before: "Fragmented tracking across channels",
        after: "Single-panel visibility at a glance",
      },
      {
        label: "Ad Operations",
        before: "Budget and output tracking feels heavy",
        after: "Stable rhythm and calmer control",
      },
      {
        label: "End of Day",
        before: "Reports are patched together late",
        after: "Short clean summary for decisions",
      },
    ],
  },
  processTitle: "How I work",
  processEyebrow: "process",
  processSteps: [
    {
      title: "Brief Becomes Clear",
      detail: "Goal and priority are aligned fast, so execution starts without confusion.",
    },
    {
      title: "Plan Is Built",
      detail: "A practical roadmap is created for script, crypto-finance, and ad workflow.",
    },
    {
      title: "Setup + Fine Tune",
      detail: "System goes live and gets optimized based on real operation behavior.",
    },
    {
      title: "Control + Delivery",
      detail: "Final checks are done and delivery is completed in a client-ready format.",
    },
  ],
  storyTitle: "Journey",
  storyEyebrow: "from 2017 to now",
  storyMoments: [
    {
      year: "2017",
      title: "Discord Era",
      detail: "The core identity started here: fast communication, disciplined delivery, consistent quality.",
    },
    {
      year: "2019",
      title: "Script Infrastructure Expansion",
      detail: "Ready packs and custom setups matured into a sharper service standard.",
    },
    {
      year: "2021",
      title: "Telegram Transition",
      detail: "Same identity, stronger execution. Cleaner workflows and tighter client flow.",
    },
    {
      year: "Now",
      title: "Script + Crypto + Finance + Ads Flow",
      detail:
        "One target: systems that scale client operations, remove noise, and keep daily control visible.",
    },
  ],
  comparison: {
    title: "Standard Setup vs Advanced Setup",
    intro: "Under the same title, scope level directly changes delivery quality.",
    standardLabel: "Standard",
    premiumLabel: "Advanced",
    standardPoints: [
      "Basic setup is completed",
      "Tracking stays fragmented",
      "Reporting gets patched later",
      "Communication can become scattered",
    ],
    premiumPoints: [
      "Setup and workflow design are built together",
      "Crypto/finance/ad streams stay in one visible rhythm",
      "Control dashboard and tracking run from day one",
      "Fast response, clear communication, consistent delivery",
    ],
  },
  proofTitle: "Why it feels reliable",
  proofEyebrow: "trust factors",
  proofIntro:
    "Users stay because it is not only visual. It is structured, predictable, and built for practical control.",
  proofPillars: [
    {
      title: "Quality Discipline",
      detail: "Consistent quality standard from kickoff to delivery.",
    },
    {
      title: "Fast Response",
      detail: "Requests quickly become clear action plans.",
    },
    {
      title: "Reliable Communication",
      detail: "No noise. Direct and calm communication focused on outcomes.",
    },
    {
      title: "Outcome Driven",
      detail: "Beyond visuals, the goal is real operational improvement.",
    },
  ],
  proofQuotes: [
    {
      quote: "Our script flow became cleaner and client response time got better.",
      author: "A.K.",
      role: "Digital Services",
    },
    {
      quote: "Seeing crypto and finance operations in one rhythm made decisions much faster.",
      author: "M.Y.",
      role: "Ops Manager",
    },
    {
      quote: "Ad process control is now stable, budget visibility is finally clear.",
      author: "S.E.",
      role: "Growth Team",
    },
    {
      quote: "Communication is direct and practical. We get solutions without delay.",
      author: "B.T.",
      role: "Founder",
    },
  ],
  reelWords: [
    "Script sales control",
    "Crypto flow clarity",
    "Finance + banking visibility",
    "Ad process rhythm",
    "Consistent delivery standard",
  ],
  trustMetrics: [
    {
      label: "Fast Response",
      value: 96,
      summary: "Clear plan shortly after first DM",
    },
    {
      label: "Process Visibility",
      value: 94,
      summary: "Crypto + finance + ad streams under one flow",
    },
    {
      label: "Delivery Discipline",
      value: 98,
      summary: "Clean and consistent execution cadence",
    },
  ],
  quoteWizard: {
    title: "Quick Request Form",
    intro: "Share your needs briefly and start with a clear execution plan.",
    stepLabels: ["Service", "Budget", "Timeline", "Note"],
    prompts: {
      service: "Which main area do you need?",
      budget: "What is your budget range?",
      timeline: "How fast should we start?",
      note: "Leave a short note (optional)",
    },
    options: {
      services: [
        "Script pack / setup",
        "Crypto process structure",
        "Finance + banking flow",
        "Ad operations control",
      ],
      budgets: ["10k - 25k", "25k - 50k", "50k - 100k", "100k+"],
      timelines: ["Urgent (24h)", "This week", "This month", "Planned launch"],
    },
    notePlaceholder: "A single-line goal is enough.",
    buttons: {
      back: "Back",
      next: "Next",
      send: "Send to Telegram",
    },
    readyLabel: "Ready message",
  },
  highlights: ["Script sales structure", "Crypto tracking", "Finance visibility", "Ad control", "Consistent delivery"],
  counterMetrics: [
    { label: "Active Since", value: 2017, suffix: "+" },
    { label: "Delivery", value: 24, suffix: "h" },
    { label: "Focus", value: 100, suffix: "%" },
    { label: "Tier", value: 1, suffix: "st" },
  ],
  contactTitle: "Contact",
  contactLine:
    "Share your need clearly, define the scope, and we can start with a focused execution plan.",
  contactHint: "First message: service type + goal + timeline",
  finalCtaEyebrow: "Quick Start",
  finalCtaLine: "Share the target clearly and we will map the fastest execution flow without noise.",
  faqTitle: "Frequently Asked",
  faqEyebrow: "objection breaker",
  faqIntro: "Short and clear answers to the exact questions clients ask before deciding.",
  faqItems: [
    {
      question: "Is delivery actually fast?",
      answer: "Yes. Once scope is clear, the plan is mapped and execution starts without delay.",
    },
    {
      question: "How does communication run during the process?",
      answer: "Direct, calm, and outcome-focused. Decision points close quickly.",
    },
    {
      question: "Is this only script support?",
      answer: "No. Script delivery is paired with crypto, finance, and ad operation structuring.",
    },
    {
      question: "Am I left alone after setup?",
      answer: "No. The handoff is structured and critical transitions are completed in control.",
    },
    {
      question: "Will this work for smaller teams too?",
      answer: "Yes. It removes noise and improves visibility, which helps small teams even more.",
    },
  ],
  faqCtaLabel: "Open request form",
  exitCtaTitle: "Ready to launch?",
  exitCtaLine: "Before you leave, send your target and get a fast Telegram action plan.",
  exitCtaPrimary: "Start on Telegram",
  exitCtaSecondary: "Build My Offer",
  commandTitle: "Quick Access",
  commandHint: "Ctrl/Cmd + K",
  commandPlaceholder: "Search section...",
  commandEmpty: "No command found.",
  mobileCtaLabel: "Message on Telegram",
  mobileCtaHint: "Fast reply",
  caseLabels: {
    situation: "Situation",
    solution: "Solution",
    result: "Result",
    close: "Close",
    previous: "Previous",
    next: "Next",
    progress: "Progress",
    eyebrow: "case summary",
    keyboardHint: "Esc closes • Arrow keys navigate cards",
    sceneNote: "This card is a compact operation brief showing how messy flow becomes controlled execution.",
  },
  seo: {
    title: "Don Salvatore is a brand | Script, Crypto and Finance",
    description:
      "Salvatoré delivers structured script packs, crypto-finance operations support, ad process management, and web infrastructure since 2017.",
    ogDescription:
      "Consistent quality from Discord to Telegram: script packs, crypto-finance structure, ad process control and web systems.",
    twitterDescription:
      "A professional profile page focused on script services, crypto-finance operations, and ad process clarity.",
    keywords: [
      "Salvatore",
      "script packs",
      "crypto flow management",
      "finance operations support",
      "ad operations management",
    ],
  },
  socials: baseSocials,
};

export const siteConfigs: Record<Locale, SiteConfig> = {
  tr: trConfig,
  en: enConfig,
};
