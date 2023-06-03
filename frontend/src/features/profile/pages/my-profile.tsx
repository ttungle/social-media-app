import { postApi } from '@/api/post';
import { userApi } from '@/api/user';
import { Feed } from '@/components/common/feed';
import { CoverImage } from '@/components/cover-image';
import { CreatePost } from '@/components/create-post';
import { UserInfo } from '@/components/user-info';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { EditProfileDialog } from '../components/edit-profile-dialog';

export interface MyProfilePageProps {}

export function MyProfilePage(props: MyProfilePageProps) {
  const [reload, setReload] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const { data: useProfile, refetch: refetchUserProfile } = useQuery({
    queryKey: ['getUserProfile'],
    queryFn: async () => await userApi.getMe(),
  });

  const { data: myTimelinePosts, refetch } = useQuery({
    queryKey: ['getMyPosts', reload],
    queryFn: async () => await postApi.getMyTimeLine(),
    cacheTime: 0,
  });

  const { mutate } = useMutation({
    mutationKey: ['deleteMyPost'],
    mutationFn: async (postId: string) => await postApi.deletePost(postId),
    onSuccess: () => {
      setReload(!reload);
    },
  });

  const { mutate: updateMe } = useMutation({
    mutationKey: ['updateMe'],
    mutationFn: async (payload: any) => userApi.updateMe(payload),
    onSuccess: (data) => {
      refetchUserProfile();
      refetch();
    },
  });

  const handleDeletePost = (postId: string) => {
    mutate(postId);
  };

  const handleEditProfileClick = () => {
    setEditProfileOpen(!isEditProfileOpen);
  };

  const handleCloseEditProfile = () => {
    setEditProfileOpen(false);
  };

  const handleEditProfileSubmit = (values: any, reset: Function) => {
    updateMe(values, {
      onSuccess: () => {
        setEditProfileOpen(false);
        reset();
      },
    });
  };

  return (
    <>
      <div className="container mx-auto max-w-screen-xl">
        <CoverImage userData={useProfile?.data?.user} isMyProfile={true} onEditClick={handleEditProfileClick} />

        <div className="flex flex-nowrap px-9 flex-col xl:flex-row">
          <div className="w-full xl:max-w-[500px] mr-4 mt-4">
            <UserInfo userInfo={useProfile?.data?.user} />
          </div>
          <div className="flex-1">
            <CreatePost className="m-0" refetch={refetch} />
            {myTimelinePosts?.data?.posts.map((post, index) => (
              <Feed
                key={post._id}
                {...post}
                post={post}
                onDelete={handleDeletePost}
                className="m-0 px-0 w-full"
                refetchFn={() => setReload(!reload)}
              />
            ))}
          </div>
        </div>
      </div>

      {isEditProfileOpen && (
        <EditProfileDialog
          userData={useProfile?.data?.user}
          onClose={handleCloseEditProfile}
          onSubmit={handleEditProfileSubmit}
        />
      )}
    </>
  );
}
