import Featured from '@/components/featured/Featured';
import ProfileHeader from '@/components/profile/ProfileHeader';
import Sidebar from '@/components/sidebar/Sidebar';

const UserProfilePage = () => {
  return (
    <main className='flex gap-10 w-full min-h-screen px-24 py-8'>
      <Sidebar />
      <div className='flex flex-1 flex-col gap-6'>
        <ProfileHeader />
      </div>
      <Featured />
    </main >
  );
};

export default UserProfilePage;