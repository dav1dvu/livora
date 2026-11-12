import { ArrowDown, ExternalLink, ShieldCheck, Sparkles, RotateCcw, Award } from "lucide-react";
import { TikTokIcon } from "@/components/ui/Icons";
import { TIKTOK_SHOP_URL } from "@/lib/types";

export function HeroSection() {
  return (
    <section aria-label="Giới thiệu LIVORA" className="pt-4 sm:pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-white p-6 sm:p-10 lg:p-14">
          <div className="max-w-4xl">
            {/* Slogan chuẩn: Yêu thương từ những điều nhỏ bé. Chăm sóc bằng cả trái tim */}
            <h1 className="text-[20px] sm:text-4xl lg:text-[50px] font-black text-[#1E1616] leading-[1.2] tracking-tight mb-5">
              <span className="block">Yêu thương từ những điều nhỏ bé.</span>
              <span className="block text-[#933D33] mt-1 sm:mt-2">
                Chăm sóc bằng cả trái tim.
              </span>
            </h1>

            {/* Đoạn mô tả súc tích, câu chữ tự nhiên người Việt */}
            <p className="text-sm sm:text-base lg:text-lg text-[#3D2E2D] leading-relaxed mb-8 max-w-2xl font-normal">
              Gia dụng thông minh và đồ dùng cho mẹ & bé chính hãng. Toàn bộ phím bấm tiếng Việt dễ dùng, vật liệu an toàn không thôi nhiễm và bảo hành điện tử 18 tháng.
            </p>

            {/* Nút hành động dứt khoát, không trùng lặp */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#danh-muc-noi-bat"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white font-bold text-sm sm:text-base transition-colors duration-200 cursor-pointer min-h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33]"
              >
                <span>Xem danh mục sản phẩm</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={TIKTOK_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-rose-light hover:bg-[#F8E3DD] text-[#933D33] font-bold text-sm sm:text-base transition-colors duration-200 cursor-pointer min-h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33]"
              >
                <TikTokIcon className="w-5 h-5 shrink-0" />
                <span>Mua trên TikTok Shop</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>

          {/* 4 cam kết chính, thẻ đóng gói độc lập */}
          <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-brand-cream flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#933D33] mb-1">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span className="text-xl sm:text-2xl font-black text-[#1E1616]">18 tháng</span>
                </div>
                <div className="text-sm font-bold text-[#1E1616]">
                  Bảo hành chính hãng
                </div>
              </div>
              <div className="text-xs text-[#5A4D4B] mt-1">
                Kích hoạt qua số điện thoại
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-cream flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#933D33] mb-1">
                  <RotateCcw className="w-5 h-5 shrink-0" />
                  <span className="text-xl sm:text-2xl font-black text-[#1E1616]">30 ngày</span>
                </div>
                <div className="text-sm font-bold text-[#1E1616]">
                  1 đổi 1 tận nơi
                </div>
              </div>
              <div className="text-xs text-[#5A4D4B] mt-1">
                Nếu lỗi do nhà sản xuất
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-cream flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#5668AD] mb-1">
                  <Award className="w-5 h-5 shrink-0" />
                  <span className="text-xl sm:text-2xl font-black text-[#1E1616]">100%</span>
                </div>
                <div className="text-sm font-bold text-[#1E1616]">
                  Phím bấm tiếng Việt
                </div>
              </div>
              <div className="text-xs text-[#5A4D4B] mt-1">
                Cả gia đình đều dùng được
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-brand-cream flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#5668AD] mb-1">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span className="text-xl sm:text-2xl font-black text-[#1E1616]">Đồng kiểm</span>
                </div>
                <div className="text-sm font-bold text-[#1E1616]">
                  Kiểm tra khi nhận
                </div>
              </div>
              <div className="text-xs text-[#5A4D4B] mt-1">
                Mở hộp xem trước khi trả
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
