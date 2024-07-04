import Featured from '@/components/featured/Featured';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfilePosts from '@/components/profile/ProfilePosts';
import Sidebar from '@/components/sidebar/Sidebar';

const ProfilePage = () => {
  return (
    <main className='flex gap-10 w-full min-h-screen px-24 py-8'>
      <Sidebar />
      <div className='flex flex-1 flex-col gap-6 p-4'>
        <ProfileHeader />
        <hr className='border-accent-400'></hr>
        <ProfilePosts />
      </div>
      <Featured />
    </main >
  );
};

export default ProfilePage;