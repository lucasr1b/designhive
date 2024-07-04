import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/models/User';
import { connectToDB } from '@/backend/utils/connectToDB';

connectToDB();

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const user = await User.findOne({ username: params.username }).select('_id name username pfp').lean();

    if (!user) {
      const notFoundUser = {
        name: '',
        username: params.username,
        bio: '',
        pfp: '',
        followers: 0,
        following: 0,
      }
      return NextResponse.json({ error: 'User not found', user: notFoundUser }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}