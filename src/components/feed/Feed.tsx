import NewPost from './NewPost';
import Post from './Post';

const Feed = () => {
  return (
    <div className='flex flex-1 flex-col gap-6'>
      <div className='flex flex-row gap-8'>
        <h1 className='relative inline-block font-medium before:absolute before:left-0 before:right-0 before:-bottom-2 before:h-1 before:bg-black before:rounded-full'>
          For you
        </h1>
        <h1 className='font-medium text-secondary cursor-pointer hover:text-black'>
          Following
        </h1>
      </div>
      <NewPost />
      <Post />
    </div>
  );
};

export default Feed;