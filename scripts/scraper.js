const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://bearsvietnam.vn';
const SHOP_URL = 'https://bearsvietnam.vn/cua-hang/';
const DATA_DIR = path.join(__dirname, '../data');
const IMAGES_DIR = path.join(__dirname, '../public/images/products');

// Create directories
[DATA_DIR, IMAGES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function downloadImage(url, destPath) {
    if (fs.existsSync(destPath)) return;
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        return new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(destPath);
            response.data.pipe(writer);
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (err) {
        console.error(`Error downloading image ${url}:`, err.message);
    }
}

async function fetchPage(url) {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        return cheerio.load(data);
    } catch (err) {
        console.error(`Error fetching ${url}:`, err.message);
        return null;
    }
}

async function scrapeListing() {
    let allProductLinks = [];
    
    // Page 1
    console.log(`Scraping listing page 1: ${SHOP_URL}`);
    let $ = await fetchPage(SHOP_URL);
    if ($) {
        $('.product').each((i, el) => {
            const link = $(el).find('a.product-image-link').attr('href');
            if (link) allProductLinks.push(link);
        });
    }

    // Pages 2-12
    for (let page = 2; page <= 12; page++) {
        const pageUrl = `${SHOP_URL}page/${page}/`;
        console.log(`Scraping listing page ${page}: ${pageUrl}`);
        $ = await fetchPage(pageUrl);
        if ($) {
            $('.product').each((i, el) => {
                const link = $(el).find('a.product-image-link').attr('href');
                if (link) allProductLinks.push(link);
            });
        }
        await sleep(500);
    }
    
    // Remove duplicates
    allProductLinks = [...new Set(allProductLinks)];
    console.log(`Found ${allProductLinks.length} total products`);
    return allProductLinks;
}

function parsePrice(priceStr) {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
}

async function scrapeProduct(url, index, total) {
    console.log(`[${index}/${total}] Scraping product: ${url}`);
    const $ = await fetchPage(url);
    if (!$) return null;

    const name = $('h1').first().text().replace(/HDSD.*/, '').replace(/\\n/g, ' ').trim();
    if (!name) return null;

    const slug = url.replace('https://bearsvietnam.vn/san-pham/', '').split('/')[0];
    
    const priceEl = $('p.price').first();
    let originalPrice = 0;
    let salePrice = 0;
    
    if (priceEl.find('ins').length > 0) {
        originalPrice = parsePrice(priceEl.find('del').text());
        salePrice = parsePrice(priceEl.find('ins').text());
    } else {
        originalPrice = parsePrice(priceEl.text());
        salePrice = originalPrice;
    }
    
    const discount = originalPrice && salePrice < originalPrice 
        ? Math.round((1 - salePrice/originalPrice) * 100) 
        : 0;

    const categories = [];
    $('.posted_in a').each((i, el) => {
        categories.push($(el).text().trim());
    });

    const badges = [];
    $('.product-labels .product-label').each((i, el) => {
        badges.push($(el).text().trim());
    });

    const description = $('.elementor-widget-theme-post-content').html() || '';
    
    const specs = {};
    $('.woocommerce-product-attributes-item').each((i, el) => {
        const key = $(el).find('th').text().trim();
        const value = $(el).find('td').text().trim();
        if (key && value) specs[key] = value;
    });

    // Gallery images
    const imageUrls = [];
    $('.woocommerce-product-gallery__image a').each((i, el) => {
        imageUrls.push($(el).attr('href'));
    });
    // Distinct images
    const uniqueImages = [...new Set(imageUrls)];
    
    // Create product dir
    const productDir = path.join(IMAGES_DIR, slug);
    if (!fs.existsSync(productDir)) {
        fs.mkdirSync(productDir, { recursive: true });
    }

    const localGallery = [];
    let thumbnail = '';
    
    for (let i = 0; i < uniqueImages.length; i++) {
        const imgUrl = uniqueImages[i];
        if (!imgUrl) continue;
        
        const ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
        const filename = i === 0 ? `thumb${ext}` : `gallery-${i}${ext}`;
        const dest = path.join(productDir, filename);
        
        await downloadImage(imgUrl, dest);
        
        const localPath = `/images/products/${slug}/${filename}`;
        if (i === 0) thumbnail = localPath;
        localGallery.push(localPath);
    }

    const rating = 0; // Not visible in typical view without scraping specific review logic
    const reviewCount = 0;

    return {
        id: index,
        name,
        slug,
        originalPrice,
        salePrice,
        discount,
        categories,
        badges,
        thumbnail,
        gallery: localGallery,
        description,
        specs,
        rating,
        reviewCount,
        sourceUrl: url
    };
}

async function main() {
    const productLinks = await scrapeListing();
    const products = [];
    const categoryMap = new Map();

    for (let i = 0; i < productLinks.length; i++) {
        const product = await scrapeProduct(productLinks[i], i + 1, productLinks.length);
        if (product) {
            products.push(product);
            
            // Build categories
            product.categories.forEach(catName => {
                if (!categoryMap.has(catName)) {
                    const catSlug = catName.toLowerCase().replace(/\\s+/g, '-');
                    categoryMap.set(catName, {
                        name: catName,
                        slug: catSlug,
                        parentSlug: null,
                        productCount: 1,
                        image: product.thumbnail
                    });
                } else {
                    const cat = categoryMap.get(catName);
                    cat.productCount++;
                    categoryMap.set(catName, cat);
                }
            });
        }
        await sleep(500);
    }

    // Save products
    fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(products, null, 2));
    
    // Save categories
    const categories = Array.from(categoryMap.values());
    fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categories, null, 2));

    console.log('Scraping completed successfully!');
}

main().catch(console.error);
