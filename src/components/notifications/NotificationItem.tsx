import { Notification } from '@/utils/types';
import { RiHeartFill, RiReplyFill, RiUserAddFill } from '@remixicon/react';
import Link from 'next/link';
import { useMemo } from 'react';

type NotificationItemProps = {
  notification: Notification;
  sessionUsername?: string;
}

const NotificationItem = ({ notification, sessionUsername }: NotificationItemProps) => {
  const { type, actor, reply, post } = notification;

  const notificationLink = useMemo(() => {
    if (type === 'follow') {
      return `/${actor.username}`;
    } else if (post && sessionUsername) {
      return `/${sessionUsername}/post/${post._id}`;
    }
    return '/';
  }, [type, actor.username, post, sessionUsername]);

  const notificationIcon = useMemo(() => {
    switch (type) {
      case 'follow':
        return <RiUserAddFill className='w-6 h-6' />;
      case 'like_post':
      case 'like_reply':
        return <RiHeartFill className='w-6 h-6' />;
      case 'reply':
        return <RiReplyFill className='w-6 h-6' />;
      default:
        return null;
    }
  }, [type]);

  const notificationText = useMemo(() => {
    switch (type) {
      case 'follow':
        return 'followed you';
      case 'like_post':
        return 'liked your post';
      case 'like_reply':
        return 'liked your reply';
      case 'reply':
        return 'replied to your post';
      default:
        return '';
    }
  }, [type]);

  return (
    <Link href={notificationLink} className='block hover:bg-accent-200'>
      <div className='p-4 border-b border-accent-200'>
        <div className='flex items-center'>
          <div className='rounded-full text-primary flex-shrink-0'>
            {notificationIcon}
          </div>
          <div className='ml-3'>
            <img src={actor.pfp} alt={actor.name} className='w-8 h-8 rounded-full' />
          </div>
          <div className='ml-3 flex-grow'>
            <p className='text-sm'>
              <span className='font-semibold'>{actor.name}</span>{' '}
              {notificationText}
            </p>
            {(type === 'like_reply' || type === 'reply') && reply && (
              <p className='text-xs text-base-200 mt-1'>
                &quot;{reply.content.length > 50
                  ? reply.content.substring(0, 50) + '...'
                  : reply.content}&quot;
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationItem;
