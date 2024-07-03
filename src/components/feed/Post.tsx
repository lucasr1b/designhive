const Post = () => {
  return (
    <div className=''>
      <div className='flex gap-2'>
        <div className='bg-gray-400 rounded-full w-6 h-6'></div>
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex flex-row items-center'>
            <span className='font-medium'>Lucas Ribeiro</span>
            <span className='ml-auto text-xs'>4 mins ago</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span>My First Post</span>
            <div className='bg-gray-400 h-96 w-full rounded-lg border border-border-primary'></div>
          </div>
          <div className='flex flex-row gap-8 mt-4'>
            <div className='flex items-center justify-center rounded-full bg-gray-400 h-8 w-8'>❤️ 5</div>
            <div className='flex items-center justify-center rounded-full bg-gray-400 h-8 w-8'>⤵️ 1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;