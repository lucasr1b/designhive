import { PostWithUserData } from '@/utils/types';
import ProfilePicture from '../../atomic/ProfilePicture';
import { formatPostDate } from '@/utils/formatDate';

type BasePostHeaderProps = {
  post: PostWithUserData;
  isDetailView: boolean;
}

const BasePostHeader = ({ post, isDetailView }: BasePostHeaderProps) => {
  return (
    <>
      <div className='flex items-center'>
        {isDetailView && <ProfilePicture src={post.authorPfp} className='mr-3' />}
        <h3 className='font-semibold select-text'>{post.authorName}</h3>
        {!isDetailView && <p className='text-sm text-gray-500 ml-auto select-text'>{formatPostDate(post.createdAt)}</p>}
      </div>
      {isDetailView && <div className='mb-4'></div>}
    </>
  );
};

export default BasePostHeader