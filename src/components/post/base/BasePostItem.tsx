import ProfilePicture from '@/components/atomic/ProfilePicture';
import { PostWithUserData } from '@/utils/types';
import React, { ReactNode } from 'react';
import BasePostContent from './BasePostContent';
import BasePostFooter from './BasePostFooter';
import BasePostHeader from './BasePostHeader';
import { useModal } from '@/contexts/ModalContext';

interface BasePostItemProps {
  post: PostWithUserData;
  isPostView?: boolean;
  children?: ReactNode;
}

const BasePostItem: React.FC<BasePostItemProps> = ({
  post,
  isPostView = false,
  children
}) => {
  const { openModal } = useModal();

  const handleOpenDesignView = (post: PostWithUserData) => {
    openModal('postDesignView', post);
  };

  return (
    <>
      <div className={`flex p-4 ${!isPostView && 'rounded-lg border border-accent-200 hover:bg-accent-100'}`}>
        {!isPostView && <ProfilePicture src={post.authorPfp} className='mr-3' />}
        <div className='flex-grow'>
          <BasePostHeader post={post} isPostView={isPostView} />
          <BasePostContent post={post} openDesignView={() => handleOpenDesignView(post)} />
          <BasePostFooter post={post} isPostView={isPostView} />
          {children}
        </div>
      </div>
    </>
  );
};

export default BasePostItem;