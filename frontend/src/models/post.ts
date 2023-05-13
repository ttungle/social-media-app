import { UserData } from "./user";

export interface PostData {
  _id: string;
  author: UserData;
  description: string;
  images: Array<string>;
  likes: Array<string>;
  comments?: Array<any>;
  shares?: Array<any>;
  createdAt: string;
  updatedAt: string;
  privacy: 'public' | 'friends' | 'onlyMe';
}

export interface TimelinePostResultData {
  status: string;
  data: {
    posts: Array<PostData>;
  };
}
