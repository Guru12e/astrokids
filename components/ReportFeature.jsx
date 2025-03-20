"use client";
import Image from "next/image";
import ReportDetails from "./ReportDetails";
import { useEffect, useState } from "react";
import { reportDetails } from "@/constant/constant";

const ReportFeature = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(200);
  const [size, setSize] = useState(50);

  useEffect(() => {
    const updateRadius = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (windowWidth <= 768) {
        setRadius(windowWidth / 1.5);
        setSize(30);
        setIsMobile(true);
      } else {
        setRadius(270);
        setSize(50);
        setIsMobile(false);
      }
    };

    updateRadius();

    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <>
      <div className='w-screen h-[300px] xl:h-[450px] z-10 relative '>
        <Image
          src={"/images/vector.png"}
          width={1600}
          height={450}
          className='object-contain'
        />
      </div>
      <div className='text-black w-screen h-full xl:mb-12 relative mx-auto '>
        <div className='z-10 text-center'>
          <h2 className='text-2xl xl:text-4xl font-normal tracking-[6px] xl:tracking-[12px] uppercase xl:mb-8'>
            Report Feature
          </h2>
        </div>
        <div>
          <div className='relative w-screen xl:w-[600px] aspect-square xl:flex xl:justify-center xl:mx-auto'>
            <div className='absolute w-full h-full xl:w-[600px] xl:h-[600px]'>
              <Image
                width={isMobile ? radius - 40 : 600}
                height={isMobile ? radius - 40 : 600}
                style={{ transform: "translate(-50%, -50%)" }}
                src={"/images/reportBg.png"}
                quality={100}
                className='absolute object-contain left-[50%] top-[50%] '
              />
            </div>
            <div
              className='absolute top-[50%] left-[50%] xl:top-0 xl:left-0 w-full xl:w-[600px] xl:h-[600px] aspect-square'
              style={{ transform: isMobile && "translate(-50%, -50%)" }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox={`0 0 ${isMobile ? radius : 600} ${
                  isMobile ? radius : 600
                }`}
                className='absolute aspect-square xl:w-[600px] xl:h-[600px] top-[50%] left-[50%]'
                style={{
                  width: `${isMobile && radius}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <circle
                  cx={`${isMobile ? radius / 2 : 300}`}
                  cy={`${isMobile ? radius / 2 : 300}`}
                  r={`${isMobile ? radius / 3.2 : 260}`}
                  fill='none'
                  stroke='gray'
                  strokeWidth='6'
                  strokeDasharray='20, 20'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox={`0 0 ${isMobile ? radius : 600} ${
                  isMobile ? radius : 600
                }`}
                className='absolute xl:w-[600px] xl:h-[600px] top-[50%] left-[50%]'
                style={{
                  width: `${isMobile && radius}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <defs>
                  <linearGradient
                    id='gradientStroke'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop
                      offset='0%'
                      style={{ stopColor: "#D52EFF", stopOpacity: 1 }}
                    />
                    <stop
                      offset='50%'
                      style={{ stopColor: "#DA0622", stopOpacity: 1 }}
                    />
                    <stop
                      offset='100%'
                      style={{ stopColor: "#FDDF1A", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>

                <circle
                  cx={`${isMobile ? radius / 2 : 300}`}
                  cy={`${isMobile ? radius / 2 : 300}`}
                  r={`${isMobile ? radius / 5 : 200}`}
                  fill='none'
                  stroke='url(#gradientStroke)'
                  strokeWidth='6'
                />
              </svg>
            </div>
            <ReportDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportFeature;
