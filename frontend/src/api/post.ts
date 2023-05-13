import { TimelinePostResultData } from '@/models';
import axiosClient from './axios';

export const postApi = {
  getTimelinePost(): Promise<TimelinePostResultData> {
    const url = '/posts/timeline';
    return axiosClient.get(url);
  },

  getMyTimeLine(): Promise<TimelinePostResultData> {
    const url = '/posts/myTimeline';
    return axiosClient.get(url);
  },

  getUserTimeline(userId: string): Promise<TimelinePostResultData> {
    const url = `/posts/${userId}/timeline`;
    return axiosClient.get(url);
  },

  createPost(payload: any) {
    const url = '/posts';
    return axiosClient.post(url, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  updatePost(postId: string, payload: any) {
    const url = `/posts/${postId}`;
    return axiosClient.patch(url, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  deletePost(postId: string) {
    const url = `/posts/deleteMyPost/${postId}`;
    return axiosClient.delete(url);
  },

  likePost(postId: string) {
    const url = `/posts/${postId}/like`;
    return axiosClient.put(url);
  },
};
