import React from 'react';
import { PostWithUserData } from '@/utils/types';
import { RiCloseLine, RiDownloadLine, RiShareBoxLine } from '@remixicon/react';
import BasePostHeader from './base/BasePostHeader';
import BasePostContent from './base/BasePostContent';
import PostAction from './base/BasePostAction';
import { formatFullPostDate } from '@/utils/formatDate';
import ClickWrapper from '@/components/atomic/ClickWrapper';

type PostDesignViewProps = {
  post: PostWithUserData;
  onClose: () => void;
}

const PostDesignView: React.FC<PostDesignViewProps> = ({ post, onClose }) => {
  return (
    <>
      <ClickWrapper onClick={onClose} className='fixed inset-0 w-full h-full z-40 bg-black bg-opacity-75 cursor-pointer' />
      <ClickWrapper className='cursor-auto'>
        <div className='fixed z-50 flex flex-row w-full h-full max-w-7xl max-h-[90vh] rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-hidden'>
          <div className='flex-1 bg-black flex items-center justify-center'>
            <img
              src={post.designFile}
              alt='Design'
              className='h-full w-full max-w-full max-h-full object-contain'
            />
          </div>
          <div className='w-96 flex flex-col border-l border-gray-200'>
            <div className='p-4 flex items-center justify-between border-b border-gray-200'>
              <h2 className='text-xl font-bold'>Design</h2>
              <button onClick={onClose}>
                <RiCloseLine size={24} className="text-base-200 hover:text-black cursor-pointer" />
              </button>
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
              <BasePostHeader post={post} isDetailView={true} />
              <BasePostContent post={post} designView />
            </div>
            <p className='px-4 py-2 text-sm text-gray-500 mt-2 select-text'>{formatFullPostDate(post.createdAt)}</p>
            <div className='p-4 border-t border-gray-200'>
              <div className='flex justify-between'>
                <PostAction
                  icon={<RiDownloadLine />}
                  tooltip='Download'
                />
                <PostAction
                  icon={<RiShareBoxLine />}
                  tooltip='Share'
                />
              </div>
            </div>
          </div>
        </div>
      </ClickWrapper>
    </>
  );
};

export default PostDesignView;