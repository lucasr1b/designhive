import { RiCloseLine } from '@remixicon/react';
import Button from '../atomic/Button';
import axios from 'axios';
import { useState } from 'react';
import { User } from '@/utils/types';

type EditProfileModalProps = {
  user: {
    name: string;
    username: string;
    bio: string;
  },
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
};

const EditProfileModal = ({ user, onClose, onUpdate }: EditProfileModalProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.post<User>('/api/user/update', formData);
      onUpdate(response.data);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while updating the profile');
    }
  };

  return (
    <form className='fixed z-50 flex flex-col w-96 h-auto rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white' onSubmit={handleUpdateProfile}>
      <div className='flex flex-row items-center gap-2 py-2 px-2'>
        <button onClick={onClose} className='rounded-full cursor-pointer p-2 hover:bg-accent-100'>
          <RiCloseLine />
        </button>
        <span className='text-lg font-medium'>Edit profile</span>
        <Button type='submit' xsmall className='ml-auto'>Save</Button>
      </div>
      <hr />
      <div className='flex flex-col gap-2 p-4'>
        <div className='bg-gray-400 h-24 w-24 rounded-full' />
        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor='fname'>Name</label>
          <input name='fname' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' defaultValue={user.name} />
          <label htmlFor='username'>Username</label>
          <input name='username' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' defaultValue={user.username} />
          <label htmlFor='bio'>Bio</label>
          <textarea name='bio' className='border border-accent-200 rounded-xl p-4 text-sm resize-none' placeholder='Nothing here yet...' defaultValue={user.bio} />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm px-4 pb-4">{error}</p>}
    </form>
  );
};

export default EditProfileModal;