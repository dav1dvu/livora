const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://bearsvietnam.vn/cua-hang/', { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(res => {
    const $ = cheerio.load(res.data);
    const productLinks = [];
    $('ul.products li a').each((i, el) => productLinks.push($(el).attr('href')));
    console.log("Products found in ul.products li a:", productLinks.length);
    if(productLinks.length > 0) console.log(productLinks[0]);
    
    // Check other common selectors
    const links2 = [];
    $('.product a').each((i,el) => links2.push($(el).attr('href')));
    console.log("Products found in .product a:", links2.length);
    if(links2.length > 0) console.log(links2[0]);
});
