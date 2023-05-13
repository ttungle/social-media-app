import { postApi } from '@/api/post';
import { userApi } from '@/api/user';
import { Feed } from '@/components/common/feed';
import { CoverImage } from '@/components/cover-image';
import { UserInfo } from '@/components/user-info';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export interface FriendProfilePageProps {}

const userInfo = {
  work: 'ABC Company',
  live: 'Ho Chi Minh City',
  from: 'Ho Chi Minh City',
  follow: '1K people',
};

export default function FriendProfilePage(props: FriendProfilePageProps) {
  const params = useParams();
  const [reload, setReload] = React.useState(false);

  const { data: userProfile } = useQuery({
    queryKey: ['getFriendProfile', params.id],
    queryFn: async () => await userApi.getFriendProfile(params?.id!),
    enabled: Boolean(params?.id),
  });

  const { data: timelinePosts } = useQuery({
    queryKey: ['getFriendPosts', reload, params?.id],
    queryFn: async () => await postApi.getUserTimeline(params?.id!),
    cacheTime: 0,
  });

  return (
    <div className="container mx-auto max-w-screen-xl">
      <CoverImage userData={userProfile?.data?.user} isMyProfile={false} />

      <div className="flex flex-nowrap px-9 flex-col xl:flex-row">
        <div className="w-full xl:max-w-[500px] mr-4 mt-4">
          <UserInfo
            bio={
              'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id m'
            }
            userInfo={userInfo}
          />
        </div>
        <div className="flex-1">
          {timelinePosts?.data?.posts.map((post, index) => (
            <Feed
              key={post._id}
              {...post}
              post={post}
              className="m-0 px-0 w-full"
              refetchFn={() => setReload(!reload)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
