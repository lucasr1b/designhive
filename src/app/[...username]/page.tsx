'use client';
import Featured from '@/components/featured/Featured';
import ProfileDoesNotExist from '@/components/profile/ProfileDoesNotExist';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfilePosts from '@/components/profile/ProfilePosts';
import Sidebar from '@/components/sidebar/Sidebar';
import { useSession } from '@/contexts/SessionContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserProfilePage = ({ params }: { params: { username: string } }) => {
  const { session, sessionLoading } = useSession();

  const [userData, setUserData] = useState<any>({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProfileOwner, setIsProfileOwner] = useState(false);

  useEffect(() => {
    setIsProfileOwner(session?.username === params.username[0]);
  }, [session, sessionLoading, params.username])


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/user/profile/${params.username}`);
        setUserData(data);
      } catch (err: any) {
        setUserData(err.response.data.user);
        setNotFound(true);
        console.error('Error fetching user:', err.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.username]);

  return (
    <main className='flex gap-10 w-full min-h-screen px-24 py-8'>
      <Sidebar />
      <div className='flex flex-1 flex-col gap-6 p-2'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ProfileHeader user={userData} isProfileOwner={isProfileOwner} />
            <hr className='border-accent-400' />
            {notFound ? (
              <ProfileDoesNotExist />
            ) : (
              <ProfilePosts />
            )}
          </>
        )}
      </div>
      <Featured />
    </main>
  );
};

export default UserProfilePage;