import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import OrderModel from '@/app/lib/Orders';


export async function POST(req: NextRequest, res: NextResponse) {
  console.log('API Endpoint Hit');

  await connectMongo();
  console.log('api/orders/route.ts: MongoDB connected');
  try {
    const body = await req.json();
    console.log('Request Body:', body);
    // handling for send a order with few products
    const { items, name, address, email,  deliveryOption } = body;
    const numericdeliveryOption = parseInt(deliveryOption, 10);
    
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Invalid items' }, { status: 400 });
    }
    
    if (
      !name ||
      typeof name !== 'string'||
      !address ||
      typeof address !== 'string' ||
      !email ||
      typeof email !== 'string' ||
      isNaN(numericdeliveryOption) 
      
    ) {
      return new NextResponse(JSON.stringify({ message: 'Invalid input' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newOrder = new OrderModel({
      items,
      name: name,
      address: address,
      email: email,      
      deliveryOption: numericdeliveryOption,
    });

    await newOrder.save();
    console.log('User created:', newOrder);

    const headers = new Headers();
    headers.append('Location', '/order/sendOrder');
    return new NextResponse('Redirecting to /order/sendOrder...', {
      status: 302,
      headers: headers,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
