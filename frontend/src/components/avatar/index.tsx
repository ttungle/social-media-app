import { getMediaUrl } from '@/utils/common';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export interface AvatarProps {
  src: string;
  alt?: string;
  link?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  status?: 'active' | 'inactive';
}

export function Avatar(props: AvatarProps) {
  const { src, alt = '', link = '#', status, style, onClick = null } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (!onClick) navigate(link);
    if (onClick) onClick();
  };

  return (
    <>
      <div className="relative w-10 h-10 bg-gray-900 rounded-full" onClick={handleClick} style={{ ...style }}>
        <img
          src={getMediaUrl(src) ?? ''}
          alt={alt}
          className="w-full h-full rounded-full cursor-pointer hover:opacity-90 transition object-cover"
        />

        {status && (
          <span
            className={clsx('absolute bottom-0 right-0 w-3 h-3 rounded-full', {
              'bg-green-500': status === 'active',
              'bg-gray-400': status === 'inactive',
              'border-2 border-white': status,
            })}
          ></span>
        )}
      </div>
    </>
  );
}
