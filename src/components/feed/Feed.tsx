'use client';
import { useState, useRef, useCallback } from 'react';
import NewPost from './post/new/NewPost';
import usePosts from '@/hooks/usePosts';
import { PostWithUserData } from '@/utils/types';
import FeedPostItem from './post/FeedPostItem';
import FeedSlider from '../atomic/FeedSlider';

const Feed = () => {
  const [activeFeed, setActiveFeed] = useState('forYou');
  const { posts, loading, error, loadMore, hasMore, addNewPost } = usePosts(activeFeed);

  const feedOptions = [
    { key: 'forYou', label: 'For you' },
    { key: 'following', label: 'Following' },
  ];

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

  return (
    <div className='flex flex-1 flex-col gap-6'>
      <FeedSlider
        options={feedOptions}
        activeFeed={activeFeed}
        onFeedChange={changeFeed}
      />
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