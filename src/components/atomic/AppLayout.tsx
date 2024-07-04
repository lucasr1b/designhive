import Featured from '../featured/Featured';
import Sidebar from '../sidebar/Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <main className='flex gap-10 w-full min-h-screen px-24 py-8'>
    <Sidebar />
    {children}
    <Featured />
  </main>
);

export default Layout;