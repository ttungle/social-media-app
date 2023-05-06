import { userApi } from '@/api/user';
import { ContainedButton } from '@/components/common/buttons/contained-button';
import { useAuthContext } from '@/context';
import { UserData } from '@/models';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FriendAvatar } from './friend-avatar';

export interface UserCardProps {
  userData: UserData;
}

export function UserCard({ userData }: UserCardProps) {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [isFollowing, setIsFollowing] = useState(() => userData?.followers?.includes(user?._id));

  const { mutate: followUser } = useMutation({
    mutationKey: ['followUser'],
    mutationFn: async (userId: string) => await userApi.followUser(userId),
    onSuccess: () => {
      setIsFollowing(true);
    },
  });

  const { mutate: unFollowUser } = useMutation({
    mutationKey: ['unFollowUser'],
    mutationFn: async (userId: string) => await userApi.unFollowUser(userId),
    onSuccess: () => {
      setIsFollowing(false);
    },
  });

  const handleFollowClick = () => {
    if (!isFollowing && userData?._id) followUser(userData?._id);

    if (isFollowing && userData?._id) unFollowUser(userData?._id);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <FriendAvatar src={userData?.profilePicture ?? ''} userId={userData?._id} />
      <div className="px-3 pb-3">
        <p className="mt-1.5 mb-9 font-semibold">{userData?.username}</p>

        <ContainedButton
          onClick={handleFollowClick}
          className="w-full font-medium text-sm bg-blue-50 text-blue-500 mb-1.5 hover:bg-blue-100"
        >
          {isFollowing ? t('button.following') : t('button.follow')}
        </ContainedButton>
        <ContainedButton className="w-full font-medium text-sm bg-gray-200 hover:bg-gray-300">
          {t('button.remove')}
        </ContainedButton>
      </div>
    </div>
  );
}
