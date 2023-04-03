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

export interface AuthContextData {
  user: UserData | null;
  isFirstLoading: boolean;
  register: (payload: RegisterPayloadData) => Promise<void>;
  login: (payload: LoginPayloadData) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

