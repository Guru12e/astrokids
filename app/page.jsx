"use client";
import EnquiryAutomation from "@/components/EnquiryAutomation";
import Header from "@/components/Header";
import NewFooter from "@/components/NewFooter";
import Section1 from "@/components/Home/Section1";
import Section2 from "@/components/Home/Section2";
import Section3 from "@/components/Home/Section3";
import Section4 from "@/components/Home/Section4";
import Section5 from "@/components/Home/Section5";
import Section6 from "@/components/Home/Section6";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EmblaCarousel from "@/components/ui/EmblaCarousel";
import { ArrowRightIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Section7 from "@/components/Home/Section7";

const NewPage = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <Header />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <EnquiryAutomation />
        <NewFooter />
      </div>
    </>
  );
};

export default NewPage;
