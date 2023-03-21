export interface UserData {
  email: string;
  username: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: Array<any>;
  followings?: Array<any>;
  status?: 'active' | 'inactive';
}
