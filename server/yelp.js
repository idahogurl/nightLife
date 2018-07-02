import yelp from 'yelp-fusion';
import dotenv from 'dotenv';

dotenv.config();

export default async function yelpRequest(req, res, next) {
  try {
    const apiKey = process.env.YELP_API_KEY;
    
    const { term, location } = req.query;
    const searchRequest = {
      term,
      location,
    };

    const client = yelp.client(apiKey);

    const response = await client.search(searchRequest);
    res.json([200, response.jsonBody.businesses]);
  } catch (e) {
    next(e);
  }
}
