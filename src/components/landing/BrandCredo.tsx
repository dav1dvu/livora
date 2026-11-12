import { PhoneCall, MapPin, ExternalLink } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { SITE_INFO, FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";

export function BrandCredo() {
  return (
    <section aria-labelledby="credo-heading" className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-[#241818] text-white p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Lời nhắn gửi thương hiệu ngắn gọn */}
            <div className="lg:col-span-7">
              <h2
                id="credo-heading"
                className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-3"
              >
                Chăm sóc bằng cả trái tim
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-3">
                LIVORA đồng hành cùng các bậc cha mẹ trong từng giai đoạn lớn khôn của bé. Chúng tôi mang đến những thiết bị an toàn, bền bỉ và tiện lợi để mỗi bữa ăn gia đình luôn tràn đầy niềm vui.
              </p>

              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Đội ngũ tư vấn và kỹ thuật viên luôn sẵn sàng giải đáp mọi thắc mắc trong suốt quá trình sử dụng.
              </p>
            </div>

            {/* Thông tin hỗ trợ trực tiếp */}
            <div className="lg:col-span-5 rounded-2xl bg-[#332222] p-5 sm:p-6 space-y-4">
              <h3 className="text-base font-bold text-white mb-2">
                Hỗ trợ & tư vấn trực tiếp
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-stone-300">
                  <PhoneCall className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-xs">Hotline hỗ trợ (8:00 - 21:00):</span>
                    <a
                      href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                      className="font-bold text-white hover:text-brand-rose transition-colors duration-200"
                    >
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-stone-300">
                  <MapPin className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-xs">Kho hàng & bảo hành:</span>
                    <span className="text-stone-200">{SITE_INFO.address}</span>
                  </div>
                </div>
              </div>

              {/* Nút mạng xã hội chính thức */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={TIKTOK_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs font-bold transition-colors duration-200 min-h-11"
                >
                  <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
                  <span>TikTok Shop</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-charcoal hover:bg-[#201818] border border-[#4F3F3F] text-stone-200 text-xs font-bold transition-colors duration-200 min-h-11"
                >
                  <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                  <span>Fanpage Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandCredo;
