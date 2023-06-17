import { UserData } from '@/models';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsHouseDoorFill, BsHeartFill } from 'react-icons/bs';
import { MdLocationPin, MdWifi, MdWork } from 'react-icons/md';

export interface UserInfoProps {
  userInfo?: UserData;
}

export function UserInfo({ userInfo }: UserInfoProps) {
  const { t } = useTranslation('profile');
  const followerNumber = useMemo(() => Array.isArray(userInfo?.followers) && userInfo?.followers?.length, [userInfo]);

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <p className="m-0 text-xl font-semibold">{t('profileTitle')}</p>
      <div>
        <p className="m-0 py-4 text-sm text-center border-b">{userInfo?.bio}</p>

        {userInfo?.work && (
          <div className="flex justify-start items-center text-sm py-2">
            <MdWork className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileWork')}</p>
            <p className="ml-1 font-medium">{userInfo?.work}</p>
          </div>
        )}

        {userInfo?.city && (
          <div className="flex justify-start items-center text-sm py-2">
            <BsHouseDoorFill className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileLive')}</p>
            <p className="ml-1 font-medium">{userInfo?.city}</p>
          </div>
        )}

        {userInfo?.from && (
          <div className="flex justify-start items-center text-sm py-2">
            <MdLocationPin className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileFrom')}</p>
            <p className="ml-1 font-medium">{userInfo?.from}</p>
          </div>
        )}

        {userInfo?.relationship && (
          <div className="flex justify-start items-center text-sm py-2">
            <BsHeartFill className="text-xl text-gray-400" />
            <p className="ml-2 font-medium capitalize">{userInfo?.relationship}</p>
          </div>
        )}

        {Boolean(followerNumber) && (
          <div className="flex justify-start items-center text-sm py-2">
            <MdWifi className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileFollow')}</p>
            <p className="ml-1 font-medium">{followerNumber}</p>
          </div>
        )}

        {!userInfo && (
          <button className="w-full text-center rounded-md py-1.5 text-gray-800 text-sm font-medium bg-gray-300 hover:opacity-80 mt-4">
            Add Profile
          </button>
        )}
      </div>
    </div>
  );
}
