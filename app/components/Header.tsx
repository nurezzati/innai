"use client";

import { useState } from "react";
import Link from "next/link";

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const AccountIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const archiveLinks = [
  { label: "Bridal", href: "/pages/bridal" },
  { label: "Chinese New Year", href: "/pages/chinese-new-year" },
  { label: "Raya Luxe", href: "/pages/raya-luxe" },
  { label: "Raya RTW", href: "/pages/raya-rtw" },
  { label: "RTW", href: "/pages/rtw" },
];

const mainNav = [
  { label: "Sale", href: "/collections/sale" },
  { label: "Everglow", href: "#" },
  { label: "Pentas Raya Luxe 2026", href: "#" },
  { label: "CNY '26 (Golden Petals)", href: "#" },
];

export default function Header() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#f5f2ec] border-b border-[#e9c9bb]/60">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left: hamburger (mobile) */}
        <button
          className="md:hidden text-[#212121] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-semibold tracking-[0.3em] text-[#212121] uppercase text-center w-full ps-15 md:ps-30"
        >
          INNAI & CO
        </Link>

        {/* Right: search, account, cart */}
        <div className="flex items-center gap-4 text-[#212121]">
          {/* Search - hidden on mobile for cleanliness */}
          <button className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase hover:text-[#f18080] transition-colors">
            <SearchIcon />
            <span>Search</span>
          </button>
          <button className="hover:text-[#f18080] transition-colors hidden md:block">
            <AccountIcon />
          </button>
          <button className="hover:text-[#f18080] transition-colors relative">
            <CartIcon />
            <span className="absolute -top-1 -right-1 bg-[#f18080] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Bottom row: nav (desktop) */}
      <nav className="hidden md:flex items-center justify-center gap-8 px-8 pb-3 border-t border-[#e9c9bb]/40">
        {mainNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-[11px] tracking-[0.15em] uppercase text-[#212121] hover:text-[#f18080] transition-colors py-2 ${
              item.label === "Sale"
                ? "text-[#f18080] font-medium"
                : ""
            }`}
          >
            {item.label}
          </Link>
        ))}

        {/* Archive dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setArchiveOpen(true)}
          onMouseLeave={() => setArchiveOpen(false)}
        >
          <button className="text-[11px] tracking-[0.15em] uppercase text-[#212121] hover:text-[#f18080] transition-colors py-2 flex items-center gap-1">
            Archive
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-3 h-3"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {archiveOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-[#f5f2ec] border border-[#e9c9bb] shadow-sm min-w-[180px] py-2 z-50">
              {archiveLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 text-[11px] tracking-[0.1em] uppercase text-[#212121] hover:bg-[#e9c9bb]/30 hover:text-[#f18080] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Divider + secondary links */}
        <span className="text-[#e9c9bb]">|</span>
        <Link
          href="/blogs/news"
          className="text-[11px] tracking-[0.15em] uppercase text-[#212121] hover:text-[#f18080] transition-colors py-2"
        >
          Media
        </Link>
        <Link
          href="/pages/contact"
          className="text-[11px] tracking-[0.15em] uppercase text-[#212121] hover:text-[#f18080] transition-colors py-2"
        >
          Contact
        </Link>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f5f2ec] border-t border-[#e9c9bb]/60 px-6 py-4 space-y-4">
          {mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`block text-[12px] tracking-[0.15em] uppercase py-1.5 ${
                item.label === "Sale"
                  ? "text-[#f18080] font-medium"
                  : "text-[#212121]"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pl-2 space-y-3 border-l border-[#e9c9bb]">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#a0998f]">
              Archive
            </p>
            {archiveLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-[11px] tracking-[0.1em] uppercase text-[#212121] py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#e9c9bb]/60 pt-3 space-y-3">
            <Link
              href="/blogs/news"
              className="block text-[12px] tracking-[0.15em] uppercase text-[#212121] py-1"
              onClick={() => setMobileOpen(false)}
            >
              Media
            </Link>
            <Link
              href="/pages/contact"
              className="block text-[12px] tracking-[0.15em] uppercase text-[#212121] py-1"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
