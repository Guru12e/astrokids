"use client";
import { lifeCycle } from "@/constant/constant";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MobileLifeCycle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % lifeCycle.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + lifeCycle.length) % lifeCycle.length;
    setCurrentIndex(prevIndex);
  };
  return (
    <section className='py-8 block md:hidden text-black'>
      <div className='w-screen flex flex-col items-center'>
        <h1 className='text-2xl px-10 text-black text-center '>
          Parenting Made Simple and Fulfilling with{" "}
          <span className='text-accent'>AstroKids!</span>
        </h1>
        <div className='w-[70%] mt-10 relative aspect-square'>
          <Image
            alt={`case study ${currentIndex} image`}
            src={`/images/lifecycle${currentIndex + 1}.jpeg`}
            fill
            className='object-cover rounded-xl shadow-lg shadow-accent pointer-events-none'
          />
        </div>
        <div className='w-full flex flex-col mt-10 items-center gap-4'>
          <div className='w-full px-5 flex flex-col justify-center items-center z-[100]'>
            <h1 className='text-accent text-2xl  font-extrabold text-center'>
              {lifeCycle[currentIndex].title} {lifeCycle[currentIndex].sub}
            </h1>
            <p className='text-black mt-5 text-xl font-semibold text-center'>
              {lifeCycle[currentIndex].content}
            </p>
          </div>
        </div>
        <div className='w-full flex items-center py-5 px-10'>
          <div>
            <button
              onClick={handlePrev}
              className='p-3 rounded-full text-lg bg-accent text-white'
            >
              <IoIosArrowBack />
            </button>
          </div>
          <div className='flex-1 flex justify-center items-center gap-4'>
            {lifeCycle.map((content, index) => (
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
    </section>
  );
};

export default MobileLifeCycle;
