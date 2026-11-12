import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "Không có sản phẩm nào phù hợp.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
        <p className="text-stone-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

