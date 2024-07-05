import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/session';
import Post, { IPost } from '@/backend/models/Post';
import User, { IUser } from '@/backend/models/User';
import { isValidObjectId, isValidSession } from '@/backend/utils/helpers';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const post = await Post.findById(id).lean<IPost>();
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const user = await User.findById(post.authorId).select('name username pfp').lean<IUser>();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const postData = {
      ...post,
      authorName: user.name,
      authorUsername: user.username,
      authorPfp: user.pfp,
      initialLiked: post.likes.some(likeId => likeId.toString() === session._id), // change to includes after ObjectId conversion
    };

    return NextResponse.json(postData);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}