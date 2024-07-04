import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
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
    const userToUnfollow = await User.findById(params.id);

    if (!userToUnfollow) {
      return new NextResponse('User not found', { status: 404 });
    }

    const currentUserObjectId = new mongoose.Types.ObjectId(currentUser._id);
    const userToUnfollowObjectId = new mongoose.Types.ObjectId(userToUnfollow._id);

    if (currentUser.following.includes(userToUnfollowObjectId)) {
      currentUser.following = currentUser.following.filter((id: mongoose.Types.ObjectId) => !id.equals(userToUnfollowObjectId));
      currentUser.followingCount--;
      userToUnfollow.followers = userToUnfollow.followers.filter((id: mongoose.Types.ObjectId) => !id.equals(currentUserObjectId));
      userToUnfollow.followerCount--;

      await currentUser.save();
      await userToUnfollow.save();
    }

    return new NextResponse('Unfollow successful', { status: 200 });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
