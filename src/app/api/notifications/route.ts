// app/api/notifications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/session';
import { isValidSession } from '@/backend/utils/helpers';
import Notification from '@/backend/models/Notification';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!isValidSession(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session._id;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .populate('actorId', 'name username pfp')
      .populate('postId', 'type content designFile')
      .populate('replyId', 'content')
      .limit(10);

    const formattedNotifications = notifications.map(notification => ({
      _id: notification._id,
      type: notification.type,
      actor: notification.actorId,
      post: notification.postId,
      reply: notification.replyId,
      createdAt: notification.createdAt
    }));

    return NextResponse.json(formattedNotifications, { status: 200 });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}