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
  services: ServiceItem[];
  caseStudies: CaseStudy[];
  processTitle: string;
  processEyebrow: string;
  processSteps: ProcessStep[];
  proofTitle: string;
  proofEyebrow: string;
  proofIntro: string;
  proofPillars: ProofPillar[];
  highlights: string[];
  counterMetrics: CounterMetric[];
  contactTitle: string;
  contactLine: string;
  contactHint: string;
  madeWithLine: string;
  commandTitle: string;
  commandHint: string;
  commandPlaceholder: string;
  commandEmpty: string;
  caseLabels: {
    situation: string;
    solution: string;
    result: string;
    close: string;
  };
  seo: {
    title: string;
    description: string;
    ogDescription: string;
    twitterDescription: string;
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
    home: "Home",
    about: "About",
    work: "Work",
    process: "Flow",
    proof: "Proof",
    contact: "Contact",
  },
  localeLabel: "TR / EN",
  commandShortcutLabel: "Cmd K",
  buttons: {
    primary: "İş Çıkaralım",
    secondary: "Neler Yapıyorum?",
    openCase: "Mini Vakayı Aç",
  },
  tagline: "Script satışından kripto-finans akışına kadar müşteriye çalışan sistem kurarım.",
  microLine: "2017’den beri aynı çizgi: net plan, hızlı teslim, temiz sonuç.",
  slogan: "Don Salvatore bir markadır.",
  statusChip: "DM açık • Aktif",
  heroSignatureLine: "Signature akış: Script + Kripto + Finans + Reklam",
  aboutTitle: "Ben kimim?",
  aboutEyebrow: "kimlik",
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
  workTitle: "Ne yapıyorum?",
  workEyebrow: "servisler",
  workIntro:
    "Buradaki bütün hizmetler tek hedefe oynar: müşterinin işini hızlandırmak, dağınıklığı toplamak, süreci görünür ve yönetilebilir hale getirmek.",
  services: [
    {
      title: "Website Altyapıları",
      description:
        "Performans ve ölçek odaklı temel mimariyi kuruyorum. Proje dağılmadan, sağlam zeminde büyüyor.",
      tags: ["Mimari", "Performans", "Ölçek"],
    },
    {
      title: "Hazır Script Paketleri",
      description:
        "Hazır ve modüler script paketleriyle süreci hızlandırıyorum. Gereksiz tekrar yerine direkt sonuç.",
      tags: ["Hazır Paket", "Modüler", "Hızlı Başlangıç"],
    },
    {
      title: "Kurulum & Özelleştirme",
      description:
        "Kurulumu bitirip bırakmıyorum; iş akışına göre ince ayar yapıp sistemi stabil hale getiriyorum.",
      tags: ["Kurulum", "Özelleştirme", "Stabilite"],
    },
    {
      title: "Kripto Süreç Kurgusu",
      description:
        "İşlem yoğunluğunu sade bir düzende topluyorum. Müşteri için kafa karışıklığı değil, kontrol hissi üretiyor.",
      tags: ["Kripto", "Takip", "Düzen"],
    },
    {
      title: "Finans Akış Düzeni",
      description:
        "Finans ve banka hareketlerinde akışı netleştiriyorum. Tablolar düzenli, günlük kontrol daha hızlı oluyor.",
      tags: ["Finans", "Banka", "Rapor"],
    },
    {
      title: "Bakiye ve Hareket Takibi",
      description:
        "Bakiye ve hareket görünürlüğünü tek çatıya topluyorum. Nerede ne var sorusu tek bakışta cevaplanıyor.",
      tags: ["Bakiye", "Takip", "Görünürlük"],
    },
    {
      title: "Reklam Süreç Yönetimi",
      description:
        "Reklam çıkışlarını, bütçe akışını ve sonuç özetini düzenli bir yapıda yönetilebilir hale getiriyorum.",
      tags: ["Reklam", "Bütçe", "Özet"],
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
  proofTitle: "Neden güven veriyor?",
  proofEyebrow: "proof wall",
  proofIntro:
    "Müşteri içeride kaldığında sebep tasarım değil sadece; akışın netliği, teslimin hızı ve sürecin güven vermesi.",
  proofPillars: [
    {
      title: "Premium Disiplin",
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
  highlights: [
    "Script satış akışı",
    "Kripto takip düzeni",
    "Finans + banka görünürlüğü",
    "Reklam süreç kontrolü",
    "Premium teslim",
  ],
  counterMetrics: [
    { label: "Sahnede", value: 2017, suffix: "+" },
    { label: "Teslim", value: 24, suffix: "s" },
    { label: "Odak", value: 100, suffix: "%" },
    { label: "Kalite", value: 1, suffix: "st" },
  ],
  contactTitle: "İletişim",
  contactLine: "Müşteri gibi bakıyorsan doğru yerdesin. Yaz, kısa bir plan çıkaralım ve işi hızlıca devreye alalım.",
  contactHint: "İlk mesaj formatı: hizmet türü + hedef + süre",
  madeWithLine: "Made with React + Tailwind + Framer Motion",
  commandTitle: "Hızlı Komutlar",
  commandHint: "Ctrl/Cmd + K",
  commandPlaceholder: "Bölüm ara veya komut yaz...",
  commandEmpty: "Komut bulunamadı.",
  caseLabels: {
    situation: "Durum",
    solution: "Çözüm",
    result: "Sonuç",
    close: "Kapat",
  },
  seo: {
    title: "Don Salvatore bir markadır | Script, Kripto ve Finans",
    description:
      "Salvatoré: 2017’den beri script paketleri, kripto-finans süreç düzeni, reklam akışı ve web altyapısında net, hızlı, temiz çözümler.",
    ogDescription:
      "Discord’dan Telegram’a taşınan aynı kalite: script paketleri, kripto-finans düzeni, reklam süreç kontrolü ve web altyapı kurgusu.",
    twitterDescription:
      "Script paketleri, kripto-finans süreç düzeni ve reklam akışını sade şekilde yöneten signature profil sayfası.",
  },
  socials: baseSocials,
};

const enConfig: SiteConfig = {
  displayName: "Salvatoré",
  nav: {
    home: "Home",
    about: "About",
    work: "Work",
    process: "Flow",
    proof: "Proof",
    contact: "Contact",
  },
  localeLabel: "EN / TR",
  commandShortcutLabel: "Cmd K",
  buttons: {
    primary: "Let's Build",
    secondary: "What I Do",
    openCase: "Open Mini Case",
  },
  tagline: "From script sales to crypto-finance flow, I build systems that work for clients.",
  microLine: "Since 2017: clear plans, fast delivery, clean execution.",
  slogan: "Don Salvatore is a brand.",
  statusChip: "DM open • Active",
  heroSignatureLine: "Signature flow: Script + Crypto + Finance + Ads",
  aboutTitle: "Who am I?",
  aboutEyebrow: "identity",
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
  workTitle: "What I do",
  workEyebrow: "services",
  workIntro:
    "Every service below targets one thing: speed up client execution, remove chaos, and make operations manageable.",
  services: [
    {
      title: "Website Infrastructure",
      description: "I build performance-focused architecture so projects scale on stable foundations.",
      tags: ["Architecture", "Performance", "Scale"],
    },
    {
      title: "Ready Script Packs",
      description: "Modular script packs to speed up launch and remove repetitive overhead.",
      tags: ["Ready Pack", "Modular", "Fast Start"],
    },
    {
      title: "Setup & Customization",
      description: "Not just setup. I tune the system to fit your operation and make it stable.",
      tags: ["Setup", "Customization", "Stability"],
    },
    {
      title: "Crypto Process Design",
      description: "I simplify complex transaction flow into a controlled and readable system.",
      tags: ["Crypto", "Tracking", "Structure"],
    },
    {
      title: "Finance Flow Structure",
      description: "I align finance and banking movements into cleaner reporting and faster daily checks.",
      tags: ["Finance", "Banking", "Reports"],
    },
    {
      title: "Balance & Movement Tracking",
      description: "I centralize balance visibility so teams instantly know what is where.",
      tags: ["Balance", "Tracking", "Visibility"],
    },
    {
      title: "Ad Operations Management",
      description: "I structure ad budget, execution, and outcome monitoring into one manageable loop.",
      tags: ["Ads", "Budget", "Control"],
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
  proofTitle: "Why it feels reliable",
  proofEyebrow: "proof wall",
  proofIntro:
    "Users stay because it is not only visual. It is structured, predictable, and built for practical control.",
  proofPillars: [
    {
      title: "Premium Discipline",
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
  highlights: ["Script sales flow", "Crypto tracking", "Finance visibility", "Ad control", "Premium delivery"],
  counterMetrics: [
    { label: "Active Since", value: 2017, suffix: "+" },
    { label: "Delivery", value: 24, suffix: "h" },
    { label: "Focus", value: 100, suffix: "%" },
    { label: "Tier", value: 1, suffix: "st" },
  ],
  contactTitle: "Contact",
  contactLine:
    "If you are looking through a client lens, you are in the right place. Send a message and we launch with a clear plan.",
  contactHint: "First message format: service type + target + timeline",
  madeWithLine: "Made with React + Tailwind + Framer Motion",
  commandTitle: "Quick Commands",
  commandHint: "Ctrl/Cmd + K",
  commandPlaceholder: "Search section or type a command...",
  commandEmpty: "No command found.",
  caseLabels: {
    situation: "Situation",
    solution: "Solution",
    result: "Result",
    close: "Close",
  },
  seo: {
    title: "Don Salvatore is a brand | Script, Crypto and Finance",
    description:
      "Salvatoré delivers premium script packs, crypto-finance flow structuring, ad operations and web infrastructure since 2017.",
    ogDescription:
      "Consistent quality from Discord to Telegram: script packs, crypto-finance structure, ad process control and web systems.",
    twitterDescription:
      "A signature page focused on script services, crypto-finance flow and ad operation clarity.",
  },
  socials: baseSocials,
};

export const siteConfigs: Record<Locale, SiteConfig> = {
  tr: trConfig,
  en: enConfig,
};
