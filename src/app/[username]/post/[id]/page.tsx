'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PostWithUserData, ReplyWithUserData } from '@/utils/types';
import PostItem from '@/components/feed/post/PostItem';
import ReplyItem from '@/components/post/ReplyItem';
import AppLayout from '@/components/atomic/AppLayout';

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<PostWithUserData | null>(null);
  const [replies, setReplies] = useState<ReplyWithUserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndReplies = async () => {
      if (params.id) {
        try {
          const [postResponse, repliesResponse] = await Promise.all([
            axios.get(`/api/post/${params.id}`),
            axios.get(`/api/post/${params.id}/replies`)
          ]);
          setPost(postResponse.data);
          setReplies(repliesResponse.data);
        } catch (error) {
          console.error('Error fetching post and replies:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPostAndReplies();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <AppLayout>
      <div className='flex flex-1 flex-col gap-6 p-2'>
        <PostItem {...post} />
        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>Replies</h2>
          {replies.map((reply) => (
            <ReplyItem key={reply._id} {...reply} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default PostPage;