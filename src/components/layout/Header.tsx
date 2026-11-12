"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, PhoneCall, ChevronDown, Flame, Sparkles, Heart } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { Category, TIKTOK_SHOP_URL, FACEBOOK_PAGE_URL, SITE_INFO } from "@/lib/types";

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-brand-charcoal text-[#F3EBE7] text-xs py-2 px-4 border-b border-[#3E3232]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Heart className="w-3.5 h-3.5 text-brand-rose fill-brand-rose shrink-0" />
            <span className="hidden sm:inline">
              LIVORA Official - Yêu thương từ những điều nhỏ bé - Chăm sóc bằng cả trái tim
            </span>
            <span className="sm:hidden font-medium">LIVORA - Chăm sóc bằng cả trái tim</span>
          </div>
          <div className="flex items-center">
            <a
              href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-rose rounded cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-rose" />
              <span>Hotline: {SITE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-[#EDE4E1]">
        <div className="container mx-auto px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="p-2 -ml-2 rounded-xl text-brand-charcoal hover:bg-[#F3EBE7] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
                aria-label="Mở menu điều hướng"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link
                href="/"
                className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl p-1 group"
              >
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white border border-brand-rose-border p-0.5 group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo.png"
                    alt="Logo LIVORA"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl sm:text-2xl text-brand-charcoal tracking-tight leading-none group-hover:text-brand-primary transition-colors">
                    LIVORA
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-brand-muted font-medium tracking-wide mt-0.5">
                    Chăm sóc bằng cả trái tim
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-2 lg:mx-4">
              <SearchBar />
            </div>

            {/* Action Buttons: Facebook + TikTok */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Facebook Button */}
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[84px] sm:min-w-[92px] rounded-lg font-bold text-xs sm:text-sm bg-brand-lavender-light hover:bg-[#E2E6F7] text-[#374880] border border-brand-lavender-border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5668AD] cursor-pointer"
                aria-label="Ghé thăm Facebook của Livora (Mở trong tab mới)"
              >
                <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                <span>Facebook</span>
              </a>

              {/* TikTok Button */}
              <a
                href={TIKTOK_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[84px] sm:min-w-[92px] rounded-lg font-bold text-xs sm:text-sm bg-[#933D33] hover:bg-[#7D2E25] text-white border border-[#933D33] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] cursor-pointer"
                aria-label="Truy cập TikTok của Livora (Mở trong tab mới)"
              >
                <TikTokIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Mobile Search Bar below header */}
          <div className="mt-2.5 md:hidden">
            <SearchBar />
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <div className="hidden lg:block border-t border-[#EDE4E1] bg-[#FAF5F0]/80">
          <div className="container mx-auto px-4">
            <nav aria-label="Danh mục chính" className="flex items-center gap-3 py-1.5 text-xs font-semibold text-[#4A3B3A]">
              {/* Dropdown Tất cả danh mục */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-rose-light text-brand-primary hover:bg-[#F8DFD7] border border-brand-rose-border transition-colors cursor-pointer font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  <span>Tất cả danh mục</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Dọc */}
                {dropdownOpen && (
                  <div
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-2xl border border-[#EDE4E1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto"
                  >
                    <Link
                      href="/danh-muc/tat-ca"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-xs font-bold text-brand-primary hover:bg-brand-rose-light border-b border-[#F5EBE6]"
                    >
                      Xem tất cả sản phẩm
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/danh-muc/${cat.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs text-[#4A3B3A] hover:text-brand-primary hover:bg-brand-rose-light/70 transition-colors"
                      >
                        <span>{cat.name}</span>
                        {cat.productCount > 0 && (
                          <span className="text-[10px] text-brand-muted bg-[#F7ECE8] px-1.5 py-0.5 rounded">
                            {cat.productCount}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 2 Kiểu Sort: HOT và MỚI */}
              <div className="flex items-center gap-2 ml-1">
                <Link
                  href="/danh-muc/tat-ca?sort=hot"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs bg-brand-rose-light text-brand-primary hover:bg-[#F8DFD7] border border-brand-rose-border transition-colors cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-brand-primary" />
                  <span>HOT BÁN CHẠY</span>
                </Link>

                <Link
                  href="/danh-muc/tat-ca?sort=moi"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs bg-brand-lavender-light text-[#6071B8] hover:bg-[#E2E6F7] border border-brand-lavender-border transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6071B8]" />
                  <span>MỚI RA MẮT</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
      />
    </>
  );
}
export default Header;
