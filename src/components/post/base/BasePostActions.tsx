import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { RiChat1Line, RiDashboardLine, RiHeart2Fill, RiHeart2Line, RiShare2Line } from '@remixicon/react';
import PostAction from './BasePostAction';
import ClickWrapper from '@/components/atomic/ClickWrapper';
import { PostWithUserData } from '@/utils/types';
import ReplyModal from '../reply/ReplyModal';

interface BasePostActionsProps {
  post: PostWithUserData;
}

const BasePostActions: React.FC<BasePostActionsProps> = ({
  post,
}) => {
  const [replyCount, setReplyCount] = useState(post.replyCount);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [liked, setLiked] = useState(post.initialLiked);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

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

  const handleReply = () => {
    setIsReplyModalOpen(true);
  };

  const handleAddToHive = () => {
    console.log('Add to Hive clicked');
  };

  const handleShare = () => {
    console.log('Share clicked');
  };

  const handleReplied = () => {
    setReplyCount(prevCount => prevCount + 1);
    setIsReplyModalOpen(false);
  };

  return (
    <>
      <div className='flex gap-8 mt-3'>
        <ClickWrapper onClick={handleReply}>
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
            <ClickWrapper onClick={handleAddToHive}>
              <PostAction
                icon={<RiDashboardLine />}
                tooltip='Add to Hive'
                hoverColor='yellow-500'
              />
            </ClickWrapper>
          )}
          <ClickWrapper onClick={handleShare}>
            <PostAction
              icon={<RiShare2Line />}
              tooltip='Share'
            />
          </ClickWrapper>
        </div>
      </div>
      <ReplyModal
        post={post}
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onReply={handleReplied}
      />
    </>
  );
};

export default React.memo(BasePostActions);