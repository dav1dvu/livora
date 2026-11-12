"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Sản phẩm của LIVORA có nguồn gốc xuất xứ từ đâu?",
      a: "LIVORA phân phối chính hãng các dòng thiết bị gia dụng và sản phẩm mẹ & bé (chủ đạo là Bear phiên bản chuẩn hóa tiếng Việt và quốc tế). Sản phẩm đều có tem phụ, giấy kiểm định an toàn vật liệu và hóa đơn rõ ràng.",
    },
    {
      q: "Nồi nấu chậm cách thủy khác gì so với nồi nấu thông thường?",
      a: "Nồi làm nóng gián tiếp bằng hơi nước bao quanh thố sứ. Thức ăn chín nhừ mềm tự nhiên, giữ trọn 99% vitamin và khoáng chất, không bị trào bọt và không cháy khét đáy nồi.",
    },
    {
      q: "Đặt mua trên TikTok Shop có được bảo hành chính hãng không?",
      a: "Có. Gian hàng TikTok Shop của LIVORA là kênh chính thức. Mọi đơn hàng đều tự động liên kết với hệ thống bảo hành điện tử 18 tháng và áp dụng chính sách 1 đổi 1 trong 30 ngày như mua trực tiếp.",
    },
    {
      q: "Chính sách 1 đổi 1 trong 30 ngày được hỗ trợ ra sao?",
      a: "Nếu sản phẩm có lỗi kỹ thuật từ nhà sản xuất trong 30 ngày đầu, bạn chỉ cần liên hệ hotline hoặc nhắn tin cho Fanpage. Đội ngũ LIVORA sẽ hỗ trợ đổi máy mới tận nhà mà không thu thêm phí.",
    },
  ];

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
              Câu hỏi thường gặp
            </h2>
            <p className="text-sm text-[#3D2E2D] mt-1.5">
              Giải đáp nhanh những thắc mắc phổ biến của các mẹ khi mua sắm.
            </p>
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
