const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    const response = await axios.get('https://bigcharts.marketwatch.com/quickchart/options.asp?symb=AAPL#');
    const $ = cheerio.load(response.data);
    const scrapedData = $('table.optionchain.shaded').text();
    res.status(200).json({ data: scrapedData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};