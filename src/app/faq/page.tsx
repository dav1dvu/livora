import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { DEFAULT_FAQS, type FaqItem } from "@/lib/faqs";
import { FacebookIcon } from "@/components/ui/Icons";
import { FACEBOOK_PAGE_URL } from "@/lib/types";

export const metadata: Metadata = {
  title: "FAQ - Câu Hỏi Thường Gặp | LIVORA Official",
  description:
    "Giải đáp các câu hỏi thường gặp về sản phẩm mẹ & bé, nồi nấu chậm Bear, kênh đặt mua TikTok Shop & Facebook, bảo hành 18 tháng và chính sách 1 đổi 1 tại LIVORA.",
};

const EXTENDED_FAQS: FaqItem[] = [
  ...DEFAULT_FAQS,
  {
    q: "Các sản phẩm thuộc danh mục Bé khỏe - Mẹ vui đặt mua ở đâu?",
    a: "Các sản phẩm chăm sóc & ăn dặm thuộc danh mục Bé khỏe - Mẹ vui được đặt mua và tư vấn trực tiếp qua Fanpage Facebook chính thức của LIVORA để đội ngũ tư vấn hỗ trợ chọn phân loại phù hợp nhất cho độ tuổi của bé.",
  },
  {
    q: "Phí vận chuyển và thời gian giao hàng được tính như thế nào?",
    a: "LIVORA miễn phí vận chuyển toàn quốc cho đơn hàng từ 450.000₫. Thời gian giao hàng dự kiến từ 1–2 ngày tại nội thành Hà Nội/TP.HCM và 2–4 ngày đối với các tỉnh thành khác.",
  },
  {
    q: "Tôi có được kiểm tra hàng trước khi thanh toán không?",
    a: "Có. Tất cả đơn hàng tại LIVORA đều được hỗ trợ đồng kiểm khi nhận hàng. Bạn có thể mở hộp kiểm tra ngoại quan thân máy, thố sứ và đầy đủ phụ kiện trước khi thanh toán.",
  },
  {
    q: "Người lớn tuổi ở nhà có dễ sử dụng nồi và máy xay không?",
    a: "Rất dễ dùng. Các dòng máy chính hãng do LIVORA phân phối sử dụng bảng điều khiển tiếng Việt hoàn toàn, nút bấm to rõ ràng kèm hướng dẫn sử dụng chi tiết bằng tiếng Việt.",
  },
];

export default function FaqPage() {
  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb items={[{ label: "FAQ" }]} />
      </div>

      <section className="pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center rounded-3xl bg-white p-6 sm:p-10 mb-2">
            <h1 className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight text-balance">
              Câu hỏi thường gặp
            </h1>
            <p className="text-sm sm:text-base text-[#5A4D4B] mt-2 text-pretty">
              Tổng hợp thông tin về chất lượng sản phẩm, cách đặt hàng qua Facebook / TikTok Shop, vận chuyển và bảo hành điện tử 18 tháng tại LIVORA.
            </p>
          </div>
        </div>
      </section>

      <FaqAccordion
        faqs={EXTENDED_FAQS}
        title="Thắc mắc phổ biến"
        subtitle="Nhấn vào từng câu hỏi để xem giải đáp chi tiết."
      />

      {/* Focused CTA */}
      <section className="pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto rounded-3xl bg-[#241818] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black mb-1">
                Cần tư vấn thêm?
              </h2>
              <p className="text-xs sm:text-sm text-stone-300">
                Nhắn tin qua Fanpage Facebook hoặc gửi yêu cầu tại trang Contact để được phản hồi nhanh nhất.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#374880] hover:bg-[#2B3966] text-white text-xs sm:text-sm font-bold transition-colors min-h-11"
              >
                <FacebookIcon className="w-4 h-4 fill-current" />
                <span>Chat Facebook</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs sm:text-sm font-bold transition-colors min-h-11"
              >
                <span>Trang Contact</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
