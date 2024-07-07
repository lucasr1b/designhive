import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/session';
import Post from '@/backend/models/Post';
import User from '@/backend/models/User';
import { isValidSession } from '@/backend/utils/helpers';
import { User as UserType, Post as PostType, PostWithUserData } from '@/utils/types';
import { ObjectId } from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const designPosts = await Post.find({ type: 'design' })
      .sort({ createdAt: -1 })
      .lean<PostType[]>();

    const authorIds = designPosts.map(post => post.authorId);
    const authors = await User.find({ _id: { $in: authorIds } })
      .select('name username pfp')
      .lean<UserType[]>();

    if (!authors.length) return NextResponse.json({ error: 'Authors not found' }, { status: 404 });

    const authorsMap = authors.reduce((map, author) => {
      map[author._id.toString()] = author;
      return map;
    }, {} as Record<string, UserType>);

    const postsWithAuthorData: PostWithUserData[] = designPosts.map(post => {
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
    console.error('Error fetching design posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}