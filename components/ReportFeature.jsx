"use client";
import { featureContent, parentingQuestion } from "@/constant/constant";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdSunny } from "react-icons/io";
import { MdUnfoldMore } from "react-icons/md";

const ReportFeature = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const [displayIndex, setDisplayIndex] = useState(6);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className='py-12 px-6 xl:px-16 flex flex-col gap-10 text-black'
      id='unique_features'
    >
      <div className='text-center'>
        <h1 className='text-2xl leading-relaxed '>
          Problems that Parents are Facing Now
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'></div>
    </div>
  );
};

export default ReportFeature;
