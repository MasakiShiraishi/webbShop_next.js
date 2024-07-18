import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import { ProductModel } from '@/app/models/Product';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('API Endpoint Hit');
  await connectMongo(); 
  console.log('MongoDB connected');
 
  try {
    const products = await ProductModel.find(); 
    console.log('Retrieved products:', products);
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error); 
    return NextResponse.json({ error: 'Failed to fetch products' });
  }
}
