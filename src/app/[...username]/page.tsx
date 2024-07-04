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
        setNotFound(true);
        console.error('Error fetching user:', err.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.username]);

  const follow = async () => {
    try {
      await axios.post(`/api/user/${userData._id}/follow`);
      setUserData((prev: any) => ({
        ...prev,
        followerCount: prev.followerCount + 1
      }));
    } catch (err: any) {
      console.error('Error following user:', err.response.data.error);
    }
  }

  const unfollow = async () => {
    try {
      await axios.post(`/api/user/${userData._id}/unfollow`);
      setUserData((prev: any) => ({
        ...prev,
        followerCount: prev.followerCount - 1
      }));
    } catch (err: any) {
      console.error('Error unfollowing user:', err.response.data.error);
    }
  }

  return (
    <main className='flex gap-10 w-full min-h-screen px-24 py-8'>
      <Sidebar />
      <div className='flex flex-1 flex-col gap-6 p-2'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          notFound ? (
            <ProfileDoesNotExist username={params.username} />
          ) : (
            <>
              <ProfileHeader user={userData} isProfileOwner={isProfileOwner} follow={follow} unfollow={unfollow} />
              <hr className='border-accent-400' />
              <ProfilePosts />
            </>
          ))}
      </div>
      <Featured />
    </main>
  );
};

export default UserProfilePage;