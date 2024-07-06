'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PostWithUserData } from '@/utils/types';
import { useScrollLock } from '@/hooks/useScrollLock';

interface DesignViewContextType {
  openDesignView: (post: PostWithUserData) => void;
  closeDesignView: () => void;
  isDesignViewOpen: boolean;
  currentPost: PostWithUserData | null;
}

const DesignViewContext = createContext<DesignViewContextType | undefined>(undefined);

export const DesignViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDesignViewOpen, setIsDesignViewOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<PostWithUserData | null>(null);

  useScrollLock(isDesignViewOpen);

  const openDesignView = (post: PostWithUserData) => {
    setCurrentPost(post);
    setIsDesignViewOpen(true);
  };

  const closeDesignView = () => {
    setIsDesignViewOpen(false);
    setCurrentPost(null);
  };

  return (
    <DesignViewContext.Provider value={{ isDesignViewOpen, openDesignView, closeDesignView, currentPost }}>
      {children}
    </DesignViewContext.Provider>
  );
};

export const useDesignView = () => {
  const context = useContext(DesignViewContext);
  if (context === undefined) {
    throw new Error('useDesignView must be used within a DesignViewProvider');
  }
  return context;
};