import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsByCategory, getProducts, searchProducts } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; sort?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { q, sort } = await searchParams;

  if (slug === "tat-ca") {
    if (sort === "hot") {
      return {
        title: "Sản Phẩm HOT Bán Chạy Nhất | LIVORA Official",
        description: "Các mẫu đồ gia dụng mẹ bé và thông minh chính hãng bán chạy nhất.",
      };
    }
    if (sort === "moi") {
      return {
        title: "Sản Phẩm Mới Ra Mắt | LIVORA Official",
        description: "Các mẫu đồ gia dụng thông minh LIVORA phiên bản mới nhất.",
      };
    }
    return {
      title: q
        ? `Kết quả tìm kiếm cho "${q}" | LIVORA Official`
        : "Tất Cả Sản Phẩm LIVORA Chính Hãng",
      description:
        "Danh sách đầy đủ sản phẩm mẹ bé và gia dụng chính hãng LIVORA bảo hành 18 tháng.",
    };
  }

  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { title: "Danh mục sản phẩm - LIVORA Official" };
  }

  return {
    title: `${category.name} | LIVORA Official`,
    description: `Khám phá các sản phẩm ${category.name} chính hãng tại LIVORA. Bảo hành 18 tháng, 1 đổi 1 trong 30 ngày.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { q, sort } = await searchParams;

  let products = [];
  let categoryName = "Tất cả sản phẩm";

  if (q) {
    products = await searchProducts(q);
    categoryName = `Kết quả tìm kiếm: "${q}"`;
  } else if (slug === "tat-ca") {
    const all = await getProducts();
    if (sort === "hot") {
      products = all.filter((p) => p.isHot);
      categoryName = "Sản phẩm HOT bán chạy";
    } else if (sort === "moi") {
      products = all.filter((p) => p.isNew);
      categoryName = "Sản phẩm MỚI ra mắt";
    } else {
      products = all;
    }
  } else {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      products = await getProductsByCategory(slug);
      if (products.length === 0) {
        notFound();
      }
      categoryName = products[0]?.category || slug;
    } else {
      categoryName = category.name;
      products = await getProductsByCategory(slug);
    }

    if (sort === "hot") {
      products = products.filter((p) => p.isHot);
      categoryName += " (Sản phẩm HOT)";
    } else if (sort === "moi") {
      products = products.filter((p) => p.isNew);
      categoryName += " (Sản phẩm MỚI)";
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-16">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: categoryName },
        ]}
      />

      {/* Header */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal tracking-tight">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 tabular-nums">
            Hiển thị {products.length} sản phẩm chính hãng LIVORA
          </p>
        </div>
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
