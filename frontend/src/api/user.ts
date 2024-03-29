import { getUsersWithin } from './../../../backend/src/controllers/userController';
import { FriendProfileResultData, UserFriendListResultData } from '@/models';
import qs from 'query-string';
import axiosClient from './axios';

export const userApi = {
  getUserFriendList(userId: string): Promise<UserFriendListResultData> {
    const url = `/users/friends/${userId}`;
    return axiosClient.get(url);
  },

  getFriendProfile(userId: string): Promise<FriendProfileResultData> {
    const url = `/users/${userId}`;
    return axiosClient.get(url);
  },

  getMe(): Promise<FriendProfileResultData> {
    const url = '/users/me';
    return axiosClient.get(url);
  },

  updateMe(payload: any): Promise<FriendProfileResultData> {
    const url = '/users/me';
    return axiosClient.patch(url, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  followUser(userId: string) {
    const url = `/users/${userId}/follow`;
    return axiosClient.put(url);
  },

  unFollowUser(userId: string) {
    const url = `/users/${userId}/unfollow`;
    return axiosClient.put(url);
  },

  getSuggestionFriends(query?: any) {
    const queryString = qs.stringify({
      page: query?.page ?? 1,
      pageSize: query?.pageSize ?? 25,
    });

    const url = `/users/friends?${queryString}`;
    return axiosClient.get(url);
  },

  getUsersWithin(params: any) {
    const { distance, latlng, unit = 'km' } = params;
    const url = `/users/users-within/${distance}/center/${latlng}/unit/${unit}`;

    return axiosClient.get(url);
  },
};
