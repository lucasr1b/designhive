import Reply, { IReply } from '@/backend/models/Reply';
import User, { IUser } from '@/backend/models/User';
import { isValidObjectId, isValidSession } from '@/backend/utils/helpers';
import { getSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

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

    const replies = await Reply.find({ postId: id })
      .sort({ createdAt: -1 })
      .lean<IReply[]>();

    const repliesWithUserData = await Promise.all(
      replies.map(async (reply) => {
        const user = await User.findById(reply.authorId).select('_id name username pfp').lean<IUser>();

        if (!user) {
          throw new Error('User not found');
        }

        return {
          ...reply,
          authorName: user.name,
          authorUsername: user.username,
          authorPfp: user.pfp,
          initialLiked: reply.likes.some(likeId => likeId.toString() === session._id), // change to include after ObjectId conversion
        };
      })
    );

    return NextResponse.json(repliesWithUserData);
  } catch (error) {
    console.error('Error fetching replies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}