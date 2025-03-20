import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardCompontent = ({ image, title, link }) => {
  return (
    <Link
      href={`/blogs/${link}`}
      className='embla__slide rounded-lg shadow-md cursor-pointer'
    >
      <div className='w-[100%] aspect-video p-2 relative'>
        <Image
          alt='card-logo'
          src={image}
          fill
          className='pointer-events-none rounded-t-lg'
        />
      </div>
      <div className='mt-5 p-3'>
        <h1 className='text-md leading-[1.2] font-normal xl:text-lg'>
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default CardCompontent;
