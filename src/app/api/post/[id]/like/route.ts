import { NextResponse, NextRequest } from 'next/server';
import Post from '@/backend/models/Post';
import Notification from '@/backend/models/Notification';
import { getSession } from '@/utils/session';
import { ObjectId } from 'mongoose';
import { isValidObjectId, isValidSession } from '@/backend/utils/helpers';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const userId = session._id;
    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes = post.likes.filter((id: ObjectId) => id.toString() !== userId);
      post.likeCount -= 1;
    } else {
      post.likes.push(userId);
      post.likeCount += 1;

      if (post.authorId.toString() !== userId) {
        await Notification.create({
          userId: post.authorId,
          type: 'like_post',
          actorId: userId,
          postId: post._id
        });
      }
    }

    await post.save();

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}