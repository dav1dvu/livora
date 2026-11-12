const axios = require('axios');
const fs = require('fs');
const path = require('path');

const rawProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/crawled_raw_7.json'), 'utf8'));

// Slug generator
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const productMeta = [
  {
    slug: 'thia-an-dam-silicon-trong-suot-sau-long-sieu-mem-cho-be-shopmegold1',
    cleanName: 'Thìa Ăn Dặm Silicon Trong Suốt Sâu Lòng Siêu Mềm Cho Bé (Shopmegold1)',
    originalPrice: 35000,
    salePrice: 25000,
    discount: 28,
    isHot: true,
    isNew: true,
    specs: {
      "Tên sản phẩm": "Thìa ăn dặm silicon trong suốt sâu lòng siêu mềm",
      "Chất liệu": "Silicon thực phẩm cao cấp (BPA Free)",
      "Độ tuổi phù hợp": "Cho bé từ 5 tháng tuổi trở lên (5m+)",
      "Kích thước": "Dài 14cm, lòng thìa rộng 3.5cm",
      "Khả năng chịu nhiệt": "-20°C đến 120°C",
      "Khử trùng": "Nước sôi, máy tiệt trùng hơi nước, máy tiệt trùng UV",
      "Thương hiệu": "Shopmegold1",
      "Xuất xứ": "Chính hãng"
    }
  },
  {
    slug: 'yem-an-dam-silicon-co-mang-sieu-nhe-hinh-meo-dang-yeu-cho-be',
    cleanName: 'Yếm Ăn Dặm Silicon Có Máng Siêu Nhẹ Hình Mèo Đáng Yêu Cho Bé',
    originalPrice: 49000,
    salePrice: 35000,
    discount: 28,
    isHot: true,
    isNew: false,
    specs: {
      "Tên sản phẩm": "Yếm ăn dặm silicon có máng siêu nhẹ hình mèo",
      "Chất liệu": "100% Silicone dẻo cao cấp, không BPA",
      "Kích thước": "23 x 29 cm",
      "Tính năng": "Máng hứng thức ăn rơi vãi, chống tràn, chống thấm nước, nút cài điều chỉnh",
      "Vệ sinh": "Dễ dàng rửa sạch dưới vòi nước, nhanh khô",
      "Độ tuổi phù hợp": "Cho bé từ 6 tháng đến 3 tuổi",
      "Thương hiệu": "Shopmegold1"
    }
  },
  {
    slug: 'can-tieu-ly-dien-tu-mini-1g-5kg-chinh-xac-cao-can-do-an-dam-lam-banh',
    cleanName: 'Cân Tiểu Ly Điện Tử Mini 1g - 5kg Chính Xác Cao (Cân Đồ Ăn Dặm, Làm Bánh)',
    originalPrice: 69000,
    salePrice: 49000,
    discount: 29,
    isHot: true,
    isNew: true,
    specs: {
      "Tên sản phẩm": "Cân tiểu ly điện tử mini 1g - 5kg",
      "Kích thước": "21 x 15.5 x 3 cm",
      "Phạm vi cân": "1g - 5000g (5kg)",
      "Độ chia": "1g",
      "Màn hình hiển thị": "LCD kỹ thuật số 4 số rõ nét",
      "Nguồn điện": "2 pin AAA",
      "Chức năng thông minh": "Trừ bì (TARE), tự động tắt nguồn khi không dùng",
      "Ứng dụng": "Cân định lượng đồ ăn dặm cho bé, nguyên liệu làm bánh, gia vị nhà bếp"
    }
  },
  {
    slug: 'yem-vai-an-dam-co-mang-tootie-chong-tham-cho-be',
    cleanName: 'Yếm Vải Ăn Dặm Có Máng Hứng Chống Thấm Tootie Cho Bé',
    originalPrice: 65000,
    salePrice: 45000,
    discount: 30,
    isHot: false,
    isNew: true,
    specs: {
      "Tên sản phẩm": "Yếm vải ăn dặm có máng Tootie",
      "Thương hiệu": "Tootie",
      "Độ tuổi phù hợp": "Từ 6 tháng trở lên",
      "Chất liệu": "Vải sợi mềm mịn kết hợp lớp phủ chống thấm TPU cao cấp",
      "Thiết kế": "Có máng hứng thức ăn rơi vãi, khóa dán mềm sau cổ linh hoạt",
      "Vệ sinh": "Giặt tay hoặc giặt máy nhanh khô, không bám bẩn"
    }
  },
  {
    slug: 'khay-an-dam-silicon-hinh-gau-co-de-hit-chong-lat-cho-be',
    cleanName: 'Khay Ăn Dặm Silicon Hình Gấu Có Đế Hít Chống Trơn Trượt Cho Bé',
    originalPrice: 95000,
    salePrice: 69000,
    discount: 27,
    isHot: true,
    isNew: false,
    specs: {
      "Tên sản phẩm": "Khay ăn dặm silicon hình gấu có đế hít",
      "Chất liệu": "Silicone thực phẩm cao cấp không BPA",
      "Kích thước": "16 x 17 cm, cao 2.5 cm",
      "Khả năng chịu nhiệt": "-50°C đến 250°C",
      "Tính năng": "Đế giác hút chân không hít chặt mặt bàn chống lật đổ, phân chia ngăn khoa học",
      "Khử trùng": "Nước sôi, lò vi sóng, máy tiệt trùng UV, máy rửa bát",
      "Phương pháp áp dụng": "Ăn dặm tự chỉ huy (BLW), ăn dặm kiểu Nhật"
    }
  },
  {
    slug: 'coc-tap-uong-nuoc-mumbebe-3-giai-doan-chong-sac-cho-be',
    cleanName: 'Cốc Tập Uống Nước Mumbebe 3 Giai Đoạn Chống Sặc An Toàn Cho Bé',
    originalPrice: 89000,
    salePrice: 69000,
    discount: 22,
    isHot: true,
    isNew: true,
    specs: {
      "Tên sản phẩm": "Cốc tập uống nước 3 giai đoạn Mumbebe",
      "Thương hiệu": "Mumbebe",
      "Dung tích": "160ml (có vạch chia mililit chuẩn xác)",
      "Chất liệu": "Thân cốc nhựa PP an toàn, nắp và ống hút silicone siêu mềm (BPA Free)",
      "Độ tuổi phù hợp": "Cho bé từ 4 tháng đến trên 1 tuổi",
      "Thiết kế thông minh": "3 giai đoạn chuyển tiếp: nút PUSH đẩy nước, cốc ống hút 2 quai, cốc uống tự lập",
      "Tính năng": "Chống sặc hiệu quả, quai cầm đôi mảnh dễ cầm nắm"
    }
  },
  {
    slug: 'bo-dao-thot-che-bien-an-dam-cho-be-5-chi-tiet-shopmegold1',
    cleanName: 'Bộ Dao Thớt Chế Biến Ăn Dặm Cho Bé 5 Chi Tiết Shopmegold1',
    originalPrice: 110000,
    salePrice: 79000,
    discount: 28,
    isHot: true,
    isNew: false,
    specs: {
      "Tên sản phẩm": "Bộ dao thớt chế biến đồ ăn dặm 5 chi tiết",
      "Bộ sản phẩm gồm": "1 dao thái gọt, 1 thớt kháng khuẩn, 1 kéo cắt thực phẩm, 1 nạo củ quả, 1 khuôn chiên trứng",
      "Chất liệu": "Thép không gỉ cao cấp và nhựa nguyên sinh BPA Free",
      "Công dụng": "Chế biến riêng biệt đồ ăn dặm cho bé, tránh nhiễm khuẩn chéo với đồ ăn gia đình",
      "Đặc tính": "Sắc bén, bền đẹp, kháng khuẩn, dễ vệ sinh",
      "Thương hiệu": "Shopmegold1"
    }
  }
];

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath)) return;
  const res = await axios.get(url, { responseType: 'stream', headers: { 'User-Agent': 'Mozilla/5.0' } });
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(destPath);
    res.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

