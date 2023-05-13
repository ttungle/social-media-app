import React, { useMemo } from 'react';

export interface TooltipProps {
  children: React.ReactNode;
  message: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function Tooltip(props: TooltipProps) {
    const {children, message, position, className = '' } = props;

    const tooltipPosition = useMemo(() => {
        switch (position) {
            case 'top-left':
                return 'bottom-full left-0';
        
            case 'top-right':
                return 'bottom-full right-0';

            case 'bottom-left':
                return 'top-full left-0';

            case 'bottom-right':
                return 'top-full right-0';

            default:
                return 'top-full left-0';
        }
    }, [position]);

  return (
    <div className="group relative">
      {children}
      <span className={`hidden absolute p-1 px-2 bg-black opacity-60 text-white rounded text-xs group-hover:block whitespace-nowrap ${tooltipPosition} ${className}`}>
        {message}
      </span>
    </div>
  );
}
