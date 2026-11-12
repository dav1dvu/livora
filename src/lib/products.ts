import fs from "fs/promises";
import path from "path";
import { Product } from "./types";

const dataFile = path.join(process.cwd(), "data", "products.json");

// Danh sách mã định danh 15 sản phẩm được phép hiển thị trên web:
// - 5 nồi nấu chậm: Nnc16, sube001, 085dh, 5h25m34, 4h10e
// - 3 máy xay ăn dặm: 4h02s, 5h02d24, D02q1
// - 7 sản phẩm thuộc danh mục "Bé khỏe - Mẹ vui"
const ALLOWED_PRODUCT_SLUGS = new Set([
  // 5 Nồi nấu chậm
  "noi-nau-cham-bear-16l-sb-nnc16-ban-quoc-te",
  "noi-nau-cham-bear-08l-sube001-ban-quoc-te",
  "noi-nau-cham-0-8-lit-bear-est-085dh-ban-quoc-te",
  "noi-nau-cham-bear-2-5l-sc-5h25m34-ban-quoc-te",
  "noi-nau-cham-1-0l-bear-sc-4h10e-ban-quoc-te",

  // 3 Máy xay ăn dặm
  "may-xay-an-dam-bear-0-3l-ch-4h02s-ban-quoc-te",
  "may-xay-an-dam-bear-0-3l-ch-5h02d24-ban-quoc-te",
  "may-xay-an-dam-bear-06l-qsj-d02q1-ban-quoc-te",

  // 7 Sản phẩm thuộc danh mục "Bé khỏe - Mẹ vui"
  "thia-an-dam-silicon-trong-suot-sau-long-sieu-mem-cho-be-shopmegold1",
  "yem-an-dam-silicon-co-mang-sieu-nhe-hinh-meo-dang-yeu-cho-be",
  "can-tieu-ly-dien-tu-mini-1g-5kg-chinh-xac-cao-can-do-an-dam-lam-banh",
  "yem-vai-an-dam-co-mang-tootie-chong-tham-cho-be",
  "khay-an-dam-silicon-hinh-gau-co-de-hit-chong-lat-cho-be",
  "coc-tap-uong-nuoc-mumbebe-3-giai-doan-chong-sac-cho-be",
  "bo-dao-thot-che-bien-an-dam-cho-be-5-chi-tiet-shopmegold1",
]);

const ALLOWED_PRODUCT_IDS = new Set([
  76, 64, 8, 44, 116, // 5 Nồi nấu chậm
  49, 31, 46,         // 3 Máy xay ăn dặm
  144, 145, 146, 147, 148, 149, 150, // 7 Bé khỏe - Mẹ vui
]);

let cachedProducts: Product[] | null = null;

async function loadProducts(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;
  try {
    const content = await fs.readFile(dataFile, "utf-8");
    const allProducts = JSON.parse(content) as Product[];
    cachedProducts = allProducts.filter(
      (p) => ALLOWED_PRODUCT_IDS.has(p.id) || ALLOWED_PRODUCT_SLUGS.has(p.slug)
    );
    return cachedProducts;
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  return loadProducts();
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await loadProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const products = await loadProducts();
  return products.filter(
    (p) =>
      p.category === categorySlug ||
      (p.categories && p.categories.includes(categorySlug))
  );
}

export async function getFeaturedProducts(
  limit: number = 16
): Promise<Product[]> {
  const products = await loadProducts();
  const hot = products.filter((p) => p.isHot || p.isFeatured);
  if (hot.length >= limit) return hot.slice(0, limit);
  return products.slice(0, limit);
}

export async function getNewProducts(limit: number = 16): Promise<Product[]> {
  const products = await loadProducts();
  const newOnes = products.filter((p) => p.isNew);
  if (newOnes.length >= limit) return newOnes.slice(0, limit);
  return [...newOnes, ...products.filter((p) => !p.isNew)].slice(0, limit);
}

export async function getSaleProducts(limit: number = 16): Promise<Product[]> {
  const products = await loadProducts();
  return products
    .filter((p) => p.discountPercentage > 0)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, limit);
}

export async function getRelatedProducts(
  product: Product,
  limit: number = 8
): Promise<Product[]> {
  const products = await loadProducts();
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await loadProducts();
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export async function getAllSlugs(): Promise<string[]> {
  const products = await loadProducts();
  return products.map((p) => p.slug);
}
