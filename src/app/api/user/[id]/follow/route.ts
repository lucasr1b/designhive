import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/models/User';
import { connectToDB } from '@/backend/utils/connectToDB';
import { getSession } from '@/utils/session';

connectToDB();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();

    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await User.findById(session._id);
    const userToFollow = await User.findById(params.id);

    if (!userToFollow) {
      return new NextResponse('User not found', { status: 404 });
    }

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      currentUser.followingCount++;
      userToFollow.followers.push(currentUser._id);
      userToFollow.followerCount++;

      await currentUser.save();
      await userToFollow.save();
    }

    return new NextResponse('Follow successful', { status: 200 });
  } catch (error) {
    console.error('Error following user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
