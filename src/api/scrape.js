const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://bigcharts.marketwatch.com/quickchart/options.asp?symb=AAPL', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    });
    res.setHeader('Content-Type', 'text/html');
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}