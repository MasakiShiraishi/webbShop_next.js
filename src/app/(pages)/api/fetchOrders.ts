import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import OrderModel from '@/app/lib/Orders';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Endpoint Hit');
  await connectMongo(); 
  console.log('MongoDB connected');

  try {
    const customersOrder = await OrderModel.find({});
    console.log('Transactions fetched:', customersOrder);
    res.status(200).json({ customersOrder });
  } catch (e) {
    console.error('Error fetching customersOrder:', e);
    res.status(500).json({ error: 'Failed to fetch customersOrder' });
  }
}