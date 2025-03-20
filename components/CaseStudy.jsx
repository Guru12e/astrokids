import React from "react";
import LaptopCaseStudy from "./LaptopCaseStudy";
import MobileCaseStudy from "./MobileCaseStudy";

const CaseStudy = () => {
  return (
    <div className='mt-5 px-10' id='caseStudy'>
      <h1 className='text-2xl xl:text-4xl text-center mb-10 '>
        Real Insights, Real Impacts{" "}
        <span className='text-accent'>Astro Kids </span>Case Study
      </h1>
      <div className='hidden xl:flex'>
        <LaptopCaseStudy />
      </div>
      <div className='flex xl:hidden'>
        <MobileCaseStudy />
      </div>
    </div>
  );
};

export default CaseStudy;
