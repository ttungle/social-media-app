import { userApi } from '@/api/user';
import { useAuthContext } from '@/context';
import { UserData } from '@/models';
import { getMediaUrl } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillMessage } from 'react-icons/ai';
import { FaUserPlus } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { HiPencil, HiUsers } from 'react-icons/hi';
import { HiCamera } from 'react-icons/hi2';
import { ProfileAvatar } from '../avatar/profile-avatar';
import { ContainedButton } from '../common/buttons/contained-button';

export interface CoverImageProps {
  isMyProfile: boolean;
  userData?: UserData;
  className?: string;
  onEditClick?: () => void;
}

export function CoverImage(props: CoverImageProps) {
  const { isMyProfile, userData, className = '', onEditClick } = props;
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [isFollowing, setIsFollowing] = useState(() => userData?.followers?.includes(user?._id));

  useEffect(() => {
    if (userData?.followers) setIsFollowing(userData?.followers?.includes(user?._id));
  }, [userData]);

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

  const handleEditClick = () => {
    if (!onEditClick) return;
    onEditClick();
  };

  return (
    <div className="mx-auto container">
      <div className={`relative ${className}`}>
        <img src={getMediaUrl(userData?.coverPicture) ?? ''} className="h-[463px] w-full rounded-b-lg object-cover" />
        <div className="absolute top-3/4 left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-black via-transparent rounded-b-lg opacity-70" />
        <ContainedButton className="absolute right-9 bottom-4 z-10 bg-white">
          <HiCamera className="text-2xl text-gray-800" />
          <span className="font-medium text-sm ml-1 text-gray-800">Add cover photo</span>
        </ContainedButton>

        <div className="flex justify-between items-end absolute left-0 -bottom-32 right-0 z-10 px-9">
          <div className="flex justify-center items-center">
            <ProfileAvatar src={getMediaUrl(userData?.profilePicture) ?? ''} className="w-40 h-40" />
            <span className="text-3xl font-semibold text-gray-800 ml-4">{userData?.username}</span>
          </div>

          {isMyProfile && (
            <div className="flex justify-center items-center mb-4">
              <ContainedButton className="bg-primary">
                <FiPlus className="text-lg text-white" />
                <span className="font-medium text-sm ml-1 text-white">Add story</span>
              </ContainedButton>

              <ContainedButton className="bg-gray-300 ml-2">
                <HiPencil className="text-lg" />
                <span onClick={handleEditClick} className="font-medium text-sm ml-1 text-gray-800">
                  Edit profile
                </span>
              </ContainedButton>
            </div>
          )}

          {!isMyProfile && (
            <div className="flex justify-center items-center mb-4">
              <ContainedButton onClick={handleFollowClick} className="bg-primary">
                {isFollowing ? (
                  <HiUsers className="text-xl text-white" />
                ) : (
                  <FaUserPlus className="text-xl text-white" />
                )}
                <span className="font-medium text-sm ml-2 text-white">
                  {isFollowing ? t('button.following') : t('button.follow')}
                </span>
              </ContainedButton>

              <ContainedButton className="bg-gray-300 ml-2">
                <AiFillMessage className="text-xl" />
                <span className="font-medium text-sm ml-2 text-gray-800">Message</span>
              </ContainedButton>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white h-36 w-full"></div>
      <div className="border-t border-gray-300"></div>
    </div>
  );
}
