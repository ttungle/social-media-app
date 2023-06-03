export interface UserData {
  _id: string;
  email: string;
  username: string;
  profilePicture?: string;
  coverPicture?: string;
  followers?: Array<any>;
  followings?: Array<any>;
  bio?: string;
  work?: string;
  city?: string;
  from?: string;
  relationship: 'single' | 'in relationship' | 'married';
  status?: 'active' | 'inactive';
}

export interface UserFriendListResultData {
  status: string;
  data: {
    friends: Array<UserFriendListData>;
  };
}

export interface UserFriendListData {
  id: string;
  username: string;
  profilePicture: string;
  status?: 'active' | 'inactive';
}

export interface FriendProfileResultData {
  status: string;
  data: {
    user: UserData;
  };
}
