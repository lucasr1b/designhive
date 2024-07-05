'use client';
import { useState, useRef, useCallback } from 'react';
import NewPost from './post/new/NewPost';
import usePosts from '@/hooks/usePosts';
import { PostWithUserData } from '@/utils/types';
import FeedPostItem from './post/FeedPostItem';

const Feed = () => {
  const [activeFeed, setActiveFeed] = useState('forYou');
  const { posts, loading, error, loadMore, hasMore, addNewPost } = usePosts(activeFeed);

  const observer = useRef<IntersectionObserver>();
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  const changeFeed = useCallback((feed: string) => {
    if (feed !== activeFeed) setActiveFeed(feed);
  }, [activeFeed]);

  const handleNewPost = (newPost: PostWithUserData) => {
    addNewPost(newPost);
  };

  const feedButtonClass = (feedType: string) => `
  relative inline-block font-medium cursor-pointer
  ${activeFeed === feedType
      ? 'font-semibold before:absolute before:left-0 before:right-0 before:-bottom-2 before:h-1 before:bg-black before:rounded-full'
      : 'text-base-200 hover:text-black'}
`;

  return (
    <div className='flex flex-1 flex-col gap-6'>
      <div className='flex flex-row gap-8'>
        <h1 className={feedButtonClass('forYou')} onClick={() => changeFeed('forYou')}>For you</h1>
        <h1 className={feedButtonClass('following')} onClick={() => changeFeed('following')}>Following</h1>
      </div>
      <NewPost onPost={handleNewPost} />
      {posts.map((post, index) => (
        <div key={post._id} ref={index === posts.length - 1 ? lastPostElementRef : null}>
          <FeedPostItem post={post} />
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!hasMore && posts.length > 0 && <p>No more posts to load.</p>}
    </div>
  );
};

export default Feed;