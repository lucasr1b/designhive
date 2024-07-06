import { useState } from 'react';
import Button from '../atomic/Button';
import EditProfileModal from './EditProfileModal';
import { User } from '@/utils/types';
import ProfilePicture from '../atomic/ProfilePicture';
import { useModal } from '@/contexts/ModalContext';

type ProfileHeaderProps = {
  user: User;
  isProfileOwner?: boolean;
  follow?: () => void;
  unfollow?: () => void;
  onUpdateUser: (updatedUser: Partial<User>) => void;
};

const ProfileHeader = ({ user, isProfileOwner = false, follow, unfollow, onUpdateUser }: ProfileHeaderProps) => {
  const { openModal } = useModal();

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex items-end justify-between'>
          <ProfilePicture src={user.pfp} className='w-32 h-32' />
          {isProfileOwner ? (
            <Button small outline onClick={() => openModal('editProfile', { user, onUpdateUser })}>Edit profile</Button>
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
      </div>
    </>
  );
};

export default ProfileHeader;