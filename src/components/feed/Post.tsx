import { RiChat1Line, RiDashboardLine, RiEyeLine, RiHeart2Line, RiPushpinLine, RiShare2Line } from '@remixicon/react';
import PostAction from './PostAction';

const Post = () => {
  return (
    <div>
      <div className='flex gap-2'>
        <div className='bg-gray-400 rounded-full w-6 h-6 shrink-0'></div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-row items-center'>
            <span className='font-semibold'>Lucas Ribeiro</span>
            <span className='text-base-200 ml-auto text-xs'>4 mins ago</span>
          </div>
          <div className='flex flex-col gap-4'>
            <span className='text-lg'>My First Post</span>
            <div className='bg-gray-400 h-96 w-full rounded-lg border border-accent-200'></div>
          </div>
          <div className='flex flex-row gap-8 mt-2'>
            <PostAction icon={<RiChat1Line />} count={1} tooltip='Comment' />
            <PostAction icon={<RiHeart2Line />} count={5} tooltip='Like' hoverColor='red-500' />
            <div className='flex flex-row gap-8 ml-auto'>
              <PostAction icon={<RiDashboardLine />} tooltip='Add to Hive' />
              <PostAction icon={<RiShare2Line />} tooltip='Share' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;