function formatDescriptionHtml(rawDesc, pName) {
  const paragraphs = rawDesc
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0 && !p.startsWith('#'));

  let html = `<div class="product-description-content space-y-4 text-stone-700 leading-relaxed">`;
  html += `<h3 class="text-lg font-bold text-brand-charcoal mb-2">${pName}</h3>`;
  
  for (const para of paragraphs) {
    if (para.startsWith('-') || para.startsWith('–') || para.startsWith('✔️') || para.startsWith('+')) {
      const cleanLine = para.replace(/^[-–✔️+]\s*/, '');
      html += `<div class="flex items-start gap-2 my-1"><span class="text-brand-primary font-bold mt-1">•</span><span>${cleanLine}</span></div>`;
    } else if (para.includes(':') && para.length < 50) {
      html += `<h4 class="font-bold text-brand-charcoal mt-3 mb-1">${para}</h4>`;
    } else {
      html += `<p>${para}</p>`;
    }
  }
  html += `</div>`;
  return html;
}

async function processAll() {
  const finalProducts = [];
  const baseImgDir = path.join(__dirname, '../public/images/products');

  for (let i = 0; i < rawProducts.length; i++) {
    const raw = rawProducts[i];
    const meta = productMeta[i];
    console.log(`Processing [${i + 1}/${rawProducts.length}]: ${meta.cleanName}`);

    const productDir = path.join(baseImgDir, meta.slug);
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }

    // Download images
    const galleryPaths = [];
    const imagesToDownload = raw.images.slice(0, 8); // top 8 images

    for (let imgIdx = 0; imgIdx < imagesToDownload.length; imgIdx++) {
      const hash = imagesToDownload[imgIdx];
      const imgUrl = `https://down-vn.img.susercontent.com/file/${hash}`;
      const fileName = imgIdx === 0 ? 'thumb.jpg' : `gallery-${imgIdx}.jpg`;
      const localPath = path.join(productDir, fileName);
      const webPath = `/images/products/${meta.slug}/${fileName}`;

      try {
        await downloadFile(imgUrl, localPath);
        galleryPaths.push(webPath);
      } catch (err) {
        console.error(`  Error downloading image ${imgIdx}:`, err.message);
      }
    }

    // Download video if available
    let videoWebPath = null;
    if (raw.video_info_list && raw.video_info_list.length > 0) {
      const vidInfo = raw.video_info_list[0];
      const vidUrl = vidInfo.default_format?.url || vidInfo.formats?.[0]?.url;
      if (vidUrl) {
        const vidLocalPath = path.join(productDir, 'video.mp4');
        try {
          console.log(`  Downloading video from ${vidUrl}...`);
          await downloadFile(vidUrl, vidLocalPath);
          videoWebPath = `/images/products/${meta.slug}/video.mp4`;
          console.log(`  Video saved successfully!`);
        } catch (err) {
          console.error(`  Error downloading video:`, err.message);
        }
      }
    }

    const thumbWebPath = galleryPaths[0] || null;

    finalProducts.push({
      name: meta.cleanName,
      slug: meta.slug,
      url: `/san-pham/${meta.slug}`,
      price: meta.salePrice,
      originalPrice: meta.originalPrice,
      salePrice: meta.salePrice,
      discountPercentage: meta.discount,
      thumbnail: thumbWebPath,
      imageUrl: thumbWebPath,
      images: galleryPaths,
      gallery: galleryPaths,
      category: 'be-khoe-me-vui',
      categories: ['Bé khỏe - Mẹ vui'],
      badges: [`-${meta.discount}%`, meta.isHot ? 'Hot' : 'Mới', 'Chính hãng'],
      description: formatDescriptionHtml(raw.description, meta.cleanName),
      specs: meta.specs,
      rating: 5,
      reviewCount: 120 + i * 25,
      isNew: meta.isNew,
      isHot: meta.isHot,
      isFeatured: meta.isHot,
      sourceUrl: raw.original_url,
      videoUrl: videoWebPath
    });
  }

  fs.writeFileSync(path.join(__dirname, '../data/processed_7_products.json'), JSON.stringify(finalProducts, null, 2), 'utf8');
  console.log('Saved processed 7 products to data/processed_7_products.json');
}

processAll().catch(err => {
  console.error('Processing failed:', err);
  process.exit(1);
});

