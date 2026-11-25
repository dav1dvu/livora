"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ExternalLink, Heart } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { Category, NAV_ITEMS, TIKTOK_SHOP_URL, FACEBOOK_PAGE_URL, SITE_INFO } from "@/lib/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-brand-cream shadow-2xl flex flex-col z-50 border-r border-[#EDE4E1]">
        {/* Header */}
        <div className="p-4 border-b border-[#EDE4E1] flex items-center justify-between bg-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-brand-rose-border p-0.5 bg-white">
              <Image
                src="/images/logo.png"
                alt="Logo LIVORA"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-brand-charcoal leading-tight">
                LIVORA
              </span>
              <span className="text-[10px] text-brand-muted flex items-center gap-1">
                Chăm sóc bằng cả trái tim
                <Heart className="w-2.5 h-2.5 text-brand-rose fill-brand-rose" />
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons: Facebook + TikTok */}
        <div className="p-3 bg-[#FAF5F0] border-b border-[#EDE4E1] space-y-2">
          {/* Facebook Button */}
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-brand-lavender-light hover:bg-[#E2E6F7] text-[#374880] border border-brand-lavender-border font-bold text-xs cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
              <span>Facebook</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* TikTok Button */}
          <a
            href={TIKTOK_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white font-bold text-xs cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
              <span>TikTok</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Menu di động" className="flex-1 overflow-y-auto p-4 divide-y divide-[#EDE4E1]">
          <div className="py-2 space-y-1">
            <p className="text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-2">
              Điều Hướng
            </p>
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    (item.href === "/shop" &&
                      (pathname.startsWith("/danh-muc") ||
                        pathname.startsWith("/san-pham")));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    active
                      ? "bg-brand-rose-light text-brand-primary"
                      : "text-brand-charcoal hover:text-brand-primary hover:bg-[#FAF5F0]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="py-2">
            <p className="text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-2">
              Danh Mục Sản Phẩm
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                onClick={onClose}
                className="block py-2 text-sm text-[#4A3B3A] hover:text-brand-primary hover:translate-x-1 transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-[#EDE4E1] bg-[#FAF5F0] text-xs text-brand-muted space-y-1">
          <p>Hotline: <strong className="text-brand-charcoal">{SITE_INFO.phone}</strong></p>
          <p>Bảo hành chính hãng 18 tháng</p>
        </div>
      </div>
    </div>
  );
}
