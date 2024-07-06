import ProfilePicture from '@/components/atomic/ProfilePicture';
import { useDesignView } from '@/contexts/DesignViewContext';
import { PostWithUserData } from '@/utils/types';
import React, { ReactNode } from 'react';
import BasePostContent from './BasePostContent';
import BasePostFooter from './BasePostFooter';
import BasePostHeader from './BasePostHeader';

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
  const { openDesignView } = useDesignView();

  return (
    <div className={`bg-white rounded-lg ${isDetailView ? '' : 'border border-accent-200'} select-none`}>
      <div className='p-4'>
        <div className='flex'>
          {!isDetailView && <ProfilePicture src={post.authorPfp} className='mr-3' />}
          <div className='flex-grow'>
            <BasePostHeader post={post} isDetailView={isDetailView} />
            <BasePostContent post={post} openDesignView={() => openDesignView(post)} />
            <BasePostFooter post={post} isDetailView={isDetailView} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BasePostItem);