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
    <div className={`bg-white rounded-lg ${isDetailView ? '' : 'border border-accent-200'} select-none`}>
      <div className='p-4'>
        <div className='flex'>
          {!isDetailView && <ProfilePicture src={post.authorPfp} className='mr-3' />}
          <div className='flex-grow'>
            <BasePostHeader post={post} isDetailView={isDetailView} />
            <BasePostContent post={post} openDesignView={() => handleOpenDesignView(post)} />
            <BasePostFooter post={post} isDetailView={isDetailView} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BasePostItem);