import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { Category, SITE_INFO, FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  const displayCats = categories.slice(0, 8);

  return (
    <footer className="bg-[#241C1C] text-[#D9CECB] border-t border-[#362A2A] mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 border border-[#4A3838]">
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
                <span className="text-[10px] text-brand-rose font-semibold mt-0.5 flex items-center gap-1">
                  Chăm sóc bằng cả trái tim
                  <Heart className="w-2.5 h-2.5 text-brand-rose fill-brand-rose" />
                </span>
              </div>
            </div>
            <p className="text-xs text-[#B5A6A3] leading-relaxed mb-4">
              {SITE_INFO.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E8A59C] font-semibold bg-[#362828] p-2.5 rounded-xl border border-[#4F3939]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand-rose" />
              <span>Bảo hành chính hãng 18 tháng - 1 đổi 1 30 ngày</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              Danh Mục Sản Phẩm
            </h4>
            <ul className="space-y-2 text-xs">
              {displayCats.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/danh-muc/${cat.slug}`}
                    className="text-[#B5A6A3] hover:text-brand-rose transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A6A3]">
              <li>Chính sách bảo hành chính hãng 18 tháng</li>
              <li>Chính sách 1 đổi 1 trong 30 ngày đầu</li>
              <li>Chính sách vận chuyển & đồng kiểm toàn quốc</li>
              <li>Công thức chế biến ăn dặm & sữa hạt cho bé</li>
              <li>Hệ thống bảo hành & hỗ trợ kỹ thuật tận tâm</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-3 text-xs text-[#B5A6A3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-rose shrink-0" />
                <a
                  href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                  className="hover:text-white font-medium"
                >
                  Hotline: {SITE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FacebookIcon className="w-4 h-4 text-brand-rose fill-brand-rose shrink-0" />
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Fanpage Facebook
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <TikTokIcon className="w-4 h-4 text-brand-rose fill-brand-rose shrink-0" />
                <a
                  href={TIKTOK_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok Shop
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-rose shrink-0" />
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-white">
                  {SITE_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#362A2A] text-center text-xs text-[#8C7D7B] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} LIVORA Official Store. Tất cả quyền được bảo lưu.</p>
          <p className="text-[11px] text-[#A89896] flex items-center justify-center gap-1.5">
            <span>Yêu thương từ những điều nhỏ bé</span>
            <Heart className="w-2.5 h-2.5 text-brand-rose fill-brand-rose" />
            <span>Chăm sóc bằng cả trái tim</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
