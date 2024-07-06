'use client';
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';

interface ModalProps {
  [key: string]: any;
}

interface ModalContextType {
  openModal: (modalId: string, props: ModalProps) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
  getModalProps: (modalId: string) => any;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openModals, setOpenModals] = useState<Record<string, ModalProps>>({});

  useScrollLock(Object.keys(openModals).length > 0);

  const openModal = useCallback((modalId: string, props: ModalProps) => {
    setOpenModals(prev => ({ ...prev, [modalId]: props }));
  }, []);

  const closeModal = useCallback((modalId: string) => {
    setOpenModals(prev => {
      const newState = { ...prev };
      delete newState[modalId];
      return newState;
    });
  }, []);

  const isModalOpen = useCallback((modalId: string) => {
    return !!openModals[modalId];
  }, [openModals]);

  const getModalProps = useCallback((modalId: string) => {
    return openModals[modalId];
  }, [openModals]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal(Object.keys(openModals)[0]);
      }
    };

    if (Object.keys(openModals).length > 0) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [openModals, closeModal]);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, getModalProps }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};