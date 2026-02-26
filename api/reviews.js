export default async function handler(req, res) {
  const { product_id } = req.query;

  const API_TOKEN = process.env.JUDGE_ME_API_TOKEN;
  const SHOP_DOMAIN = process.env.SHOP_DOMAIN;

  if (!API_TOKEN || !SHOP_DOMAIN) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const url = `https://api.judge.me/api/v2/reviews?api_token=${API_TOKEN}&shop_domain=${SHOP_DOMAIN}&per_page=10&rating=5${product_id ? `&product_id=${product_id}` : ''}`;

    const response = await fetch(url);
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}