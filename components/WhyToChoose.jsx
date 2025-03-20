"use client";
import { whyToChoose } from "@/constant/constant";
import Image from "next/image";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const WhyToChoose = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [displayIndex, setDisplayIndex] = useState(6);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div
      className='text-[#210535] w-screen xl:pb-10 pt-5 relative mx-auto '
      id='whyUs'
    >
      <div className='px-5 xl:px-10 flex flex-col items-center'>
        <div className='text-center px-3 mb-5'>
          <h1 className='text-2xl w-full font-semibold font-customBold capitalize text-center text-gray-800'>
            Top 10 Reasons to buy{" "}
            <span className='block md:inline'>an Astrokids Report</span>
          </h1>
        </div>
        <div className='flex-1 w-full' id='products'>
          <div className='px-5'>
            <div className='w-full px-5'>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
                className='p-2'
              >
                <CarouselContent>
                  {whyToChoose.map((report, index) => (
                    <CarouselItem
                      key={index}
                      className='md:basis-1/2 xl:basis-1/3'
                    >
                      <div className='flex flex-col border border-black p-2 rounded-xl justify-between items-center cursor-pointer'>
                        <Image
                          src={`/images/parenting_${index}.png`}
                          alt='why to choose'
                          width={50}
                          height={50}
                          className='object-contain mb-2'
                        />
                        <h2 className='text-lg font-semibold text-center text-gray-800 px-2'>
                          {report.title}
                        </h2>
                        {/* <div className='w-full flex gap-2'>
                          <Image
                            src={`/images/parenting_${index}.png`}
                            alt='why to choose'
                            width={50}
                            height={50}
                            className='object-contain'
                          />
                          <h2 className='text-xl text-gray-800 px-2'>
                            {report.title}
                          </h2>
                        </div> */}
                        <p className='text-md text-center'>{report.content}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div className='relative bg-gradient-to-b from-[#FED7C3] to-[#FFE9D0] my-7 md:rounded-xl w-full md:w-max mx-auto px-5 flex flex-col justify-center items-center py-2'>
        <div className='flex flex-1 w-full justify-center items-center relative'>
          <div className='w-full md:w-[400px] h-[100px] relative'>
            <Image
              alt='customer'
              src={`/images/customer-group.png`}
              fill
              quality={100}
              priority
              className='object-contain pointer-events-none'
            />
          </div>
        </div>
        <p className='text-lg flex-1 font-customBold xl:text-xl px-5 text-black'>
          Trusted by 10,000+ Super Parents
        </p>
      </div>
    </div>
  );
};

export default WhyToChoose;
