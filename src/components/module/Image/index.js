import React, { useEffect, useState, Suspense } from 'react';
// import cn from "classnames";
// import { Img, useImage } from "react-image";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({ className, height, width, src, alt, wrapperClass, placeHolderImg, placeHolder, imgWrapperClass, srcSet, effect, loading }) => {
  // let transformedImg = imgTransform(src);

  return (
    <>
      {/* <div className={wrapperClass}> */}
      <LazyLoadImage
        className={`${className}`}
        height={height ? height : '100%'}
        width={width ? width : '100%'}
        src={src ?? '/Images/ImagePlaceholder.jpg'}
        effect={effect ? effect : 'blur'}
        wrapperClassName={`${placeHolder ? 'bg-[#f0f0f0]' : ''} ${imgWrapperClass}`}
        alt={alt ? alt : 'img'}
        // loading={loading}
        loading={loading ? loading : 'lazy'}
        // delayTime={300}
      />
      {/* </div> */}
    </>
  );
};

export default Image;

export const imgTransform = url => {
  return url ? url.replace('jp2', 'webp', 'jpeg', 'png', 'jpg', 'PNG') : '';
};

export const imgPlaceHolder = (img, placeholder) => {
  return img ? img : placeholder ? placeholder : 'Image/leaderboard-user-placeholder.svg';
};
export const createImgUrl = img => {
  return URL.createObjectURL(img);
};
