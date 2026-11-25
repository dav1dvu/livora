"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";
import { ArrowUpRight, ArrowDown, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { Product, FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";
import {
  formatPrice,
  getCategoryDisplayName,
  getDiscountLabel,
  isBeKhoeMeVuiProduct,
} from "@/lib/utils";
import { motionTokens, springs } from "@/lib/motion-tokens";

interface HeroEditorialProps {
  spotlightProducts: Product[];
  totalProducts: number;
}

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.0,
      ease: motionTokens.easing.smooth,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function HeroEditorial({
  spotlightProducts,
  totalProducts,
}: HeroEditorialProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (spotlightProducts.length <= 1 || isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      setActiveIdx((prev) => (prev + 1) % spotlightProducts.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [spotlightProducts.length, isPaused, reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const showcaseY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -24]
  );

  const activeProduct = spotlightProducts[activeIdx] ?? spotlightProducts[0];
  const isFacebookOnly = activeProduct ? isBeKhoeMeVuiProduct(activeProduct) : false;

  const headlineLineInitial = reduceMotion
    ? false
    : { y: "105%", opacity: 0 };

  return (
    <section
      ref={heroRef}
      aria-label="Giới thiệu LIVORA Official"
      className="relative overflow-hidden pt-6 sm:pt-10 lg:pt-14 pb-12 sm:pb-16 lg:pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Masked Line-by-Line Headline Reveal */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#1E1616] leading-[1.12] tracking-tight text-balance">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={headlineLineInitial}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: motionTokens.duration.reveal,
                    ease: motionTokens.easing.smooth,
                    delay: 0.05,
                  }}
                >
                  Yêu thương từ những điều nhỏ bé.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2 mt-1">
                <motion.span
                  className="block font-editorial italic font-semibold text-[#933D33]"
                  initial={headlineLineInitial}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: motionTokens.duration.reveal,
                    ease: motionTokens.easing.smooth,
                    delay: 0.16,
                  }}
                >
                  Chăm sóc bằng cả trái tim.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionTokens.duration.slow,
                ease: motionTokens.easing.smooth,
                delay: 0.26,
              }}
              className="text-sm sm:text-base lg:text-lg text-[#4A3B3A] leading-relaxed max-w-xl text-pretty"
            >
              Gia dụng thông minh Bear phiên bản tiếng Việt và bộ đồ dùng ăn dặm an toàn cho mẹ & bé. Kiểm định vật liệu không BPA, bảo hành điện tử 18 tháng, 1 đổi 1 trong 30 ngày.
            </motion.p>

            {/* Tactile CTA Row (Button-in-Button + Anchor) */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionTokens.duration.slow,
                ease: motionTokens.easing.smooth,
                delay: 0.34,
              }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#933D33] hover:bg-[#7D2E25] text-white font-bold text-sm sm:text-base transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] min-h-12"
              >
                <span>Khám phá cửa hàng</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>

              <a
                href="#bo-suu-tap"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-brand-rose-light text-[#1E1616] border border-[#E6D8D3] font-bold text-sm transition-colors duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] min-h-12"
              >
                <span>Xem {totalProducts} sản phẩm</span>
                <ArrowDown className="w-4 h-4 text-[#933D33]" />
              </a>
            </motion.div>

            {/* Stat Strip with Tabular Counters */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionTokens.duration.slow,
                ease: motionTokens.easing.smooth,
                delay: 0.42,
              }}
              className="grid grid-cols-3 gap-3 sm:gap-5 pt-4 border-t border-[#EAE0DC]"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-black text-[#1E1616]">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#933D33] shrink-0" />
                  <AnimatedCounter value={18} suffix=" th" />
                </div>
                <p className="text-[11px] sm:text-xs text-[#5A4D4B] mt-0.5">
                  Bảo hành điện tử
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-black text-[#1E1616]">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-[#933D33] shrink-0" />
                  <AnimatedCounter value={30} suffix=" ngày" />
                </div>
                <p className="text-[11px] sm:text-xs text-[#5A4D4B] mt-0.5">
                  1 đổi 1 tận nơi
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-black text-[#1E1616]">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#5668AD] shrink-0" />
                  <AnimatedCounter value={totalProducts} suffix=" SP" />
                </div>
                <p className="text-[11px] sm:text-xs text-[#5A4D4B] mt-0.5">
                  Chọn lọc chính hãng
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Double-Bezel Interactive Spotlight Showcase */}
          {activeProduct && (
            <motion.div
              style={{ y: showcaseY }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="lg:col-span-6"
            >
              {/* Outer Shell (Double-Bezel Architecture) */}
              <div className="rounded-[2rem] p-2 bg-[#EFE5E1] ring-1 ring-[#E2D3CD]">
                {/* Inner Core */}
                <div className="rounded-[calc(2rem-0.5rem)] bg-white p-5 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  {/* Spotlight Switcher Pills */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {spotlightProducts.map((item, idx) => {
                        const isSelected = idx === activeIdx;
                        return (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => setActiveIdx(idx)}
                            className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                              isSelected ? "text-white" : "text-[#5A4D4B] hover:text-[#1E1616]"
                            }`}
                          >
                            {isSelected && (
                              <motion.span
                                layoutId="hero-spotlight-pill"
                                transition={springs.tab}
                                className="absolute inset-0 rounded-full bg-[#241818]"
                              />
                            )}
                            <span className="relative z-10">
                              {getCategoryDisplayName(item.category)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Animated Product Stage */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProduct.slug}
                      initial={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: 12, scale: 0.985 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -10, scale: 0.985 }
                      }
                      transition={{
                        duration: motionTokens.duration.normal,
                        ease: motionTokens.easing.smooth,
                      }}
                      className="space-y-5"
                    >
                      <Link
                        href={`/san-pham/${activeProduct.slug}`}
                        className="group relative block aspect-[4/3] w-full rounded-2xl bg-[#FAF6F2] overflow-hidden border border-[#F0E6E2]"
                      >
                        <Image
                          src={activeProduct.imageUrl || activeProduct.thumbnail || "/placeholder.png"}
                          alt={activeProduct.name}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          {activeProduct.discountPercentage > 0 && (
                            <Badge variant="sale">
                              {getDiscountLabel(activeProduct.discountPercentage)}
                            </Badge>
                          )}
                          {activeProduct.isHot && <Badge variant="hot">HOT</Badge>}
                        </div>
                      </Link>

                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <span className="text-xs font-bold text-[#933D33]">
                            {getCategoryDisplayName(activeProduct.category)}
                          </span>
                          <h2 className="text-base sm:text-lg font-black text-[#1E1616] line-clamp-2 leading-snug">
                            <Link
                              href={`/san-pham/${activeProduct.slug}`}
                              className="hover:text-[#933D33] transition-colors"
                            >
                              {activeProduct.name}
                            </Link>
                          </h2>
                          <div className="flex items-baseline gap-2.5 pt-1 tabular-nums">
                            <span className="text-xl sm:text-2xl font-black text-[#933D33]">
                              {formatPrice(activeProduct.price)}
                            </span>
                            {activeProduct.originalPrice &&
                              activeProduct.originalPrice > activeProduct.price && (
                                <span className="text-xs text-[#9B8C8A] line-through">
                                  {formatPrice(activeProduct.originalPrice)}
                                </span>
                              )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isFacebookOnly ? (
                            <a
                              href={FACEBOOK_PAGE_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#374880] hover:bg-[#2B3966] text-white text-xs font-bold transition-colors active:scale-[0.97] min-h-11"
                            >
                              <FacebookIcon className="w-4 h-4 fill-current shrink-0" />
                              <span>Mua qua Facebook</span>
                            </a>
                          ) : (
                            <a
                              href={TIKTOK_SHOP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs font-bold transition-colors active:scale-[0.97] min-h-11"
                            >
                              <TikTokIcon className="w-4 h-4 fill-current shrink-0" />
                              <span>Mua trên TikTok Shop</span>
                            </a>
                          )}
                          <Link
                            href={`/san-pham/${activeProduct.slug}`}
                            aria-label={`Xem chi tiết ${activeProduct.name}`}
                            className="w-11 h-11 rounded-xl border border-[#E6D8D3] hover:border-[#933D33] hover:bg-brand-rose-light flex items-center justify-center text-[#1E1616] hover:text-[#933D33] transition-colors"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
