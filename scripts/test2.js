const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://bearsvietnam.vn/cua-hang/', { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(res => {
    const $ = cheerio.load(res.data);
    $('.product').first().each((i, el) => {
        console.log($(el).html().substring(0, 500));
    });
});
