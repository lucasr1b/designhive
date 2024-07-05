import React from 'react';
import { useSession } from '@/contexts/SessionContext';
import { PostWithUserData, ReplyWithUserData } from '@/utils/types';
import Button from '../atomic/Button';
import ProfilePicture from '../atomic/ProfilePicture';
import ReplyItem from './reply/ReplyItem';
import BasePostItem from './base/BasePostItem';

type PostItemProps = {
  post: PostWithUserData;
  replies: ReplyWithUserData[];
}

const PostItem: React.FC<PostItemProps> = ({ post, replies }) => {
  const { session } = useSession();

  return (
    <BasePostItem post={post} isDetailView={true}>
      <div className='mt-6'>
        <div className='flex w-full relative'>
          <ProfilePicture src={session?.pfp!} />
          <div className='flex flex-row pl-3 w-full'>
            <input
              className='text-xl outline-none w-full placeholder:text-base-200'
              placeholder='Post your reply'
            />
            <Button xsmall disabled>Reply</Button>
          </div>
        </div>
      </div>
      <div className='mt-8 select-text'>
        <h2 className='text-xl font-semibold mb-4'>Replies</h2>
        {replies.map((reply) => (
          <ReplyItem key={reply._id} {...reply} />
        ))}
      </div>
    </BasePostItem>
  );
};

export default PostItem;