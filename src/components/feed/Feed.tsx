import NewPost from './NewPost';
import Post from './Post';

const Feed = () => {
  return (
    <div className='flex flex-1 flex-col gap-6 border border-black'>
      <div className='flex flex-row gap-4'>
        <h1 className='font-medium border-b-2 border-black'>For you</h1>
        <h1>Following</h1>
      </div>
      <NewPost />
      <Post />
    </div>
  );
};

export default Feed;