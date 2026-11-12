const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://bearsvietnam.vn/san-pham/may-xay-an-dam-3-5-lit-bear-bfm-045kn-ban-quoc-te/', { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(res => {
    const $ = cheerio.load(res.data);
    console.log("H1:", $('h1').text());
    console.log("Price element classes:", $('p.price, div.price, span.price').length);
    console.log("Price HTML:", $('p.price').html());
    console.log("Description id/classes:", $('[id*="description"]').attr('id'), $('[class*="description"]').attr('class'));
    
    // Gallery
    console.log("Gallery images:", $('.woocommerce-product-gallery__image a').length);
});
