import Sidebar from '@/components/sidebar/Sidebar';
import NewPost from '@/components/feed/NewPost';
import Feed from '@/components/feed/Feed';
import Featured from '@/components/featured/Featured';

const DesignHive = () => {
  return (
    <main className='flex gap-10 w-full min-h-screen px-24 py-8'>
      <Sidebar />
      <Feed />
      <Featured />
    </main >
  );
}

export default DesignHive;
