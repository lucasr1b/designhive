import React, { useEffect, useState } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { PostWithUserData, ReplyWithUserData } from '@/utils/types';
import Button from '../atomic/Button';
import ProfilePicture from '../atomic/ProfilePicture';
import ReplyItem from './reply/ReplyItem';
import BasePostItem from './base/BasePostItem';
import axios from 'axios';
import Textarea from '../atomic/Textarea';

type PostItemProps = {
  post: PostWithUserData;
  replies: ReplyWithUserData[];
  onNewReply: (newReply: ReplyWithUserData) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, replies, onNewReply }) => {
  const { session } = useSession();
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = async () => {
    if (!replyContent.trim()) return;

    try {
      const { data } = await axios.post(`/api/post/${post._id}/reply`, { content: replyContent });
      const newReplyData: ReplyWithUserData = {
        ...data,
        authorName: session?.name || '',
        authorUsername: session?.username || '',
        authorPfp: session?.pfp || '',
      };
      onNewReply(newReplyData);
      setIsReplying(false);
      setReplyContent('');
    } catch (error) {
      console.error('Error replying:', error);
    }
  };

  return (
    <BasePostItem post={post} isDetailView={true}>
      <div className='bg-accent-200 w-full h-px mt-2' />
      <div className='mt-3'>
        <div className='flex w-full relative'>
          <ProfilePicture src={session?.pfp!} />
          <div className='flex flex-col pl-3 w-full pt-1'>
            {isReplying ? (
              <>
                <p className='text-base-200 mb-2'>Replying to <span className='text-primary font-medium'>@{post.authorUsername}</span></p>
                <Textarea
                  value={replyContent}
                  onChange={setReplyContent}
                  placeholder='Post your reply'
                  className='text-xl outline-none w-full placeholder:text-base-200'
                  autoFocus
                />
                <div className='flex justify-end mt-2'>
                  <Button xsmall onClick={handleReply} disabled={!replyContent.trim()}>
                    Reply
                  </Button>
                </div>
              </>
            ) : (
              <div className='flex'>
                <input
                  className='text-xl outline-none w-full placeholder:text-base-200'
                  placeholder='Post your reply'
                  onClick={() => setIsReplying(true)}
                />
                <Button xsmall onClick={handleReply} disabled={!replyContent.trim()}>
                  Reply
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='bg-accent-200 w-full h-px mt-4' />
      <div className='mt-4 select-text'>
        <h2 className='text-xl font-semibold mb-2'>Replies</h2>
        {replies.length === 0 && <p className='text-base-200'>There are no replies on this post yet.</p>}
        <div className='mt-4'>
          {replies.map((reply) => (
            <ReplyItem key={reply._id} {...reply} />
          ))}
        </div>
      </div>
    </BasePostItem>
  );
};

export default PostItem;