import { postApi } from '@/api/post';
import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';
import { UserData } from '@/models';
import { useQuery } from '@tanstack/react-query';

export interface HomePageProps {}

const user: UserData = {
  id: '1',
  email: 'thanhtungle@gmail.com',
  username: 'Fan Page',
  profilePicture: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
};

export function HomePage(props: HomePageProps) {
  const { data: timelinePosts } = useQuery({
    queryKey: ['getTimelinePosts'],
    queryFn: async () => await postApi.getTimelinePost(),
  });

  return (
    <>
      <CreatePost user={user} />
      {timelinePosts?.data?.posts.map((post, index) => (
        <Feed key={post.id} user={user} {...post} post={post} />
      ))}
    </>
  );
}
