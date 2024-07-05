import { useState } from 'react';
import Button from '../atomic/Button';
import EditProfileModal from './EditProfileModal';
import { User } from '@/utils/types';

type ProfileHeaderProps = {
  user: User;
  isProfileOwner?: boolean;
  follow?: () => void;
  unfollow?: () => void;
  onUpdateUser: (updatedUser: Partial<User>) => void;
};

const ProfileHeader = ({ user, isProfileOwner = false, follow, unfollow, onUpdateUser }: ProfileHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleUserUpdate = (updatedUser: Partial<User>) => {
    onUpdateUser(updatedUser);
    toggleModal();
  };

  return (
    <>
      {isModalOpen && <div className='fixed inset-0 w-full h-full z-40 bg-black opacity-50' onClick={toggleModal} />}
      <div className='flex flex-col gap-4'>
        <div className='flex items-end justify-between'>
          <div className='flex-shrink-0 w-32 h-32 rounded-full overflow-hidden'>
            <img src={user.pfp} alt={user.name} className='w-full h-full rounded-full' />
          </div>
          {isProfileOwner ? (
            <Button small outline onClick={toggleModal}>Edit profile</Button>
          ) : user.isFollowing ? (
            <Button small outline onClick={unfollow}>Unfollow</Button>
          ) : (
            <Button small onClick={follow}>Follow</Button>
          )}
        </div>
        <div className='flex flex-col'>
          <span className='font-bold text-xl'>{user.name}</span>
          <span className='text-base-200 text-sm'>@{user.username}</span>
          <span className='my-2'>{user.bio}</span>
          <div className='flex flex-row gap-4'>
            <span className='text-base-200'><span className='text-black font-semibold'>{user.followingCount}</span> following</span>
            <span className='text-base-200'><span className='text-black font-semibold'>{user.followerCount}</span> followers</span>
          </div>
        </div>
        {isModalOpen && (
          <EditProfileModal
            user={user}
            onClose={toggleModal}
            onUpdate={handleUserUpdate}
          />
        )}
      </div>
    </>
  );
};

export default ProfileHeader;