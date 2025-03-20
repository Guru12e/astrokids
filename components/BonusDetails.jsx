import { bonusDetails } from "@/constant/constant";
import { TfiGift } from "react-icons/tfi";
import React from "react";
import Link from "next/link";

const BonusDetails = () => {
  return (
    <div className='px-10 mt-8 mb-5 flex flex-col items-center'>
      <h1 className='text-xl text-black text-center  mb-3'>
        Access <span className='text-accent font-extrabold'>₹25,000</span> Worth
        of Life-Changing Resources—Completely FREE with the AstroKids Report!
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5'>
        {bonusDetails.map((bonus, index) => (
          <div
            key={index}
            className='w-full bg-gradient-to-r text-white from-purple-500 relative via-pink-500 to-red-500 p-5 shadow-xl rounded-xl animate-pulse'
          >
            <div className='w-full h-full bg-whtie animate-pulse -z-10 absolute top-0 left-0'></div>
            <TfiGift size={40} className='text-white z-10' />
            <h1 className='text-xl font-semibold mt-3 z-10'>{bonus.title}</h1>
            <p className='mt-3 leading-[1.5] z-10'>{bonus.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonusDetails;
