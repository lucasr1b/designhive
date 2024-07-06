import { RiCloseLine } from '@remixicon/react';

type CloseButtonProps = {
  onClose: (e?: any) => void;
};

const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <button type='button' onClick={(e) => onClose(e)} className='rounded-full cursor-pointer p-2 hover:bg-accent-100'>
      <RiCloseLine size={20} />
    </button>
  );
};

export default CloseButton;