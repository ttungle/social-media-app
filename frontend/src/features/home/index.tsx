import { postApi } from '@/api/post';
import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';
import { PAGE_LIMIT } from '@/constants/common';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const observer = useRef<IntersectionObserver>();
  const queryClient = useQueryClient();

  const refetchTimeLine = async () => await queryClient.invalidateQueries({ queryKey: ['getTimelinePosts'] });

  const {
    data: postList,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getTimelinePosts'],
    queryFn: async ({ pageParam }) => await postApi.getTimelinePost({ page: pageParam, pageSize: PAGE_LIMIT }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      const nextPage = allPages.length + 1;
      return lastPage.data.posts.length !== 0 ? nextPage : undefined;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ['deleteMyHomePost'],
    mutationFn: async (postId: string) => await postApi.deletePost(postId),
    onSuccess: refetchTimeLine,
  });

  useEffect(() => {
    return () => observer?.current?.disconnect();
  }, []);

  const handleDeletePost = (postId: string) => {
    mutate(postId);
  };

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, observer.current]
  );

  const lastPost = useCallback(
    (node: any) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      const option = { threshold: 0 };

      observer.current = new IntersectionObserver(handleObserver, option);
      observer.current.observe(node);
    },
    [hasNextPage]
  );

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

      {isFetchingNextPage && hasNextPage && (
        <div>
          <div className="flex items-center justify-center h-24 w-full p-5 bg-gray-100">
            <div className="flex space-x-2 animate-pulse ">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
