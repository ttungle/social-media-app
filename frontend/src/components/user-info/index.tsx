import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BsHouseDoorFill } from 'react-icons/bs';
import { MdLocationPin, MdWifi, MdWork } from 'react-icons/md';

interface UserInfo {
  work: string;
  live: string;
  from: string;
  follow: string;
}

export interface UserInfoProps {
  bio?: string;
  userInfo?: UserInfo;
}

export function UserInfo({ bio, userInfo }: UserInfoProps) {
  const { t } = useTranslation('profile');
  return (
    <div className="rounded-lg bg-white p-4">
      <div className="flex justify-between items-center">
        <p className="m-0 text-xl font-semibold">{t('profileTitle')}</p>
        <button className="text-sm text-blue-500 hover:underline">{t('common:button.edit')}</button>
      </div>
      <div>
        <p className="m-0 py-4 text-sm text-center border-b">{bio}</p>

        {userInfo?.work && (
          <div className="flex justify-start items-center text-sm py-2">
            <MdWork className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileWork')}</p>
            <p className="ml-1 font-medium">{userInfo?.work}</p>
          </div>
        )}

        {userInfo?.live && (
          <div className="flex justify-start items-center text-sm py-2">
            <BsHouseDoorFill className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileLive')}</p>
            <p className="ml-1 font-medium">{userInfo?.live}</p>
          </div>
        )}

        {userInfo?.from && (
          <div className="flex justify-start items-center text-sm py-2">
            <MdLocationPin className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileFrom')}</p>
            <p className="ml-1 font-medium">{userInfo?.from}</p>
          </div>
        )}

        {userInfo?.follow && (
          <div className="flex justify-start items-center text-sm py-2">
            <MdWifi className="text-xl text-gray-400" />
            <p className="ml-2">{t('profileFollow')}</p>
            <p className="ml-1 font-medium">{userInfo?.follow}</p>
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
