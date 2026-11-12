import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";
import { CategoryHighlights } from "@/components/landing/CategoryHighlights";
import { QualityStandards } from "@/components/landing/QualityStandards";
import { ServiceCommitments } from "@/components/landing/ServiceCommitments";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { BrandCredo } from "@/components/landing/BrandCredo";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="space-y-4 sm:space-y-8 pb-12">
      {/* 1. Tiêu đề thương hiệu & slogan chuẩn */}
      <HeroSection />

      {/* 2. Danh mục nổi bật */}
      <CategoryHighlights categories={categories} />

      {/* 3. Danh sách sản phẩm chọn lọc chính thức */}
      <section className="py-6 sm:py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E1616] tracking-tight">
                Sản phẩm chọn lọc
              </h2>
              <p className="text-xs sm:text-sm text-[#5A4D4B] mt-1">
                Bộ sưu tập nồi nấu chậm, máy xay ăn dặm và đồ dùng chăm sóc bé chính hãng
              </p>
            </div>
            <Link
              href="/danh-muc/tat-ca"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#933D33] hover:text-[#7D2E25] transition-colors"
            >
              <span>Xem tất cả ({products.length} sản phẩm)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={products} />
        </div>
      </section>

      {/* 4. Tiêu chuẩn an toàn vật liệu & kỹ thuật */}
      <QualityStandards />

      {/* 5. Chính sách bảo hành & quyền lợi mua hàng */}
      <ServiceCommitments />

      {/* 6. Câu hỏi thường gặp thực tế */}
      <FaqAccordion />

      {/* 7. Lời cam kết thương hiệu & trung tâm hỗ trợ trực tiếp */}
      <BrandCredo />
    </div>
  );
}
