"use client";

import { useRef, useState, useEffect } from "react";

const posts = [
  { id: 1, bg: "#2a3a4a",src:"ig/large.mp4", type: "reel" },
  { id: 2, bg: "#c4706a",src:"ig/SnapInsta.to_643498636_18561958696021103_483269153457246351_n.jpg", type: "image" },
  { id: 3, bg: "#8a9e8a", src: "ig/large.mp4", type: "reel" },
  { id: 4, bg: "#d4c4a8", src:"ig/SnapInsta.to_643589442_18562614292021103_1472839146861861952_n.jpg",type: "image" },
  { id: 5, bg: "#9a7070", src:"ig/large.mp4",type: "reel" },
  { id: 6, bg: "#6b5a50", src:"ig/large.mp4",type: "reel" },
  { id: 7, bg: "#b8826a", src:"ig/SnapInsta.to_643498636_18561958696021103_483269153457246351_n.jpg",type: "image" },
  { id: 8, bg: "#e0dbd4", src:"ig/SnapInsta.to_643589442_18562614292021103_1472839146861861952_n.jpg",type: "image" },
];

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by the exact visible width of the container
    const scrollAmount = el.clientWidth;
    el.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-[#e9c9bb] py-12 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6b5a50] mb-1">Stay Connected</p>
        <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-medium text-[#212121]">
          Follow Us on Instagram
        </h2>
        <p className="text-[12px] text-[#6b5a50] tracking-wide mt-1">@INNAIandCo</p>
      </div>

      <div className="relative group/main px-4 md:px-6 lg:px-10">
        
        {/* LEFT CHEVRON - Inside the edge of the first visible image */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 backdrop-blur-sm opacity-0 group-hover/main:opacity-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth={2.5} className="w-5 h-5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* RIGHT CHEVRON - Inside the edge of the fifth visible image */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 backdrop-blur-sm opacity-0 group-hover/main:opacity-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth={2.5} className="w-5 h-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory" // Ensures images snap into place
          }}
        >
   {posts.map((post) => (
  <div
    key={post.id}
    className="flex-shrink-0 relative group overflow-hidden rounded-lg"
    style={{
      width: "calc((100% - (4 * 12px)) / 5)", 
      minWidth: "160px", // Slightly wider for better visibility
      aspectRatio: "5/7",
      backgroundColor: post.bg,
      scrollSnapAlign: "start"
    }}
  >
    {/* 1. Dynamic Media Layer */}
    {post.type === "reel" ? (
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`/${post.src}`} type="video/mp4" />
      </video>
    ) : (
      <img 
        src={`/${post.src}`} 
        alt={`Innai Instagram ${post.id}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    )}

    {/* 2. Hover Overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />

    {/* 3. Icon Overlay (Reel vs Image Icons) */}
    <div className="absolute top-3 right-3 z-20 pointer-events-none">
      {post.type === "reel" ? (
        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 drop-shadow-md">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14v-4z" />
          <rect x="3" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-4 h-4 drop-shadow-md">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )}
    </div>
  </div>
))}
        </div>
      </div>

      <div className="text-center mt-10">
        <a
          href="https://www.instagram.com/INNAIandCo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[11px] font-medium tracking-[0.2em] border border-[#212121] px-10 py-3 text-[#212121] hover:bg-[#212121] hover:text-white transition-all duration-300 uppercase"
        >
          Follow @INNAIandCo
        </a>
      </div>
    </section>
  );
}