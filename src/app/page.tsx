import Sidebar from '@/components/sidebar/Sidebar';
import NewPost from '@/components/feed/NewPost';
import Feed from '@/components/feed/Feed';
import Featured from '@/components/featured/Featured';

const DesignHive = () => {
  return (
    <main className='flex gap-8 w-full min-h-screen px-16 pt-8'>
      <Sidebar />
      <Feed />
      <Featured />
    </main >
  );
}

export default DesignHive;
