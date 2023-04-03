import clsx from 'clsx';
import * as React from 'react';

export interface DialogActionProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function DialogAction({ children, align = 'right', className }: DialogActionProps) {
  return (
    <div
      className={clsx(
        { 'sm:flex-row-reverse': align === 'right' },
        { 'sm:flex-row': align === 'left' },
        { 'justify-center': align === 'center' },
        'px-4 py-3 sm:flex sm:px-6',
        className
      )}
    >
      {children}
    </div>
  );
}
