import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import OrderModel from '@/app/models/Orders';

// Handle PUT requests to update an order
export async function PUT(req: NextRequest) {
  try {
    console.log('API Endpoint Hit');
    
    await connectMongo();
    console.log('MongoDB connected');
    
    // Parse the request body to retrieve the updated order data
    const updatedOrder = await req.json();
    
    const result = await OrderModel.findByIdAndUpdate(updatedOrder._id, updatedOrder, {
      new: true, // Returns the updated document
    });
    
    if (!result) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    console.log('Retrieved updatedOrder:', result);
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
