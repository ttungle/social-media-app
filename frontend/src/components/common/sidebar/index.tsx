import { BASE_ROUTEs } from '@/constants/base-routes';
import { UserData } from '@/models';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPlayBtnFill } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import { FaStore, FaUserAlt } from 'react-icons/fa';
import { IoLogoGameControllerA } from 'react-icons/io';
import { MdGroup, MdGroups } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export interface SideBarProps {
  user: UserData | null;
  showMiniBar: boolean;
  groupData?: Array<any>;
}

export function SideBar({ user, showMiniBar, groupData }: SideBarProps) {
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`${BASE_ROUTEs.profile}/${user?._id}`);
  };

  const handleHomeClick = () => {
    navigate(BASE_ROUTEs.home);
  };

  const handleFriendClick = () => {
    navigate(BASE_ROUTEs.friends);
  };

  return (
    <>
      {!showMiniBar && (
        <>
          <div className="fixed py-6 divide-y pl-5 w-[300px]">
            <ul>
              <li onClick={handleHomeClick} className="flex items-center justify-start hover:cursor-pointer my-5">
                <AiFillHome style={{ fontSize: '1.25rem', color: '#007def' }} />
                <span className="ml-4 text-sm font-medium">{t('sideBar.home')}</span>
              </li>
              <li onClick={handleUserClick} className="flex items-center justify-start hover:cursor-pointer my-5">
                <FaUserAlt
                  style={{
                    fontSize: '1.25rem',
                    fill: 'url(#blue-gradient)',
                  }}
                />
                <span className="ml-4 text-sm font-medium">{user?.username}</span>
              </li>
            </ul>

            <ul>
              <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
                <BsFillPlayBtnFill style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
                <span className="ml-4 text-sm font-medium">{t('sideBar.watch')}</span>
              </li>

              <li onClick={handleFriendClick} className="flex items-center justify-start hover:cursor-pointer my-5 ">
                <MdGroup style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
                <span className="ml-4 text-sm font-medium">{t('sideBar.friend')}</span>
              </li>

              <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
                <FaStore style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
                <span className="ml-4 text-sm font-medium">{t('sideBar.market')}</span>
              </li>

              <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
                <IoLogoGameControllerA style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
                <span className="ml-4 text-sm font-medium">{t('sideBar.gaming')}</span>
              </li>

              <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
                <button className="p-1.5 rounded-full bg-slate-200 ml-[-6px]">
                  <CgMenuGridO style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
                </button>
                <span className="ml-2.5 text-sm font-medium">{t('common:button.seeAll')}</span>
              </li>
            </ul>

            {Array.isArray(groupData) && (
              <ul>
                {groupData.slice(0, 6).map((item, index) => (
                  <li key={index} className="flex items-center justify-start hover:cursor-pointer my-5 ">
                    <img src={item.avatar} alt="group-avatar" className="w-6 h-6 rounded-lg border" />
                    <span className="ml-4 text-sm font-medium">{item.name}</span>
                  </li>
                ))}

                <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
                  <button className="p-1.5 rounded-full bg-slate-200 ml-[-6px]">
                    <MdGroups style={{ fontSize: '1.25rem' }} />
                  </button>
                  <span className="ml-2.5 text-sm font-medium">{t('sideBar.seeAllGroup')}</span>
                </li>
              </ul>
            )}
          </div>
          <div className="w-[300px]"></div>
        </>
      )}

      {showMiniBar && (
        <div className="py-6 divide-y px-4 min-w-[20px] border-2">
          <ul className="flex flex-col justify-center items-center">
            <li onClick={handleHomeClick} className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <AiFillHome style={{ fontSize: '1.25rem', color: '#007def' }} />
            </li>
            <li onClick={handleUserClick} className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <FaUserAlt
                style={{
                  fontSize: '1.25rem',
                  fill: 'url(#blue-gradient)',
                }}
              />
            </li>
          </ul>

          <ul className="flex flex-col justify-center items-center">
            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <BsFillPlayBtnFill style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
            </li>

            <li onClick={handleFriendClick} className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <MdGroup style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <FaStore style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <IoLogoGameControllerA style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <button className="p-1.5 rounded-full bg-slate-200 ml-[-6px]">
                <CgMenuGridO style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
              </button>
            </li>
          </ul>

          <ul className="flex flex-col justify-center items-center">
            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <BsFillPlayBtnFill style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <button className="p-1.5 rounded-full bg-slate-200 ml-[-6px]">
                <CgMenuGridO style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
              </button>
            </li>
          </ul>
        </div>
      )}

      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#4dd4c2" offset="0%" />
          <stop stopColor="#007def" offset="100%" />
        </linearGradient>
      </svg>
    </>
  );
}
