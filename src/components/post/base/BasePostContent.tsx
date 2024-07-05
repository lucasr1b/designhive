import { PostWithUserData } from '@/utils/types';
import { RiSparkling2Fill } from '@remixicon/react';

type BasePostContentProps = {
  post: PostWithUserData;
}

const BasePostContent = ({ post }: BasePostContentProps) => {
  if (post.type === 'design') {
    return (
      <>
        {post.content && <p className='select-text'>{post.content}</p>}
        <div className='relative mt-2'>
          <img src={post.designFile} alt='Design' className='w-full h-auto rounded-lg' />
          <div className='flex flex-row gap-2 items-center absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded'>
            <RiSparkling2Fill size={12} /> DESIGN
          </div>
        </div>
      </>
    );
  }

  return <p className='select-text'>{post.content}</p>;
};

export default BasePostContent;