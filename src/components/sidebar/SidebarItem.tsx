'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
  item: {
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    route: string;
    label: string;
  }
};

const SidebarItem = ({ item }: SidebarItemProps) => {

  const pathname = usePathname()
  const isActive = pathname === item.route;

  return (
    isActive ? (
      <Link className={`flex flex-row gap-2 px-2 py-3 rounded-full cursor-pointer hover:bg-accent`} href={item.route}>
        {item.activeIcon} <span className='font-medium'>{item.label}</span>
      </Link>
    ) : (
      <Link className={`flex flex-row gap-2 px-2 py-3 rounded-full cursor-pointer hover:bg-accent`} href={item.route}>
        {item.icon} <span>{item.label}</span>
      </Link>
    )
  );
};

export default SidebarItem;