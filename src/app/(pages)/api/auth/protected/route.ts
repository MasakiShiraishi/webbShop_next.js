import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req: NextRequest){
    const token = req.headers.get('authorization')?.split('')[1];

    if (!token) {
          return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
      
        try {
          // Verify the token using the secret key
          if (!SECRET_KEY) {
            console.error('JWT Secret Key is not defined');
            return NextResponse.json({ message: 'Internal Server Error: Secret key not set' }, { status: 500 });
          }
          const decoded = jwt.verify(token, SECRET_KEY);

          return NextResponse.json({ message: 'Access granted', user: decoded }, { status: 200 });
        } catch (error) {
          return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
      }