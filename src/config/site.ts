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

export type ShowcaseItem = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

export type SiteConfig = {
  displayName: string;
  tagline: string;
  microLine: string;
  statusChip: string;
  aboutParagraphs: string[];
  quickFacts: string[];
  services: ServiceItem[];
  showcases: ShowcaseItem[];
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
    email: SocialLink;
  };
};

export const siteConfig: SiteConfig = {
  displayName: "Salvatoré",
  tagline: "Web altyapı, script setup ve finans ops tarafında işi sessizce çözen partner.",
  microLine: "2017’den beri çizgim aynı: net kalite, temiz teslim, boş konuşma yok.",
  statusChip: "DM açık • Aktif",
  aboutParagraphs: [
    "2017’de Discord tarafında başladım. Kimliğim belliydi, iş kalitem belliydi, hâlâ aynı çizgideyim.",
    "Sonra Telegram’a geçtim, tempo yükseldi ama standart hiç düşmedi. Nerede olursam olayım işin teslim kalitesi aynı.",
    "Web tarafında altyapı kurarım, script paketlerim, hazır setup çıkarırım ve sistemi sana göre özelleştiririm.",
    "Çalışma stilim basit: brief net, akış hızlı, çıktı temiz. Bekletmem, uzatmam, işi çözer geçerim.",
  ],
  quickFacts: [
    "2017’den beri aktif",
    "Discord → Telegram geçişi",
    "Web altyapıları / script paketleri",
    "Özelleştirme + kurulum",
    "Hızlı teslim",
    "İletişim net",
    "Finans ops tarafı (dashboard / rapor)",
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
      title: "Panel / Dashboard Kurgusu",
      description:
        "Veriyi okunur hale getiren sade ama güçlü panel kurguları. Ekrana bakınca ne olduğu direkt anlaşılır.",
      tags: ["Dashboard", "UX", "Raporlama"],
    },
    {
      title: "Web Otomasyon Mantığı",
      description:
        "Tekrar eden işleri akıllı akışlara çeviriyorum. Zaman kaybettiren manuel adımları devreden çıkarıyorum.",
      tags: ["Otomasyon", "Workflow", "Operasyon"],
    },
    {
      title: "Finans Operasyon Desteği",
      description:
        "Takip, rapor ve süreç yönetiminde düzen kuruyorum. Sayılar net, tablo net, karar süreci net.",
      tags: ["Takip", "Dashboard", "Rapor"],
    },
  ],
  showcases: [
    {
      title: "Topluluk Komuta Paneli",
      description:
        "Discord + Telegram akışlarını tek panelde toplayan, görev dağıtımı ve duyuru yönetimi odaklı dashboard.",
      tags: ["Topluluk", "Panel", "Workflow"],
    },
    {
      title: "Script Vitrin Sitesi",
      description:
        "Hazır script paketlerinin sergilendiği, kategori + hızlı teslim formu içeren premium satış vitrini.",
      tags: ["Marketplace", "Script", "UI"],
    },
    {
      title: "Operasyon Takip Masası",
      description:
        "Günlük iş akışını kart bazlı izleyen, teslim durumlarını renk kodlarıyla sadeleştiren yönetim ekranı.",
      tags: ["Operasyon", "Kanban", "Takip"],
    },
    {
      title: "Finans Snapshot Raporu",
      description:
        "Gelir-gider akışını haftalık ve aylık kırılımla gösteren, karar toplantıları için hızlı rapor arayüzü.",
      tags: ["Finans Ops", "Rapor", "Analiz"],
    },
    {
      title: "Hızlı Yayın Landing Seti",
      description:
        "Tek ürün odaklı sayfalar için hızlı yayın altyapısı, form entegrasyonu ve ölçümleme kurgu paketi.",
      tags: ["Landing", "Setup", "Ölçümleme"],
    },
  ],
  contactLine:
    "Bir fikrin varsa uzatma, yaz geç. Net konuşuruz, doğru setup’ı kurar, işi birlikte çıkarırız.",
  madeWithLine: "Made with React + Tailwind + Framer Motion",
  seo: {
    title: "Salvatoré | Web Altyapı, Script & Finans Ops",
    description:
      "Salvatoré: 2017’den beri web altyapıları, script paketleri, kurulum-özelleştirme ve finans operasyon desteğinde hızlı, net, temiz çözümler.",
    ogDescription:
      "Discord’dan Telegram’a taşınan aynı kalite: website scriptleri, altyapılar, dashboard ve finans ops süreçleri.",
    twitterDescription:
      "Web setup, script paketleri, panel kurgusu ve finans ops tarafında işi çözen tek sayfa vitrin.",
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
    email: {
      label: "Email",
      handle: "hello@yourmail.com",
      url: "mailto:hello@yourmail.com",
    },
  },
};
