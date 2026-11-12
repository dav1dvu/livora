const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://bearsvietnam.vn/san-pham/may-xay-an-dam-3-5-lit-bear-bfm-045kn-ban-quoc-te/', { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(res => {
    const $ = cheerio.load(res.data);
    const name = $('h1.product-title, h1.product_title').text().trim();
    console.log("Name:", name);
    const desc = $('#tab-description').length;
    console.log("Desc length:", desc);
    const priceEl = $('.product-info .price, .summary .price, div.product-image-summary .price');
    console.log("Price HTML:", priceEl.html());
});
