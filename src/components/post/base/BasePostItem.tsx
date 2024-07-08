import ProfilePicture from '@/components/atomic/ProfilePicture';
import { PostWithUserData } from '@/utils/types';
import React, { ReactNode } from 'react';
import BasePostContent from './BasePostContent';
import BasePostFooter from './BasePostFooter';
import BasePostHeader from './BasePostHeader';
import { useModal } from '@/contexts/ModalContext';

interface BasePostItemProps {
  post: PostWithUserData;
  isDetailView?: boolean;
  children?: ReactNode;
}

const BasePostItem: React.FC<BasePostItemProps> = ({
  post,
  isDetailView = false,
  children
}) => {
  const { openModal } = useModal();

  const handleOpenDesignView = (post: PostWithUserData) => {
    openModal('postDesignView', post);
  };

  return (
    <>
      <div className='flex p-4 rounded-lg border border-bg-accent-200 hover:bg-accent-100'>
        {!isDetailView && <ProfilePicture src={post.authorPfp} className='mr-3' />}
        <div className='flex-grow'>
          <BasePostHeader post={post} isDetailView={isDetailView} />
          <BasePostContent post={post} openDesignView={() => handleOpenDesignView(post)} />
          <BasePostFooter post={post} isDetailView={isDetailView} />
          {children}
        </div>
      </div>
    </>
  );
};

export default BasePostItem;