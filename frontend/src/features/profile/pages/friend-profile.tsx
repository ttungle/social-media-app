import { postApi } from '@/api/post';
import { userApi } from '@/api/user';
import { Feed } from '@/components/common/feed';
import { CoverImage } from '@/components/cover-image';
import { PostSkeleton } from '@/components/skeletons';
import { UserInfo } from '@/components/user-info';
import { PAGE_LIMIT } from '@/constants/common';
import { useInfinityScroll } from '@/hooks/use-infinity-scroll';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

export interface FriendProfilePageProps {}

export default function FriendProfilePage(props: FriendProfilePageProps) {
  const params = useParams();
  const [reload, setReload] = React.useState(false);

  const { lastPost, infiniteQuery } = useInfinityScroll({
    queryKey: ['getFriendPosts', reload, params?.id],
    queryFn: async ({ pageParam = 1 }) =>
      await postApi.getUserTimeline(params?.id!, { page: pageParam, pageSize: PAGE_LIMIT }),
  });

  const { data: postList, isFetchingNextPage, hasNextPage, isLoading } = infiniteQuery;

  const { data: userProfile } = useQuery({
    queryKey: ['getFriendProfile', params.id],
    queryFn: async () => await userApi.getFriendProfile(params?.id!),
    enabled: Boolean(params?.id),
  });

  return (
    <div className="container mx-auto max-w-screen-xl">
      <CoverImage userData={userProfile?.data?.user} isMyProfile={false} />
      <div className="bg-white h-12 w-full shadow rounded-sm"></div>

      <div className="flex flex-nowrap px-9 flex-col xl:flex-row">
        <div className="w-full xl:max-w-[500px] mr-4 mt-4">
          <UserInfo userInfo={userProfile?.data?.user} />
        </div>
        <div className="flex-1">
          {postList?.pages?.map((page, pageIndex) =>
            page?.data?.posts?.map((post, index) => (
              <Feed
                key={post._id}
                ref={
                  postList?.pages?.length - 1 === pageIndex && page?.data?.posts?.length - 2 === index ? lastPost : null
                }
                post={post}
                className="m-0 px-0 w-full"
                refetchFn={() => setReload(!reload)}
              />
            ))
          )}

          {((isFetchingNextPage && hasNextPage) || isLoading) && <PostSkeleton />}
        </div>
      </div>
    </div>
  );
}
