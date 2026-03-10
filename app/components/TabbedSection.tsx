"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  name: string;
  price: string;
  originalPrice?: string;
  badge?: "New" | "Sold Out" | "Sale";
  bgColor?: string;
  discount?: string;
}

interface Tab {
  label: string;
  products: Product[];
}

interface TabbedSectionProps {
  tabs: Tab[];
}

export default function TabbedSection({ tabs }: TabbedSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
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
    // Reset scroll position when tab changes
    el.scrollLeft = 0;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [activeTab]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth / 3.5;
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-10">
      {/* Tabs — with left padding to align with section header */}
      <div className="flex justify-center gap-0 mb-6 border-b border-[#e9c9bb] px-4 md:px-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={`text-[11px] tracking-[0.15em] uppercase px-4 md:px-5 py-3 transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === i
                ? "border-[#212121] text-[#212121] font-medium"
                : "border-transparent text-[#a0998f] hover:text-[#212121]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scroll container — same as CollectionSection */}
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
          {tabs[activeTab].products.map((product, i) => (
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

      {/* View All CTA */}
      <div className="mt-8 text-center">
        <Link
          href="#"
          className="inline-block text-[11px] tracking-[0.2em] uppercase border border-[#212121] px-8 py-3 text-[#212121] hover:bg-[#212121] hover:text-[#f5f2ec] transition-colors"
        >
          View All — {tabs[activeTab].label}
        </Link>
      </div>
    </section>
  );
}
