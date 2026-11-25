import { ScrollProgressBar } from "@/components/home/ScrollProgressBar";
import { HeroEditorial } from "@/components/home/HeroEditorial";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { InteractiveCategoryStage } from "@/components/home/InteractiveCategoryStage";
import { AnimatedCatalogue } from "@/components/home/AnimatedCatalogue";
import { SafetyStoryScroll } from "@/components/home/SafetyStoryScroll";
import { HomeClosingSection } from "@/components/home/HomeClosingSection";
import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";
import { Product } from "@/lib/types";

function pickSpotlightProducts(products: Product[]): Product[] {
  const prioritySlugs = ["noi-nau-cham", "may-xay-an-dam", "be-khoe-me-vui"];
  const picked: Product[] = [];

  for (const catSlug of prioritySlugs) {
    const match =
      products.find((p) => p.category === catSlug && p.isHot) ??
      products.find((p) => p.category === catSlug);
    if (match) picked.push(match);
  }

  return picked.length > 0 ? picked : products.slice(0, 3);
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const spotlightProducts = pickSpotlightProducts(products);

  return (
    <div className="relative">
      <ScrollProgressBar />

      {/* 1. Editorial Split Hero with Masked Typography & Live Spotlight Showcase */}
      <HeroEditorial
        spotlightProducts={spotlightProducts}
        totalProducts={products.length}
      />

      {/* 2. Continuous Trust & Safety Ribbon */}
      <TrustMarquee />

      {/* 3. Interactive Category Stage with layoutId Tab Switcher */}
      <InteractiveCategoryStage categories={categories} products={products} />

      {/* 4. Curated Product Catalogue with Staggered Category Filtering */}
      <AnimatedCatalogue categories={categories} products={products} />

      {/* 5. Pinned Safety Story with SVG Seal & Double-Bezel Cards */}
      <SafetyStoryScroll />

      {/* 6. Commitments, Interactive FAQ & Espresso Brand Sanctuary */}
      <HomeClosingSection />
    </div>
  );
}
