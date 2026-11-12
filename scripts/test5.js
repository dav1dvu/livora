const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://bearsvietnam.vn/san-pham/may-xay-an-dam-3-5-lit-bear-bfm-045kn-ban-quoc-te/', { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(res => {
    const $ = cheerio.load(res.data);
    console.log("H1 text:", $('h1.product_title').text());
    console.log("Full description panels:", $('.woocommerce-Tabs-panel--description').length);
    console.log("Full desc length:", $('.woocommerce-Tabs-panel--description').html()?.length || $('.elementor-widget-theme-post-content').html()?.length);
});
