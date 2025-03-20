"use client";
import Header from "@/components/Header";
import NewFooter from "@/components/NewFooter";
import NewNavBar from "@/components/NewNavBar";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const BlogsPage = () => {
  const buttons = [
    "Recents",
    "Parenting Tips",
    "Astrology Basics",
    "Ayurveda",
    "Wellness",
    "Success Stories",
  ];
  const [isSelect, setIsSelect] = useState(0);

  return (
    <div>
      <Header />
      <div className="px-5 md:px-16 pt-28 md:pt-32 text-center">
        <h1 className="text-2xl md:text-[40px] font-bold leading-tight capitalize">
          Freebie for better parenting
        </h1>
        <h2 className="text-lg md:text-xl max-w-3xl mx-auto text-[#5E5E5E] mt-4 font-medium leading-[1.4]">
          Discover actionable tips, ancient secrets, and heartwarming stories to
          nurture your child’s brightest potential.
        </h2>

        <div className="flex justify-start md:justify-center mt-8 gap-4 overflow-x-auto whitespace-nowrap px-2 md:px-0">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => setIsSelect(index)}
              className={`px-4 md:px-6 py-2 font-semibold rounded-3xl ${
                isSelect === index
                  ? "bg-[#02030B] text-white"
                  : "text-[#5E5E5E] border border-gray-300 md:border-none"
              }`}
            >
              {button}
            </button>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mt-10">
            <h1 className="text-[#02030B] font-semibold leading-[1.2] text-[24px]">
              Recent Blogs
            </h1>
            <button className="text-[#2DB787] text-[16px] font-semibold flex items-center gap-1">
              View All (16){" "}
              <span>
                <ChevronRight />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center mt-5">
            {Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-full bg-[#F7F7F7] rounded-xl p-5 flex flex-col justify-center items-center"
                >
                  <div className="w-full aspect-video relative rounded-t-xl">
                    <Image
                      src={`/images/new/blog.png`}
                      alt={`blog`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#F2F2F2] px-3 py-2 rounded-b-xl w-full">
                    <h1 className="text-[18px] font-normal leading-[1.2] text-start text-[#9396A3]">
                      Topic Of Interest
                    </h1>
                    <h1 className="text-[#02030B] font-semibold leading-[1.2] text-start my-3 text-[18px]">
                      How to raise a confident child?
                    </h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-10">
            <h1 className="text-[#02030B] font-semibold leading-[1.2] text-[24px]">
              Parenting Tips
            </h1>
            <button className="text-[#2DB787] text-[16px] font-semibold flex items-center gap-1">
              View All (16){" "}
              <span>
                <ChevronRight />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center mt-5">
            {Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-full bg-[#F7F7F7] rounded-xl p-5 flex flex-col justify-center items-center"
                >
                  <div className="w-full aspect-video relative rounded-t-xl">
                    <Image
                      src={`/images/new/blog.png`}
                      alt={`blog`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#F2F2F2] px-3 py-2 rounded-b-xl w-full">
                    <h1 className="text-[18px] font-normal leading-[1.2] text-start text-[#9396A3]">
                      Topic Of Interest
                    </h1>
                    <h1 className="text-[#02030B] font-semibold leading-[1.2] text-start my-3 text-[18px]">
                      How to raise a confident child?
                    </h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-10">
            <h1 className="text-[#02030B] font-semibold leading-[1.2] text-[24px]">
              Astrology Basics
            </h1>
            <button className="text-[#2DB787] text-[16px] font-semibold flex items-center gap-1">
              View All (16){" "}
              <span>
                <ChevronRight />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center mt-5">
            {Array(3)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-full bg-[#F7F7F7] rounded-xl p-5 flex flex-col justify-center items-center"
                >
                  <div className="w-full aspect-video relative rounded-t-xl">
                    <Image
                      src={`/images/new/blog.png`}
                      alt={`blog`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-[#F2F2F2] px-3 py-2 rounded-b-xl w-full">
                    <h1 className="text-[18px] font-normal leading-[1.2] text-start text-[#9396A3]">
                      Topic Of Interest
                    </h1>
                    <h1 className="text-[#02030B] font-semibold leading-[1.2] text-start my-3 text-[18px]">
                      How to raise a confident child?
                    </h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mb-8"></div>
      <NewFooter />
    </div>
  );
};

export default BlogsPage;
