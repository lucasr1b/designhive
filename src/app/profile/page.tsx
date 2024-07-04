'use client';
import Featured from '@/components/featured/Featured';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfilePosts from '@/components/profile/ProfilePosts';
import Sidebar from '@/components/sidebar/Sidebar';
import { useSession } from '@/contexts/SessionContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { session, sessionLoading } = useSession();
  const { push } = useRouter();

  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.isLoggedIn && !sessionLoading) {
      push('/login');
    }
  }, [session, sessionLoading, push]);

  useEffect(() => {
    if (session?.isLoggedIn && session.username) {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get(`/api/user/profile/${session.username}`);
          setUserData(data);
        } catch (err: any) {
          console.error('Error fetching user:', err.response.data.error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [session?.isLoggedIn, session?.username]);

  return (
    <main className='flex gap-10 w-full min-h-screen px-24 py-8'>
      <Sidebar />
      <div className='flex flex-1 flex-col gap-6 p-2'>
        {sessionLoading || loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ProfileHeader user={userData} isProfileOwner />
            <hr className='border-accent-400' />
            <ProfilePosts />
          </>
        )}
      </div>
      <Featured />
    </main>
  );
};

export default ProfilePage;