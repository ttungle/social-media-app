import { postApi } from '@/api/post';
import { userApi } from '@/api/user';
import { CoverImage } from '@/components/cover-image';
import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { EditProfileDialog } from '../components/edit-profile-dialog';
import { FriendContent } from '../components/friend-content';
import { PostContent } from '../components/post-content';
import { StatsContent } from '../components/stats-content';

export interface MyProfilePageProps {}

export function MyProfilePage(props: MyProfilePageProps) {
  const [reload, setReload] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [openTab, setOpenTab] = useState(0);

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

  const handleDeletePost = useCallback((postId: string) => {
    mutate(postId);
  }, []);

  const handleEditProfileClick = () => {
    setEditProfileOpen(!isEditProfileOpen);
  };

  const handleCloseEditProfile = () => {
    setEditProfileOpen(false);
  };

  const handleEditProfileSubmit = useCallback((values: any, reset: Function) => {
    updateMe(values, {
      onSuccess: () => {
        setEditProfileOpen(false);
        reset();
      },
    });
  }, []);

  const handleTabClick = (index: number) => {
    setOpenTab(index);
  };

  const TAB_MENUs = [
    {
      label: 'Posts',
      isDefaultActive: true,
      content: (
        <PostContent
          user={useProfile?.data?.user}
          timelinePosts={myTimelinePosts}
          refetch={refetch}
          onDeletePost={handleDeletePost}
        />
      ),
    },
    {
      label: 'Friends',
      isDefaultActive: false,
      content: <FriendContent />,
    },
    {
      label: 'Stats',
      isDefaultActive: false,
      content: <StatsContent />,
    },
  ];

  return (
    <>
      <div className="container mx-auto max-w-screen-xl">
        <CoverImage userData={useProfile?.data?.user} isMyProfile={true} onEditClick={handleEditProfileClick} />

        <div className="bg-white h-12 w-full shadow-sm rounded-sm">
          <ul className={clsx('w-1/3 h-full flex list-none flex-wrap')}>
            {TAB_MENUs.map((item, index) => (
              <li
                key={index}
                className={clsx('flex items-center px-4 text-center border-b-2', {
                  'border-primary': openTab === index,
                  'border-transparent': openTab !== index,
                })}
                onClick={() => handleTabClick(index)}
              >
                <a
                  className={clsx(
                    'mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out',
                    { 'text-primary': openTab === index, 'text-slate-800': openTab !== index }
                  )}
                >
                  <span className="ml-1 text-sm font-medium">{item?.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {TAB_MENUs.map((item, index) => (
          <div
            key={index}
            className={clsx({ 'block opacity-100': openTab === index, 'hidden opacity-0': openTab !== index })}
          >
            {item.content}
          </div>
        ))}
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
