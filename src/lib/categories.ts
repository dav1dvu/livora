import fs from "fs/promises";
import path from "path";
import { Category, DEFAULT_CATEGORIES } from "./types";
import { getProducts } from "./products";

const dataFile = path.join(process.cwd(), "data", "categories.json");

let cachedCategories: Category[] | null = null;

export async function getCategories(): Promise<Category[]> {
  if (cachedCategories) return cachedCategories;

  let baseCategories: Category[] = DEFAULT_CATEGORIES;
  try {
    const content = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(content) as Category[];
    if (parsed.length > 0) {
      baseCategories = parsed;
    }
  } catch {
    baseCategories = DEFAULT_CATEGORIES;
  }

  const products = await getProducts();
  const countMap = new Map<string, number>();
  for (const p of products) {
    countMap.set(p.category, (countMap.get(p.category) || 0) + 1);
  }

  // Lọc và cập nhật số lượng sản phẩm thực tế của các danh mục đang hoạt động
  cachedCategories = baseCategories
    .filter((c) => countMap.has(c.slug) && (countMap.get(c.slug) || 0) > 0)
    .map((c) => ({
      ...c,
      productCount: countMap.get(c.slug) || 0,
    }));

  return cachedCategories.length > 0 ? cachedCategories : DEFAULT_CATEGORIES;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}
