export interface UserData {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: Array<any>;
  followings?: Array<any>;
  status?: 'active' | 'inactive';
}
