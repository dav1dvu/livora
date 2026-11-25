import type { Metadata } from "next";
import { PhoneCall, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/contact/ContactForm";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { SITE_INFO, FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contact - Liên Hệ LIVORA Official",
  description:
    "Liên hệ LIVORA Official Store qua Hotline 086.240.5715, Fanpage Facebook, TikTok Shop hoặc địa chỉ 19 Nguyễn Trãi, Thanh Xuân, Hà Nội.",
};

export default function ContactPage() {
  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb items={[{ label: "Contact" }]} />
      </div>

      <section className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="rounded-3xl bg-white p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight">
              Liên hệ LIVORA Official
            </h1>
            <p className="text-sm sm:text-base text-[#5A4D4B] mt-2 max-w-2xl text-pretty">
              Đội ngũ tư vấn viên và kỹ thuật viên của LIVORA luôn sẵn sàng hỗ trợ bạn chọn sản phẩm phù hợp, kiểm tra bảo hành điện tử và giải đáp mọi thắc mắc.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Contact Channels */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-6 sm:p-7 space-y-5">
                <h2 className="text-lg font-black text-[#1E1616]">
                  Thông tin kết nối trực tiếp
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-[#933D33] flex items-center justify-center shrink-0">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-brand-muted block">
                        Hotline tư vấn & bảo hành
                      </span>
                      <a
                        href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                        className="font-bold text-[#1E1616] hover:text-[#933D33] transition-colors tabular-nums"
                      >
                        {SITE_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-rose-light text-[#933D33] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-brand-muted block">
                        Email hỗ trợ
                      </span>
                      <a
                        href={`mailto:${SITE_INFO.email}`}
                        className="font-bold text-[#1E1616] hover:text-[#933D33] transition-colors break-all"
                      >
                        {SITE_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-lavender-light text-[#374880] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-brand-muted block">
                        Kho hàng & trung tâm bảo hành
                      </span>
                      <span className="font-semibold text-[#1E1616]">
                        {SITE_INFO.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-lavender-light text-[#374880] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-brand-muted block">
                        Thời gian làm việc
                      </span>
                      <span className="font-semibold text-[#1E1616]">
                        Thứ 2 – Chủ Nhật (8:00 – 21:00)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#374880] hover:bg-[#2B3966] text-white text-xs sm:text-sm font-bold transition-colors min-h-11"
                  >
                    <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                    <span>Fanpage Facebook</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                  <a
                    href={TIKTOK_SHOP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs sm:text-sm font-bold transition-colors min-h-11"
                  >
                    <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
                    <span>TikTok Shop</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-8">
              <h2 className="text-lg font-black text-[#1E1616] mb-1">
                Gửi tin nhắn cho LIVORA
              </h2>
              <p className="text-xs sm:text-sm text-[#5A4D4B] mb-6">
                Điền thông tin bên dưới để nhận tư vấn nhanh về sản phẩm hoặc bảo hành.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
