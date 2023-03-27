export interface PostData {
  id: string | number;
  description: string;
  images: Array<string>;
  likes: Array<string>;
  comments?: Array<any>;
  shares?: Array<any>;
}
