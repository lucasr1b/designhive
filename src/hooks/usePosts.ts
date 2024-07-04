import { useState, useEffect, useCallback, useRef } from 'react';
import mongoose from 'mongoose';
import { POSTS_PER_PAGE } from '@/utils/constants';
import { Post, PostUserData } from '@/utils/types';
import axios from 'axios';

const usePosts = (feedType: string) => {
  const [posts, setPosts] = useState<PostUserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isInitialMount = useRef(true);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchPosts = useCallback(async (pageToFetch: number) => {
    if (loadingRef.current || !hasMoreRef.current) return;

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Post[]>(`/api/feed/${feedType}?page=${pageToFetch}&limit=${POSTS_PER_PAGE}`);

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const postsWithUserData = await Promise.all(
        data.map(async (post) => {
          if (!mongoose.Types.ObjectId.isValid(post.authorId)) {
            throw new Error('Invalid author ID');
          }

          const { data: userData } = await axios.get(`/api/user/${post.authorId}`);
          return { ...post, authorName: userData.name, authorPfp: userData.pfp };
        })
      );

      setPosts(prevPosts =>
        pageToFetch === 1 ? postsWithUserData : [...prevPosts, ...postsWithUserData]
      );

      setHasMore(data.length === POSTS_PER_PAGE);
      setPage(pageToFetch + 1);
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }, [feedType]);

  useEffect(() => {
    if (!isInitialMount.current) {
      setPosts([]);
      setPage(1);
      setHasMore(true);
      setLoading(false);
      fetchPosts(1);
    } else {
      isInitialMount.current = false;
    }
  }, [feedType, fetchPosts]);

  const loadMore = useCallback(() => {
    if (!loadingRef.current && hasMoreRef.current) {
      fetchPosts(page);
    }
  }, [fetchPosts, page]);

  return { posts, loading, error, loadMore, hasMore };
};

export default usePosts;