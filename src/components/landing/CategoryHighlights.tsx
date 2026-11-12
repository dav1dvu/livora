import Link from "next/link";
import { Utensils, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Category } from "@/lib/types";

interface CategoryHighlightsProps {
  categories: Category[];
}

export function CategoryHighlights({ categories }: CategoryHighlightsProps) {
  const countMap = new Map<string, number>();
  categories.forEach((c) => countMap.set(c.slug, c.productCount));

  // 3 nhóm sản phẩm chủ đạo chính thức
  const highlights = [
    {
      slug: "noi-nau-cham",
      name: "Nồi nấu chậm thố sứ",
      desc: "Hầm cách thủy giữ trọn 99% vitamin, cháo nhừ tơi không trào",
      count: countMap.get("noi-nau-cham") ?? 5,
      icon: Utensils,
    },
    {
      slug: "may-xay-an-dam",
      name: "Máy xay ăn dặm",
      desc: "Cối thủy tinh chịu lực, xay nhuyễn mịn khẩu phần nhỏ cho bé",
      count: countMap.get("may-xay-an-dam") ?? 3,
      icon: Sparkles,
    },
    {
      slug: "be-khoe-me-vui",
      name: "Bé khỏe - mẹ vui",
      desc: "Đồ dùng silicon an toàn và dụng cụ tập ăn dặm tiện lợi",
      count: countMap.get("be-khoe-me-vui") ?? 7,
      icon: Heart,
    },
  ];

  return (
    <section id="danh-muc-noi-bat" aria-labelledby="highlights-heading" className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header ngắn gọn, rõ ràng */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2
              id="highlights-heading"
              className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight"
            >
              Danh mục nổi bật
            </h2>
            <p className="text-sm sm:text-base text-[#3D2E2D] mt-1.5">
              Những dòng thiết bị và đồ dùng ăn dặm được nhiều gia đình tin dùng mỗi ngày.
            </p>
          </div>

          <Link
            href="/danh-muc/tat-ca"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#933D33] hover:text-[#7D2E25] transition-colors py-2 self-start sm:self-auto"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Lưới 3 danh mục chính gọn gàng, chạm dễ dàng */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/danh-muc/${item.slug}`}
                className="group p-5 sm:p-6 rounded-2xl bg-white hover:bg-brand-rose-light transition-colors duration-200 flex flex-col justify-between min-h-[150px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] border border-[#EDE4E1]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-cream text-[#933D33] group-hover:bg-[#933D33] group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#5A4D4B] group-hover:text-[#933D33] transition-colors duration-200 bg-[#FAF5F0] px-2 py-0.5 rounded-full">
                      {item.count} sản phẩm
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1E1616] group-hover:text-[#933D33] transition-colors duration-200 mb-1">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A4D4B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#933D33]">
                  <span>Xem sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategoryHighlights;

