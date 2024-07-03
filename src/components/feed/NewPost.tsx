'use client';
import { useRef } from 'react';
import Button from '../atomic/Button';

const NewPost = () => {
  const postRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (postRef.current) {
      postRef.current.style.height = 'auto'; // Reset height to auto
      postRef.current.style.height = `${postRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  return (
    <div className='border-2 rounded-xl border-accent-secondary p-4 w-full relative'>
      <div className='flex mb-4'>
        <div className='absolute top-4 left-4'>
          <div className='bg-gray-400 w-10 h-10 rounded-full'></div>
        </div>
        <textarea
          ref={postRef}
          className='text-xl outline-none w-full h-auto max-h-96 resize-none placeholder:text-secondary pl-14 pt-2'
          placeholder="What's happening?"
          onChange={adjustTextareaHeight}
        />

      </div>
      <Button small className='ml-auto'>Post</Button>
    </div>
  );
};

export default NewPost;