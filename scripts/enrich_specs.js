const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchSpecsAndDescription() {
  console.log(`Starting specs & description enrichment for ${p.length} products...`);
  let successCount = 0;

  for (let i = 0; i < p.length; i++) {
    const prod = p[i];
    const url = prod.sourceUrl || `https://bearsvietnam.vn/san-pham/${prod.slug}/`;

    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        timeout: 10000
      });
      const $ = cheerio.load(data);

      const specs = {};
      $('table tr').each((_, el) => {
        const tds = $(el).find('td, th');
        if (tds.length >= 2) {
          const k = $(tds[0]).text().trim().replace(/:\s*$/, '');
          const v = $(tds[1]).text().trim();
          if (k && v && k !== 'Thông số kỹ thuật' && k.length < 60 && v.length < 250) {
            specs[k] = v;
          }
        }
      });
      prod.specs = specs;

      // Extract real rich description
      // Typically elementor widgets with content or content article
      let descHtml = '';
      $('.elementor-widget-text-editor, .elementor-widget-theme-post-content, .entry-content').each((_, el) => {
        const text = $(el).text().trim();
        // Skip review / widget headers
        if (text.length > 100 && !text.includes('Thêm vào giỏ hàng')) {
          descHtml += $(el).html() + '\n';
        }
      });

      if (descHtml) {
        prod.description = descHtml;
      }

      if (Object.keys(specs).length > 0) {
        successCount++;
      }
      console.log(`[${i + 1}/${p.length}] ${prod.slug}: ${Object.keys(specs).length} specs`);
    } catch (err) {
      console.error(`[${i + 1}/${p.length}] Error fetching ${url}:`, err.message);
    }
    await sleep(250);
  }

  console.log(`Completed specs enrichment! ${successCount}/${p.length} have specs.`);
  fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');
}

fetchSpecsAndDescription();

