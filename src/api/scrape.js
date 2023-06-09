const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://bigcharts.marketwatch.com/quickchart/options.asp?symb=AAPL');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'https://react-testing-xi.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    console.log('Back-End Response Status: ', response.status);
    console.log('Back-End Response: ', response);
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}