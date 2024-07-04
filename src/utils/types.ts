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

export interface User {
  _id: string;
  name: string;
  username: string;
  pfp: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export interface Post {
  _id: string;
  authorId: string;
  type: string;
  content: string;
  likes: string[]
  likeCount: number;
  replyCount: number;
  createdAt: string;
}

export interface PostUserData extends Post {
  authorName: string;
  authorPfp: string;
  initialLiked: boolean;
}
