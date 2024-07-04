import Button from '../atomic/Button';

type ProfileHeaderProps = {
  user: {
    _id: string;
    name: string;
    username: string;
    pfp: string;
    bio: string;
    followerCount: number;
    followingCount: number;
    isFollowing: boolean;
  },
  isProfileOwner?: boolean;
  follow: () => void;
  unfollow: () => void;
};

const ProfileHeader = ({ user, isProfileOwner = false, follow, unfollow }: ProfileHeaderProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-end justify-between'>
        <div className='bg-gray-400 h-32 w-32 rounded-full' />
        {isProfileOwner ? (
          <Button small outline>Edit profile</Button>
        ) : (
          user.isFollowing ? (
            <Button small outline onClick={unfollow}>Unfollow</Button>
          ) : (
            <Button small onClick={follow}>Follow</Button>
          )

        )}
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-xl'>{user.name}</span>
        <span className='text-base-200 text-sm'>@{user.username}</span>
        <span className='my-2'>Founder of DesignHive.</span>
        <div className='flex flex-row gap-4'>
          <span className='text-base-200'><span className='text-black font-semibold'>{user.followingCount}</span> following</span>
          <span className='text-base-200'><span className='text-black font-semibold'>{user.followerCount}</span> followers</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;