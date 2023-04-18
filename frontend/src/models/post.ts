export interface PostData {
  _id: string;
  userId: string;
  description: string;
  images: Array<string>;
  likes: Array<string>;
  comments?: Array<any>;
  shares?: Array<any>;
}

export interface TimelinePostResultData {
  status: string;
  data: {
    posts: Array<PostData>;
  };
}
