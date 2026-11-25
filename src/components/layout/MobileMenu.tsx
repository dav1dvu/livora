"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ExternalLink } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import {
  Category,
  NAV_ITEMS,
  TIKTOK_SHOP_URL,
  FACEBOOK_PAGE_URL,
  SITE_INFO,
} from "@/lib/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#241818]/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      {/* taste-skill-ignore: floating mobile drawer dialog */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-brand-cream shadow-2xl flex flex-col z-50">
        {/* Drawer Header */}
        <div className="p-4 flex items-center justify-between bg-white">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-brand-cream">
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
              <span className="text-xs text-brand-muted">
                Chăm sóc bằng cả trái tim
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 inline-flex items-center justify-center rounded-xl text-[#4A3B3A] hover:bg-[#F3EBE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer transition-colors"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Menu di động" className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-bold text-brand-muted mb-2 px-3">
              Điều hướng
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
                  className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-bold transition-colors min-h-11 ${
                    active
                      ? "bg-white text-[#933D33]"
                      : "text-brand-charcoal hover:text-[#933D33] hover:bg-white/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-brand-muted mb-2 px-3">
              Danh mục sản phẩm
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/danh-muc/${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-[#4A3B3A] hover:text-[#933D33] hover:bg-white/70 transition-colors min-h-11"
              >
                <span>{cat.name}</span>
                <span className="text-xs text-brand-muted tabular-nums">
                  {cat.productCount}
                </span>
              </Link>
            ))}
          </div>

          {/* Channel Actions */}
          <div className="pt-2 space-y-2">
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-brand-lavender-light hover:bg-[#E2E6F7] text-[#374880] font-bold text-xs transition-colors min-h-11"
            >
              <div className="flex items-center gap-2">
                <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                <span>Fanpage Facebook</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={TIKTOK_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white font-bold text-xs transition-colors min-h-11"
            >
              <div className="flex items-center gap-2">
                <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
                <span>TikTok Shop</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </nav>

        {/* Footer Info */}
        <div className="p-4 bg-[#F4EBE6] text-xs text-brand-muted space-y-1">
          <p>
            Hotline:{" "}
            <a href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`} className="font-bold text-brand-charcoal tabular-nums">
              {SITE_INFO.phone}
            </a>
          </p>
          <p>Bảo hành chính hãng 18 tháng</p>
        </div>
      </div>
    </div>
  );
}
