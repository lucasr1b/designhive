import { RiCloseFill, RiUploadLine } from '@remixicon/react';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

type UploadDesignProps = {
  setDesignFile: (file: File | null) => void;
  designPreview: string | null;
  setDesignPreview: (preview: string | null) => void;
}

const UploadDesign = ({ setDesignFile, designPreview, setDesignPreview }: UploadDesignProps) => {
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDesignChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setDesignFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesignPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPEG or PNG image.');
    }
  };

  const uploadDesign = () => {
    fileInputRef.current?.click();
  };

  const removeDesign = () => {
    setDesignFile(null);
    setDesignPreview(null);
  }

  return (
    !designPreview ? (
      <div
        id='fileInputInnerWrapper'
        className={`flex w-full border-2 rounded-md mt-3 overflow-hidden group min-h-24 border-dashed transition-colors duration-300 ease-in-out
${dragActive ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 group-hover:border-blue-300'}`}
        onDragEnter={handleFileDrag}
        onDragLeave={handleFileDrag}
        onDragOver={handleFileDrag}
        onDrop={handleFileDrop}
      >
        <div className='w-full flex items-center justify-center'>
          <div id='inputInfo' className='flex flex-row gap-2 items-center'>
            <span>Drag and drop an image or</span>
            <button onClick={uploadDesign} className='flex items-center justify-center bg-accent-100 rounded-full h-10 px-3 hover:bg-accent-400'>
              <RiUploadLine size={16} />
            </button>
            <input ref={fileInputRef} type='file' onChange={handleDesignChange} className='hidden'
            />
          </div>
        </div>
      </div>
    ) : (
      <div className='w-full h-full mt-4 relative'>
        <img src={designPreview} alt='Design preview' className='w-full h-full object-cover rounded-md' />
        <button onClick={removeDesign} className='absolute top-0 right-0 p-1 m-1 bg-accent-100 rounded-full hover:bg-accent-400'>
          <RiCloseFill size={20} />
        </button>
      </div>
    )
  );
};

export default UploadDesign;