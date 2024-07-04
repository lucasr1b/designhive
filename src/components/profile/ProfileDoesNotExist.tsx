const ProfileDoesNotExist = ({ username }: { username: string }) => {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex items-end justify-between'>
          <div className='bg-gray-400 h-32 w-32 rounded-full' />
        </div>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-xl'>@{username}</span>
        <div className='flex flex-row gap-4'>
          <span className='text-base-200'><span className='text-black font-semibold'>0</span> following</span>
          <span className='text-base-200'><span className='text-black font-semibold'>0</span> followers</span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-xl font-bold'>This account doesn&apos;t exist</span>
        <span className='text-base-200'>Try searching for another.</span>
      </div>
    </>
  );
};

export default ProfileDoesNotExist;