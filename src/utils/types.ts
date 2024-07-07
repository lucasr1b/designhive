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
  hive: string[];
}

export interface Post {
  _id: string;
  authorId: string;
  type: string;
  content?: string;
  designFile?: string;
  likes: string[]
  likeCount: number;
  replyCount: number;
  createdAt: Date;
}

export interface PostWithUserData extends Post {
  authorName: string;
  authorUsername: string;
  authorPfp: string;
  initialLiked: boolean;
}

export interface Reply {
  _id: string;
  postId: string;
  authorId: string;
  content: string;
  likes: string[];
  likeCount: number;
  createdAt: Date;
}

export interface ReplyWithUserData extends Reply {
  authorName: string;
  authorUsername: string;
  authorPfp: string;
  initialLiked: boolean;
}

export interface FeedOption {
  key: string;
  label: string;
}
