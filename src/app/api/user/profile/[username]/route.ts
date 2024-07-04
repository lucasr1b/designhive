import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/models/User';
import { connectToDB } from '@/backend/utils/connectToDB';
import { getSession } from '@/utils/session';
import { ObjectId } from 'mongoose';

connectToDB();

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const session = await getSession();
    const sessionUserId = session?._id;

    const user: any = await User.findOne({ username: params.username }).select('_id name username pfp bio followerCount followingCount').lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let isFollowing = false;
    if (sessionUserId) {
      const sessionUser: any = await User.findById(sessionUserId).select('following').lean();
      isFollowing = sessionUser.following.some((followingId: ObjectId) => followingId.toString() === user._id.toString());
    }

    const responseData = {
      ...user,
      isFollowing,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}