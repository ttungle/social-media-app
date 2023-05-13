import { getMediaUrl } from '@/utils';
import clsx from 'clsx';
import React, { useMemo } from 'react';

export interface ImageGalleryProps {
  images: Array<string>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const numberOfImages = useMemo(() => (Array.isArray(images) ? images.length : 0), [images]);

  return (
    <>
      <div className={clsx({ 'grid grid-cols-2 gap-1': numberOfImages >= 2 }, 'w-full')}>
        {[1, 2, 4].includes(numberOfImages) &&
          images.map((image, index) => (
            <img key={index} src={getMediaUrl(image) ?? ''} alt="" className="aspect-square w-full object-cover" />
          ))}

        {numberOfImages === 3 &&
          images.map((image, index) => (
            <React.Fragment key={index}>
              {index === 0 && (
                <img src={getMediaUrl(image) ?? ''} alt="" className="h-full w-full object-cover row-span-2" />
              )}
              {index !== 0 && (
                <img src={getMediaUrl(image) ?? ''} alt="" className="aspect-square w-full object-cover" />
              )}
            </React.Fragment>
          ))}

        {numberOfImages > 4 && (
          <>
            {images.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={getMediaUrl(image) ?? ''}
                alt=""
                className="aspect-square w-full object-cover cursor-pointer"
              />
            ))}

            <div className="relative">
              <img src={getMediaUrl(images[3]) ?? ''} alt="" className="aspect-square w-full object-cover" />
              <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 text-4xl font-medium text-white bg-black opacity-40 cursor-pointer">
                +{images.slice(4).length}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
