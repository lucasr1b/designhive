import { RiDashboardFill, RiDashboardLine, RiGalleryView, RiGalleryView2, RiHomeFill, RiHomeLine, RiMoreFill, RiMoreLine, RiNotification4Fill, RiNotification4Line, RiPushpinFill, RiPushpinLine, RiUser6Fill, RiUser6Line } from '@remixicon/react';
import Button from '../atomic/Button';
import SidebarItem from './SidebarItem';

const Sidebar = () => {

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
      icon: <RiMoreLine />,
      activeIcon: <RiMoreFill />,
      route: '',
      label: 'More',
    },
  ]

  return (
    <div className='flex flex-col items-start w-56 gap-2 px-2'>
      <h1 className='text-2xl font-bold ml-4'>DesignHive.</h1>
      <Button large shadow className='mt-8 ml-4'>Post</Button>
      <div className='flex flex-col justify-start w-full mt-4 gap-2'>
        {sidebarItems.map((item, i) => (
          <SidebarItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;