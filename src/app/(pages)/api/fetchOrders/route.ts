import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import OrderModel from '@/app/lib/orders';


export async function GET(req: NextRequest, res: NextResponse) {
  console.log('API Endpoint Hit');
  await connectMongo(); 
  console.log('MongoDB connected');
 
  try {
    const customersOrder = await OrderModel.find(); 
    console.log('Retrieved customersOrder:', customersOrder);
    return NextResponse.json({ customersOrder });
  } catch (error) {
    console.error('Error fetching customersOrder:', error); 
    return NextResponse.json({ error: 'Failed to fetch customersOrder' });
  }
}