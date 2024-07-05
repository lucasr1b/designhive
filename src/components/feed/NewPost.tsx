'use client';
import { useRef, useState, ChangeEvent, DragEvent } from 'react';
import Button from '../atomic/Button';
import { RiImageAddLine, RiUploadLine, RiUserSmileLine } from '@remixicon/react';
import Tab from '../atomic/Tab';
import FileUpload from '../atomic/FileUpload';
import axios from 'axios';
import { useSession } from '@/contexts/SessionContext';
import { PostWithUserData } from '@/utils/types';

type NewPostProps = {
  onPost: (newPost: PostWithUserData) => void;
}

const NewPost = ({ onPost }: NewPostProps) => {
  const postRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postType, setPostType] = useState<'text' | 'design'>('text');
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const { session } = useSession();

  const handlePost = async () => {
    const postData = {
      type: postType,
      content: postRef.current?.value,
    };

    try {
      const { data } = await axios.post('/api/post', postData);

      const newPostData: PostWithUserData = {
        ...data,
        authorName: session?.name,
        authorPfp: session?.pfp, // is this good practice?
      };

      onPost(newPostData);
      if (postRef.current) {
        postRef.current.value = '';
        adjustTextareaHeight();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // handle error logic
    }
  }

  const adjustTextareaHeight = () => {
    if (postRef.current) {
      postRef.current.style.height = 'auto';
      postRef.current.style.height = `${postRef.current.scrollHeight}px`;
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setFiles(Array.from(files));
    console.log('Files to upload:', files);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='border rounded-xl border-accent-200 w-full p-4'>
      <div className='flex gap-2 mb-2'>
        <Tab active={postType === 'text'} onClick={() => setPostType('text')}>
          Text
        </Tab>
        <Tab active={postType === 'design'} onClick={() => setPostType('design')}>
          Design
        </Tab>
      </div>
      <div className='flex w-full px-2 mt-6'>
        <div className='flex-shrink-0 w-10 h-10 rounded-full overflow-hidden'>
          <img src={session?.pfp} alt={session?.name} className='w-full h-full object-cover' />
          {/* Loading state */}
        </div>
        <div className='flex flex-col pl-4 pt-2 w-full'>
          <textarea
            ref={postRef}
            className='text-xl outline-none w-full h-auto max-h-96 resize-none placeholder:text-base-200'
            placeholder={postType === 'text' ? "What's happening?" : 'Check out my latest design!'}
            onChange={adjustTextareaHeight}
          />
          {postType === 'design' && (
            <div
              id='fileInputInnerWrapper'
              className={`flex w-full border-2 rounded-md overflow-hidden group min-h-24 border-dashed transition-colors duration-300 ease-in-out
      ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 group-hover:border-blue-300'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className='w-full flex items-center justify-center'>
                <div id='inputInfo' className='flex flex-row gap-2 items-center'>
                  <span>Drag and Drop images or</span>
                  <FileUpload onClick={onButtonClick}>
                    <RiUploadLine size={16} />
                  </FileUpload>
                  <input
                    ref={fileInputRef}
                    type='file'
                    multiple
                    onChange={handleChange}
                    className='hidden'
                  />
                </div>
              </div>
            </div>
          )}
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