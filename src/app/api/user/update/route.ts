import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/models/User';
import { getSession, updateSession } from '@/utils/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get('fname') as string;
    const username = formData.get('username') as string;
    const bio = formData.get('bio') as string;

    if (!name || !username) {
      return NextResponse.json({ error: 'Name and username are required' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      session._id,
      { name, username, bio },
      { new: true, runValidators: true }
    ).select('name username bio');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await updateSession({
      ...session,
      name: updatedUser.name,
      username: updatedUser.username,
      bio: updatedUser.bio
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}