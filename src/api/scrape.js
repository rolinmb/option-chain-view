const firebase = require('firebase');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://bigcharts.marketwatch.com/quickchart/options.asp?symb=AAPL#');
    const $ = cheerio.load(response.data);
    const scrapedData = $('table.optionchain.shaded').text();
    res.status(200).json({ data: scrapedData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};