"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall, ChevronDown } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import {
  Category,
  NAV_ITEMS,
  TIKTOK_SHOP_URL,
  FACEBOOK_PAGE_URL,
  SITE_INFO,
} from "@/lib/types";

interface HeaderProps {
  categories: Category[];
}

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/shop") {
    return (
      pathname === "/shop" ||
      pathname.startsWith("/danh-muc") ||
      pathname.startsWith("/san-pham")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md">
        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-5">
            {/* Hamburger + Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="w-11 h-11 inline-flex items-center justify-center -ml-2 rounded-xl text-brand-charcoal hover:bg-[#F3EBE7] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer transition-colors"
                aria-label="Mở menu điều hướng"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="/"
                className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl p-1 group"
              >
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white p-0.5 transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src="/images/logo.png"
                    alt="Logo LIVORA"
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-lg sm:text-xl text-brand-charcoal tracking-tight leading-none group-hover:text-brand-primary transition-colors">
                    LIVORA
                  </span>
                  <span className="text-xs text-brand-muted font-medium mt-0.5 hidden sm:inline">
                    Chăm sóc bằng cả trái tim
                  </span>
                </div>
              </Link>
            </div>

            {/* Tablet/Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-2 lg:mx-4">
              <SearchBar />
            </div>

            {/* Compact Channel & Hotline Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#4A3B3A] hover:text-brand-primary hover:bg-[#F3EBE7] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#933D33]" />
                <span className="tabular-nums">{SITE_INFO.phone}</span>
              </a>

              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm bg-brand-lavender-light hover:bg-[#E2E6F7] text-[#374880] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5668AD] min-h-10"
                aria-label="Ghé thăm Facebook của Livora (Mở trong tab mới)"
              >
                <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                <span>Facebook</span>
              </a>

              <a
                href={TIKTOK_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm bg-[#933D33] hover:bg-[#7D2E25] text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] min-h-10"
                aria-label="Truy cập TikTok Shop của Livora (Mở trong tab mới)"
              >
                <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-2.5 md:hidden">
            <SearchBar />
          </div>
        </div>

        {/* Primary Navigation Bar */}
        <div className="bg-[#F4EBE6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3 py-1.5">
              {/* 5 Main Navigation Links */}
              <nav
                aria-label="Điều hướng chính"
                className="flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs sm:text-sm font-bold text-[#4A3B3A]"
              >
                {NAV_ITEMS.map((item) => {
                  const active = isNavActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`shrink-0 px-3 sm:px-3.5 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-h-10 inline-flex items-center ${
                        active
                          ? "bg-white text-[#933D33]"
                          : "text-[#4A3B3A] hover:text-[#933D33] hover:bg-white/60"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Tablet/Desktop Category Dropdown */}
              <div className="hidden md:block shrink-0 text-xs font-semibold">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onMouseEnter={() => setDropdownOpen(true)}
                    aria-expanded={dropdownOpen}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#933D33] hover:bg-brand-rose-light transition-colors cursor-pointer font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-h-10"
                  >
                    <span>Danh mục sản phẩm</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      onMouseLeave={() => setDropdownOpen(false)}
                      /* taste-skill-ignore: floating dropdown menu overlay */
                      className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl py-2 z-50 max-h-[75dvh] overflow-y-auto"
                    >
                      <Link
                        href="/shop"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-xs font-bold text-[#933D33] hover:bg-brand-rose-light"
                      >
                        Xem tất cả sản phẩm
                      </Link>
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/danh-muc/${cat.slug}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-xs text-[#4A3B3A] hover:text-[#933D33] hover:bg-brand-rose-light/70 transition-colors"
                        >
                          <span>{cat.name}</span>
                          {cat.productCount > 0 && (
                            <span className="text-xs text-brand-muted bg-[#F7ECE8] px-2 py-0.5 rounded-full tabular-nums">
                              {cat.productCount}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
      />
    </>
  );
}

export default Header;
