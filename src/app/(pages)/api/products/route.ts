import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import { ProductModel } from '@/app/models/Product';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('API Endpoint Hit');
  await connectMongo(); 
  console.log('MongoDB connected');
 
  // Extract the category from the query parameters
  const category = req.nextUrl.searchParams.get('category');
  // Log the category to verify it's being received correctly
  console.log('Category:', category); 

  try {
    let products;
    
    if(category && category !== 'undefined'){
      // Filter products by category
      products = await ProductModel.find({category});
    }else{
      // Fetch all products if no category is specified
      products = await ProductModel.find({}); 
    } 

    // -----no change below to be category-----
    // console.log('Retrieved products:', products);
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error); 
    return NextResponse.json({ error: 'Failed to fetch products' });
  }
}
