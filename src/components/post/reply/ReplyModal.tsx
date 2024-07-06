import React, { useRef } from 'react';
import axios from 'axios';
import { useSession } from '@/contexts/SessionContext';
import { RiCloseLine } from '@remixicon/react';
import { PostWithUserData } from '@/utils/types';
import Button from '@/components/atomic/Button';
import ProfilePicture from '@/components/atomic/ProfilePicture';
import ClickWrapper from '@/components/atomic/ClickWrapper';

interface ReplyModalProps {
  post: PostWithUserData;
  isOpen: boolean;
  onClose: () => void;
  onReply: () => void;
}

const ReplyModal: React.FC<ReplyModalProps> = ({ post, isOpen, onClose, onReply }) => {
  const { session } = useSession();
  const replyRef = useRef<HTMLTextAreaElement>(null);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const reply = replyRef.current?.value || '';
    if (!reply.trim()) return;
    onReply();
    onClose();

    try {
      await axios.post(`/api/post/${post._id}/reply`, { content: reply });
    } catch (error) {
      console.error('Error replying:', error);
    }
  };

  const handleReplyTextareaHeight = () => {
    if (replyRef.current) {
      replyRef.current.style.height = 'auto';
      replyRef.current.style.height = `${replyRef.current.scrollHeight}px`;
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <ClickWrapper onClick={onClose} className='fixed inset-0 w-full h-full z-40 bg-black opacity-50' />
      <ClickWrapper>
        <div className='fixed z-50 flex flex-col w-full max-w-xl h-auto rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white cursor-default select-none'>
          <div className='flex flex-row items-center h-14 px-4'>
            <ClickWrapper onClick={onClose}>
              <RiCloseLine size={24} className="text-base-200 hover:text-black cursor-pointer" />
            </ClickWrapper>
          </div>
          <hr />
          <form onSubmit={handleReply} className='p-4'>
            <div className='mb-4 flex flex-col'>
              <div className='flex flex-row items-start relative'>
                <ProfilePicture src={post.authorPfp} />
                <div className='flex-grow ml-3 mb-2'>
                  <div className='flex items-center'>
                    <p className='font-bold cursor-text select-text'>{post.authorName}</p>
                  </div>
                  <p className='text-black cursor-text select-text'>{post.content}</p>
                  {post.type === 'design' && (
                    <div className='mt-2'>
                      <img src={post.designFile} alt='Design' className='w-1/3 h-auto rounded-lg' />
                    </div>
                  )}
                </div>
                <div className='absolute left-5 top-12 bottom-0 w-0.5 bg-accent-200'></div>
              </div>
              <div className='flex flex-row relative'>
                <div className='flex-shrink-0 w-10'></div>
                <p className='text-base-200 ml-3'>Replying to <span className='text-black font-medium cursor-text select-text'>@{post.authorName.toLowerCase().replace(/\s/g, '')}</span></p>
                <div className='absolute left-5 top-0 bottom-0 w-0.5 bg-accent-200'></div>
              </div>
              <div className='flex w-full mt-4 relative'>
                <ProfilePicture src={session?.pfp!} />
                <div className='flex flex-col pl-3 pt-2 w-full'>
                  <textarea
                    ref={replyRef}
                    onChange={handleReplyTextareaHeight}
                    className='text-xl outline-none w-full min-h-16 max-h-64 resize-none overflow-hidden placeholder:text-base-200'
                    placeholder='Post your reply'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-end mt-4'>
              <Button xsmall type='submit'>Reply</Button>
            </div>
          </form>
        </div>
      </ClickWrapper>
    </>
  );
};

export default ReplyModal;