import Button from '../atomic/Button';

type ProfileHeaderProps = {
  user: {
    name: string;
    username: string;
    pfp: string;
  },
  isProfileOwner?: boolean;
};

const ProfileHeader = ({ user, isProfileOwner = false }: ProfileHeaderProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-end justify-between'>
        <div className='bg-gray-400 h-32 w-32 rounded-full' />
        {isProfileOwner ? (
          <Button small outline>Edit profile</Button>
        ) : (
          <Button small outline>Follow</Button>
        )}
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-xl'>{user.name}</span>
        <span className='text-base-200 text-sm'>@{user.username}</span>
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