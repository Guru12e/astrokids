"use client";
import React, { useState } from "react";
import { caseStudy } from "@/constant/constant";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MobileCaseStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % caseStudy.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + caseStudy.length) % caseStudy.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className='w-screen flex flex-col items-center'>
      <div className='w-[90%] relative aspect-video'>
        <Image
          alt={`case study ${currentIndex} image`}
          src={`/images/casestudy_${currentIndex}.png`}
          fill
          className='object-cover rounded-xl shadow-lg shadow-accent pointer-events-none'
        />
      </div>
      <div className='w-full flex flex-col mt-10 items-center gap-4'>
        <div className='w-full flex flex-col justify-center items-center z-[100]'>
          <h1 className='text-accent text-2xl  font-extrabold text-center'>
            {caseStudy[currentIndex].title}
          </h1>
          <p className='text-black mt-5 text-xl font-semibold text-center'>
            {caseStudy[currentIndex].content}
          </p>
          <p className='text-black mt-5 text-xl font-normal text-center'>
            {caseStudy[currentIndex].subContent}
          </p>
        </div>
      </div>
      <div className='w-full flex items-center my-3'>
        <div>
          <button
            onClick={handlePrev}
            className='p-3 rounded-full text-lg bg-accent text-white'
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className='flex-1 flex justify-center items-center gap-4'>
          {caseStudy.map((content, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-accent" : "bg-white"
              } border border-accent cursor-pointer`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
        <div>
          <button
            onClick={handleNext}
            className='p-3 rounded-full text-lg bg-accent text-white'
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCaseStudy;
