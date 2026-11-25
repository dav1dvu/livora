import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ShieldCheck, Sparkles, Users, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { QualityStandards } from "@/components/landing/QualityStandards";
import { ServiceCommitments } from "@/components/landing/ServiceCommitments";
import { BrandCredo } from "@/components/landing/BrandCredo";

export const metadata: Metadata = {
  title: "About us - Về LIVORA Official | Chăm sóc bằng cả trái tim",
  description:
    "Tìm hiểu câu chuyện thương hiệu LIVORA Official: chuyên gia dụng thông minh & sản phẩm mẹ và bé chính hãng, an toàn vật liệu, bảo hành 18 tháng.",
};

const CORE_VALUES = [
  {
    icon: Heart,
    title: "Tận tâm từ điều nhỏ nhất",
    desc: "Mỗi thiết bị và dụng cụ ăn dặm đều được chọn lọc kỹ lưỡng để mẹ nhẹ nhàng hơn trong từng bữa ăn của bé.",
  },
  {
    icon: ShieldCheck,
    title: "Minh bạch chất lượng & xuất xứ",
    desc: "100% sản phẩm chính hãng, có kiểm định vật liệu an toàn thực phẩm, không chứa BPA hay kim loại nặng.",
  },
  {
    icon: Users,
    title: "Đồng hành sau bán hàng",
    desc: "Đội ngũ tư vấn thực đơn ăn dặm và kỹ thuật viên luôn hỗ trợ 24/7 qua Hotline và Fanpage Facebook.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-12">
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: "About us" }]} />
      </div>

      {/* Brand Story Hero */}
      <section className="py-4 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white border border-[#EDE4E1] p-6 sm:p-10 lg:p-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-rose-light border border-brand-rose-border text-xs font-bold text-[#933D33] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Câu chuyện thương hiệu LIVORA</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1E1616] tracking-tight leading-tight max-w-3xl mb-5">
              Yêu thương từ những điều nhỏ bé.{" "}
              <span className="text-[#933D33]">Chăm sóc bằng cả trái tim.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#3D2E2D] leading-relaxed max-w-3xl mb-8">
              LIVORA Việt Nam ra đời với mong muốn trở thành người bạn đồng hành tin cậy của mọi gia đình trẻ. Chúng tôi phân phối chính hãng các dòng thiết bị gia dụng thông minh và đồ dùng chăm sóc mẹ & bé đạt chuẩn an toàn cao nhất — từ nồi nấu chậm thố sứ, máy xay ăn dặm đến bộ dụng cụ tập ăn silicon mềm mại cho bé.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white font-bold text-sm transition-colors"
              >
                <span>Khám phá cửa hàng</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-rose-light hover:bg-[#F8DFD7] text-[#933D33] border border-brand-rose-border font-bold text-sm transition-colors"
              >
                <span>Liên hệ tư vấn</span>
              </Link>
            </div>

            {/* 3 Core Values */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {CORE_VALUES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 sm:p-6 rounded-2xl bg-brand-cream border border-[#EDE4E1]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-rose-light text-[#933D33] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-[#1E1616] mb-1.5">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5A4D4B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <QualityStandards />
      <ServiceCommitments />
      <BrandCredo />
    </div>
  );
}
