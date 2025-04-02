"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const CustomCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextRatio, setNextRatio] = useState(80);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setNextRatio(90);
    } else {
      setNextRatio(80);
    }
  });

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full mt-5 md:px-10 mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 gap-2 md:gap-10 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * nextRatio}%)` }}
      ></div>

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

export default CustomCarousel;
