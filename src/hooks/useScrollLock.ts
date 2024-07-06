import { useEffect } from 'react';

export const useScrollLock = (lock: boolean) => {

  useEffect(() => {
    if (lock) {
      if (lock) {
        setTimeout(() => {
          document.body.style.overflow = 'hidden';
        }, 0);
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [lock]);
};