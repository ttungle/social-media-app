import * as React from 'react';
import { BsGiftFill } from 'react-icons/bs';

export interface BirthdayInfoProps {
  content: string;
}

export function BirthdayInfo({ content }: BirthdayInfoProps) {
  return (
    <div className="py-4">
      <p className="text-gray-500 font-semibold">Birthday</p>
      <div className="flex items-center justify-center mt-3">
        <BsGiftFill className="text-2xl text-blue-500" />
        <p className="text-gray-500 text-sm ml-3">{content}</p>
      </div>
    </div>
  );
}
