"use client";
import Carousel from "@/components/Carousel";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import Header from "@/components/Header";
import NewFooter from "@/components/NewFooter";
import NewNavBar from "@/components/NewNavBar";
import { ArrowRightIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCirclePlay, FaXmark } from "react-icons/fa6";

const NewPage = () => {
  const shapes = [
    "rounded-full",
    "rounded-tl-full rounded-tr-full",
    "rounded-xl",
    "rounded-full",
  ];

  const steps = [
    {
      title: "Select Your Plan",
      image: "/images/new/step1.png",
    },
    {
      title: "Share Birth Details",
      image: "/images/new/step2.png",
    },
    {
      title: "Receive Cosmic Insights",
      image: "/images/new/step3.png",
    },
  ];

  const plans = [
    {
      title: "Starter Parenting",
      price: "199",
      content: "Foundational astrology insights for new parents.",
    },
    {
      title: "Pro Parenting",
      price: "499",
      content: "Nurture your child's cosmic well-being with deeper insights.",
    },
    {
      title: "Ultimate Parenting",
      price: "999",
      content: "Academic, personal, and celestial growth for young minds.",
    },
    {
      title: "Master Parenting",
      price: "1499",
      content: "The ultimate roadmap for astrological success!",
    },
  ];

  const blogs = [
    "5-Minute Bedtime Yoga for Kids (Free Routine)",
    "The Secret to Raising Confident Kids: Aligning Parenting Styles with Their Zodiac Sign",
    "Pancha Bhoota Diet Cheat Sheet",
    "Decode Your Child's Birth Chart in 3 Steps",
    "Ayurvedic Remedies for Hyperactive Kids",
  ];

  const slides = [
    {
      image: "/images/new/test1.png",
      title: "Aarav - Age 8",
      concern: "Bedtime tantrums",
      points: [
        {
          hilight: "Dominant Earth Element:",
          text: "Made him crave routine but resist sudden changes.",
        },
        {
          hilight: "Blocked Heart Chakra:",
          text: "Caused nighttime separation anxiety.",
        },
      ],
      parent:
        "Within 2 months, Aarav's teacher called him 'the most improved student!' Now, we bond over bedtime star-gazing instead of bedtime battles.",
      parentName: "Neha (Mom)",
    },
    {
      image: "/images/new/test2.png",
      title: "Vihaan - Age 4",
      concern: "struggled with focus & anger outbursts",
      points: [
        {
          hilight: "Morning yoga poses",
          text: "to channel his energy.",
        },
        {
          hilight: "Ayurvedic snacks",
          text: "to cool his fiery temper.",
        },
        {
          hilight: "Moon phase-based study schedules",
          text: "to boost focus.",
        },
      ],
      parent:
        "Now, bedtime is our bonding time. Last week, he even said, Papa, let's look at MY stars!",
      parentName: "Rajesh (Dad)",
    },
    {
      image: "/images/new/test3.png",
      title: "Meera - Age 6",
      concern: "Quiet child & she'd cry during group activities.",
      points: [
        {
          hilight: "Ayurvedic herbal teas",
          text: "to calm her digestion.",
        },
        {
          hilight: "Storytelling exercises",
          text: "aligned with her Nakshatra strengths.",
        },
      ],
      parent:
        "Within 6 weeks, Meera volunteered for a school play! Now, she's the 'class storyteller' — and I finally understand how to nurture her quiet strength.",
      parentName: "Priya (Mom)",
    },
  ];

  const [isVideoPlay, setIsVedioPlay] = useState(false);
  const [imageIndex, setImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev === 5 ? 1 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
      <div className="w-screen h-screen">
        <div className="w-screen h-screen overflow-hidden relative">
          <Image
            src={`/images/new/hero${imageIndex}.png`}
            fill
            className="object-cover mt-16"
            alt="Hero image"
          />
        </div>
        <div className="absolute top-0 text-white w-screen h-screen flex flex-col gap-6 justify-center items-center">
          <h1 className="italic text-center leading-[1.2] font-semibold text-[40px] px-3 md:text-[48px]">
            Nurturing <span className="text-[#FFEB3B]">Happy</span> &{" "}
            <span className="text-[#2DB787]">Confident</span> Kids <br />
            Holisticallys
          </h1>
          <div className="flex flex-col md:flex-row gap-5">
            <button className="relative flex items-center justify-between gap-2 p-0.5 font-bold text-black bg-white rounded-full transition-all overflow-hidden group hover:bg-transparent">
              <div className="absolute right-0.5 w-8 h-8 transition-all duration-300 ease-in-out rounded-full z-10 new-gradient group-hover:w-full group-hover:h-full group-hover:right-0"></div>

              <span className="px-2 z-20 transition-colors duration-300 ease-in-out group-hover:text-white">
                Discover Your Child Plan
              </span>

              <ArrowRightIcon
                className="z-20 text-white transition-all duration-300 ease-in-out group-hover:-rotate-45"
                size={30}
              />
            </button>

            <button
              className="px-3 py-1 flex gap-2 justify-center border border-white bg-white/10 items-center text-white font-bold rounded-full transition-all"
              onClick={() => setIsVedioPlay(true)}
            >
              <FaRegCirclePlay className="font-normal" />
              <span>What is Astrokids.ai?</span>
            </button>
          </div>
        </div>
        {isVideoPlay && (
          <div className="fixed px-3 inset-0 bg-[#02030B]/60 flex flex-col z-[1100] gap-5 items-center justify-center">
            <button
              className="p-2 mx-auto bg-white rounded-full"
              onClick={() => setIsVedioPlay(false)}
            >
              <FaXmark size={30} />
            </button>
            <div className="relative">
              <CustomVideoPlayer />
            </div>
          </div>
        )}
      </div>
      <div className="p-5 md:p-10">
        <h1 className="text-[40px] font-semibold leading-[1.2] text-center capitalize">
          What parents say
        </h1>
        <div className="flex w-full flex-col md:flex-row justify-around gap-10 py-10">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-[60%] mx-auto md:w-[20%] ${
                index % 2 === 0 ? "bg-[#2DB787]" : "bg-[#FFEB3B]"
              } ${
                shapes[index]
              } aspect-square overflow-hidden relative cursor-pointer group`}
            >
              <div className="absolute inset-0 transition-transform duration-500 group-hover:translate-y-full">
                <Image
                  src={`/images/new/say${index}.png`}
                  fill
                  alt="Parent"
                  className="object-contain absolute translate-y-[5%]"
                />
              </div>

              <div
                className={`opacity-0 group-hover:opacity-100 transition-all duration-500 absolute inset-0 flex flex-col justify-center p-4 text-center items-center gap-2 translate-y-[-100%] ${
                  index % 2 == 0 ? "text-white" : "text-black"
                } group-hover:translate-y-0 ${
                  index % 2 === 0 ? "bg-[#2DB787]" : "bg-[#FFEB3B]"
                } ${shapes[index]} justify-between py-10`}
              >
                <div className="bg-white text-black px-2 rounded-xl">
                  <span>⭐</span> 4.8
                </div>
                <h1 className="font-normal leading-[1.2] text-[18px]">
                  “Astrokids is the one of our best desicion”
                </h1>
                <h1 className="font-normal text-[18px]">- Arun</h1>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-[24px] leading-[1.2] font-[500] text-center capitalize">
            Join <span className="text-[#2DB787]">1,232 parents</span> this
            month who've <span className="text-[#2DB787]">transformed</span>{" "}
            their parenting journey.
          </h1>
          <button className="px-4 mx-auto py-2 group font-bold rounded-lg flex justify-center items-center gap-2 new-gradient hover:brightness-110 transition-all mt-5">
            Start Your journey Now
            <ArrowUpRight size={20} className="group-hover:animate-intro" />
          </button>
        </div>
      </div>
      <div className="bg-[#02030B] text-white p-10">
        <h1 className="text-[40px] leading-[1.2] font-semibold text-center capitalize">
          Astrokids Membership Benefits
        </h1>
        <div className="flex justify-center items-center flex-wrap py-5 gap-10">
          <div className="w-[95%] md:w-[45%] py-8 group cursor-pointer overflow-hidden px-6 new-gradient rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/new/spark.png"}
                  fill
                  alt="Why 1"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={"/images/new/why1.png"}
                  fill
                  alt="Why 1"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="z-10 relative">
              <h1 className="text-[40px] md:text-[60px] font-bold leading-[1.2]">
                1800+
              </h1>
              <p className="text-[26px] md:text-[30px] leading-[1.2] font-bold">
                Happy Kids & Parents
              </p>
            </div>
            <button className="absolute bottom-5 right-5 p-1 group-hover:bg-white group-hover:text-black bg-white/30 rounded-full">
              <ArrowUpRight
                size={30}
                className="group-hover:rotate-45 transition duration-200"
              />
            </button>
          </div>
          <div className="w-[95%] group md:w-[45%] py-8 cursor-pointer overflow-hidden px-6 bg-gradient-to-br from-[#2B2B2B] to-[#3E3E3E] text-white rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/new/spark.png"}
                  fill
                  alt="Why 1"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={"/images/new/why2.png"}
                  fill
                  alt="Why 1"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="z-10 relative">
              <h1 className="text-[40px] md:text-[60px] leading-[1.2] font-bold">
                95%
              </h1>
              <p className="text-[26px] md:text-[30px] leading-[1.2] font-bold">
                Parents See Happier Kids
              </p>
            </div>
            <button className="absolute bottom-5 right-5 p-1 group-hover:bg-white group-hover:text-black bg-white/30 rounded-full">
              <ArrowUpRight
                size={30}
                className="group-hover:rotate-45 transition duration-200"
              />
            </button>
          </div>
          <div className="w-[95%] md:w-[50%] py-8 overflow-hidden cursor-pointer px-6 bg-gradient-to-br from-[#2B2B2B] to-[#3E3E3E] text-white rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/new/spark.png"}
                  fill
                  alt="Why 1"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={"/images/new/why3.png"}
                  fill
                  alt="Why 3"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="z-10 relative">
              <h1 className="text-[40px] md:text-[60px] leading-[1.2] font-bold">
                5,000-year-old
              </h1>
              <p className="text-[26px] md:text-[30px] leading-[1.2] font-bold">
                Ancient Wisdom + Modern Science
              </p>
            </div>
            <button className="absolute bottom-5 right-5 p-1 group-hover:bg-white group-hover:text-black bg-white/30 rounded-full">
              <ArrowUpRight
                size={30}
                className="group-hover:rotate-45 transition duration-200"
              />
            </button>
          </div>
          <div className="w-[95%] md:w-[40%] py-8 overflow-hidden px-6 bg-gradient-to-tr from-[#1B1F3B] via-[#011498] to-[#6F8BEF] text-white rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/new/spark.png"}
                  fill
                  alt="Why 1"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={"/images/new/why4.png"}
                  fill
                  alt="Why 1"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="z-10 relative">
              <h1 className="text-[40px] md:text-[60px] leading-[1.2] font-bold">
                15-Minute
              </h1>
              <p className="text-[26px] md:text-[30px] leading-[1.2] font-bold">
                Insights, Lifetime Impact
              </p>
            </div>
            <div className="absolute bottom-2 -right-5">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  src={"/images/new/why5.png"}
                  fill
                  alt="Why 1"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-[95%] md:w-[30%] py-8 overflow-hidden cursor-pointer px-6 bg-gradient-to-br from-[#2B2B2B] to-[#3E3E3E] text-white rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/new/spark.png"}
                  fill
                  alt="Why 1"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={"/images/new/why6.png"}
                  fill
                  alt="Why 3"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="z-10 relative">
              <h1 className="text-[30px] md:text-[60px] leading-[1.2] font-bold">
                78%
              </h1>
              <p className="text-[22px] md:text-[30px] leading-[1.2] font-bold">
                Better Academic
              </p>
            </div>
            <button className="absolute bottom-5 right-5 p-1 group-hover:bg-white group-hover:text-black bg-white/30 rounded-full">
              <ArrowUpRight
                size={30}
                className="group-hover:rotate-45 transition duration-200"
              />
            </button>
          </div>
          <div className="w-[95%] md:w-[32.5%] py-8 overflow-hidden cursor-pointer px-6 new-gradient rounded-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/new/spark.png"}
                  fill
                  alt="Why 1"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute top-0 -right-3">
              <div className="relative w-[70px] h-[70px]">
                <Image
                  src={"/images/new/why7.png"}
                  fill
                  alt="Why 3"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="z-10 relative">
              <h1 className="text-[40px] md:text-[60px] leading-[1.2] font-bold">
                24/7
              </h1>
              <p className="text-[26px] md:text-[30px] leading-[1.2] font-bold">
                Expert Support
              </p>
            </div>
            <button className="absolute bottom-5 right-5 p-1 group-hover:bg-white group-hover:text-black bg-white/30 rounded-full">
              <ArrowUpRight
                size={30}
                className="group-hover:rotate-45 transition duration-200"
              />
            </button>
          </div>
          <div className="w-[95%] md:w-[25%] py-8 overflow-hidden cursor-pointer px-6 bg-white text-black rounded-2xl relative group">
            <div className="absolute top-0 right-0">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={"/images/new/why7.png"}
                  fill
                  alt="Why 3"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="z-10 relative">
              <h1 className="text-[40px] md:text-[60px] leading-[1.2] font-bold">
                100%
              </h1>
              <p className="text-[26px] md:text-[30px] leading-[1.2] font-bold">
                Data Security
              </p>
            </div>
            <button className="absolute bottom-5 right-5 p-1 group-hover:bg-black group-hover:text-white bg-black/30 rounded-full">
              <ArrowUpRight
                size={30}
                className="group-hover:rotate-45 transition duration-200"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-10">
        <h1 className="text-[40px] font-bold leading-[1.2] text-center capitalize">
          How It Works
        </h1>
        <h1 className="text-[28px] mt-2 font-medium leading-[1.2] text-center capitalize">
          Simple <span className="text-[#2DB787]">3-Step</span> Process
        </h1>
        <div className="flex flex-col p-5 mt-5 md:flex-row gap-10 justify-center items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-0.5 w-[80%] md:w-[30%] rounded-lg bg-gradient-to-br from-[#2DB787] to-[#FFEB3B]"
            >
              <div className="flex px-5 py-3 bg-white rounded-lg flex-col gap-5">
                <div className="flex gap-2 justify-start w-full items-end">
                  <div className="text-[#2DB787] text-[50px] md:text-[60px] leading-[0.8]">
                    0<span>{index + 1}</span>
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i <= index ? "bg-[#2DB787]" : "bg-black"
                      }`}
                    ></div>
                  ))}
                </div>
                <h1 className="text-[32px] md:text-[46px] font-semibold leading-[1.2] capitalize">
                  {step.title}
                </h1>
                <div className="relative w-[100px] self-end h-[100px]">
                  <Image
                    src={step.image}
                    fill
                    alt={step.title}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-[28px] mt-2 font-medium leading-[1.2] text-center capitalize">
          It's like having a parenting manual written{" "}
          <span className="text-[#2DB787]"> just for your child.</span>
        </h1>
        <button className="px-4 mx-auto py-2 font-bold rounded-lg flex justify-center items-center gap-2 new-gradient hover:brightness-110 transition-all mt-5">
          Unlock Their Potential
          <ArrowUpRight size={20} />
        </button>
      </div>
      <div className="p-5 md:p-10">
        <h1 className="text-[40px] font-bold leading-[1.2] text-center capitalize">
          Choose your plan
        </h1>
        <h1 className="text-[28px] mt-2 font-medium leading-[1.2] text-center capitalize">
          Because{" "}
          <span className="text-[#2DB787]">Every Child's Path is Written</span>{" "}
          in the Stars 🌟
        </h1>
        <div className="grid px-10 py-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-10">
          {plans.map((p, ind) => (
            <div
              key={ind}
              className="bg-[#FFEB3B] relative p-5 rounded-xl border border-black"
            >
              <h1 className="text-[24px] font-bold leading-[1.2]">{p.title}</h1>
              <div className="my-3 flex items-center gap-2">
                <h2 className="text-[26px] font-bold leading-[1.2]">
                  ₹{p.price}
                </h2>
                <p className="text-[#6F6C90] text-[16px]">/ Life Time</p>
              </div>
              <p className="text-[16px]">{p.content}</p>
              <div className="w-[60%] mt-3 mx-auto aspect-square relative">
                <Image
                  alt={p.title}
                  src={`/images/book-cover${ind}.png`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="py-2"></div>
              <button
                className={`absolute rounded-xl flex justify-center text-white py-2 items-center gap-2 ${
                  ind != 1
                    ? "bg-black"
                    : "new-gradient text-[18px] font-semibold hover:brightness-110 transition-all"
                } w-max px-5 h-max -translate-y-1 left-1/2 -translate-x-1/2`}
              >
                Compare Plans
                <ArrowUpRight size={20} />
              </button>
              {ind === 1 && (
                <div className="absolute px-3 rounded-bl-xl rounded-tr-xl top-0 right-0 new-gradient text-white text-[16px]">
                  Popular
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 md:p-10">
        <h1 className="text-[40px] font-bold leading-[1.2] text-center capitalize">
          Freebie for better parenting
        </h1>
        <h1 className="text-[24px] mt-2 font-medium leading-[1.2] text-center capitalize">
          Because{" "}
          <span className="text-[#2DB787] font-bold">Great Parenting </span>{" "}
          Starts with{" "}
          <span className="text-[#2DB787] font-bold">Small Steps</span> 🌟
        </h1>
        <div className="grid grid-cols-1 mt-7 mb-8 xl:mt-14 xl:mb-16 px-8 xl:px-16 md:grid-cols-2 xl:grid-cols-3 max-md:gap-10">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className={`${
                index == 1 && "xl:row-span-2 xl:h-full"
              } relative w-full`}
            >
              <div
                className={`${
                  index != 1
                    ? "xl:w-[80%] aspect-video mx-auto"
                    : "xl:w-full xl:h-full"
                } relative max-md:w-full max-md:aspect-video`}
              >
                <Image
                  src={`/images/new/blog${index + 1}.png`}
                  fill
                  alt={blog}
                  className="object-cover rounded-xl"
                />
                {index === 0 && (
                  <div className="absolute px-3 rounded-bl-xl rounded-tr-xl top-0 right-0 bg-[#FFEB3B] text-[16px]">
                    Popular
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute px-3 rounded-bl-xl rounded-tr-xl top-0 right-0 bg-[#FFEB3B] text-[16px]">
                    Most Viewed
                  </div>
                )}
                {index === 4 && (
                  <div className="absolute px-3 rounded-bl-xl rounded-tr-xl top-0 right-0 bg-[#FFEB3B] text-[16px]">
                    Recently Added
                  </div>
                )}
              </div>
              <h1
                className={`text-[20px] font-normal leading-[1.2] mt-2 ${
                  index != 1 ? "xl:w-[80%] mx-auto" : "xl:w-full"
                }`}
              >
                {blog}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 md:p-10">
        <h1 className="text-[40px] font-bold leading-[1.2] text-center capitalize">
          Real Stories from AstroKids Families
        </h1>
        <h1 className="text-[24px] mt-2 font-medium leading-[1.2] text-center capitalize">
          See How{" "}
          <span className="text-[#2DB787] font-bold">5,000+ Parents </span>{" "}
          Found{" "}
          <span className="text-[#2DB787] font-bold">
            {" "}
            Clarity in the Stars
          </span>{" "}
          ✨
        </h1>
        <Carousel slides={slides} />
      </div>
      <NewFooter />
    </div>
  );
};

export default NewPage;
