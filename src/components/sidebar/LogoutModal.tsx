'use client';
import { logout } from '@/actions/session';
import { useSession } from '@/contexts/SessionContext';
import { RiLogoutBoxLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { RefObject, useEffect, useState } from 'react';

type LogoutModalProps = {
  isModalOpen: boolean;
  profileRef: RefObject<HTMLDivElement>;
  toggleModal: () => void;
};

const LogoutModal = ({ isModalOpen, profileRef, toggleModal }: LogoutModalProps) => {
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const { setSession } = useSession();

  const { push } = useRouter();

  const handleLogout = async () => {
    await logout();
    setSession(null);
    push('/login');
  }

  useEffect(() => {
    if (isModalOpen && profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top - 60,
        left: rect.left
      });
    }
  }, [isModalOpen, profileRef]);

  return (
    <>
      <div className='fixed inset-0 w-full h-full z-40' onClick={toggleModal}></div>
      <div
        style={{
          position: 'fixed',
          top: `${modalPosition.top}px`,
          left: `${modalPosition.left}px`,
        }}
        onClick={handleLogout}
        className='flex items-center gap-2 w-60 h-12 px-4 border border-gray-30 rounded-lg text-left shadow-lg z-50 cursor-pointer hover:bg-gray-100'>
        <RiLogoutBoxLine /> Log out
      </div>
    </>
  );
};

export default LogoutModal;