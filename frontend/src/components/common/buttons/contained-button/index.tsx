import * as React from 'react';

export interface ContainedButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function ContainedButton({ children, className }: ContainedButtonProps) {
  return (
    <>
      <button
        className={`flex justify-center items-center py-2 px-2.5 rounded-lg opacity-100 hover:opacity-90 hover:cursor-pointer ${className}`}
      >
        {children}
      </button>
    </>
  );
}
