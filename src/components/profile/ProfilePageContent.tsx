import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
import { User } from '@/utils/types';
import ProfileDoesNotExist from './ProfileDoesNotExist';
import { useSession } from '@/contexts/SessionContext';

type ProfilePageContentProps = {
  username: string;
  onUsernameChange?: (newUsername: string) => void;
  isProfileOwner: boolean;
};

const ProfilePageContent = ({ username, onUsernameChange, isProfileOwner }: ProfilePageContentProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { updateSession } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/user/profile/${username}`);
        setUser(data);
      } catch (err: any) {
        console.error('Error fetching user:', err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  const follow = async () => {
    if (!user) return;
    try {
      await axios.post(`/api/user/${user._id}/follow`);
      setUser(prev => prev ? { ...prev, followerCount: prev.followerCount + 1, isFollowing: true } : null);
    } catch (err: any) {
      console.error('Error following user:', err.response?.data?.error || err.message);
    }
  };

  const unfollow = async () => {
    if (!user) return;
    try {
      await axios.post(`/api/user/${user._id}/unfollow`);
      setUser(prev => prev ? { ...prev, followerCount: prev.followerCount - 1, isFollowing: false } : null);
    } catch (err: any) {
      console.error('Error unfollowing user:', err.response?.data?.error || err.message);
    }
  };

  const handleUpdateUser = (updatedUser: Partial<User>) => {
    setUser(prevUser => prevUser ? { ...prevUser, ...updatedUser } : null);
    updateSession(updatedUser);
    if (updatedUser.username && updatedUser.username !== username) { // improve logic
      if (onUsernameChange) onUsernameChange(updatedUser.username);
    }
  };

  { if (loading) return <div className='flex flex-1 flex-col gap-6 p-2'>Loading...</div>; }

  return (
    <div className='flex flex-1 flex-col gap-6 p-2'>
      {user ? (
        <>
          <ProfileHeader
            user={user}
            onUpdateUser={handleUpdateUser}
            isProfileOwner={isProfileOwner}
            follow={follow}
            unfollow={unfollow}
          />
          <hr className='border-accent-400' />
          <ProfilePosts userId={user._id} />
        </>
      ) : (
        <ProfileDoesNotExist username={username} />
      )}
    </div>
  );
};

export default ProfilePageContent;