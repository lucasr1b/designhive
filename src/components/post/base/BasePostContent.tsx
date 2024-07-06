import ClickWrapper from '@/components/atomic/ClickWrapper';
import { PostWithUserData } from '@/utils/types';
import { RiSparkling2Fill } from '@remixicon/react';

type BasePostContentProps = {
  post: PostWithUserData;
  isDesignView?: boolean;
  openDesignView?: () => void;
}

const BasePostContent = ({ post, isDesignView, openDesignView }: BasePostContentProps) => {

  const handleDesignClick = () => {
    if (openDesignView) openDesignView();
  };

  if (post.type === 'design' && !isDesignView) {
    return (
      <>
        {post.content && <p className='select-text'>{post.content}</p>}
        <ClickWrapper onClick={handleDesignClick}>
          <div className='relative mt-2 cursor-pointer'>
            <img src={post.designFile} alt='Design' className='w-full h-auto rounded-lg border border-accent-200' />
            <div className='flex flex-row gap-2 items-center absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded shadow-lg'>
              <RiSparkling2Fill size={12} /> DESIGN
            </div>
          </div>
        </ClickWrapper>
      </>
    );
  }

  return <p className='select-text'>{post.content}</p>;
};

export default BasePostContent;