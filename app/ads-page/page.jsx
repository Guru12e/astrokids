"use client";
import Insights from "@/components/Insights";
import WhyToChoose from "@/components/WhyToChoose";
import Image from "next/image";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import Header from "@/components/Header";
import Link from "next/link";
import Unique from "@/components/Unique";
import Testimonial from "@/components/Testimonial";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

const Home = () => {
  const [display, setDisplay] = useState(true);
  const ageOption = [
    "Parents seeking foundational astrology insights.",
    "Parents who want to understand and nurture their child’s overall well-being.",
    "Parents focused on academic, personal, and career growth.",
    "Parents seeking the most detailed guidance for growth and success.",
  ];

  const router = useRouter();
  return (
    <>
      <Header nav={true} />
      <section className='h-screen w-screen p-0 m-0' id='home'>
        <div className='w-full xl:min-h-[90%] md:px-14 text-black flex justify-center items-center'>
          <div className='w-full pt-8 mt-16 flex flex-col px-4 justify-center items-center xl:flex-row gap-5 font-normal font-customRegular'>
            <div className='flex-1 w-full'>
              <h1 className='text-center tracking-wide leading-[40px] text-2xl md:text-4xl font-[400] capitalize'>
                "
                <span className='font-bold text-accent animate-pulse'>
                  {" "}
                  Empowering
                </span>{" "}
                Parents to Transform Their Children's <br /> Future Through{" "}
                <span className='font-bold text-accent animate-pulse '>
                  Astrology{" "}
                </span>
                "
              </h1>
            </div>
            <div className='flex-1 w-full xl:w-1/2'>
              <div className='px-5'>
                <div className='w-full p-5'>
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
                  >
                    <CarouselContent>
                      {ageOption.map((content, index) => (
                        <CarouselItem key={index}>
                          <div className='flex justify-center flex-col items-center'>
                            <div className='w-[80%] mx-auto relative aspect-square flex items-center xl:w-[400px] md:w-[400px] md:h-[400px] xl:h-[400px]'>
                              <Image
                                alt='hero'
                                src={`/images/book-cover${index}.png`}
                                priority
                                fill
                                className='object-contain shadow-accent transition-all duration-150 pointer-events-none'
                                quality={100}
                              />
                            </div>
                            <p className='text-center text-md max-sm:min-h-[120px] capitalize md:text-xl md:mt-3 font-medium px-6'>
                              <span className='font-bold'>Perfect For: </span>
                              {content}
                            </p>
                            <button
                              className='bg-accent px-4 py-2 text-white mt-3 rounded-lg'
                              onClick={() => {
                                router.push("/products");
                              }}
                            >
                              See Details
                            </button>
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
        </div>
        {/* <ReportFeature /> */}
        {/* <h1 className='relative z-10 text-2xl px-6 xl:text-3xl mt-3 capitalize  text-center text-gray-800 mb-6'>
          Our Mission : Helping parents solve parenting challenges with
          astrology to better understand and support their children.
        </h1> */}
        <AboutUs />
        {/* <LifeCycle /> */}
        {/* <MobileLifeCycle /> */}
        {/* <div className='p-6 bg-gradient-to-r mt-5 from-purple-500 via-pink-500 to-red-500 shadow-xl text-center'>
          <h1 className='text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg'>
            Get a Sneak Peek into Your Child’s Cosmic Journey
          </h1>
          <p className='text-lg md:text-xl text-white/90 mt-3 mb-5'>
            Download a free AstroKids report sample to uncover your child's
            potential and guide their future.
          </p>
          <button
            onClick={() => {
              router.push("/sample-report");
            }}
            className='bg-white animate-pulse uppercase px-6 py-3 rounded-xl text-center'
          >
            Download Sample Report Now
          </button>
        </div> */}
        <WhyToChoose />
        <Unique />
        {/* <CaseStudy /> */}
        <Testimonial />
        {/* <BonusDetails /> */}
        <Insights />
        <div className='p-6 mb-5 text-center'>
          <h1 className='text-3xl capitalize font-semibold tracking-wide drop-shadow-lg'>
            Not Sure where to start ?{" "}
            <span className='block md:inline'> Take our quiz</span>
          </h1>
          <div className='my-6 w-max mx-auto te'>
            <Link
              href={"/Child-Quiz"}
              className='gradient-90 px-4 py-2 text-white rounded-xl'
            >
              Start Quiz
            </Link>
          </div>
        </div>
        <Footer />
        <section
          className={`w-screen py-1 px-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 z-[1000] ${
            display ? "flex" : "hidden"
          } flex-col justify-center items-center text-white fixed bottom-0 left-0`}
        >
          <button className='self-end' onClick={() => setDisplay(false)}>
            <MdCancel size={20} />
          </button>
          <h1 className='text-md text-center capitalize'>
            Not Sure where to start ? Take our quiz
          </h1>
          <Link
            href={"/Child-Quiz"}
            className='bg-white text-black px-6 my-1 rounded-xl animate-pulse whitespace-nowrap inline-block'
          >
            Start Quiz
          </Link>
        </section>
      </section>
    </>
  );
};

export default Home;
