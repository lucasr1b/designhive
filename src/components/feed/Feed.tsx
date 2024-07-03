'use client';
import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';

const Feed = () => {

  const [activeFeed, setActiveFeed] = useState('forYou');

  const changeFeed = (feed: string) => setActiveFeed(feed);

  return (
    <div className='flex flex-1 flex-col gap-6'>
      <div className='flex flex-row gap-8'>
        <h1
          className={`relative inline-block font-medium cursor-pointer ${activeFeed === 'forYou' ? 'font-semibold before:absolute before:left-0 before:right-0 before:-bottom-2 before:h-1 before:bg-black before:rounded-full' : 'text-secondary hover:text-black'}`}
          onClick={() => changeFeed('forYou')}
        >
          For you
        </h1>
        <h1
          className={`relative inline-block font-medium cursor-pointer ${activeFeed === 'following' ? 'font-semibold before:absolute before:left-0 before:right-0 before:-bottom-2 before:h-1 before:bg-black before:rounded-full' : 'text-secondary hover:text-black'}`}
          onClick={() => changeFeed('following')}
        >
          Following
        </h1>
      </div>
      <NewPost />
      <Post />
    </div>
  );
};

export default Feed;