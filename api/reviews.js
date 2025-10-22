import axios from "axios";

export default async function handler(req, res) {
  try {
    const { product_id } = req.query; // You can pass product_id from the front-end

    // Call the private Judge.me API
    const response = await axios.get("https://api.judge.me/api/v1/reviews", {
      params: {
        api_token: process.env.JUDGEME_API_TOKEN, // from environment variables
        shop_domain: "foildrive.myshopify.com",    // replace with your real domain
        per_page: 10,
        product_id,
      },
    });

    // Return only the data you need
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}