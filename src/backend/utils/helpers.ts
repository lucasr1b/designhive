import { SessionData } from '@/utils/types';
import mongoose from 'mongoose';

export const isValidSession = (session: SessionData | null): session is SessionData => {
  return session !== null && session.isLoggedIn;
}

export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
}