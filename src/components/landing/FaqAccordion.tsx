"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DEFAULT_FAQS, type FaqItem } from "@/lib/faqs";

interface FaqAccordionProps {
  faqs?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqAccordion({
  faqs = DEFAULT_FAQS,
  title = "Câu hỏi thường gặp",
  subtitle = "Giải đáp nhanh những thắc mắc phổ biến của các mẹ khi mua sắm.",
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-labelledby="faq-heading" className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight"
            >
              {title}
            </h2>
            <p className="text-sm text-[#3D2E2D] mt-1.5">{subtitle}</p>
          </div>

          {/* Danh sách câu hỏi dạng gập mở */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] min-h-14"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#1E1616] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#933D33] text-white rotate-180"
                          : "bg-brand-cream text-[#1E1616]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mx-4 mb-4 sm:mx-5 sm:mb-5 p-4 rounded-xl bg-brand-cream text-xs sm:text-sm text-[#3D2E2D] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqAccordion;
