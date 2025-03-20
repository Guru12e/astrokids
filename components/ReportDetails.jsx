"use client";
import { reportDetails } from "@/constant/constant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ReportDetails = () => {
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
    <div
      className='absolute top-[50%] left-[50%] w-full aspect-square'
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {reportDetails.map((report, index) => {
        let angle = (index / reportDetails.length) * 2 * Math.PI;
        let changeAngle = angle + 20;

        let left;
        let top;
        let textLeft;
        let textTop;
        if (isMobile) {
          left = (radius / 3) * Math.cos(changeAngle) - size;
          top = (radius / 3) * Math.sin(changeAngle) - size;

          textLeft = (radius / 3) * Math.cos(changeAngle) - size;
          textTop = (radius / 3) * Math.sin(changeAngle) - size;
        } else {
          left = radius * Math.cos(angle) - 40;
          top = radius * Math.sin(angle) - 40;

          textLeft = radius * Math.cos(changeAngle) - size;
          textTop = radius * Math.sin(changeAngle) - size;
        }

        let align;
        if (isMobile) {
          if (index == 0) {
            textLeft -= 0;
            textTop += 55;
          }

          if (index == 4) {
            textLeft += 0;
            textTop -= 30;
          }
          if (index == 1) {
            textLeft -= 0;
            textTop += 55;
          }

          if (index == 2) {
            textLeft -= 30;
            textTop += 55;
          }

          if (index == 3) {
            textLeft -= 30;
            textTop -= 50;
          }

          if (index == 5) {
            textLeft -= 0;
            textTop -= 30;
          }

          if (index == 6) {
            textTop -= 30;
            textLeft += 0;
          }

          if (index == 7) {
            textLeft += 5;
            textTop += 55;
          }
        } else {
          if (index == 0) {
            textLeft += 140;
          }

          if (index == 4) {
            textLeft += 180;
            textTop -= 20;
          }
          if (index == 1) {
            textLeft -= 240;
            textTop -= 0;
          }

          if (index == 2) {
            textLeft += 30;
            textTop -= 90;
          }

          if (index == 3) {
            textLeft -= 135;
            textTop -= 85;
          }

          if (index == 5) {
            textLeft -= 130;
            textTop += 50;
          }

          if (index == 6) {
            textTop += 80;
            textLeft += 40;
          }

          if (index == 7) {
            textLeft -= 50;
            textTop += 50;
          }
        }

        return (
          <div className='absolute top-[50%] left-[50%]'>
            <div
              className='absolute rounded-full bg-[#D6CEE1] flex justify-center items-center shadow-sm shadow-[#291642]'
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${size + 20}px`,
                height: `${size + 20}px`,
              }}
            >
              <Image src={report.url} width={size} height={size} />
            </div>

            <span
              className='absolute text-black text-[10px] w-20 font-medium xl:text-lg xl:w-40 leading-[1.3] tracking-wide'
              style={{
                left: `${textLeft}px`,
                top: `${textTop}px`,
                textAlign: `${align | "center"}`,
              }}
            >
              {report.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ReportDetails;
