import { NextResponse, NextRequest } from 'next/server';
import Post from '@/backend/models/Post';
import Reply from '@/backend/models/Reply';
import { getSession } from '@/utils/session';
import mongoose from 'mongoose';
import { isValidSession } from '@/backend/utils/helpers';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const { content } = await request.json();
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Reply content is required' }, { status: 400 });
    }

    const newReply = await Reply.create({
      postId: id,
      authorId: session._id,
      content: content.trim()
    });

    post.replyCount += 1;
    await post.save();

    return NextResponse.json(newReply, { status: 201 });

  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}