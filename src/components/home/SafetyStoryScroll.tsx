"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Flame, BookOpen, Cpu } from "lucide-react";
import { motionTokens, VIEWPORT_ONCE } from "@/lib/motion-tokens";

const SAFETY_PILLARS = [
  {
    icon: ShieldCheck,
    tag: "Không chì & BPA",
    title: "Thố sứ tự nhiên nung > 1.200°C & thủy tinh chịu nhiệt",
    desc: "Men sứ khoáng tự nhiên không thôi nhiễm kim loại nặng khi ninh hầm nhiều giờ cho bé ăn dặm.",
    accent: "bg-brand-rose-light text-[#933D33]",
  },
  {
    icon: Flame,
    tag: "Giữ 99% vi chất",
    title: "Hầm chưng cách thủy 3D chín nhừ mềm tự nhiên",
    desc: "Làm nóng gián tiếp bằng hơi nước bao quanh thố sứ, không sôi trào bọt và không cháy khét đáy nồi.",
    accent: "bg-brand-peach-light text-[#933D33]",
  },
  {
    icon: BookOpen,
    tag: "Dễ dùng cho cả nhà",
    title: "Bảng điều khiển hoàn toàn bằng tiếng Việt",
    desc: "Chế độ nấu cài sẵn rõ ràng từng món (cháo, chưng yến, hầm canh), ông bà hay người giúp việc đều thao tác dễ dàng.",
    accent: "bg-brand-lavender-light text-[#374880]",
  },
  {
    icon: Cpu,
    tag: "Tự ngắt thông minh",
    title: "Cảm biến chống cạn nước & vỏ cách nhiệt 2 lớp",
    desc: "Tự ngắt điện khi cạn nước hoặc quá nhiệt, bảo vệ an toàn tuyệt đối cho mẹ bận rộn chăm con nhỏ.",
    accent: "bg-brand-lavender-light text-[#374880]",
  },
];

export function SafetyStoryScroll() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="safety-story-heading"
      className="py-12 sm:py-16 lg:py-24 bg-[#F4EBE6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Editorial Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                duration: motionTokens.duration.slow,
                ease: motionTokens.easing.smooth,
              }}
              className="space-y-4"
            >
              {/* Animated SVG Seal */}
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.circle
                    cx="14"
                    cy="14"
                    r="11.5"
                    stroke="#933D33"
                    strokeWidth="2"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{
                      duration: 0.9,
                      ease: motionTokens.easing.smooth,
                    }}
                  />
                  <motion.path
                    d="M9 14.5L12.5 18L19.5 10.5"
                    stroke="#933D33"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{
                      duration: 0.6,
                      delay: 0.35,
                      ease: motionTokens.easing.smooth,
                    }}
                  />
                </svg>
                <span className="text-xs font-bold text-[#1E1616]">
                  4 Chuẩn An Toàn Thực Phẩm
                </span>
              </div>

              <h2
                id="safety-story-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E1616] tracking-tight leading-tight text-balance"
              >
                Thiết bị cho bé cần độ an toàn cao nhất trong từng chi tiết.
              </h2>

              <p className="text-sm sm:text-base text-[#4A3B3A] leading-relaxed text-pretty">
                Mỗi sản phẩm tại LIVORA đều vượt qua khâu kiểm tra vật liệu tiếp xúc thực phẩm, độ ổn định nhiệt và độ thân thiện với người lớn tuổi trong gia đình.
              </p>
            </motion.div>
          </div>

          {/* Scrolling Double-Bezel Story Cards */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {SAFETY_PILLARS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{
                    duration: motionTokens.duration.slow,
                    ease: motionTokens.easing.smooth,
                    delay: idx * 0.06,
                  }}
                  className="rounded-3xl p-1.5 bg-[#E7DAD4]"
                >
                  <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 sm:p-7 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${item.accent} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="inline-block text-xs font-bold text-[#933D33] bg-brand-rose-light px-2.5 py-0.5 rounded-md">
                        {item.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-[#1E1616]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5A4D4B] leading-relaxed text-pretty">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
