export const defaultSession = {
  isLoggedIn: false,
};

export interface SessionData {
  _id?: string;
  name?: string;
  email?: string;
  username?: string;
  pfp?: string;
  isLoggedIn: boolean;
}
