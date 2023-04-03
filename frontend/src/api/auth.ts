import { AuthenticationResultData, LoginPayloadData, RegisterPayloadData } from '@/models';
import axiosClient from './axios';

export const authApi = {
  register(payload: RegisterPayloadData): Promise<AuthenticationResultData> {
    const url = '/auth/register';
    return axiosClient.post(url, payload);
  },

  login(payload: LoginPayloadData): Promise<AuthenticationResultData> {
    const url = '/auth/login';
    return axiosClient.post(url, payload);
  },

  getUserProfile(): Promise<AuthenticationResultData> {
    const url = '/users/me';
    return axiosClient.get(url);
  },
};
