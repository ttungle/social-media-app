import { postApi } from '@/api/post';
import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';
import { PostSkeleton } from '@/components/skeletons';
import { PAGE_LIMIT } from '@/constants/common';
import { useInfinityScroll } from '@/hooks/use-infinity-scroll';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const queryClient = useQueryClient();
  const { lastPost, infiniteQuery } = useInfinityScroll({
    queryKey: ['getTimelinePosts'],
    queryFn: async ({ pageParam = 1 }) => await postApi.getTimelinePost({ page: pageParam, pageSize: PAGE_LIMIT }),
  });

  const { data: postList, isFetchingNextPage, hasNextPage, isLoading } = infiniteQuery;

  const refetchTimeLine = async () => await queryClient.invalidateQueries({ queryKey: ['getTimelinePosts'] });

  const { mutate } = useMutation({
    mutationKey: ['deleteMyHomePost'],
    mutationFn: async (postId: string) => await postApi.deletePost(postId),
    onSuccess: refetchTimeLine,
  });

  const handleDeletePost = (postId: string) => {
    mutate(postId);
  };

  return (
    <>
      <CreatePost refetch={refetchTimeLine} />

      {postList?.pages.map((page, pageIndex) =>
        page?.data?.posts.map((post, index) => (
          <Feed
            key={index}
            ref={postList?.pages.length - 1 === pageIndex && page?.data?.posts.length - 2 === index ? lastPost : null}
            {...post}
            post={post}
            refetchFn={refetchTimeLine}
            onDelete={handleDeletePost}
          />
        ))
      )}

      {((isFetchingNextPage && hasNextPage) || isLoading) && <PostSkeleton />}
    </>
  );
}
