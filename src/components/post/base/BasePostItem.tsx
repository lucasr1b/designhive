import ProfilePicture from '@/components/atomic/ProfilePicture';
import { formatFullPostDate } from '@/utils/formatDate';
import { PostWithUserData } from '@/utils/types';
import React, { ReactNode, useState } from 'react';
import PostDesignView from '../PostDesignView';
import BasePostActions from './BasePostActions';
import BasePostContent from './BasePostContent';
import BasePostHeader from './BasePostHeader';
import BasePostFooter from './BasePostFooter';

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
  const [isDesignViewModalOpen, setIsDesignViewModalOpen] = useState(false);

  return (
    <div className={`bg-white rounded-lg ${isDetailView ? '' : 'border border-accent-200'} select-none`}>
      <div className='p-4'>
        <div className='flex'>
          {!isDetailView && <ProfilePicture src={post.authorPfp} className='mr-3' />}
          <div className='flex-grow'>
            <BasePostHeader post={post} isDetailView={isDetailView} />
            <BasePostContent post={post} openDesignView={() => setIsDesignViewModalOpen(true)} />
            <BasePostFooter post={post} isDetailView={isDetailView} />
            {children}
          </div>
        </div>
      </div>
      <PostDesignView
        post={post}
        isOpen={isDesignViewModalOpen}
        onClose={() => setIsDesignViewModalOpen(false)}
      />
    </div>
  );
};

export default React.memo(BasePostItem);