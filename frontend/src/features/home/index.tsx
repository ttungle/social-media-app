import { postApi } from '@/api/post';
import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const [reload, setReload] = useState(false);
  const { data: timelinePosts, refetch } = useQuery({
    queryKey: ['getTimelinePosts', reload],
    queryFn: async () => await postApi.getTimelinePost(),
    cacheTime: 0,
  });

  const { mutate } = useMutation({
    mutationKey: ['deleteMyHomePost'],
    mutationFn: async (postId: string) => await postApi.deletePost(postId),
    onSuccess: () => {
      setReload(!reload);
    },
  });

  const handleDeletePost = (postId: string) => {
    mutate(postId);
  };

  return (
    <>
      <CreatePost refetch={refetch} />
      {timelinePosts?.data?.posts.map((post, index) => (
        <Feed key={index} {...post} post={post} refetchFn={() => setReload(!reload)} onDelete={handleDeletePost} />
      ))}
    </>
  );
}
