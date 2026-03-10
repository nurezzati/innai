import AnnouncementBanner from "./components/AnnouncementBanner";
import Header from "./components/Header";
import VideoHero from "./components/VideoHero";
import HeroSlider from "./components/HeroSlider";
import CollectionSection from "./components/CollectionSection";
import TabbedSection from "./components/TabbedSection";
import InstagramSection from "./components/InstagramSection";
import Footer from "./components/Footer";

// ─── Product Data ──────────────────────────────────────────────────────────────

const everglowProducts = [
  { name: "Azalea", price: "RM680", badge: "New" as const,src:"https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-01-B.jpg?v=1769931482&width=640" },
  { name: "Rita", price: "RM680", badge: "New" as const, src:"https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-05-B.jpg?v=1770130109&width=640" },
  { name: "Janna", price: "RM720", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-21-B.jpg?v=1770247961&width=640" },
  { name: "Sienna", price: "RM750", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-14-02-B.jpg?v=1770212621&width=640" },
  { name: "Cora", price: "RM920", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-14-01-B.jpg?v=1770183305&width=640" },
  { name: "Laila", price: "RM980", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-06-B.jpg?v=1770168968&width=640" },
  { name: "Maira", price: "RM750", badge: "Sold Out" as const, src: "https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-03-B.jpg?v=1770128364&width=640" },
  { name: "Ruby", price: "RM720", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/INNAICO-RAYA-RTW-2026-17-01-B.jpg?v=1770213797&width=640" },
];

const saleProducts = [
  {
    name: "Nadia",
    price: "RM476",
    originalPrice: "RM680",
    badge: "Sale" as const,
    src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-10-B.jpg?v=1741250745&width=640",
    discount: "30%",
  },
  {
    name: "Saffron",
    price: "RM504",
    originalPrice: "RM720",
    badge: "Sale" as const,
    src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-10-B.jpg?v=1741250745&width=640",
    discount: "30%",
  },
  {
    name: "Amara",
    price: "RM525",
    originalPrice: "RM750",
    badge: "Sale" as const,
    src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-17-B.jpg?v=1741250087&width=640",
    discount: "30%",
  },
  {
    name: "Elara",
    price: "RM644",
    originalPrice: "RM920",
    badge: "Sale" as const,
    src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-16-B.jpg?v=1741249254&width=640",
    discount: "30%",
  },
  {
    name: "Dahlia",
    price: "RM476",
    originalPrice: "RM680",
    badge: "Sale" as const,
    src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-09-B.jpg?v=1741248234&width=640",
    discount: "30%",
  },
  {
    name: "Iris",
    price: "RM504",
    originalPrice: "RM720",
    badge: "Sale" as const,
    src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-01-01-B_81a68537-f026-4263-b05d-61555a7b9b15.jpg?v=1740403977&width=640",
    discount: "30%",
  },
];

const reminiscenceProducts = [
  { name: "Alana", price: "RM580", badge: "Sold Out" as const, src: "https://www.innaiandco.com/cdn/shop/collections/IR-RAYA-RTW-25-02-01.jpg?v=1739950161&width=540" },
  { name: "Celeste", price: "RM640", badge: "Sold Out" as const, src: "https://www.innaiandco.com/cdn/shop/collections/IR-RAYA-RTW-25-02-01.jpg?v=1739950161&width=540" },
  { name: "Diana", price: "RM720", badge: "Sold Out" as const, src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-13-B.jpg?v=1740394966&width=640" },
  { name: "Fara", price: "RM580", badge: "Sold Out" as const, src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-11-B.jpg?v=1740396596&width=640" },
  { name: "Hana", price: "RM640", badge: "Sold Out" as const, src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-09-B.jpg?v=1741248234&width=640" },
  { name: "Inas", price: "RM720", badge: "Sold Out" as const, src: "https://www.innaiandco.com/cdn/shop/files/IR-RAYA-RTW-25-19-02-B.jpg?v=1740284555&width=640" },
];

const elevatedEaseProducts = [
  { name: "Vera", price: "RM480", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/collections/IRRTW-25-07-08.jpg?v=1737452273&width=540" },
  { name: "Lena", price: "RM520", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/Innai-Lifstyle-2174.jpg?v=1737637773&width=640" },
  { name: "Mira", price: "RM560", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/Innai-Lifstyle-1741.jpg?v=1737417939&width=640" },
  { name: "Nora", price: "RM480", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/IRRTW-25-03-B.jpg?v=1737467763&width=640" },
  { name: "Pita", price: "RM520", badge: "New" as const, src: "https://www.innaiandco.com/cdn/shop/files/IRRTW-25-04-05-A.jpg?v=1737537106&width=640" },
  { name: "Rania", price: "RM560", src: "https://www.innaiandco.com/cdn/shop/files/IRRTW-25-04-05-B.jpg?v=1737537735&width=640" },
];

const tabbedTabs = [
  { label: "Final Sale — 30% Off", products: saleProducts },
  { label: "Reminiscence Raya RTW", products: reminiscenceProducts },
  { label: "Elevated Ease", products: elevatedEaseProducts },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f2ec]">
      <AnnouncementBanner />
      <Header />

      <main>
        {/* Hero 1 — Video */}
        <VideoHero />

        {/* Hero 2 — Slider */}
        <HeroSlider />

        {/* Divider */}
        <div className="px-4 md:px-6">
          <hr className="border-[#e9c9bb]/60" />
        </div>

        {/* Everglow — main collection */}
        <CollectionSection
          eyebrow="Raya RTW 2026"
          title="Everglow"
          href="#"
          products={everglowProducts}
          ctaLabel="Shop All Everglow"
        />

        {/* Divider */}
        <div className="px-4 md:px-6">
          <hr className="border-[#e9c9bb]/60" />
        </div>

        {/* Tabbed: Sale / Reminiscence / Elevated Ease */}
        <TabbedSection tabs={tabbedTabs} />

        {/* Divider */}
        <div className="px-4 md:px-6">
          <hr className="border-[#e9c9bb]/60" />
        </div>

        {/* Pentas Raya Luxe promo banner */}
        <section className="w-full overflow-hidden relative">
          <div
            className="w-full overflow-hidden relative"
            style={{ paddingBottom: "20%" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "#e9c9bb",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-center text-left px-8 md:px-16 lg:px-24">
              <div className="mx-auto w-full max-w-xl flex flex-col items-start text-left"> 
              <p className="text-[10px] tracking-[0.3em] uppercase text-[##212121] mb-2 max-w-xl">
                Innai Red
              </p>
              <h2 className="text-xl md:text-md lg:text-lg font-semibold tracking-[0.1em] uppercase text-[##212121] mb-4">
                Luxe Bespoke 2026
              </h2>
              <p className="text-[14px] propercase text-[##212121] mb-6 max-w-2xl">
                Innai RedSubtle variations in textural tones hint at a play of light, while exquisite details and fine embellishments create an unexpected, yet harmonious contrast that speaks of a delicate, yet solid intricate handiwork- adding grandeur and class.
                For all INNAI RED LUXE Bespoke enquiries or to book an appointment, kindly WhatsApp us at +60192300317.
              </p>
              <a
                href="#"
                className="text-[11px] tracking-[0.2em] uppercase border border-[##212121] text-left px-6 py-2.5 text-[##212121b] hover:bg-[#e9c9bb] hover:text-[#212121] transition-colors w-fit"
              >
                Contact Innai Red
              </a>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram */}
        <InstagramSection
        />
      </main>

      <Footer />
    </div>
  );
}
