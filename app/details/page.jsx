"use client";
import Privacy from "@/components/Privary";
import Refund from "@/components/Refund";
import TermsCondition from "@/components/TermsCondition";
import { companyDetails } from "@/constant/constant";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const Details = () => {
  const [index, setIndex] = useState(0);
  const router = useSearchParams().get("content") || "";

  const content = [<Privacy />, <TermsCondition />, <Refund />];

  useEffect(() => {
    if (router === "privacy policy") {
      setIndex(0);
    } else if (router.trim() === "terms") {
      setIndex(1);
    } else if (router === "refund policy") {
      setIndex(2);
    }
  }, [router]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='w-screen flex flex-col xl:flex-row bg-primary terms mt-[100px] overflow-hidden'>
        <div className='relative'>
          <div className='p-3 xl:p-10 z-20 text-white xl:h-screen flex items-center justify-center xl:items-start xl:justify-start flex-wrap xl:flex-col gap-2 xl:gap-8'>
            {companyDetails.map((details, i) => (
              <h1
                key={i}
                className={`xl:uppercase xl:text-3xl font-semibold cursor-pointer ${
                  index === i ? "text-accent" : "text-white"
                }`}
                onClick={() => setIndex(i)}
              >
                {details}
              </h1>
            ))}
          </div>
        </div>
        <div className='flex-1 h-full bg-white overflow-y-scroll text-black'>
          <div className='w-full h-full'>{content[index]}</div>
        </div>
      </div>
    </Suspense>
  );
};

export default Details;
