'use client';
import AppLayout from '@/components/atomic/AppLayout';
import PostItem from '@/components/post/PostItem';
import { PostWithUserData, ReplyWithUserData } from '@/utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

  const addNewReply = (newReply: ReplyWithUserData) => {
    setPost(prevPost => {
      if (prevPost === null) {
        return prevPost;
      }
      return {
        ...prevPost,
        replyCount: prevPost.replyCount + 1
      };
    });
    setReplies(prevReplies => [newReply, ...prevReplies]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <AppLayout>
      <div className='flex flex-1 flex-col gap-2 p-2'>
        <PostItem key={replies.length} post={post} replies={replies} onNewReply={addNewReply} />
      </div>
    </AppLayout>
  );
};

export default PostPage;