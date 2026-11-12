const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
const categoriesPath = path.join(__dirname, '../data/categories.json');
const processed7Path = path.join(__dirname, '../data/processed_7_products.json');

const existingProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const existingCategories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
const new7Products = JSON.parse(fs.readFileSync(processed7Path, 'utf8'));

// Filter out any previously added new 7 products by slug just in case
const newSlugs = new Set(new7Products.map(p => p.slug));
const filteredExisting = existingProducts.filter(p => !newSlugs.has(p.slug));

let nextId = Math.max(...filteredExisting.map(p => p.id || 0)) + 1;

const formattedNewProducts = new7Products.map((p, idx) => {
  return {
    id: nextId++,
    name: p.name,
    slug: p.slug,
    url: p.url,
    originalPrice: p.originalPrice,
    salePrice: p.salePrice,
    discount: p.discountPercentage,
    categories: p.categories,
    badges: p.badges,
    thumbnail: p.thumbnail,
    gallery: p.gallery,
    description: p.description,
    specs: p.specs,
    rating: p.rating,
    reviewCount: p.reviewCount,
    sourceUrl: p.sourceUrl,
    category: p.category,
    price: p.price,
    imageUrl: p.imageUrl,
    images: p.images,
    isHot: p.isHot,
    isNew: p.isNew,
    isFeatured: p.isFeatured,
    discountPercentage: p.discountPercentage,
    videoUrl: p.videoUrl || null
  };
});

// Prepend or append? Let's prepend so they appear on top of new products list, or append:
// Actually, putting them in the product list:
const allProducts = [...filteredExisting, ...formattedNewProducts];
fs.writeFileSync(productsPath, JSON.stringify(allProducts, null, 2), 'utf8');
console.log(`Updated products.json: Total products now = ${allProducts.length}`);

// Update categories.json
// Check if "be-khoe-me-vui" already exists
const catIndex = existingCategories.findIndex(c => c.slug === 'be-khoe-me-vui');
const newCategory = {
  name: "Bé khỏe - Mẹ vui",
  slug: "be-khoe-me-vui",
  url: "/danh-muc/be-khoe-me-vui",
  parentSlug: null,
  productCount: formattedNewProducts.length
};

if (catIndex >= 0) {
  existingCategories[catIndex] = newCategory;
} else {
  // Insert at top or beginning of list
  existingCategories.unshift(newCategory);
}

fs.writeFileSync(categoriesPath, JSON.stringify(existingCategories, null, 2), 'utf8');
console.log(`Updated categories.json with category: ${newCategory.name} (${newCategory.productCount} products)`);

