import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import UserModel from '@/app/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET; 

export async function POST(req: NextRequest, res: NextResponse) {
  await connectMongo();  

  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid username or password' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid username or password' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    // Verify the secret key is loaded
    if (!SECRET_KEY) {
      console.error('JWT Secret Key is not defined');
      return new NextResponse(
        JSON.stringify({ message: 'Internal Server Error: Secret key not set' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a JWT token valid for 15 minutes
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '15m' });

    return new NextResponse(
      JSON.stringify({ message: 'Login successful', token }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error logging in user:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}