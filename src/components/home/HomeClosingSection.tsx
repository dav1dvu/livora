"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  PhoneCall,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { SITE_INFO, FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";
import {
  motionTokens,
  staggerContainer,
  staggerItem,
  VIEWPORT_ONCE,
} from "@/lib/motion-tokens";

const POLICIES = [
  {
    icon: ShieldCheck,
    title: "Bảo hành 18 tháng",
    desc: "Kích hoạt điện tử theo số điện thoại mua hàng, tra cứu dễ dàng.",
    accent: "bg-brand-rose-light text-[#933D33]",
  },
  {
    icon: RotateCcw,
    title: "1 đổi 1 trong 30 ngày",
    desc: "Lỗi kỹ thuật từ NSX được đổi máy mới tận nhà hoàn toàn miễn phí.",
    accent: "bg-brand-peach-light text-[#933D33]",
  },
  {
    icon: Truck,
    title: "Freeship đơn từ 450k",
    desc: "Đóng gói 3 lớp chống sốc an toàn cho thố sứ và cối thủy tinh.",
    accent: "bg-brand-lavender-light text-[#374880]",
  },
  {
    icon: CheckCircle2,
    title: "Đồng kiểm khi nhận",
    desc: "Mở hộp kiểm tra ngoại quan và phụ kiện trước khi thanh toán.",
    accent: "bg-brand-lavender-light text-[#374880]",
  },
];

export function HomeClosingSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-8 sm:space-y-12 pb-14">
      {/* Service Commitments Bento Strip */}
      <section aria-labelledby="home-commitments-heading" className="pt-12 sm:pt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: motionTokens.duration.slow,
              ease: motionTokens.easing.smooth,
            }}
            className="max-w-2xl mb-8"
          >
            <h2
              id="home-commitments-heading"
              className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight"
            >
              Quyền lợi & bảo hành trọn tâm
            </h2>
            <p className="text-sm sm:text-base text-[#5A4D4B] mt-1.5">
              Sự an tâm của gia đình bạn là ưu tiên cao nhất trong mỗi đơn hàng LIVORA.
            </p>
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {POLICIES.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={reduceMotion ? undefined : staggerItem}
                  className="p-6 rounded-2xl bg-white border border-[#EDE4E1] flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl ${p.accent} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#1E1616] mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A4D4B] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <FaqAccordion />

      {/* Dark Espresso Sanctuary CTA */}
      <section aria-labelledby="home-sanctuary-heading">
        <div className="container mx-auto px-4">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: motionTokens.duration.slow,
              ease: motionTokens.easing.smooth,
            }}
            className="rounded-3xl bg-[#241818] text-white p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <h2
                id="home-sanctuary-heading"
                className="text-2xl sm:text-4xl font-black tracking-tight leading-tight"
              >
                Đồng hành cùng mẹ{" "}
                <span className="font-editorial italic font-semibold text-brand-rose">
                  trong từng bữa ăn đầu đời
                </span>
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Cần tư vấn chọn dung tích nồi nấu chậm, máy xay ăn dặm hay bộ dụng cụ Bé khỏe - Mẹ vui? Nhắn ngay cho đội ngũ LIVORA để được hỗ trợ 24/7.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
                >
                  <span>Về LIVORA (About us)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
                >
                  <span>Xem toàn bộ FAQ</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
                >
                  <span>Liên hệ (Contact)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-[#332222] p-6 space-y-4">
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-stone-300">
                  <PhoneCall className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-xs">
                      Hotline tư vấn (8:00 – 21:00)
                    </span>
                    <a
                      href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                      className="font-bold text-white hover:text-brand-rose transition-colors"
                    >
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-stone-300">
                  <MapPin className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400 block text-xs">
                      Kho hàng & bảo hành
                    </span>
                    <span className="text-stone-200">{SITE_INFO.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#374880] hover:bg-[#2B3966] text-white text-xs font-bold transition-colors active:scale-[0.98] min-h-11"
                >
                  <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                  <span>Mua qua Facebook</span>
                </a>
                <a
                  href={TIKTOK_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs font-bold transition-colors active:scale-[0.98] min-h-11"
                >
                  <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
                  <span>TikTok Shop</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
