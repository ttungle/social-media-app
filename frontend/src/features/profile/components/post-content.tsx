import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';
import { PostSkeleton } from '@/components/skeletons';
import { UserInfo } from '@/components/user-info';
import { TimelinePostResultData, UserData } from '@/models';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { forwardRef } from 'react';

export interface PostContentProps {
  user: UserData | undefined;
  timelinePosts: InfiniteData<TimelinePostResultData> | undefined;
  isLoading?: boolean;
  refetch: () => Promise<any>;
  onDeletePost: (postId: string) => void;
}

export const PostContent = forwardRef((props: PostContentProps, ref: any) => {
  const { user, timelinePosts, isLoading, refetch, onDeletePost } = props;
  const queryClient = useQueryClient();

  const handleDeletePost = (postId: string) => {
    if (!onDeletePost) return;

    onDeletePost(postId);
  };

  return (
    <div className="flex flex-nowrap flex-col xl:flex-row">
      <div className="w-full xl:max-w-[500px] mr-4 mt-4 ">
        <UserInfo userInfo={user} />
      </div>
      <div className="flex-1">
        <CreatePost className="m-0" refetch={refetch} />
        {timelinePosts?.pages.map((page, pageIndex) =>
          page?.data?.posts?.map((post, index) => (
            <Feed
              key={post._id}
              ref={
                timelinePosts?.pages?.length - 1 === pageIndex && page?.data?.posts?.length - 2 === index ? ref : null
              }
              post={post}
              onDelete={handleDeletePost}
              className="m-0 px-0 w-full"
              refetchFn={() => queryClient.invalidateQueries({ queryKey: ['getMyPosts'] })}
            />
          ))
        )}

        {isLoading && <PostSkeleton />}
      </div>
    </div>
  );
});
