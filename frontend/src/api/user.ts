import { UserFriendListResultData } from '@/models';
import axiosClient from './axios';

export const userApi = {
  getUserFriendList(userId: string): Promise<UserFriendListResultData> {
    const url = `/users/friends/${userId}`;
    return axiosClient.get(url);
  },
};
