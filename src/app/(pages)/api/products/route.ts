import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '../../../lib/mongodb';
import { ProductModel } from '@/app/models/Product';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('API Endpoint Hit');
  await connectMongo(); 
  console.log('MongoDB connected');
 
  // Extract the category from the query parameters
  const search = req.nextUrl.searchParams.get('search');// added for search function
  const category = req.nextUrl.searchParams.get('category');

  console.log('Search Term:', search);
  console.log('Category:', category); 

  try {
    let query = {};

    // Construct the query object based on the presence of search and category
    if (search && search !== 'undefined') {
      query = {
        ...query,
        title: { $regex: search, $options: 'i' }  // Add search criteria for name
      };
    }
    
    if (category && category !== 'undefined') {
      query = {
        ...query,
        category  // Filter products by category
      };
    }

    // Fetch products based on the constructed query
    const products = await ProductModel.find(query);

    console.log('Retrieved products:', products);
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error); 
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}