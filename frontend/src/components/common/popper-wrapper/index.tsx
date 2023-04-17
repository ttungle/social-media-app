import React, { useEffect, useRef } from 'react';

export interface PopperWrapperProps {
  refElement: any;
  children: React.ReactNode;
  onClose: () => void;
}

export function PopperWrapper({ refElement, children, onClose }: PopperWrapperProps) {
  const refMenu = useRef<any>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSideBlur);
  }, []);

  const handleClickOutSideBlur = (event: any) => {
    if (refMenu.current && !refMenu.current.contains(event.target)) onClose();
  };

  return (
    <div
      ref={refMenu}
      className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      style={{
        top: refElement?.current.offsetTop,
        left: refElement?.current.offsetLeft,
        transform: 'translate(-80%, 28px)',
      }}
    >
      {children}
    </div>
  );
}
