'use client';
import { useSession } from '@/contexts/SessionContext';
import { PostWithUserData } from '@/utils/types';
import { RiImageAddLine, RiUserSmileLine } from '@remixicon/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import Button from '../../../atomic/Button';
import Tab from '../../../atomic/Tab';
import UploadDesign from './UploadDesign';

type NewPostProps = {
  onPost: (newPost: PostWithUserData) => void;
}

const NewPost = ({ onPost }: NewPostProps) => {
  const postRef = useRef<HTMLTextAreaElement>(null);
  const [postType, setPostType] = useState<'text' | 'design'>('text');
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);

  const { session } = useSession();

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('type', postType);
    formData.append('content', postRef.current?.value || '');

    if (postType === 'design' && designFile) {
      formData.append('designFile', designFile);
    }

    try {
      const { data } = await axios.post('/api/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newPostData: PostWithUserData = {
        ...data,
        authorName: session?.name || '', // is '' needed ??
        authorUsername: session?.username || '',
        authorPfp: session?.pfp || '',
      };

      onPost(newPostData);
      if (postRef.current) {
        postRef.current.value = '';
        adjustTextareaHeight();
      }
      setDesignFile(null);
      setDesignPreview(null);
    } catch (err: any) {
      console.error('Error creating post:', err.response?.data?.error || err.message);
      // handle error logic
    }
  }

  const adjustTextareaHeight = () => {
    if (postRef.current) {
      postRef.current.style.height = 'auto';
      postRef.current.style.height = `${postRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className='border rounded-xl border-accent-200 w-full p-4 select-none'>
      <div className='flex gap-2 mb-2'>
        <Tab active={postType === 'text'} onClick={() => setPostType('text')}>Text</Tab>
        <Tab active={postType === 'design'} onClick={() => setPostType('design')}>Design</Tab>
      </div>
      <div className='flex w-full px-2 mt-6'>
        <div className='flex-shrink-0 w-10 h-10 rounded-full overflow-hidden'>
          <img src={session?.pfp} alt={session?.name} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col pl-3 pt-2 w-full'>
          <textarea
            ref={postRef}
            className='text-xl outline-none w-full h-auto max-h-96 resize-none placeholder:text-base-200'
            placeholder={postType === 'text' ? "What's happening?" : 'Check out my latest design!'}
            onChange={adjustTextareaHeight}
          />
          {postType === 'design' && <UploadDesign setDesignFile={setDesignFile} designPreview={designPreview} setDesignPreview={setDesignPreview} />}
          <div className='flex flex-row gap-6 mt-4'>
            {postType === 'text' && (
              <>
                <span className='text-base-200 cursor-pointer transition hover:text-black'><RiImageAddLine size={20} /></span>
                <span className='text-sm text-base-200 cursor-pointer transition hover:text-black'><RiUserSmileLine size={20} /></span>
              </>
            )}
            <Button small shadow className='ml-auto' onClick={handlePost}>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;