import { postApi } from '@/api/post';
import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';
import { UserData } from '@/models';
import { useQuery } from '@tanstack/react-query';

export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const { data: timelinePosts, refetch } = useQuery({
    queryKey: ['getTimelinePosts'],
    queryFn: async () => await postApi.getTimelinePost(),
  });

  return (
    <>
      <CreatePost refetch={refetch} />
      {timelinePosts?.data?.posts.map((post, index) => (
        <Feed key={index} {...post} post={post} />
      ))}
    </>
  );
}
