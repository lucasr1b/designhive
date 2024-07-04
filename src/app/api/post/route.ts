import { NextRequest, NextResponse } from 'next/server';
import Post from '@/backend/models/Post';
import { getSession } from '@/utils/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, content } = await request.json();

    if (!type || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = await Post.create({
      authorId: session._id,
      type,
      content
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}