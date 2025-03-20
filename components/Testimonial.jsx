"use client";
import { testimonials } from "@/constant/constant";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handlePrev = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const displayedTestimonials = isMobile
    ? [testimonials[index]]
    : [testimonials[index], testimonials[(index + 1) % testimonials.length]];

  return (
    <div
      className='bg-[#FFE9D0] p-10 rounded-lg mt-10 w-screen relative'
      id='testimonials'
    >
      <div className='relative w-full'>
        <h2 className='text-3xl font-extrabold text-gray-800 text-center mb-16'>
          Hear from Our <span className='text-accent '>Super Parents</span>
        </h2>

        <div className='grid md:grid-cols-2 gap-16 xl:gap-4 justify-items-center'>
          {displayedTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className='bg-white p-8 rounded-xl shadow-lg relative flex flex-col items-center max-w-sm xl:max-w-xl'
            >
              <div className='absolute -top-10'>
                <Image
                  alt='Happy Parent'
                  src={testimonial.image}
                  width={80}
                  height={80}
                  className='rounded-full border-4 border-accent shadow-md'
                />
              </div>
              <p className='text-gray-600 mt-10 mb-4 text-center'>
                {testimonial.content}
              </p>
              <h4 className='text-lg font-bold text-gray-800'>
                {testimonial.name}
              </h4>
              <span className='text-xs font-medium'>
                <span className='text-accent'>Happy Parent</span> (
                {testimonial.age})
              </span>
            </div>
          ))}
        </div>

        <div className='absolute z-[50] w-full flex items-center top-0 h-full mt-8 cursor-pointer'>
          <button
            className='p-2 bg-white rounded-full absolute -left-5 shadow-md hover:bg-accent hover:text-white transition duration-300'
            onClick={handlePrev}
            aria-label='Previous Testimonial'
          >
            <MdArrowBackIos size={20} />
          </button>
          <button
            className='p-2 bg-white rounded-full absolute -right-5 shadow-md hover:bg-accent hover:text-white transition duration-300'
            onClick={handleNext}
            aria-label='Next Testimonial'
          >
            <MdArrowForwardIos size={20} />
          </button>
        </div>

        <div className='flex justify-center mt-8'>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`h-3 w-3 rounded-full mx-2 transition-all ${
                i === index ? "bg-accent" : "bg-gray-300"
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Go to Testimonial ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
