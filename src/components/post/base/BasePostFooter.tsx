import { formatFullPostDate } from '@/utils/formatDate';
import BasePostActions from './BasePostActions'
import { PostWithUserData } from '@/utils/types';

type BasePostFooterProps = {
  post: PostWithUserData;
  isPostView: boolean;
}

const BasePostFooter = ({ post, isPostView }: BasePostFooterProps) => {
  return (
    <>
      {isPostView && (
        <>
          <p className='text-sm text-gray-500 mt-2 select-text'>{formatFullPostDate(post.createdAt)}</p>
          <div className='bg-accent-200 w-full h-px mt-2' />
        </>
      )}
      <BasePostActions post={post} />
    </>
  );
};

export default BasePostFooter;