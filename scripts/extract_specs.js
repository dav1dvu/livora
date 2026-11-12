const fs = require('fs');
const cheerio = require('cheerio');

const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

let extractedCount = 0;
p.forEach(prod => {
  if (prod.description) {
    const $ = cheerio.load(prod.description);
    const specs = {};
    $('table tr').each((i, el) => {
      const tds = $(el).find('td, th');
      if (tds.length >= 2) {
        const k = $(tds[0]).text().trim().replace(/:\s*$/, '');
        const v = $(tds[1]).text().trim();
        if (k && v && k.length < 60 && v.length < 200) {
          specs[k] = v;
        }
      }
    });

    // Also look for lists with key: value
    if (Object.keys(specs).length === 0) {
      $('li, p').each((i, el) => {
        const text = $(el).text().trim();
        if (text.includes(':') && text.length < 150) {
          const parts = text.split(':');
          const k = parts[0].trim();
          const v = parts.slice(1).join(':').trim();
          if (k.length > 2 && k.length < 40 && v.length > 1 && v.length < 100) {
            specs[k] = v;
          }
        }
      });
    }

    if (Object.keys(specs).length > 0) {
      prod.specs = specs;
      extractedCount++;
    }
  }
});

console.log('Products with extracted specs:', extractedCount);
fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');

