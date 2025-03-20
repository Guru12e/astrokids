"use client";
import { caseStudy } from "@/constant/constant";
import Image from "next/image";
import React, { useState } from "react";

const LaptopCaseStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className='flex w-full'>
      <div className='flex flex-col rounded-l-xl z-[100] justify-center items-end w-[20%] gap-10 py-4 bg-accent'>
        {caseStudy.map((content, index) => (
          <button
            onClick={() => setCurrentIndex(index)}
            key={index}
            className={`py-3 px-5 rounded-l-lg text-lg flex gap-3 ${
              index == currentIndex
                ? "bg-white text-accent"
                : "text-white border border-white shadow-lg"
            } transition-all duration-300`}
          >
            {content.title}
          </button>
        ))}
      </div>
      <div className='flex-1 aspect-video relative'>
        <div className='absolute -z-[110] w-full h-full'>
          <Image
            alt='test'
            src={`/images/casestudy_${currentIndex}.png`}
            fill
            sizes='(min-width: 1024px) 50vw, 100vw'
            className='object-cover rounded-r-xl pointer-events-none'
          />
        </div>
        <div className='absolute w-full h-full -z-[100] bg-gradient-to-r from-white from-10% to-transparent'></div>
        <div className='w-full h-full z-[100] flex flex-col px-8 py-10'>
          <div className='flex-1'>
            <h1 className='mt-5 text-4xl text-accent  w-[50%] font-semibold'>
              {caseStudy[currentIndex].content}
            </h1>
            <p className='text-black mt-5 text-xl w-[50%] font-medium'>
              Impacts:
            </p>
            <p className='text-[#210535]  mt-5 text-xl w-[50%] font-medium'>
              {caseStudy[currentIndex].subContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopCaseStudy;
