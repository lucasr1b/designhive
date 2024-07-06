import React from 'react';
import { useRouter } from 'next/navigation';
import { PostWithUserData } from '@/utils/types';
import BasePostItem from '@/components/post/base/BasePostItem';
import ClickWrapper from '@/components/atomic/ClickWrapper';

interface FeedPostItemProps {
  post: PostWithUserData;
}

const FeedPostItem = ({ post }: FeedPostItemProps) => {
  const { push } = useRouter();

  const handlePostClick = () => {
    push(`/${post.authorUsername}/post/${post._id}`);
  };

  return (
    <ClickWrapper onClick={handlePostClick} className='cursor-pointer'>
      <BasePostItem post={post} />
    </ClickWrapper>
  );
};

export default React.memo(FeedPostItem);