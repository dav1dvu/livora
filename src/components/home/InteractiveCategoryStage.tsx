"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Utensils, Sparkles, Heart, Check } from "lucide-react";
import { FacebookIcon } from "@/components/ui/Icons";
import { Category, Product, FACEBOOK_PAGE_URL } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { motionTokens, springs, VIEWPORT_ONCE } from "@/lib/motion-tokens";

interface InteractiveCategoryStageProps {
  categories: Category[];
  products: Product[];
}

interface CategoryMeta {
  title: string;
  tagline: string;
  highlights: string[];
  icon: typeof Utensils;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "noi-nau-cham": {
    title: "Nồi nấu chậm thố sứ",
    tagline:
      "Làm chín thực phẩm gián tiếp bằng hơi nước 3D, giữ trọn dưỡng chất và hương vị tự nhiên mà không trào bọt hay khê đáy.",
    highlights: [
      "Thố sứ trắng tự nhiên không chì, an toàn cho trẻ nhỏ",
      "Bảng điều khiển tiếng Việt hoàn toàn, hẹn giờ thông minh",
      "Tự ngắt khi cạn nước, giữ ấm tự động suốt nhiều giờ",
    ],
    icon: Utensils,
  },
  "may-xay-an-dam": {
    title: "Máy xay ăn dặm chuyên dụng",
    tagline:
      "Lưỡi dao inox 304 đa tầng kết hợp cối thủy tinh Borosilicate dày dặn, xay nhuyễn mịn ngay cả khẩu phần nhỏ cho bé.",
    highlights: [
      "Xay được khẩu phần ít từ 50ml, không dính cối",
      "Cối thủy tinh chịu nhiệt, dễ vệ sinh, không ám mùi",
      "Vận hành êm ái với chân đế chống rung trượt",
    ],
    icon: Sparkles,
  },
  "be-khoe-me-vui": {
    title: "Bé khỏe - Mẹ vui",
    tagline:
      "Bộ dụng cụ ăn dặm silicon thực phẩm, yếm máng hứng, khay đế hít và cân tiểu ly giúp mẹ chuẩn bị bữa ăn dặm chuẩn chỉnh mỗi ngày.",
    highlights: [
      "Silicon cao cấp mềm dẻo, không chứa BPA độc hại",
      "Thiết kế vừa tay bé tập ăn tự lập (BLW)",
      "Đặt mua & tư vấn trực tiếp qua Fanpage Facebook LIVORA",
    ],
    icon: Heart,
  },
};

export function InteractiveCategoryStage({
  categories,
  products,
}: InteractiveCategoryStageProps) {
  const reduceMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState(
    categories[0]?.slug ?? "be-khoe-me-vui"
  );

  const activeCategory =
    categories.find((c) => c.slug === activeSlug) ?? categories[0];
  const meta = CATEGORY_META[activeSlug] ?? {
    title: activeCategory?.name ?? "Danh mục",
    tagline: "Sản phẩm chọn lọc chính hãng LIVORA.",
    highlights: ["Bảo hành điện tử 18 tháng", "1 đổi 1 trong 30 ngày"],
    icon: Sparkles,
  };

  const previewProducts = products
    .filter((p) => p.category === activeSlug)
    .slice(0, 3);
  const isBeKhoeMeVui = activeSlug === "be-khoe-me-vui";

  return (
    <section
      aria-labelledby="category-stage-heading"
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{
            duration: motionTokens.duration.slow,
            ease: motionTokens.easing.smooth,
          }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8"
        >
          <div>
            <h2
              id="category-stage-heading"
              className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight"
            >
              Ba dòng sản phẩm chủ đạo
            </h2>
            <p className="text-sm sm:text-base text-[#5A4D4B] mt-1.5 max-w-xl">
              Chạm để xem câu chuyện thiết kế và các mẫu nổi bật theo từng giai đoạn ăn dặm của bé.
            </p>
          </div>

          {/* Interactive Sliding Tab Switcher */}
          <div
            role="tablist"
            aria-label="Chọn dòng sản phẩm"
            className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#EFE5E1] border border-[#E4D6D1] self-start"
          >
            {categories.map((cat) => {
              const isSelected = cat.slug === activeSlug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveSlug(cat.slug)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    isSelected
                      ? "text-white"
                      : "text-[#4A3B3A] hover:text-[#1E1616]"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="category-stage-pill"
                      transition={springs.tab}
                      className="absolute inset-0 rounded-xl bg-[#933D33]"
                    />
                  )}
                  <span className="relative z-10">
                    {cat.name} ({cat.productCount})
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Animated Stage Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{
              duration: motionTokens.duration.normal,
              ease: motionTokens.easing.smooth,
            }}
            className="rounded-[2rem] p-2 bg-[#EFE5E1] ring-1 ring-[#E2D3CD]"
          >
            <div className="rounded-[calc(2rem-0.5rem)] bg-white p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Info */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose-light text-[#933D33] flex items-center justify-center">
                    <meta.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#933D33] tabular-nums">
                    {activeCategory?.productCount ?? previewProducts.length} sản phẩm chính hãng
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-[#1E1616] tracking-tight">
                  {meta.title}
                </h3>

                <p className="text-sm text-[#4A3B3A] leading-relaxed text-pretty">
                  {meta.tagline}
                </p>

                <ul className="space-y-2.5 pt-1">
                  {meta.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3D2E2D]"
                    >
                      <span className="w-5 h-5 rounded-full bg-brand-rose-light text-[#933D33] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href={`/danh-muc/${activeSlug}`}
                    className="group inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-[#241818] hover:bg-[#3A2828] text-white text-xs sm:text-sm font-bold transition-colors active:scale-[0.98] min-h-11"
                  >
                    <span>Xem toàn bộ danh mục</span>
                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>

                  {isBeKhoeMeVui && (
                    <a
                      href={FACEBOOK_PAGE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#374880] hover:bg-[#2B3966] text-white text-xs sm:text-sm font-bold transition-colors active:scale-[0.98] min-h-11"
                    >
                      <FacebookIcon className="w-4 h-4 fill-current" />
                      <span>Mua qua Facebook</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right 3-Card Preview Strip */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {previewProducts.map((product, index) => (
                  <motion.div
                    key={product.slug}
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 16 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: motionTokens.duration.normal,
                      ease: motionTokens.easing.smooth,
                      delay: index * 0.06,
                    }}
                  >
                    <Link
                      href={`/san-pham/${product.slug}`}
                      className="group block h-full rounded-2xl bg-brand-cream border border-[#EDE4E1] hover:border-[#933D33] p-3.5 transition-colors duration-200"
                    >
                      <div className="relative aspect-square rounded-xl bg-white overflow-hidden mb-3">
                        <Image
                          src={product.imageUrl || product.thumbnail || "/placeholder.png"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 80vw, 22vw"
                          className="object-contain p-2.5 transition-transform duration-300 ease-out group-hover:scale-105"
                        />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1E1616] line-clamp-2 min-h-9 group-hover:text-[#933D33] transition-colors">
                        {product.name}
                      </h4>
                      <div className="mt-2 flex items-center justify-between gap-2 tabular-nums">
                        <span className="text-sm font-black text-[#933D33]">
                          {formatPrice(product.price)}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#786B69] group-hover:text-[#933D33] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
