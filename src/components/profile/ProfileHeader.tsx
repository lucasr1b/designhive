import Button from '../atomic/Button';

const ProfileHeader = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-end justify-between'>
        <div className='bg-gray-400 h-32 w-32 rounded-full' />
        <Button small outline>Edit profile</Button>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-xl'>Lucas Ribeiro</span>
        <span className='text-base-200 text-sm'>@lucascodes</span>
        <span className='my-2'>Founder of DesignHive.</span>
        <div className='flex flex-row gap-4'>
          <span className='text-base-200'><span className='text-black font-semibold'>0</span> following</span>
          <span className='text-base-200'><span className='text-black font-semibold'>0</span> followers</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;