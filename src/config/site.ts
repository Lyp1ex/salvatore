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

export type SiteConfig = {
  displayName: string;
  tagline: string;
  microLine: string;
  slogan: string;
  statusChip: string;
  aboutParagraphs: string[];
  quickFacts: string[];
  services: ServiceItem[];
  highlights: string[];
  trustMetrics: { label: string; value: string }[];
  processSteps: { title: string; detail: string }[];
  proofPillars: { title: string; detail: string }[];
  contactLine: string;
  madeWithLine: string;
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

export const siteConfig: SiteConfig = {
  displayName: "Salvatoré",
  tagline: "Script satışından kripto-finans akışına kadar müşteriye çalışan sistem kurarım.",
  microLine: "2017’den beri aynı çizgi: net plan, hızlı teslim, temiz sonuç.",
  slogan: "Don Salvatore bir markadır.",
  statusChip: "DM açık • Aktif",
  aboutParagraphs: [
    "2017’de Discord’da başladım, sonra Telegram’a geçtim. Platform değişti ama kalite standardım hiç değişmedi.",
    "Müşterinin ihtiyacı neyse oradan girerim: script paketi, kurulum, özelleştirme veya komple akış düzeni.",
    "Kripto, finans ve banka tarafındaki hareketleri daha okunur, daha düzenli bir yapıya çeviririm. Gereksiz karmaşayı temizler, kontrolü artırırım.",
    "Reklam tarafında da süreçleri izlenebilir hale getiririm; bütçe, akış ve sonuç aynı masada net görünür.",
  ],
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
  highlights: [
    "Script satış akışı",
    "Kripto takip düzeni",
    "Finans + banka görünürlüğü",
    "Reklam süreç kontrolü",
    "Premium teslim",
  ],
  trustMetrics: [
    { label: "Sahnede", value: "2017+" },
    { label: "Teslim Stili", value: "Hızlı" },
    { label: "İletişim", value: "Net" },
    { label: "Odak", value: "Sonuç" },
  ],
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
  contactLine:
    "Müşteri gibi bakıyorsan doğru yerdesin. Yaz, kısa bir plan çıkaralım ve işi hızlıca devreye alalım.",
  madeWithLine: "Made with React + Tailwind + Framer Motion",
  seo: {
    title: "Don Salvatore bir markadır | Script, Kripto ve Finans",
    description:
      "Salvatoré: 2017’den beri script paketleri, kripto-finans süreç düzeni, reklam akışı ve web altyapısında net, hızlı, temiz çözümler.",
    ogDescription:
      "Discord’dan Telegram’a taşınan aynı kalite: script paketleri, kripto-finans düzeni, reklam süreç kontrolü ve web altyapı kurgusu.",
    twitterDescription:
      "Script paketleri, kripto-finans süreç düzeni ve reklam akışını sade şekilde yöneten signature profil sayfası.",
  },
  socials: {
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
  },
};
