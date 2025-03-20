// components/Carousel.js
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextRatio, setNextRatio] = useState(80);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setCurrentSlide((prev) => (prev + 1) % slides.length);
  //     }, 5000);
  //     return () => clearInterval(timer);
  //   }, [slides.length]);

  // when mobile next ratio is 100

  useEffect(() => {
    if (window.innerWidth < 768) {
      setNextRatio(110);
    } else {
      setNextRatio(80);
    }
  });

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full mt-5 px-10 mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 gap-10 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * nextRatio}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 p-5 relative rounded-xl bg-[#2DB787] max-md:w-[100%] w-[80%]"
          >
            <div className="flex flex-col md:flex-row md:gap-10 max-md:mb-4">
              <div className="w-[260px] max-md:mt-8 mx-auto aspect-square relative rounded-t-2xl rounded-b-none">
                <Image
                  fill
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover rounded-t-2xl rounded-b-none"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <h3 className="text-[30px] font-bold text-white">
                  {slide.title}
                </h3>
                <p className="text-[20px] h-max font-bold bg-[#FFEB3B] leading-[1.3] max-md:py-2 text-black px-3 my-2 rounded-lg">
                  Concern: {slide.concern}
                </p>
                <p className="capitalize text-[20px] font-bold text-white mt-2">
                  <span className="text-[#FFEB3B]">Pro Parenting Plan </span>
                  report revealed:
                </p>
                <ul className="list-disc list-inside marker:text-[#FFEB3B]">
                  {slide.points.map((bullet, index) => (
                    <li
                      key={index}
                      className="text-white text-[20px] leading-[1.5] font-normal"
                    >
                      <span className="text-[#FFEB3B] font-semibold">
                        {bullet.hilight}
                      </span>{" "}
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#FFEB3B] flex flex-col md:flex-row leading-[1.3] text-[20px] justify-end items-end p-3 md:rounded-b-xl md:rounded-tr-xl max-md:rounded-xl">
              <p className="w-full md:w-[80%] font-[500]">{slide.parent}</p>
              <p className="w-full md:w-[20%] max-md:mt-3 text-end font-semibold">
                -{slide.parentName}
              </p>
            </div>
            <div className="absolute top-0 right-0 new-gradient py-1 px-3 rounded-tr-xl rounded-bl-xl">
              Try {slide.title.split("-")[0]} Plan
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 py-2 justify-center mt-5">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-[#2DB787] scale-110" : "bg-[#D9D9D9]"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
