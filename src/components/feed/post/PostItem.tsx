import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { RiChat1Line, RiDashboardLine, RiHeart2Fill, RiHeart2Line, RiShare2Line, RiSparkling2Fill } from '@remixicon/react';
import PostAction from './PostAction';
import { formatPostDate } from '@/utils/formatDate';
import { PostWithUserData } from '@/utils/types';
import ReplyModal from './ReplyModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfilePicture from '@/components/atomic/ProfilePicture';

const PostItem: React.FC<PostWithUserData> = (post) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [replyCount, setReplyCount] = useState(post.replyCount);
  const [liked, setLiked] = useState(post.initialLiked);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const { push } = useRouter();

  const handleLike = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    const previousLiked = liked;
    const previousLikeCount = likeCount;

    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);

    try {
      const { data } = await axios.post(`/api/post/${post._id}/like`);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      setLiked(previousLiked);
      setLikeCount(previousLikeCount);
    }
  }, [post._id, liked, likeCount]);

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReplyModalOpen(true);
  };

  const handlePostClick = (e: React.MouseEvent) => {
    push(`/${post.authorUsername}/post/${post._id}`);
  }

  const handleReplied = () => {
    setReplyCount(prevCount => prevCount + 1);
  };

  const closeReplyModal = (e: any) => {
    e.stopPropagation();
    setIsReplyModalOpen(false);
  }

  const renderContent = () => {
    if (post.type === 'design') {
      return (
        <div>
          {post.content ? <p className='select-text'>{post.content}</p> : <div className='mt-4' />}
          <div className='relative mt-2'>
            <img src={post.designFile} alt='Design' className='w-full h-auto rounded-lg' />
            <div className='flex flex-row gap-2 items-center absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded'>
              <RiSparkling2Fill size={12} /> DESIGN
            </div>
          </div>
        </div>
      );
    }
    if (post.type === 'text') {
      return <p>{post.content}</p>;
    }
    return null;
  };

  return (
    <div onClick={handlePostClick} className='bg-white rounded-lg p-4 border border-accent-200 cursor-pointer select-none'>
      <div className='flex'>
        <ProfilePicture src={post.authorPfp} className='mr-3' />
        <div className='flex-grow'>
          <div className='flex items-center'>
            <h3 className='font-semibold select-text'>{post.authorName}</h3>
            <p className='text-sm text-gray-500 ml-auto select-text'>{formatPostDate(post.createdAt)}</p>
          </div>
          {renderContent()}
          <div className='flex gap-8 mt-3'>
            <PostAction
              icon={<RiChat1Line />}
              count={replyCount}
              tooltip='Reply'
              onClick={handleReplyClick}
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
              {post.type === 'design' && (
                <PostAction
                  icon={<RiDashboardLine />}
                  tooltip='Add to Hive'
                  hoverColor='yellow-500'
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <PostAction
                icon={<RiShare2Line />}
                tooltip='Share'
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      </div>
      <ReplyModal
        post={post}
        isOpen={isReplyModalOpen}
        onClose={closeReplyModal}
        onReply={handleReplied}
      />
    </div>
  );
};

export default React.memo(PostItem);