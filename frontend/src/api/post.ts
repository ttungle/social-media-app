import { TimelinePostResultData } from '@/models';
import axiosClient from './axios';
import qs from 'qs';

interface PageParams {
  page: string | number;
  pageSize: string | number;
}

export const postApi = {
  getTimelinePost(queryParams: PageParams): Promise<TimelinePostResultData> {
    const { page = 1, pageSize = 25 } = queryParams;
    const query = qs.stringify({
      page,
      pageSize,
    });

    const url = `/posts/timeline?${query}`;
    return axiosClient.get(url);
  },

  getMyTimeLine(queryParams: PageParams): Promise<TimelinePostResultData> {
    const { page = 1, pageSize = 25 } = queryParams;
    const query = qs.stringify({
      page,
      pageSize,
    });

    const url = `/posts/myTimeline?${query}`;
    return axiosClient.get(url);
  },

  getUserTimeline(userId: string, queryParams: PageParams): Promise<TimelinePostResultData> {
    const { page = 1, pageSize = 25 } = queryParams;
    const query = qs.stringify({
      page,
      pageSize,
    });

    const url = `/posts/${userId}/timeline?${query}`;
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

  postStats(year: string | number) {
    const url = `/posts/stats/${year}`;
    return axiosClient.get(url);
  },
};
