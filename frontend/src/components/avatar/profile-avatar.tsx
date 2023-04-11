import { useNavigate } from 'react-router-dom';
import { HiCamera } from 'react-icons/hi2';
import { getMediaUrl } from '@/utils/common';

export interface ProfileAvatarProps {
  src: string;
  alt?: string;
  link?: string;
  onClick?: () => void;
  className?: string;
}

export function ProfileAvatar(props: ProfileAvatarProps) {
  const { src, alt = '', link = '#', className = '', onClick = null } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (!onClick) navigate(link);
    if (onClick) onClick();
  };

  return (
    <>
      <div className={`${className} relative rounded-full`} onClick={handleClick}>
        <div className="bg-white rounded-full p-1">
          <img
            src={getMediaUrl(src) ?? ''}
            alt={alt}
            className="w-full h-full rounded-full transition object-cover border"
          />
          <span className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-black rounded-full opacity-0 hover:cursor-pointer hover:opacity-10 transition" />
        </div>

        <button className="absolute bottom-0 right-4 p-1.5 bg-gray-300 rounded-full hover:bg-gray-300">
          <HiCamera className="text-2xl text-gray-800" />
        </button>
      </div>
    </>
  );
}
