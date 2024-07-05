import { useState } from 'react';
import axios from 'axios';
import { RiChat1Line, RiDashboardLine, RiHeart2Fill, RiHeart2Line, RiShare2Line } from '@remixicon/react';
import PostAction from './PostAction';
import React from 'react';
import { formatPostDate } from '@/utils/formatDate';

type PostProps = {
  _id: string;
  authorName: string;
  authorPfp: string;
  type: string;
  content: string;
  likeCount: number;
  replyCount: number;
  createdAt: Date;
  initialLiked: boolean;
};

const PostItem = ({ _id, authorName, authorPfp, type, content, likeCount, replyCount, createdAt, initialLiked }: PostProps) => {
  const [likes, setLikes] = useState(likeCount);
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/post/${_id}/like`);
      setLikes(response.data.likeCount);
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <div>
      <div className='flex gap-2'>
        <div className='flex-shrink-0 w-6 h-6 rounded-full overflow-hidden'>
          <img src={authorPfp} alt={authorName} className='w-full h-full rounded-full' />
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex flex-row items-center'>
            <span className='font-semibold'>{authorName}</span>
            <span className='text-base-200 ml-auto text-xs'>{formatPostDate(createdAt)}</span>
          </div>
          {type === 'design' && (
            <div className='flex flex-col gap-4'>
              <span className='text-lg'>{content}</span>
              <div className='bg-gray-400 h-96 w-full rounded-lg border border-accent-200'></div>
            </div>
          )}
          {type === 'text' && (
            <div className='flex'>
              <span className='text-md'>{content}</span>
            </div>
          )}
          <div className='flex flex-row gap-8 mt-2'>
            <PostAction icon={<RiChat1Line />} count={replyCount} tooltip='Comment' />
            <div onClick={handleLike}>
              {liked ? (
                <PostAction icon={<RiHeart2Fill />} count={likes} tooltip={'Unlike'} color='red-500' hoverColor='red-600' />
              ) : (
                <PostAction icon={<RiHeart2Line />} count={likes} tooltip={'Like'} hoverColor='red-500' />
              )}
            </div>
            <div className='flex flex-row gap-8 ml-auto'>
              {type === 'design' && <PostAction icon={<RiDashboardLine />} tooltip='Add to Hive' />}
              <PostAction icon={<RiShare2Line />} tooltip='Share' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostItem);