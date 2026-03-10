"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  name: string;
  price: string;
  originalPrice?: string;
  badge?: "New" | "Sold Out" | "Sale";
  image?: string;
  discount?: string;
}

interface CollectionSectionProps {
  eyebrow?: string;
  title: string;
  href?: string;
  products: Product[];
  ctaLabel?: string;
}

export default function CollectionSection({
  eyebrow,
  title,
  href = "#",
  products,
  ctaLabel = "View All",
}: CollectionSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth / 3.5;
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-10">
      {/* Section header */}
      <div className="flex items-end justify-between mb-6 px-4 md:px-6">
        <div>
          {eyebrow && (
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0998f] mb-1">
              {eyebrow}
            </p>
          )}
          <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase font-medium text-[#212121]">
            {title}
          </h2>
        </div>
        <Link
          href={href}
          className="text-[11px] tracking-[0.15em] uppercase text-[#212121] underline underline-offset-4 hover:text-[#f18080] transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>

      {/* Scroll container wrapper — position relative for chevron buttons */}
      <div className="relative">

        {/* Left chevron */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-2 top-[38%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#f5f2ec] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth={2} className="w-4 h-4">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Right chevron */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-2 top-[38%] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#f5f2ec] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth={2} className="w-4 h-4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Scrollable product row — 3.5 items visible */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {products.map((product, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: "calc(100% / 3.5)" }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
