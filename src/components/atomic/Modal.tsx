import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import ClickWrapper from '@/components/atomic/ClickWrapper';

interface ModalProps {
  modalId: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({ modalId, children, width = 'auto', height = 'auto' }) => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen(modalId)) return null;

  return (
    <>
      <ClickWrapper onClick={() => closeModal(modalId)} className='fixed inset-0 w-full h-full z-40 bg-black bg-opacity-75' />
      <ClickWrapper className='cursor-auto'>
        <div
          className='fixed z-50 flex flex-col overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          style={{ width, height }}
        >
          {children}
        </div>
      </ClickWrapper>
    </>
  );
};

export default Modal;
