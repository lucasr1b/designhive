'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSession } from '@/utils/session';
import { SessionData } from '../utils/types';

type SessionContextType = {
  session: SessionData | null;
  setSession: (session: SessionData | null) => void;
  updateSession: (updatedSession: Partial<SessionData>) => void;
  sessionLoading: boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession().then(() => {
      setSessionLoading(false);
    });
  }, []);

  const updateSession = (updatedSession: Partial<SessionData>) => {
    setSession(prevSession => prevSession ? { ...prevSession, ...updatedSession } : null);
  };

  return (
    <SessionContext.Provider value={{ session, setSession, updateSession, sessionLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};