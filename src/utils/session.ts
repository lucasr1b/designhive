'use server';
import { getIronSession } from 'iron-session';
import { SessionData } from './types';
import { sessionOptions } from '../lib/session';
import { cookies } from 'next/headers';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return JSON.parse(JSON.stringify(session));
}

export const getSessionWithMethods = async () => { // get .destroy(), .save(), .config() methods
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};

export async function updateSession(newSessionData: SessionData) {
  const session = await getSessionWithMethods();
  Object.assign(session, newSessionData);
  await session.save();
}