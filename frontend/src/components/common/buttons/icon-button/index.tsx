import * as React from 'react';

export interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function IconButton(props: IconButtonProps) {
  const { children, onClick, className = '' } = props;

  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <button className={`text-gray-100 p-4 ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
}
