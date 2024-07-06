import React, { useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { RiChat1Line, RiDashboardLine, RiHeart2Fill, RiHeart2Line, RiShare2Line } from '@remixicon/react';
import PostAction from './BasePostAction';
import { formatFullPostDate } from '@/utils/formatDate';
import { PostWithUserData } from '@/utils/types';
import ReplyModal from '../reply/ReplyModal';
import ProfilePicture from '@/components/atomic/ProfilePicture';
import BasePostHeader from './BasePostHeader';
import BasePostContent from './BasePostContent';
import PostDesignView from '../PostDesignView';
import ClickWrapper from '@/components/atomic/ClickWrapper';

interface BasePostItemProps {
  post: PostWithUserData;
  onReply?: () => void;
  isDetailView?: boolean;
  children?: ReactNode;
}

const BasePostItem: React.FC<BasePostItemProps> = ({
  post,
  onReply,
  isDetailView = false,
  children
}) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [replyCount, setReplyCount] = useState(post.replyCount);
  const [liked, setLiked] = useState(post.initialLiked);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isDesignViewModalOpen, setIsDesignViewModalOpen] = useState(false);

  const handleLike = useCallback(async () => {
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

  const handleReplied = () => {
    setReplyCount(prevCount => prevCount + 1);
    if (onReply) onReply();
  };

  return (
    <div className={`bg-white rounded-lg ${isDetailView ? '' : 'border border-accent-200'} select-none`}>
      <div className='p-4'>
        <div className='flex'>
          {!isDetailView && <ProfilePicture src={post.authorPfp} className='mr-3' />}
          <div className='flex-grow'>
            <BasePostHeader post={post} isDetailView={isDetailView} />
            <BasePostContent
              post={post}
              openDesignView={() => setIsDesignViewModalOpen(true)}
            />
            {isDetailView && (
              <>
                <p className='text-sm text-gray-500 mt-2 select-text'>{formatFullPostDate(post.createdAt)}</p>
                <div className='border border-accent-200 mt-2' />
              </>
            )}
            <div className='flex gap-8 mt-3'>
              <ClickWrapper onClick={() => setIsReplyModalOpen(true)}>
                <PostAction
                  icon={<RiChat1Line />}
                  count={replyCount}
                  tooltip='Reply'
                />
              </ClickWrapper>
              <ClickWrapper onClick={handleLike}>
                <PostAction
                  icon={liked ? <RiHeart2Fill /> : <RiHeart2Line />}
                  count={likeCount}
                  tooltip={liked ? 'Unlike' : 'Like'}
                  color={liked ? 'red-500' : 'base-200'}
                  hoverColor={liked ? 'red-600' : 'red-500'}
                />
              </ClickWrapper>
              <div className='flex justify-end gap-8 w-full'>
                {post.type === 'design' && (
                  <ClickWrapper onClick={() => console.log('Add to Hive clicked')}>
                    <PostAction
                      icon={<RiDashboardLine />}
                      tooltip='Add to Hive'
                      hoverColor='yellow-500'
                    />
                  </ClickWrapper>
                )}
                <ClickWrapper onClick={() => console.log('Share clicked')}>
                  <PostAction
                    icon={<RiShare2Line />}
                    tooltip='Share'
                  />
                </ClickWrapper>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
      <ReplyModal
        post={post}
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onReply={handleReplied}
      />
      {isDesignViewModalOpen && (
        <PostDesignView
          post={post}
          onClose={() => setIsDesignViewModalOpen(false)}
        />
      )}
    </div>
  );
};

export default React.memo(BasePostItem);