import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ShieldCheck, Truck, RotateCcw, CheckCircle2, PhoneCall } from "lucide-react";
import { getProductBySlug, getRelatedProducts, getAllSlugs } from "@/lib/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductGrid } from "@/components/product/ProductGrid";
import BuyButton from "@/components/product/BuyButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FacebookIcon } from "@/components/ui/Icons";
import {
  formatPrice,
  getDiscountLabel,
  getCategoryDisplayName,
  isBeKhoeMeVuiProduct,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { FACEBOOK_PAGE_URL, SITE_INFO } from "@/lib/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  if (slugs.length === 0) {
    return [{ slug: "sample-product" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm - LIVORA Official",
    };
  }

  const isFacebookOnly = isBeKhoeMeVuiProduct(product);

  return {
    title: `${product.name} | LIVORA Official Store`,
    description: isFacebookOnly
      ? `Mua ${product.name} chính hãng LIVORA với giá ${formatPrice(product.price)}. Bảo hành 18 tháng, 1 đổi 1 trong 30 ngày. Đặt mua chính hãng qua Fanpage Facebook LIVORA.`
      : `Mua ${product.name} chính hãng LIVORA với giá ${formatPrice(product.price)}. Bảo hành 18 tháng, 1 đổi 1 trong 30 ngày. Đặt mua qua TikTok Shop & tư vấn Fanpage Facebook.`,
    openGraph: {
      title: product.name,
      description: `Giá ưu đãi: ${formatPrice(product.price)} - Bảo hành chính hãng 18 tháng`,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryName = getCategoryDisplayName(product.category);
  const isFacebookOnly = isBeKhoeMeVuiProduct(product);
  const related = await getRelatedProducts(product, 4);
  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.imageUrl
      ? [product.imageUrl]
      : [];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-10">
      {/* 1. Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Sản phẩm", href: "/danh-muc/tat-ca" },
          ...(product.category
            ? [{ label: categoryName, href: `/danh-muc/${product.category}` }]
            : []),
          { label: product.name },
        ]}
      />

      {/* 2. Main Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery (5 cols on lg) */}
        <div className="lg:col-span-5">
          <ProductGallery
            images={galleryImages}
            productName={product.name}
            discountPercentage={product.discountPercentage}
            isHot={product.isHot}
            videoUrl={product.videoUrl}
          />
        </div>

        {/* Right: Info + Buy CTA (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Header info */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {product.category && (
                <span className="text-xs font-bold text-brand-primary bg-brand-rose-light px-2.5 py-1 rounded-lg border border-brand-rose-border">
                  {categoryName}
                </span>
              )}
              {product.isHot && <Badge variant="hot">Bán chạy nhất</Badge>}
              {product.isNew && <Badge variant="new">Bản Quốc Tế Mới</Badge>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal leading-snug tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-brand-rose-light border border-brand-rose-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-brand-muted uppercase tracking-wider font-bold mb-1">
                Giá khuyến mãi chính hãng:
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-brand-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-[#9B8C8A] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="sale" className="text-sm">
                      Tiết kiệm {getDiscountLabel(product.discountPercentage)}
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="text-xs text-[#5C4D4B] space-y-1 sm:text-right border-t sm:border-t-0 sm:border-l border-brand-rose-border pt-2 sm:pt-0 sm:pl-4">
              <p className="flex items-center sm:justify-end gap-1 text-[#3B7A57] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Còn hàng chính hãng</span>
              </p>
              <p className="text-brand-muted">Mã SP: {product.slug}</p>
            </div>
          </div>

          {/* PRIMARY CALL TO ACTION: Channel-aware Purchase & Support */}
          <div className="p-6 rounded-2xl bg-white border-2 border-brand-rose-border shadow-xl shadow-brand-rose/10 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-black text-base text-brand-charcoal">
                  Đặt Mua & Tư Vấn Sản Phẩm
                </h2>
                <span className="text-xs font-bold text-brand-primary bg-brand-rose-light px-2.5 py-0.5 rounded-md border border-brand-rose-border">
                  LIVORA Official
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-1">
                {isFacebookOnly
                  ? "Đặt mua và nhận tư vấn trực tiếp qua Fanpage Facebook chính thức của LIVORA để được hỗ trợ 24/7."
                  : "Đặt hàng nhanh chóng qua TikTok Shop để nhận ưu đãi vận chuyển & giảm giá, hoặc nhắn tin trực tiếp tới Fanpage Facebook để được hỗ trợ 24/7."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <BuyButton
                  channel={isFacebookOnly ? "facebook" : "tiktok"}
                  size="lg"
                  fullWidth
                />
              </div>
              {isFacebookOnly ? (
                <a
                  href={`tel:${SITE_INFO.phone.replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-brand-rose-light hover:bg-[#F8DFD7] text-[#933D33] border border-brand-rose-border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#933D33] cursor-pointer min-h-12"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span>Hotline: {SITE_INFO.phone}</span>
                </a>
              ) : (
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-brand-lavender-light hover:bg-[#E2E6F7] text-[#374880] border border-brand-lavender-border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5668AD] cursor-pointer min-h-12"
                >
                  <FacebookIcon className="w-5 h-5 fill-current shrink-0" />
                  <span>Tư vấn qua Facebook</span>
                </a>
              )}
            </div>
          </div>

          {/* Trust Highlights Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF6F2] border border-[#EDE4E1] text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0" />
              <div>
                <strong className="text-brand-charcoal">Bảo hành 18 tháng</strong>
                <p className="text-brand-muted text-[11px]">Chính hãng Livora</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-5 h-5 text-[#C27357] shrink-0" />
              <div>
                <strong className="text-brand-charcoal">1 Đổi 1 trong 30 ngày</strong>
                <p className="text-brand-muted text-[11px]">Lỗi kỹ thuật NSX</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-[#6071B8] shrink-0" />
              <div>
                <strong className="text-brand-charcoal">Freeship từ 450k</strong>
                <p className="text-brand-muted text-[11px]">Giao hàng toàn quốc</p>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h2 className="text-lg font-black text-brand-charcoal mb-3">
              Thông Số Kỹ Thuật
            </h2>
            <ProductSpecs specs={product.specs} />
          </div>
        </div>
      </div>

      {/* 3. Related Products */}
      {related.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EDE4E1]">
            <h2 className="text-xl sm:text-2xl font-black text-brand-charcoal">
              Sản Phẩm Cùng Loại
            </h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
