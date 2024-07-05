import { RiCameraFill, RiCloseLine, RiUploadCloud2Line } from '@remixicon/react';
import Button from '../atomic/Button';
import axios from 'axios';
import { useState } from 'react';
import { User } from '@/utils/types';

type EditProfileModalProps = {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
};

const EditProfileModal = ({ user, onClose, onUpdate }: EditProfileModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    if (profilePicture) {
      formData.append('pfp', profilePicture);
    }

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
        <div className='flex-shrink-0 w-24 h-24 rounded-full overflow-hidden relative'>
          <img src={user.pfp || '/default-pfp.png'} alt={user.name} className='w-full h-full object-cover rounded-full brightness-50' />
          <input type='file' accept='image/*' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10' onChange={(e) => setProfilePicture(e.target.files?.[0] || null)} />
          <div className='absolute inset-0 flex items-center justify-center cursor-pointer'>
            <RiCameraFill className='text-white w-8 h-8' />
          </div>
        </div>
        <div className='flex flex-col gap-2 mb-4'>
          <label htmlFor='fname' className='font-medium'>Name</label>
          <input name='fname' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' defaultValue={user.name} />
          <label htmlFor='username' className='font-medium'>Username</label>
          <input name='username' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' defaultValue={user.username} />
          <label htmlFor='bio' className='font-medium'>Bio</label>
          <textarea name='bio' className='border border-accent-200 rounded-xl p-4 text-sm resize-none' placeholder='Nothing here yet...' defaultValue={user.bio} />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm px-4 pb-4">{error}</p>}
    </form>
  );
};

export default EditProfileModal;