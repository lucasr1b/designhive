'use client';
import ClickWrapper from '@/components/atomic/ClickWrapper';
import { PostWithUserData } from '@/utils/types';
import { RiCloseLine } from '@remixicon/react';
import React from 'react';
import Button from '../atomic/Button';
import ProfilePicture from '../atomic/ProfilePicture';
import BasePostContent from './base/BasePostContent';
import BasePostFooter from './base/BasePostFooter';
import BasePostHeader from './base/BasePostHeader';
import { useModal } from '@/contexts/ModalContext';
import Modal from '../atomic/Modal';

const modalId = 'postDesignView';

const PostDesignViewModal = () => {
  const { closeModal, getModalProps } = useModal();

  const modalProps = getModalProps(modalId);
  if (!modalProps) return null;

  const post = modalProps as PostWithUserData;

  return (
    <Modal modalId={modalId} width='100vw' height='100vh'>
      <div className='flex flex-row w-full h-full'>
        <div className='flex-1 flex-col bg-black bg-opacity-90 flex items-center justify-center relative'>
          <img
            src={post.designFile}
            alt='Design'
            className='h-full w-full max-w-full max-h-full object-contain opacity-100'
          />
          <ClickWrapper onClick={() => closeModal(modalId)} className='absolute top-4 left-4 z-10 p-2 rounded-full cursor-pointer bg-white hover:bg-accent-400'>
            <RiCloseLine size={24} />
          </ClickWrapper>
        </div>
        <div className='w-96 flex flex-col border-l border-gray-200 bg-white'>
          <div className='overflow-y-auto p-4'>
            <BasePostHeader post={post} isDetailView={true} />
            <BasePostContent post={post} isDesignView={true} />
            <BasePostFooter post={post} isDetailView={true} />
            <div className='bg-accent-200 w-full h-px mt-2' />
            <div className='mt-6'>
              <div className='flex w-full relative'>
                <ProfilePicture src={post.authorPfp} />
                <div className='flex flex-row pl-3 w-full'>
                  <input
                    className='text-xl outline-none w-full placeholder:text-base-200'
                    placeholder='Post your reply'
                  />
                  <Button small disabled>Reply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostDesignViewModal;