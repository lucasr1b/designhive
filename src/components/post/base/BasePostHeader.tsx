import { PostWithUserData } from '@/utils/types';
import ProfilePicture from '../../atomic/ProfilePicture';
import { formatPostDate } from '@/utils/formatDate';
import Link from 'next/link';
import { useModal } from '@/contexts/ModalContext';
import { useRouter } from 'next/navigation';

type BasePostHeaderProps = {
  post: PostWithUserData;
  isDetailView: boolean;
}

const BasePostHeader = ({ post, isDetailView }: BasePostHeaderProps) => {
  const { isModalOpen, closeModal } = useModal();

  const { push } = useRouter();

  const viewFullPost = () => {
    closeModal('postDesignView');
    push(`/${post.authorUsername}/post/${post._id}`);
  }

  if (isDetailView) {
    return (
      <div className='flex items-center mb-4'>
        <ProfilePicture src={post.authorPfp} className='mr-3' />
        <h3 className='font-semibold select-text'>{post.authorName}</h3>
        {isModalOpen('postDesignView') && <p onClick={viewFullPost} className='font-medium text-primary ml-auto cursor-pointer underline hover:text-black'>View full post</p>}
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