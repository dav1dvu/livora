"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FacebookIcon } from "@/components/ui/Icons";
import ProductCard from "@/components/product/ProductCard";
import { Category, Product, FACEBOOK_PAGE_URL } from "@/lib/types";
import {
  motionTokens,
  springs,
  staggerContainer,
  staggerItem,
  VIEWPORT_ONCE,
} from "@/lib/motion-tokens";

interface AnimatedCatalogueProps {
  categories: Category[];
  products: Product[];
}

const CATEGORY_NOTES: Record<string, string> = {
  all: "Toàn bộ 15 sản phẩm chọn lọc chính hãng, bảo hành điện tử 18 tháng.",
  "noi-nau-cham":
    "Nồi nấu chậm thố sứ Bear bảng điều khiển tiếng Việt, hầm cách thủy giữ 99% dưỡng chất.",
  "may-xay-an-dam":
    "Máy xay ăn dặm cối thủy tinh chịu lực, xay nhuyễn mịn khẩu phần nhỏ từ 50ml.",
  "be-khoe-me-vui":
    "Đồ dùng ăn dặm silicon an toàn cho bé, đặt mua và tư vấn trực tiếp qua Fanpage Facebook.",
};

export function AnimatedCatalogue({
  categories,
  products,
}: AnimatedCatalogueProps) {
  const reduceMotion = useReducedMotion();
  const [selectedSlug, setSelectedSlug] = useState<string>("all");

  const filteredProducts =
    selectedSlug === "all"
      ? products
      : products.filter((p) => p.category === selectedSlug);

  const filterTabs = [
    { slug: "all", label: `Tất cả (${products.length})` },
    ...categories.map((cat) => ({
      slug: cat.slug,
      label: `${cat.name} (${cat.productCount})`,
    })),
  ];

  return (
    <section
      id="bo-suu-tap"
      aria-labelledby="catalogue-heading"
      className="py-12 sm:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{
            duration: motionTokens.duration.slow,
            ease: motionTokens.easing.smooth,
          }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
        >
          <div>
            <h2
              id="catalogue-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1616] tracking-tight"
            >
              Bộ sưu tập chính hãng
            </h2>
            <p className="text-sm sm:text-base text-[#5A4D4B] mt-1.5 text-pretty">
              {CATEGORY_NOTES[selectedSlug] ?? CATEGORY_NOTES.all}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {selectedSlug === "be-khoe-me-vui" && (
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#374880] hover:bg-[#2B3966] text-white text-xs font-bold transition-colors min-h-10"
              >
                <FacebookIcon className="w-3.5 h-3.5 fill-current" />
                <span>Mua qua Facebook</span>
              </a>
            )}
            <Link
              href={
                selectedSlug === "all" ? "/shop" : `/danh-muc/${selectedSlug}`
              }
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#933D33] hover:text-[#7D2E25] transition-colors py-2"
            >
              <span>Xem tại Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Filter Pills with layoutId spring indicator */}
        <div
          role="tablist"
          aria-label="Lọc bộ sưu tập sản phẩm"
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {filterTabs.map((tab) => {
            const active = selectedSlug === tab.slug;
            return (
              <button
                key={tab.slug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedSlug(tab.slug)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-h-10 ${
                  active
                    ? "text-white"
                    : "bg-white text-[#4A3B3A] hover:text-[#933D33]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="catalogue-filter-pill"
                    transition={springs.tab}
                    className="absolute inset-0 rounded-full bg-[#241818]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Staggered Animated Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSlug}
            variants={reduceMotion ? undefined : staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit={reduceMotion ? undefined : { opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.slug}
                variants={reduceMotion ? undefined : staggerItem}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
