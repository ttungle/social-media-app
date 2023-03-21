import { useNavigate } from 'react-router-dom';
import { Avatar } from '../avatar';
import { RxDotFilled } from 'react-icons/rx';
import { BiWorld } from 'react-icons/bi';
import { HiLockClosed } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';

export interface AvatarWithTextProps {
  name: string;
  time?: string;
  src: string;
  alt?: string;
  link?: string;
  privacy?: 'public' | 'private' | 'friends';
  status?: 'active' | 'inactive';
  className?: string;
}

const privacyIcons = {
  public: <BiWorld />,
  private: <HiLockClosed />,
  friends: <FaUserFriends />,
};

export function AvatarWithText(props: AvatarWithTextProps) {
  const { name, time, src, status, privacy, className = '', alt = '', link = '#' } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div className={`flex justify-start items-center ${className}`}>
      <Avatar src={src} alt={alt} link={link} status={status} />
      <div>
        <p className="m-0 p-0 ml-3 cursor-pointer hover:underline text-sm font-medium" onClick={handleClick}>
          {name}
        </p>
        <div className="flex items-center">
          <span className="m-0 p-0 ml-3 text-xs text-gray-400">{time}</span>
          {privacy && (
            <>
              <RxDotFilled style={{ fontSize: '0.3rem', margin: '0px 4px' }} />
              <span className="text-gray-500 text-sm">{privacyIcons[privacy]}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
