import { NextResponse, NextRequest } from 'next/server';
import Post from '@/backend/models/Post';
import { connectToDB } from '@/backend/utils/connectToDB';
import { getSession } from '@/utils/session';
import mongoose, { ObjectId } from 'mongoose';

connectToDB();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse('Invalid post ID', { status: 400 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return new NextResponse('Post not found', { status: 404 });
    }

    const userId = session._id;
    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes = post.likes.filter((id: ObjectId) => id.toString() !== userId);
      post.likeCount -= 1;
    } else {
      post.likes.push(userId);
      post.likeCount += 1;
    }

    await post.save();

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error('Error liking post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}