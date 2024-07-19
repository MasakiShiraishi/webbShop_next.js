import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import { ProductModel } from '@/app/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Endpoint Hit');
  await connectMongo(); 
  console.log('MongoDB connected');

  // try {
  //   const products = await ProductModel.find({});
  //   console.log('Transactions fetched:', products);
  //   res.status(200).json({ products });
  // } catch (e) {
  //   console.error('Error fetching products:', e);
  //   res.status(500).json({ error: 'Failed to fetch products' });
  // }
  const { category } = req.query;
  console.log('Category:', category);
  try {
    let products;

    if (category && category !== 'undefined') {
      // Filter products by category
      products = await ProductModel.find({ category });
    } else {
      // Fetch all products if no category is specified
      products = await ProductModel.find({});
    }

    console.log('Products fetched:', products);
    res.status(200).json({ products });
  } catch (e) {
    console.error('Error fetching products:', e);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
