import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TikTokIcon } from "@/components/ui/Icons";
import { Product, TIKTOK_SHOP_URL } from "@/lib/types";
import { formatPrice, getDiscountLabel, getCategoryDisplayName } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSource = product.imageUrl || product.thumbnail || "/placeholder.png";

  return (
    <article className="group flex flex-col justify-between h-full bg-white rounded-2xl border border-[#EDE4E1] hover:border-brand-rose hover:shadow-xl hover:shadow-brand-rose/10 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div>
        {/* Thumbnail Container */}
        <Link
          href={`/san-pham/${product.slug}`}
          className="relative block w-full aspect-square bg-[#FAF6F2] overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label={`Xem chi tiết sản phẩm ${product.name}`}
        >
          <Image
            src={imageSource}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges on Top */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.discountPercentage > 0 && (
              <Badge variant="sale">
                {getDiscountLabel(product.discountPercentage)}
              </Badge>
            )}
            {product.isHot && <Badge variant="hot">HOT</Badge>}
            {product.isNew && <Badge variant="new">MỚI</Badge>}
          </div>
        </Link>

        {/* Content Info */}
        <div className="p-4 flex flex-col grow">
          {product.category && (
            <span className="text-[11px] font-bold text-brand-primary tracking-normal mb-1 line-clamp-1">
              {getCategoryDisplayName(product.category)}
            </span>
          )}

          <h3 className="font-bold text-brand-charcoal text-sm sm:text-base leading-snug line-clamp-2 min-h-10 group-hover:text-brand-primary transition-colors">
            <Link href={`/san-pham/${product.slug}`} className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded">
              {product.name}
            </Link>
          </h3>

          {/* Pricing */}
          <div className="mt-3 flex items-baseline gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-black text-brand-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#9B8C8A] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 pt-1 flex items-center gap-2 border-t border-[#F5EBE6]">
        <a
          href={TIKTOK_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] cursor-pointer min-h-10"
          title="Mua trên TikTok Shop"
        >
          <TikTokIcon className="w-3.5 h-3.5 fill-current" />
          <span>TikTok Shop</span>
        </a>

        <Link
          href={`/san-pham/${product.slug}`}
          className="p-2.5 rounded-xl border border-[#EDE4E1] hover:border-brand-primary text-[#4A3B3A] hover:text-brand-primary hover:bg-brand-rose-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
          aria-label={`Xem thông tin chi tiết ${product.name}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
