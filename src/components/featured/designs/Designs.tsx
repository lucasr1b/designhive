const Designs = () => {
  return (
    <div className='border-2 rounded-md border-accent-secondary p-6'>
      <h1 className='font-medium text-xl mb-4'>Trending designs</h1>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <div className='relative bg-gray-400 h-64 rounded-lg'>
            <div className='absolute top-4 left-4 flex items-center justify-center h-10 w-10 rounded-full font-medium bg-yellow-500'>1</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='bg-gray-400 h-6 w-6 rounded-full' />
            <span>Lucas Ribeiro</span>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='relative bg-gray-400 h-64 rounded-lg'>
            <div className='absolute top-4 left-4 flex items-center justify-center h-10 w-10 rounded-full font-medium bg-gray-300'>2</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='bg-gray-400 h-6 w-6 rounded-full' />
            <span>Lucas Ribeiro</span>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='relative bg-gray-400 h-64 rounded-lg'>
            <div className='absolute top-4 left-4 flex items-center justify-center h-10 w-10 rounded-full font-medium bg-yellow-700'>3</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div className='bg-gray-400 h-6 w-6 rounded-full' />
            <span>Lucas Ribeiro</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designs;