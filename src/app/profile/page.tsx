'use client';
import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfilePageContent from '@/components/profile/ProfilePageContent';
import AppLayout from '@/components/atomic/AppLayout';

const ProfilePage = () => {
  const { session, sessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.isLoggedIn && !sessionLoading) {
      router.push('/login');
    }
  }, [session, sessionLoading, router]);

  if (sessionLoading || !session?.isLoggedIn || !session.username) return <p>Loading...</p>;

  return (
    <AppLayout>
      <ProfilePageContent username={session.username} isProfileOwner={true} />
    </AppLayout>
  );
};

export default ProfilePage;