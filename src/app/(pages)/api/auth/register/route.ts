import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import UserModel from '@/app/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {
  await connectMongo(); 
  
  try {
    const body = await req.json();
    console.log('Request Body:', body);
    const { username, password } = body;
    
    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username});
    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
    }
    
    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({ username, password: hashedPassword });
    
    await newUser.save();
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

