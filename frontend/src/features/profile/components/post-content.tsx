import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';
import { UserInfo } from '@/components/user-info';
import { TimelinePostResultData, UserData } from '@/models';
import { useQueryClient } from '@tanstack/react-query';

export interface PostContentProps {
  user: UserData | undefined;
  timelinePosts: TimelinePostResultData | undefined;
  refetch: () => Promise<any>;
  onDeletePost: (postId: string) => void;
}

export function PostContent(props: PostContentProps) {
  const { user, timelinePosts, refetch, onDeletePost } = props;
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
        {timelinePosts?.data?.posts.map((post, index) => (
          <Feed
            key={post._id}
            {...post}
            post={post}
            onDelete={handleDeletePost}
            className="m-0 px-0 w-full"
            refetchFn={() => queryClient.invalidateQueries({ queryKey: ['getMyPosts'] })}
          />
        ))}
      </div>
    </div>
  );
}
