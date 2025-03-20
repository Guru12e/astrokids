"use client";
import { parentingQuestion } from "@/constant/constant";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Unique = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [displayIndex, setDisplayIndex] = useState(6);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='px-5 py-10 flex flex-col items-center' id='faqs'>
      <h1 className='text-2xl w-full font-semibold px-10 mb-6 font-customBold text-black text-center '>
        Frequently Asked Questions
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {parentingQuestion.map(
          (report, index) =>
            index < displayIndex && (
              <div
                key={index}
                className={`border h-max rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  openIndex === index ? "bg-[#FFF0EC]" : "bg-white"
                }`}
              >
                <div
                  className='flex justify-between items-center p-4 cursor-pointer'
                  onClick={() => toggleAccordion(index)}
                >
                  <h2 className='text-xl text-gray-800'>{report.ques}</h2>
                  <button className='text-2xl text-gray-600'>
                    {openIndex === index ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </button>
                </div>

                <div
                  className={`px-6 pb-3 text-gray-700 text-base transition-all duration-300 ${
                    openIndex === index ? "block" : "hidden"
                  }`}
                >
                  <p>{report.ans}</p>
                </div>
              </div>
            )
        )}
      </div>
      <button
        className=' px-4 py-2 bg-accent mt-5 rounded-xl text-white'
        onClick={() => {
          if (displayIndex == 9) {
            setDisplayIndex(6);
          } else {
            setDisplayIndex(9);
          }
        }}
      >
        {displayIndex != 9 ? "Show More" : "Show Less"}
      </button>
    </div>
  );
};

export default Unique;
