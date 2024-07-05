import React from 'react';
import { useRouter } from 'next/navigation';
import { PostWithUserData } from '@/utils/types';
import BasePostItem from '@/components/post/base/BasePostItem';

interface FeedPostItemProps {
  post: PostWithUserData;
}

const FeedPostItem = ({ post }: FeedPostItemProps) => {
  const { push } = useRouter();

  const handlePostClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    push(`/${post.authorUsername}/post/${post._id}`);
  };

  return <BasePostItem post={post} onPostClick={handlePostClick} />;
};

export default React.memo(FeedPostItem);