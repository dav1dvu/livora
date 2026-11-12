const axios = require('axios');
const cheerio = require('cheerio');

async function test() {
  const { data } = await axios.get('https://bearsvietnam.vn/san-pham/may-xay-an-dam-3-5-lit-bear-bfm-045kn-ban-quoc-te/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const $ = cheerio.load(data);
  console.log('Tables:', $('table').length);
  $('table tr').each((i, el) => {
    console.log('Row:', $(el).text().replace(/\s+/g, ' ').trim());
  });
  console.log('h2, h3:', $('h2, h3').map((i, el) => $(el).text()).get().slice(0, 10));
}
test();

