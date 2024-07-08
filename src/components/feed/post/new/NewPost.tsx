'use client';
import { useSession } from '@/contexts/SessionContext';
import { PostWithUserData } from '@/utils/types';
import { RiImageAddLine, RiUserSmileLine } from '@remixicon/react';
import axios from 'axios';
import { useState } from 'react';
import Button from '../../../atomic/Button';
import Tab from '../../../atomic/Tab';
import UploadDesign from './UploadDesign';
import ProfilePicture from '@/components/atomic/ProfilePicture';
import Textarea from '@/components/atomic/Textarea';

type NewPostProps = {
  onPost: (newPost: PostWithUserData) => void;
}

const NewPost = ({ onPost }: NewPostProps) => {
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState<'text' | 'design'>('text');
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);

  const { session } = useSession();

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('type', postType);
    formData.append('content', postContent);

    if (postType === 'design' && designFile) {
      formData.append('designFile', designFile);
    }

    try {
      const { data } = await axios.post('/api/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newPostData: PostWithUserData = {
        ...data,
        authorName: session?.name || '',
        authorUsername: session?.username || '',
        authorPfp: session?.pfp || '',
      };

      onPost(newPostData);
      setPostContent('');
      setDesignFile(null);
      setDesignPreview(null);
    } catch (err: any) {
      console.error('Error creating post:', err.response?.data?.error || err.message);
      // handle error logic
    }
  }

  return (
    <div className='border rounded-xl border-accent-200 w-full p-4 select-none'>
      <div className='flex gap-2 mb-2'>
        <Tab active={postType === 'text'} onClick={() => setPostType('text')}>Text</Tab>
        <Tab active={postType === 'design'} onClick={() => setPostType('design')}>Design</Tab>
      </div>
      <div className='flex w-full px-2 mt-6'>
        <ProfilePicture src={session?.pfp!} />
        <div className='flex flex-col pl-3 pt-2 w-full'>
          <Textarea
            value={postContent}
            onChange={setPostContent}
            className='text-xl outline-none w-full h-auto max-h-96 placeholder:text-base-200'
            placeholder={postType === 'text' ? "What's happening?!" : 'Did I cook?'}
          />
          {postType === 'design' && <UploadDesign setDesignFile={setDesignFile} designPreview={designPreview} setDesignPreview={setDesignPreview} />}
          <div className='flex flex-row gap-6 mt-4'>
            <Button small shadow className='ml-auto' onClick={handlePost} disabled={!postContent.trim()}>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;