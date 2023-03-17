import * as React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUserAlt, FaStore } from 'react-icons/fa';
import { BsFillPlayBtnFill } from 'react-icons/bs';
import { MdGroup, MdGroups } from 'react-icons/md';
import { IoLogoGameControllerA } from 'react-icons/io';
import { CgMenuGridO } from 'react-icons/cg';

export interface SideBarProps {
  showMiniBar: boolean;
  groupData?: Array<any>;
}

export function SideBar({ showMiniBar, groupData }: SideBarProps) {
  return (
    <>
      {!showMiniBar && (
        <div className="mr-12 py-6 divide-y pl-5 min-w-[250px]">
          <ul>
            <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
              <AiFillHome style={{ fontSize: '1.25rem', color: '#007def' }} />
              <span className="ml-4 text-sm font-medium">Home</span>
            </li>
            <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
              <FaUserAlt
                style={{
                  fontSize: '1.25rem',
                  fill: 'url(#blue-gradient)',
                }}
              />
              <span className="ml-4 text-sm font-medium">Tung Le</span>
            </li>
          </ul>

          <ul>
            <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
              <BsFillPlayBtnFill style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
              <span className="ml-4 text-sm font-medium">Watch</span>
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
              <MdGroup style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
              <span className="ml-4 text-sm font-medium">Friends</span>
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
              <FaStore style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
              <span className="ml-4 text-sm font-medium">Market Place</span>
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
              <IoLogoGameControllerA style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
              <span className="ml-4 text-sm font-medium">Gaming</span>
            </li>

            <li className="flex items-center justify-start hover:cursor-pointer my-5 ">
              <button className="p-1.5 rounded-full bg-slate-200 ml-[-6px]">
                <CgMenuGridO style={{ fontSize: '1.25rem', fill: 'url(#blue-gradient)' }} />
              </button>
              <span className="ml-2.5 text-sm font-medium">See all</span>
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
                <span className="ml-2.5 text-sm font-medium">See all group</span>
              </li>
            </ul>
          )}
        </div>
      )}

      {showMiniBar && (
        <div className="mr-12 py-6 divide-y px-4 min-w-[20px] border-2">
          <ul className="flex flex-col justify-center items-center">
            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
              <AiFillHome style={{ fontSize: '1.25rem', color: '#007def' }} />
            </li>
            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
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

            <li className="flex items-center justify-start hover:cursor-pointer my-4 ">
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
