'use client';
import { useSession } from '@/contexts/SessionContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfilePageContent from '@/components/profile/ProfilePageContent';
import AppLayout from '@/components/atomic/AppLayout';

const UserProfilePage = ({ params }: { params: { username: string } }) => {
  const { session } = useSession();
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [username, setUsername] = useState(params.username);
  const router = useRouter();

  useEffect(() => {
    setIsProfileOwner(session?.username === username);
  }, [session, username]);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    router.push(`/${newUsername}`);
  };

  return (
    <AppLayout>
      <ProfilePageContent
        username={username}
        isProfileOwner={isProfileOwner}
        onUsernameChange={handleUsernameChange}
      />
    </AppLayout>
  );
};

export default UserProfilePage;