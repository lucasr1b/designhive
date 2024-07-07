import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/models/User';
import Notification from '@/backend/models/Notification';
import { getSession } from '@/utils/session';
import { isValidSession } from '@/backend/utils/helpers';
import mongoose from 'mongoose';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const currentUser = await User.findById(session._id);
    const userToFollow = await User.findById(id);

    if (!userToFollow) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (currentUser._id.toString() === userToFollow._id.toString()) {
      return NextResponse.json({ error: 'You cannot follow yourself' }, { status: 400 });
    }

    const alreadyFollowing = currentUser.following.includes(userToFollow._id);

    if (!alreadyFollowing) {
      currentUser.following.push(userToFollow._id);
      currentUser.followingCount++;
      userToFollow.followers.push(currentUser._id);
      userToFollow.followerCount++;

      await currentUser.save();
      await userToFollow.save();

      await Notification.create({
        userId: userToFollow._id,
        type: 'follow',
        actorId: currentUser._id
      });

      return NextResponse.json({ message: 'Follow successful' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Already following this user' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error following user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}