import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import {
  Category,
  NAV_ITEMS,
  SITE_INFO,
  FACEBOOK_PAGE_URL,
  TIKTOK_SHOP_URL,
} from "@/lib/types";

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-[#241818] text-[#D9CECB] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="LIVORA"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight leading-none">
                  LIVORA
                </span>
                <span className="text-xs text-brand-rose font-semibold mt-0.5">
                  Chăm sóc bằng cả trái tim
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#C4B5B2] leading-relaxed max-w-md text-pretty">
              {SITE_INFO.description}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#F3EBE7] font-semibold bg-[#332323] px-3.5 py-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand-rose" />
              <span>Bảo hành chính hãng 18 tháng, 1 đổi 1 trong 30 ngày</span>
            </div>
          </div>

          {/* Navigation & Categories */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-bold text-white mb-3">Điều hướng</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[#C4B5B2] hover:text-brand-rose transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">Danh mục</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/danh-muc/${cat.slug}`}
                      className="text-[#C4B5B2] hover:text-brand-rose transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white mb-3">
              Thông tin liên hệ
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#C4B5B2]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-rose shrink-0" />
                <a
                  href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                  className="hover:text-white font-semibold tabular-nums transition-colors"
                >
                  Hotline: {SITE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-rose shrink-0" />
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {SITE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#332323] hover:bg-[#422E2E] text-white text-xs font-semibold transition-colors"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-brand-rose fill-current shrink-0" />
                  <span>Facebook</span>
                </a>
                <a
                  href={TIKTOK_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#332323] hover:bg-[#422E2E] text-white text-xs font-semibold transition-colors"
                >
                  <TikTokIcon className="w-3.5 h-3.5 text-brand-rose fill-current shrink-0" />
                  <span>TikTok Shop</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-6 bg-[#1D1313]/60 -mx-4 px-4 sm:mx-0 sm:px-5 py-4 rounded-2xl text-xs text-[#A89896] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} LIVORA Official Store. Tất cả quyền được bảo lưu.</p>
          <p className="text-xs text-[#C4B5B2]">
            Yêu thương từ những điều nhỏ bé. Chăm sóc bằng cả trái tim.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
