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
  statusChip: string;
  aboutParagraphs: string[];
  quickFacts: string[];
  services: ServiceItem[];
  highlights: string[];
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
  tagline: "Script paketleri, kripto-finans süreçleri ve reklam akışında düzeni kurarım.",
  microLine: "2017’den beri aynı karakter: net iş, hızlı akış, premium sonuç.",
  statusChip: "DM açık • Aktif",
  aboutParagraphs: [
    "2017’de Discord tarafında başladım. Kimliğim belliydi, iş kalitem belliydi, hâlâ aynı çizgideyim.",
    "Sonra Telegram’a geçtim, tempo yükseldi ama standart hiç düşmedi. Nerede olursam olayım işin teslim kalitesi aynı.",
    "Script paketleri üretirim, hazır setup çıkarırım, altyapıyı senin düzenine göre özelleştiririm. Sadece yazıp bırakmam, çalışır hale getiririm.",
    "Kripto ve finans tarafında takip, akış, bakiye yönetimi görünürlüğü ve rapor düzeni kurarım. Reklam tarafında da sürecin kontrolünü düzenli hale getiririm.",
  ],
  quickFacts: [
    "2017’den beri aktif",
    "Discord → Telegram geçişi",
    "Web altyapıları / script paketleri",
    "Özelleştirme + kurulum",
    "Kripto işlem süreç takibi",
    "Finans akış düzeni + bakiye görünürlüğü",
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
        "İşlem akışını ve günlük takibi sade bir düzende topluyorum. Kaos yerine kontrol hissi veriyor.",
      tags: ["Kripto", "Takip", "Düzen"],
    },
    {
      title: "Finans Akış Düzeni",
      description:
        "Finans tarafında akış, tablo ve rapor düzenini kuruyorum. Gün sonu kontrolü kolay, karar süreci net.",
      tags: ["Finans", "Tablo", "Rapor"],
    },
    {
      title: "Bakiye ve Hareket Takibi",
      description:
        "Hareketleri dağınık bırakmadan izlenebilir hale getiriyorum. Nerede ne var sorusunu tek bakışta çözer.",
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
    "Script paketleri",
    "Kripto takip düzeni",
    "Finans tablo akışı",
    "Reklam süreç kontrolü",
    "Hızlı teslim",
  ],
  contactLine:
    "İş varsa yaz, direkt konuya girelim. Scriptten kripto-finans akışına kadar düzeni birlikte kurarız.",
  madeWithLine: "Made with React + Tailwind + Framer Motion",
  seo: {
    title: "Salvatoré | Script, Kripto ve Finans Akışı",
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
