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
        return <RiUserAddFill className='w-4 h-4' />;
      case 'like_post':
      case 'like_reply':
        return <RiHeartFill className='w-4 h-4' />;
      case 'reply':
        return <RiReplyFill className='w-4 h-4' />;
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
        <div className='flex items-center mb-2'>
          <div className='bg-primary p-1.5 rounded-full mr-3 text-white'>
            {notificationIcon}
          </div>
          <img src={actor.pfp} alt={actor.name} className='w-8 h-8 rounded-full' />
        </div>
        <div className='ml-11'>
          <p className='text-sm'>
            <span className='font-semibold'>{actor.name}</span>{' '}
            {notificationText}
          </p>
          {(type === 'like_reply' || type === 'reply') && reply && (
            <p className='text-xs text-gray-500 mt-1'>
              &quot;{reply.content.length > 50
                ? reply.content.substring(0, 50) + '...'
                : reply.content}&quot;
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NotificationItem;