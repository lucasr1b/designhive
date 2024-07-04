import { SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: process.env.COOKIE_SECRET as string,
  cookieName: 'SESSION',
  cookieOptions: {
    maxAge: 86400 * 7,
    secure: process.env.NODE_ENV === 'production',
  },
};