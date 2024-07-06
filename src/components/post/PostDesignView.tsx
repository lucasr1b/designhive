'use client';
import ClickWrapper from '@/components/atomic/ClickWrapper';
import { useDesignView } from '@/contexts/DesignViewContext';
import { PostWithUserData } from '@/utils/types';
import { RiCloseLine } from '@remixicon/react';
import React from 'react';
import Button from '../atomic/Button';
import ProfilePicture from '../atomic/ProfilePicture';
import BasePostContent from './base/BasePostContent';
import BasePostFooter from './base/BasePostFooter';
import BasePostHeader from './base/BasePostHeader';

const PostDesignView = () => {
  const { isDesignViewOpen, closeDesignView, currentPost } = useDesignView();

  if (!isDesignViewOpen || !currentPost) return null;

  return (
    <>
      <ClickWrapper onClick={closeDesignView} className='fixed inset-0 w-full h-full z-40 bg-black bg-opacity-75 cursor-pointer' />
      <ClickWrapper className='cursor-auto'>
        <div className='fixed z-50 flex flex-row w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
          <div className='flex-1 flex-col bg-black flex items-center justify-center relative'>
            <img
              src={currentPost.designFile}
              alt='Design'
              className='h-full w-full max-w-full max-h-full object-contain opacity-100'
            />
            <ClickWrapper onClick={closeDesignView} className="absolute top-4 left-4 z-10">
              <RiCloseLine size={24} className="text-white hover:text-gray-300 cursor-pointer" />
            </ClickWrapper>
          </div>
          <div className='w-96 flex flex-col border-l border-gray-200 bg-white'>
            <div className='overflow-y-auto p-4'>
              <BasePostHeader post={currentPost} isDetailView={true} />
              <BasePostContent post={currentPost} isDesignView={true} />
              <BasePostFooter post={currentPost} isDetailView={true} />
              <div className='bg-accent-200 w-full h-px mt-2' />
              <div className='mt-6'>
                <div className='flex w-full relative'>
                  <ProfilePicture src={currentPost.authorPfp} />
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
      </ClickWrapper>
    </>
  );
};

export default PostDesignView;