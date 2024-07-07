'use client';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useSession } from '@/contexts/SessionContext';
import { RiCloseLine } from '@remixicon/react';
import { PostWithUserData } from '@/utils/types';
import Button from '@/components/atomic/Button';
import ProfilePicture from '@/components/atomic/ProfilePicture';
import ClickWrapper from '@/components/atomic/ClickWrapper';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useModal } from '@/contexts/ModalContext';
import Modal from '@/components/atomic/Modal';
import Textarea from '@/components/atomic/Textarea';

const modalId = 'reply';

const ReplyModal = () => {
  const { session } = useSession();
  const [replyContent, setReplyContent] = useState('');

  const { closeModal, getModalProps } = useModal();

  const modalProps = getModalProps(modalId);
  if (!modalProps) return null;

  const { post, onReply } = modalProps as { post: PostWithUserData; onReply: () => void };

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    onReply();
    setReplyContent('');
    closeModal(modalId);

    try {
      await axios.post(`/api/post/${post._id}/reply`, { content: replyContent });
    } catch (error) {
      console.error('Error replying:', error);
    }
  };

  return (
    <Modal modalId={modalId} width='34rem'>
      <div className='flex flex-col w-full h-auto rounded-lg bg-white cursor-default select-none'>
        <div className='flex flex-row items-center h-14 px-4'>
          <ClickWrapper onClick={() => closeModal(modalId)}>
            <RiCloseLine size={24} className='text-base-200 hover:text-black cursor-pointer' />
          </ClickWrapper>
        </div>
        <hr />
        <form className='p-4'>
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
                <Textarea
                  value={replyContent}
                  onChange={setReplyContent}
                  className='text-xl outline-none w-full min-h-16 max-h-64 placeholder:text-base-200'
                  placeholder='Post your reply'
                />
              </div>
            </div>
          </div>
          <div className='flex justify-end mt-4'>
            <Button xsmall onClick={handleReply}>Reply</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReplyModal;