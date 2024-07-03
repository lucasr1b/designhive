import Button from '../atomic/Button';

const Sidebar = () => {
  return (
    <div className='flex flex-col items-start w-56 gap-2 p-4 border border-black'>
      <h1 className='text-2xl font-bold'>DesignHive.</h1>
      <Button>Post</Button>
      <div className='flex flex-col justify-start w-full'>
        <div className='p-2 font-semibold'>🐝 Hive</div>
        <div className='p-2'>⚡️ Inspiration</div>
        <div className='p-2'>🔔 Notifcations</div>
        <div className='p-2'>🙋‍♂️ Profile</div>
        <div className='p-2'>... More</div>
      </div>
    </div>
  );
};

export default Sidebar;