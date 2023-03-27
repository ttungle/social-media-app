import { UserData } from './user';

export enum AuthURLList {
  login = '/auth/local',
  register = '/auth/local/register',
}

export interface LoginPayloadData {
  email: string;
  password: string;
}

export interface RegisterPayloadData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthenticationResultData {
  status: string;
  token: string;
  data: {
    user: UserData;
  };
}

// export interface UserData {
//   id: number | string;
//   username: string;
//   email: string;
//   profilePicture: string;
//   coverPicture: string;
//   followers: Array<string>;
//   followings: Array<string>;
//   role: string;
//   updatedAt?: string;
//   createdAt: string;
//   passwordChangeAt?: string;
// }
