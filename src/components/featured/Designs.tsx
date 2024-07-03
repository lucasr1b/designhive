const Designs = () => {
  return (
    <div className='border-2 rounded-md border-border-primary p-6'>
      <h1 className='text-xl mb-4'>Trending designs</h1>
      <div className='flex flex-col gap-4'>
        <div className='bg-gray-400 h-64 rounded-lg'>
          <div className='flex justify-center items-center rounded-full bg-gray-500 w-8 h-8 text-white text-lg'>
            1
          </div>
        </div>
        <div className='bg-gray-400 h-64 rounded-lg'>
          <div className='flex justify-center items-center rounded-full bg-gray-500 w-8 h-8 text-white text-lg'>
            2
          </div>
        </div>
        <div className='bg-gray-400 h-64 rounded-lg'>
          <div className='flex justify-center items-center rounded-full bg-gray-500 w-8 h-8 text-white text-lg'>
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designs;