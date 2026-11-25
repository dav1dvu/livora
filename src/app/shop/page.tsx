import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Sparkles, ShoppingBag } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories } from "@/lib/categories";
import { getProducts, getProductsByCategory, searchProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop - Tất Cả Sản Phẩm Chính Hãng | LIVORA Official",
  description:
    "Mua sắm nồi nấu chậm Bear, máy xay ăn dặm và đồ dùng Bé khỏe - Mẹ vui chính hãng tại LIVORA Official Store. Bảo hành 18 tháng, 1 đổi 1 trong 30 ngày.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}

function buildShopHref(params: { category?: string; sort?: string; q?: string }): string {
  const sp = new URLSearchParams();
  if (params.category) sp.set("category", params.category);
  if (params.sort) sp.set("sort", params.sort);
  if (params.q) sp.set("q", params.q);
  const qs = sp.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort, q } = await searchParams;
  const categories = await getCategories();

  let products = q
    ? await searchProducts(q)
    : category
    ? await getProductsByCategory(category)
    : await getProducts();

  if (sort === "hot") {
    products = products.filter((p) => p.isHot);
  } else if (sort === "moi") {
    products = products.filter((p) => p.isNew);
  }

  const activeCategoryName = category
    ? categories.find((c) => c.slug === category)?.name ?? category
    : "Tất cả sản phẩm";

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-14">
      <Breadcrumb items={[{ label: "Shop" }]} />

      {/* Header */}
      <div className="rounded-3xl bg-white border border-[#EDE4E1] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#933D33] mb-2">
            <ShoppingBag className="w-4 h-4" />
            <span>LIVORA Official Store</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1E1616] tracking-tight">
            {q ? `Tìm kiếm: "${q}"` : activeCategoryName}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A4D4B] mt-1">
            Hiển thị {products.length} sản phẩm chính hãng — bảo hành 18 tháng, 1 đổi 1 trong 30 ngày
          </p>
        </div>

        {/* Sort Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={buildShopHref({ category, q })}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              !sort
                ? "bg-[#933D33] text-white border-[#933D33]"
                : "bg-brand-cream text-[#4A3B3A] border-[#EDE4E1] hover:border-brand-primary"
            }`}
          >
            Tất cả
          </Link>
          <Link
            href={buildShopHref({ category, sort: "hot", q })}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              sort === "hot"
                ? "bg-[#933D33] text-white border-[#933D33]"
                : "bg-brand-rose-light text-brand-primary border-brand-rose-border hover:bg-[#F8DFD7]"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>HOT bán chạy</span>
          </Link>
          <Link
            href={buildShopHref({ category, sort: "moi", q })}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              sort === "moi"
                ? "bg-[#374880] text-white border-[#374880]"
                : "bg-brand-lavender-light text-[#374880] border-brand-lavender-border hover:bg-[#E2E6F7]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mới ra mắt</span>
          </Link>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={buildShopHref({ sort })}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
            !category
              ? "bg-brand-charcoal text-white border-brand-charcoal"
              : "bg-white text-[#4A3B3A] border-[#EDE4E1] hover:border-brand-primary hover:text-brand-primary"
          }`}
        >
          Tất cả danh mục
        </Link>
        {categories.map((cat) => {
          const isSelected = category === cat.slug;
          return (
            <Link
              key={cat.slug}
              href={buildShopHref({ category: cat.slug, sort })}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
                isSelected
                  ? "bg-brand-charcoal text-white border-brand-charcoal"
                  : "bg-white text-[#4A3B3A] border-[#EDE4E1] hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {cat.name} ({cat.productCount})
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        emptyMessage={
          q
            ? `Không tìm thấy sản phẩm nào với từ khóa "${q}". Hãy thử từ khóa khác.`
            : "Chưa có sản phẩm nào phù hợp với bộ lọc này."
        }
      />
    </div>
  );
}
