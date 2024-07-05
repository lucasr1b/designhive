'use client';
import { RiDashboardFill, RiDashboardLine, RiHomeFill, RiHomeLine, RiLogoutBoxLine, RiLogoutCircleLine, RiMoreFill, RiMoreLine, RiNotification4Fill, RiNotification4Line, RiSettings3Fill, RiSettings3Line, RiUser6Fill, RiUser6Line } from '@remixicon/react';
import Button from '../atomic/Button';
import SidebarItem from './SidebarItem';
import { useSession } from '@/contexts/SessionContext';
import { useState, useEffect, useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';
import LogoutModal from './LogoutModal';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const { session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileRef: RefObject<HTMLDivElement> = useRef(null);

  const handleProfileClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const sidebarItems = [
    {
      icon: <RiHomeLine />,
      activeIcon: <RiHomeFill />,
      route: '/',
      label: 'Home',
    },
    {
      icon: <RiDashboardLine />,
      activeIcon: <RiDashboardFill />,
      route: '/hive',
      label: 'Hive',
    },
    {
      icon: <RiNotification4Line />,
      activeIcon: <RiNotification4Fill />,
      route: '/notifications',
      label: 'Notifications',
    },
    {
      icon: <RiUser6Line />,
      activeIcon: <RiUser6Fill />,
      route: '/profile',
      label: 'Profile',
    },
    {
      icon: <RiSettings3Line />,
      activeIcon: <RiSettings3Fill />,
      route: '/settings',
      label: 'Settings',
    },
  ];

  return (
    <>
      <div className='w-60'>
        <div className='fixed top-0 h-full flex flex-col items-start gap-2 px-2 w-60 py-3'>
          <Link href='/' className='flex flex-row items-center gap-1 ml-4 mt-4'>
            <Image src='/logo.svg' alt='DesignHive Logo' width={50} height={50} />
            <h1 className='text-2xl font-bold'>DesignHive.</h1>
          </Link>
          <Button large shadow className='mt-8 ml-4'>Post</Button>
          <div className='flex flex-col justify-start w-full mt-4 gap-2'>
            {sidebarItems.map((item, i) => (
              <SidebarItem key={i} item={item} />
            ))}
          </div>
          {session && session.isLoggedIn && (
            <div className='w-full mt-auto mb-4' ref={profileRef}>
              <div
                className='flex flex-row items-center gap-2 w-full rounded-full py-2 px-3 cursor-pointer select-none hover:bg-accent-100'
                onClick={handleProfileClick}
              >
                <div className='flex-shrink-0 w-10 h-10 rounded-full overflow-hidden'>
                  <img src={session.pfp} alt={session.name} className='w-full h-full rounded-full' />
                </div>
                <div className='flex flex-col flex-shrink justify-center overflow-hidden'>
                  <span className='font-semibold truncate leading-5'>{session.name}</span>
                  <span className='text-base-200 truncate leading-5'>@{session.username}</span>
                </div>
                <span className='ml-auto flex-shrink-0'><RiMoreFill size={20} /></span>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && createPortal(<LogoutModal isModalOpen={isModalOpen} profileRef={profileRef} toggleModal={handleProfileClick} />, document.body)}
    </>
  );
};

export default Sidebar;