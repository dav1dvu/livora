import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "About us - Về LIVORA Official | Chăm sóc bằng cả trái tim",
  description:
    "Tìm hiểu câu chuyện thương hiệu LIVORA Official: chuyên gia dụng thông minh & sản phẩm mẹ và bé chính hãng, an toàn vật liệu, bảo hành 18 tháng.",
};

const BRAND_PILLARS = [
  {
    title: "Vật liệu an toàn tiếp xúc thực phẩm",
    detail:
      "Thố sứ tự nhiên nung trên 1.200°C, thủy tinh Borosilicate chịu nhiệt và silicon thực phẩm không chứa BPA.",
  },
  {
    title: "Giao diện 100% tiếng Việt",
    detail:
      "Bảng điều khiển tiếng Việt rõ ràng, chế độ nấu cài sẵn để bố mẹ, ông bà hay người giúp việc đều dùng dễ dàng.",
  },
  {
    title: "Bảo hành điện tử 18 tháng",
    detail:
      "Quản lý theo số điện thoại đặt hàng, không lo thất lạc giấy tờ, hỗ trợ đổi mới 1 đổi 1 trong 30 ngày đầu.",
  },
  {
    title: "Đồng kiểm nguyên vẹn toàn quốc",
    detail:
      "Đóng gói 3 lớp chống sốc cho đồ sứ và thủy tinh, mở kiểm tra trước khi thanh toán.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb items={[{ label: "About us" }]} />
      </div>

      {/* Editorial Brand Story */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1E1616] tracking-tight leading-[1.15] text-balance">
                Yêu thương từ những điều nhỏ bé.{" "}
                <span className="text-[#933D33]">
                  Chăm sóc bằng cả trái tim.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#3D2E2D] leading-relaxed text-pretty">
                LIVORA Việt Nam ra đời với mong muốn trở thành người bạn đồng hành tin cậy của mọi gia đình trẻ. Chúng tôi phân phối chính hãng các dòng thiết bị gia dụng thông minh và đồ dùng chăm sóc mẹ & bé đạt chuẩn an toàn cao nhất, từ nồi nấu chậm thố sứ, máy xay ăn dặm đến bộ dụng cụ tập ăn silicon mềm mại cho bé.
              </p>

              <p className="text-sm sm:text-base text-[#5A4D4B] leading-relaxed text-pretty">
                Mỗi sản phẩm trước khi đến tay gia đình đều được kiểm tra nguồn gốc, vật liệu an toàn nhiệt và đi kèm hướng dẫn sử dụng tiếng Việt đầy đủ.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#933D33] hover:bg-[#7D2E25] text-white font-bold text-sm transition-colors min-h-11"
                >
                  <span>Khám phá cửa hàng</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4EBE6] hover:bg-[#EADBD4] text-[#1E1616] font-bold text-sm transition-colors min-h-11"
                >
                  <span>Liên hệ tư vấn</span>
                </Link>
              </div>
            </div>

            {/* Clean Stacked Editorial Commitments (No Icon-Card Clutter) */}
            <div className="lg:col-span-5 space-y-3">
              {BRAND_PILLARS.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-brand-cream space-y-1"
                >
                  <h2 className="text-sm sm:text-base font-bold text-[#1E1616]">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5A4D4B] leading-relaxed text-pretty">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
