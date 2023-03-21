import * as React from 'react';

export interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function IconButton({ children, onClick, style }: IconButtonProps) {
  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <button className="text-gray-100 p-4" onClick={handleClick} style={{ ...style }}>
      {children}
    </button>
  );
}
