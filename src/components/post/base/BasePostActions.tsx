import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { RiChat1Line, RiDashboardLine, RiHeart2Fill, RiHeart2Line, RiHeartFill, RiHeartLine, RiShare2Line } from '@remixicon/react';
import PostAction from './actions/PostAction';
import ClickWrapper from '@/components/atomic/ClickWrapper';
import { PostWithUserData } from '@/utils/types';
import ReplyModal from '../reply/ReplyModal';
import { useModal } from '@/contexts/ModalContext';

interface BasePostActionsProps {
  post: PostWithUserData;
}

const BasePostActions: React.FC<BasePostActionsProps> = ({
  post,
}) => {
  const [replyCount, setReplyCount] = useState(post.replyCount);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [liked, setLiked] = useState(post.initialLiked);

  const { openModal } = useModal();

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
    openModal('reply', { post, onReply });
  };

  const handleAddToHive = async () => {
    try {
      await axios.post(`/api/hive/my/add`, { postId: post._id });
      // handle reflection of adding to hive
    } catch (error) {
      console.error('Error adding post to hive:', error);
    }
  };

  const handleShare = () => {
    console.log('Share clicked');
  };

  const onReply = () => {
    setReplyCount(prevCount => prevCount + 1);
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
            icon={liked ? <RiHeartFill /> : <RiHeartLine />}
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
    </>
  );
};

export default React.memo(BasePostActions);