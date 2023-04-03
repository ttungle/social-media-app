import * as React from 'react';

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <div className="bg-white">
      <div className={`m-0 text-center sm:m-0 sm:text-left ${className}`}>{children}</div>
    </div>
  );
}
