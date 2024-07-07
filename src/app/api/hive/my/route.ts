import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/session';
import Post from '@/backend/models/Post';
import User, { IUser } from '@/backend/models/User';
import { isValidSession } from '@/backend/utils/helpers';
import { User as UserType, Post as PostType, PostWithUserData } from '@/utils/types';
import { ObjectId } from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(session._id).select('hive').lean<IUser>();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const hivePosts = await Post.find({ _id: { $in: user.hive } })
      .sort({ createdAt: -1 })
      .lean<PostType[]>();

    if (!hivePosts.length) return NextResponse.json([]);

    const authorIds = hivePosts.map(post => post.authorId);
    const authors = await User.find({ _id: { $in: authorIds } })
      .select('name username pfp')
      .lean<UserType[]>();

    const authorsMap = authors.reduce((map, author) => {
      map[author._id.toString()] = author;
      return map;
    }, {} as Record<string, UserType>);

    const postsWithAuthorData: PostWithUserData[] = hivePosts.map(post => {
      const author = authorsMap[post.authorId.toString()];
      return {
        ...post,
        authorName: author.name,
        authorUsername: author.username,
        authorPfp: author.pfp,
        initialLiked: post.likes.some(likeId => likeId.toString() === session._id),
      };
    });

    return NextResponse.json(postsWithAuthorData);
  } catch (error) {
    console.error('Error fetching user hive posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}