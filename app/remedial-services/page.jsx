import Header from "@/components/Header";
import { heroComponent } from "@/constant/constant";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RemedialServices = () => {
  return (
    <div>
      <Header />
      <div className="w-screen min-h-screen flex flex-col md:flex-row gap-5 pt-10 px-5 xl:px-16">
        <div className="w-full max-w-7xl mx-auto grid mt-3 md:mt-5 py-3 grid-cols-2 md:grid-cols-4 gap-0 md:gap-5">
          {heroComponent.map((item, index) => (
            <div key={index} className="flex group flex-col items-center gap-3">
              <div className="w-[60%] mx-auto aspect-square md:aspect-video mt-4 rounded-xl overflow-hidden relative">
                <Image
                  src={`/images/remedies/rem${index + 1}.jpg`}
                  fill
                  className="object-cover rounded-xl"
                  alt="Hero image"
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <h1 className="text-[18px] leading-[1.2] text-center text-[#02030B] font-normal capitalize">
                  {item.title}
                </h1>
                {item.subContent && (
                  <ChevronDown className="ml-2 group-hover:rotate-180 transition-transform duration-200 group-hover:text-[#2DB787] hidden md:block text-[#02030B]" />
                )}
              </div>
              {item.subContent && (
                <div className="mt-2 w-full bg-white z-[100] -translate-y-5 p-2 rounded-xl shadow-xl border border-black hidden group-hover:flex flex-col gap-1">
                  {item.subContent.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={`/remedial-services/${subItem.toLocaleLowerCase()}`}
                      className="text-sm text-gray-600 text-center"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RemedialServices;
