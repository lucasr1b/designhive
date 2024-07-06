import { PostWithUserData } from '@/utils/types';
import ProfilePicture from '../../atomic/ProfilePicture';
import { formatPostDate } from '@/utils/formatDate';

type BasePostHeaderProps = {
  post: PostWithUserData;
  isDetailView: boolean;
}

const BasePostHeader = ({ post, isDetailView }: BasePostHeaderProps) => {
  if (isDetailView) {
    return (
      <div className='flex items-center mb-4'>
        <ProfilePicture src={post.authorPfp} className='mr-3' />
        <h3 className='font-semibold select-text'>{post.authorName}</h3>
      </div>
    );
  };

  return (
    <div className='flex items-center'>
      <h3 className='font-semibold select-text'>{post.authorName}</h3>
      <p className='text-xs text-gray-500 ml-auto select-text'>{formatPostDate(post.createdAt)}</p>
    </div>
  );
};

export default BasePostHeader