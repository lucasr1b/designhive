import React from 'react';
import { formatPostDate } from '@/utils/formatDate';
import { ReplyWithUserData } from '@/utils/types';
import ProfilePicture from '../atomic/ProfilePicture';

const ReplyItem: React.FC<ReplyWithUserData> = (reply) => {
  return (
    <div className='bg-white rounded-lg border border-accent-200 p-4 mb-4'>
      <div className='flex'>
        <ProfilePicture src={reply.authorPfp} className='w-8 h-8 mr-3' />
        <div className='flex-grow'>
          <div className='flex items-center'>
            <h3 className='font-semibold'>{reply.authorName}</h3>
            <p className='text-sm text-gray-500 ml-auto'>{formatPostDate(reply.createdAt)}</p>
          </div>
          <p className='mt-1'>{reply.content}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReplyItem);