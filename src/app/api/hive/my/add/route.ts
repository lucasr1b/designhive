import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/session';
import User from '@/backend/models/User';
import Post from '@/backend/models/Post';
import { isValidSession } from '@/backend/utils/helpers';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Validate if the postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({ error: 'Invalid Post ID' }, { status: 400 });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Add the post to the user's hive
    const updatedUser = await User.findByIdAndUpdate(
      session._id,
      { $addToSet: { hive: postId } },
      { new: true, select: 'hive' }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post added to hive', hive: updatedUser.hive });
  } catch (error) {
    console.error('Error adding post to hive:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}