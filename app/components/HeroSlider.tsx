"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    season: "EVERGLOW",
    collection: "RAYA RTW 2026",
    src: "https://www.innaiandco.com/cdn/shop/files/IRRAYARTW26-06.jpg?v=1770881922&width=1950",
    href: "#",
    bg: "linear-gradient(135deg, #c4956a 0%, #e8c9a8 40%, #d4a882 70%, #b8826a 100%)",
  },
  {
    id: 2,
    season: "PENTAS RAYA",
    collection: "INNAI RED RAYA LUXE 2026",
    src: "https://www.innaiandco.com/cdn/shop/files/INNAI-RED-RAYA-26-06-07-BANNER.jpg?v=1769066919&width=2400",
    href: "#",
    bg: "linear-gradient(135deg, #6b2d2d 0%, #9a4040 35%, #c4706a 65%, #8b3030 100%)",
  },
  {
    id: 3,
    season: "GOLDEN PETALS",
    collection: "CHINESE NEW YEAR 2026",
    src: "https://www.innaiandco.com/cdn/shop/files/InnaiRed-CNY26-01.jpg?v=1764919647&width=1950",
    href: "#",
    bg: "linear-gradient(135deg, #b8860b 0%, #daa520 30%, #f0c060 55%, #c8960c 80%, #9a7009 100%)",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 350);
    },
    [fading]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="px-3 md:px-5 pt-3 pb-2">
      <div
        className="relative w-full h-[450px] mx-auto rounded-xl overflow-hidden"
      >
        {/* Background — image with gradient fallback */}
        <div
          className="absolute inset-0 transition-opacity duration-350"
          style={{ opacity: fading ? 0 : 1, background: slide.bg }}
        >
          {slide.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.src}
              alt={slide.season}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}

            />
          )}
        </div>

        {/* Scrim so text stays readable over any image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.18)" }}
        />

        {/* Centered text block */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-350"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {/* 1. Season name — large title */}
          <h2
            className="text-sm md:text-md lg:text-lg font-semibold tracking-[0.1em] uppercase text-white leading-tight"
            style={{ textShadow: "0 1px 20px rgba(0,0,0,0.15)" }}
          >
            {slide.season}
          </h2>

          {/* 2. Collection name — small subtitle */}
          <p className="text-[12px] md:text-[13px] tracking-uppercase text-white/80 mb-6 font-normal">
            {slide.collection}
          </p>

          {/* 3. View Collection pill */}
          <a
            href={slide.href}
            className="inline-flex items-center gap-2 bg-[#e9c9bb] text-[#212121] text-[11px] tracking-[0.2em] uppercase px-6 py-2.5 rounded-full hover:bg-[#f5f2ec] transition-colors duration-200"
          >
            VIEW COLLECTION
            <span className="text-sm leading-none">›</span>
          </a>
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#e9c9bb] flex items-center justify-center hover:bg-[#f5f2ec] transition-colors duration-200 z-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth={2.5} className="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#e9c9bb] flex items-center justify-center hover:bg-[#f5f2ec] transition-colors duration-200 z-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth={2.5} className="w-4 h-4">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dot / dash indicators — bottom center */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "24px" : "6px",
                height: "3px",
                backgroundColor:
                  i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
