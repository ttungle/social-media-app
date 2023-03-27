import * as React from 'react';
import { Avatar } from '../avatar';
import { AvatarWithText } from '../avatar-with-text';

export interface SponsoredBoxProps {}

export function SponsoredBox(props: SponsoredBoxProps) {
  return (
    <div className="pb-4">
      <p className="mb-3 font-medium text-gray-600">Sponsored</p>
      <AvatarWithText name="Pizza" src="https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg" />
      <div className="pl-14">
        <p className="font-normal text-sm text-gray-400 mb-2">This is an description in text</p>
        <img
          className="rounded-lg"
          src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg"
        />
      </div>
    </div>
  );
}
