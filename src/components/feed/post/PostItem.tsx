import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { RiChat1Line, RiDashboardLine, RiHeart2Fill, RiHeart2Line, RiShare2Line, RiSparkling2Fill } from '@remixicon/react';
import PostAction from './PostAction';
import { formatPostDate } from '@/utils/formatDate';
import { PostWithUserData } from '@/utils/types';

const PostItem: React.FC<PostWithUserData> = ({
  _id,
  authorName,
  authorPfp,
  type,
  content,
  designFile,
  likeCount: initialLikeCount,
  replyCount,
  createdAt,
  initialLiked,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = useCallback(async () => {
    try {
      const { data } = await axios.post(`/api/post/${_id}/like`);
      setLikeCount(data.likeCount);
      setLiked((prev) => !prev);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  }, [_id]);

  const renderContent = () => {
    if (type === 'design') {
      return (
        <div>
          {content ? <p className=''>{content}</p> : <div className='mt-4' />}
          <div className='relative mt-2'>
            <img src={designFile} alt='Design' className='w-full h-auto rounded-lg cursor-pointer' />
            <div className="flex flex-row gap-2 items-center absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded">
              <RiSparkling2Fill size={12} /> DESIGN
            </div>
          </div>
        </div>
      );
    }
    if (type === 'text') {
      return <p>{content}</p>;
    }
    return null;
  };

  return (
    <div className='bg-white rounded-lg border border-accent-200 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0 mr-3'>
          <img src={authorPfp} alt={authorName} className='w-10 h-10 rounded-full' />
        </div>
        <div className='flex-grow'>
          <div className='flex items-center'>
            <h3 className='font-semibold'>{authorName}</h3>
            <p className='text-sm text-gray-500 ml-auto'>{formatPostDate(createdAt)}</p>
          </div>
          {renderContent()}
          <div className='flex gap-8 mt-3'>
            <PostAction
              icon={<RiChat1Line />}
              count={replyCount}
              tooltip='Comment'
            />
            <PostAction
              icon={liked ? <RiHeart2Fill /> : <RiHeart2Line />}
              count={likeCount}
              tooltip={liked ? 'Unlike' : 'Like'}
              color={liked ? 'red-500' : 'base-200'}
              hoverColor={liked ? 'red-600' : 'red-500'}
              onClick={handleLike}
            />
            <div className='flex justify-end gap-8 w-full'>
              {type === 'design' && (
                <PostAction
                  icon={<RiDashboardLine />}
                  tooltip='Add to Hive'
                  hoverColor='yellow-500'
                />
              )}
              <PostAction
                icon={<RiShare2Line />}
                tooltip='Share'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostItem);