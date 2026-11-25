"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PhoneCall, ArrowRight } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { SITE_INFO, FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";
import { motionTokens, VIEWPORT_ONCE } from "@/lib/motion-tokens";

export function HomeClosingSection() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-10 sm:space-y-14 pb-12 sm:pb-16 pt-6 sm:pt-10">
      {/* Interactive FAQ + Link to Full FAQ Page */}
      <div>
        <FaqAccordion />
        <div className="text-center mt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#933D33] hover:text-[#7D2E25] transition-colors py-2"
          >
            <span>Xem toàn bộ giải đáp tại trang FAQ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Focused Closing Sanctuary CTA */}
      <section aria-labelledby="home-sanctuary-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{
              duration: motionTokens.duration.slow,
              ease: motionTokens.easing.smooth,
            }}
            className="rounded-3xl bg-[#241818] text-white p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10"
          >
            <div className="space-y-2 max-w-xl">
              <h2
                id="home-sanctuary-heading"
                className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-balance"
              >
                Đồng hành cùng mẹ trong từng bữa ăn đầu đời
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed text-pretty">
                Cần tư vấn chọn dung tích nồi nấu chậm, máy xay ăn dặm hay bộ đồ dùng Bé khỏe - Mẹ vui? Liên hệ đội ngũ LIVORA hỗ trợ trực tiếp 24/7.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-[#374880] hover:bg-[#2B3966] text-white text-xs sm:text-sm font-bold transition-colors active:scale-[0.98] min-h-11"
              >
                <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                <span>Mua qua Facebook</span>
              </a>

              <a
                href={TIKTOK_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs sm:text-sm font-bold transition-colors active:scale-[0.98] min-h-11"
              >
                <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
                <span>TikTok Shop</span>
              </a>

              <a
                href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#332222] hover:bg-[#422D2D] text-white text-xs sm:text-sm font-bold transition-colors min-h-11 tabular-nums"
              >
                <PhoneCall className="w-4 h-4 text-brand-rose shrink-0" />
                <span>{SITE_INFO.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
