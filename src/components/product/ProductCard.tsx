import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FacebookIcon, TikTokIcon } from "@/components/ui/Icons";
import { Product, FACEBOOK_PAGE_URL, TIKTOK_SHOP_URL } from "@/lib/types";
import {
  formatPrice,
  getDiscountLabel,
  getCategoryDisplayName,
  isBeKhoeMeVuiProduct,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSource = product.imageUrl || product.thumbnail || "/placeholder.png";
  const isFacebookOnly = isBeKhoeMeVuiProduct(product);

  return (
    <article className="group flex flex-col justify-between h-full bg-white rounded-2xl overflow-hidden transition-colors duration-200">
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
            className="object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
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
        <div className="p-3 sm:p-4 flex flex-col grow">
          {product.category && (
            <span className="text-xs font-bold text-brand-primary mb-1 line-clamp-1">
              {getCategoryDisplayName(product.category)}
            </span>
          )}

          <h3 className="font-bold text-brand-charcoal text-xs sm:text-sm lg:text-base leading-snug line-clamp-2 min-h-9 sm:min-h-11 group-hover:text-brand-primary transition-colors">
            <Link
              href={`/san-pham/${product.slug}`}
              className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
            >
              {product.name}
            </Link>
          </h3>

          {/* Pricing */}
          <div className="mt-2.5 flex items-baseline gap-2 flex-wrap tabular-nums">
            <span className="text-sm sm:text-base lg:text-lg font-black text-brand-primary">
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
      <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 flex items-center gap-2">
        {isFacebookOnly ? (
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 rounded-xl bg-[#374880] hover:bg-[#2B3966] text-white text-xs font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5668AD] cursor-pointer min-h-11 whitespace-nowrap"
            title="Mua qua Facebook"
            aria-label={`Mua ${product.name} qua Facebook (Mở trong tab mới)`}
          >
            <FacebookIcon className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Mua qua Facebook</span>
          </a>
        ) : (
          <a
            href={TIKTOK_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 rounded-xl bg-[#933D33] hover:bg-[#7D2E25] text-white text-xs font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] cursor-pointer min-h-11 whitespace-nowrap"
            title="Mua trên TikTok Shop"
            aria-label={`Mua ${product.name} trên TikTok Shop (Mở trong tab mới)`}
          >
            <TikTokIcon className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>TikTok Shop</span>
          </a>
        )}

        <Link
          href={`/san-pham/${product.slug}`}
          className="hidden sm:inline-flex w-11 h-11 items-center justify-center rounded-xl bg-[#FAF6F2] hover:bg-brand-rose-light text-[#4A3B3A] hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary shrink-0"
          aria-label={`Xem thông tin chi tiết ${product.name}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
