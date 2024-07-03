const NewPost = () => {
  return (
    <div className='border-2 rounded-md border-border-primary p-4 w-full'>
      <div className='flex flex-row items-center gap-4 mb-4'>
        <div className='bg-gray-400 w-10 h-10 rounded-full'></div>
        <span className='text-xl'>What&apos;s happening?</span>
      </div>
      <div className='flex items-center justify-center rounded-full bg-black text-white h-10 w-28 ml-auto'>
        <div>Post</div>
      </div>
    </div>
  );
};

export default NewPost;