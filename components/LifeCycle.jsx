import { lifeCycle } from "@/constant/constant";
import Image from "next/image";
import React from "react";
import { FaLocationPin } from "react-icons/fa6";

const LifeCycle = () => {
  const colors = [
    "shadow-[#3B566F] hover:shadow-[#3B566F] xl:shadow-[#3B566F]",
    "shadow-[#F92F25] hover:shadow-[#F92F25] xl:shadow-[#F92F25]",
    "shadow-[#F7E96E] hover:shadow-[#F7E96E] xl:shadow-[#F7E96E]",
  ];

  const lifeColors = [
    "bg-[#3B566F]/30 border-[#3B566F]",
    "bg-[#F92F25]/30 border-[#F92F25]",
    "bg-[#F7E96E]/30 border-[#F7E96E]",
  ];

  const color = ["#3B566F", "#F92F25", "#F7E96E"];

  return (
    <section className='py-8 hidden md:block text-black'>
      <h1 className='text-2xl px-10 text-black text-center '>
        Parenting Made Simple and Fulfilling with{" "}
        <span className='text-accent'>AstroKids!</span>
      </h1>
      <div className='flex flex-col xl:flex-row w-screen justify-center items-center gap-10 xl:mb-28 xl:gap-20 mt-10'>
        {lifeCycle.map((content, index) => (
          <div
            className={`w-[80%] xl:w-[25%] aspect-video flex flex-col relative rounded-xl cursor-pointer xl:shadow-md ${
              colors[index]
            } shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ${
              index != 0 && "mt-[calc(60%)] xl:mt-0"
            } ${index == 2 && "mb-[calc(50%)] xl:mb-0"}`}
            key={index}
          >
            <div className='w-full min-h-[110px] flex flex-col justify-center items-center gap-1 text-center px-5 my-2'>
              <h1 className='text-black text-lg  xl:text-2xl font-semibold'>
                <span
                  className={`${lifeColors[index]} relative rounded-s-sm px-1 border-r-2`}
                >
                  {content.title}
                  <FaLocationPin
                    className={`absolute w-[10px] h-3 -right-[6px] -top-3`}
                    color={color[index]}
                  />
                </span>{" "}
                {content.sub}
              </h1>
              <p className='text-black text-center text-sm'>
                {content.content}
              </p>
            </div>

            <div className='w-[80%] absolute -bottom-[110%] left-[50%] -translate-x-[50%] aspect-square'>
              <Image
                alt={`${content.title} `}
                src={`/images/lifecycle${index + 1}.jpeg`}
                fill
                quality={100}
                className={`object-cover rounded-2xl hover:shadow-lg transition-all ${colors[index]} duration-300 pointer-events-none`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeCycle;
