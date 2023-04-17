import * as React from 'react';

export interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ref?: any;
}

export function IconButton(props: IconButtonProps) {
  const { children, onClick, className = '', ...resProps } = props;

  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <button className={`${className}`} onClick={handleClick} {...resProps}>
      {children}
    </button>
  );
}
