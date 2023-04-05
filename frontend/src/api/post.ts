import { TimelinePostResultData } from '@/models';
import axiosClient from './axios';

export const postApi = {
  getTimelinePost(): Promise<TimelinePostResultData> {
    const url = '/posts/timeline';
    return axiosClient.get(url);
  },
  createPost(payload: any) {
    const url = '/posts';
    return axiosClient.post(url, payload);
  },
};
