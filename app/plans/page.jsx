"use client";
import Header from "@/components/Header";
import NewFooter from "@/components/NewFooter";
import NewNavBar from "@/components/NewNavBar";
import { ArrowUpRight, Check, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(0);
  const router = useRouter();
  const newPricing = [
    {
      title: "Starter Parenting",
      price: "Free",
      what: [
        {
          title: "Astrological Profile",
          content: "Decode your child’s unique astrology.",
        },
        {
          title: "Birth Chart Analysis",
          content: "Understand the planetary influences on life.",
        },
        {
          title: "Pancha Bhoota Composition",
          content: "Discover their elemental balance.",
        },
        {
          title: "Personalised Health & Energy Insights",
          content: "Ayurvedic body type and dominant chakra predictions.",
        },
        {
          title: "Life Path Guidance",
          content: "Favorable and unfavorable periods.",
        },
        {
          title: "Astrological Growth Insights",
          content: "Discover how key elements shape their development.",
        },
      ],
    },
    {
      title: "Pro Parenting",
      price: "₹499",
      what: [
        {
          title: "Health & Wellness Guidance",
          content: "Personalised tips for addressing challenges.",
        },
        {
          title: "Physical Traits & Personality Growth",
          content: "Understand their unique attributes.",
        },
        {
          title: "Emotional Needs & Aspirations",
          content: "Decode their inner world.",
        },
        {
          title: "Life Skills Support",
          content: "Tips for building habits, diets, and sleep routines.",
        },
        {
          title: "Learning Preferences",
          content: "Insights to support their academic growth.",
        },
      ],
    },
    {
      title: "Ultimate Parenting",
      price: "₹999",
      what: [
        {
          title: "Education Insights",
          content: "Personalised strategies for academic success.",
        },
        {
          title: "Career Guidance",
          content: "Identify the best paths aligned with their talents.",
        },
        {
          title: "Hidden Potential Analysis",
          content: "Subconscious mind and limiting belief insights.",
        },
        {
          title: "Talent Development",
          content: "Highlight and nurture natural abilities.",
        },
        {
          title: "Karmic Lessons",
          content: "Understand life lessons shaping their journey.",
        },
        {
          title: "Social Insights",
          content: "Guidance for building meaningful relationships.",
        },
      ],
    },
    {
      title: "Master Parenting",
      price: "₹1299",
      what: [
        {
          title: "Five-Year Growth Predictions",
          content: "Plan proactively for future milestones.",
        },
        {
          title: "Gemstone & Rudraksha Recommendations",
          content: "Enhance energy and success.",
        },
        {
          title: "Sade Sati Guidance",
          content: "Navigate challenging astrological periods.",
        },
        {
          title: "Parenting Guides",
          content:
            "Personalised checklists tailored to your child’s astrology.",
        },
        {
          title: "Celebrity Comparisons",
          content: "Draw inspiration from similar profiles.",
        },
        {
          title: "Life Prediction Summary",
          content: "A complete overview of your child’s path.",
        },
      ],
    },
  ];

  const faq = [
    {
      title: "Is astrology safe for kids?",
      content: "We focus on strengths, never fear. 100% positive insights.",
    },
    {
      title: "How are reports delivered?",
      content: "",
    },
    {
      title: "Can I switch plans later?",
      content: "",
    },
    {
      title: "How are reports delivered?",
      content: "",
    },
  ];
  return (
    <div>
      <Header />
      <div className="w-screen h-screen">
        <div
          className="w-screen h-screen overflow-hidden relative"
          id="choose-your-plan"
        >
          <Image
            src={`/images/new/plans-hero.png`}
            fill
            className="object-cover mt-16"
            alt="Hero image"
          />
          <div className="w-screen h-screen absolute top-0 left-0 bg-[#1B1F3B]/60"></div>
        </div>
        <div className="absolute top-0 text-white w-screen h-screen flex flex-col gap-3 justify-center items-center">
          <h1 className="text-center leading-[1.2] font-bold text-[40px] px-3 md:text-[28px]">
            Simple Plans, Tailored to Your Parenting Journey 🌟
          </h1>
          <p className="font-medium text-[24px] tracking-[0] px-5 text-center leading-[1.2]">
            Find{" "}
            <span className="text-[#2DB787] font-bold">
              Clarity Without Complexity
            </span>
            — Because Every Child’s Needs Are Unique.
          </p>
        </div>
      </div>
      <div id="plan-benefits">
        <div className="w-full h-10"></div>
        <div className="grid px-10 py-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-10">
          {newPricing.map((p, ind) => (
            <div
              key={ind}
              className="p-0.5 w-full rounded-3xl hover:shadow-2xl hover:-translate-y-5 bg-gradient-to-br from-[#2DB787] to-[#FFEB3B] transition-all duration-1000 ease-in-out"
            >
              <div className="flex px-5 py-3 h-full bg-white rounded-3xl flex-col relative gap-5">
                <h1 className="text-[24px] font-bold leading-[1.2] mt-7">
                  {p.title}
                </h1>
                <div className="my-3 flex items-center gap-2">
                  <h2 className="text-[26px] font-bold leading-[1.2]">
                    {p.price}
                  </h2>
                  <p className="text-[#6F6C90] text-[16px]">/ Life Time</p>
                </div>
                <ul className="flex flex-col flex-1 gap-5">
                  {ind !== 0 && (
                    <li className="flex gap-2 items-center">
                      <Check className="bg-[#2DB787] rounded-full text-white p-1" />
                      <span className="text-[14px] font-semibold leading-[1.2]">
                        Everything in {newPricing[ind - 1].title}
                      </span>
                    </li>
                  )}
                  {p.what.map((i, index) => (
                    <li key={index} className="flex gap-2 items-center">
                      <Check className="bg-[#EBEFF0] rounded-full text-[#2DB787] p-1" />
                      <span className="text-[14px] font-light leading-[1.2]">
                        {i.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className="px-4 mx-auto py-2 font-bold rounded-lg flex justify-center items-center gap-2 bg-[#2DB787] transition-all text-white mt-5"
                  onClick={() => {
                    router.push(
                      `/child-details?product=true&productIndex=${ind}`
                    );
                  }}
                >
                  Start the plan
                  <ArrowUpRight size={20} />
                </button>
                {ind === 1 && (
                  <p className="absolute px-3 rounded-b-xl top-0 w-max font-medium translate-x-[50%] right-[50%] new-gradient text-white text-[12px]">
                    Most Loved by Parents ✨
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-16 w-full" id="faq">
        <div className="w-full h-5"></div>
        <h1 className="text-[40px] font-bold leading-[1.2] text-center capitalize">
          Frequently Asked Questions
        </h1>
        <h1 className="text-[24px] mt-5 mb-8 font-medium leading-[1.2] text-[#8F8F8F] text-center capitalize">
          Find questions and answers related to the plans
        </h1>
        {faq.map((f, index) => (
          <div
            key={index}
            onClick={() => {
              setIsOpen(index);
            }}
            className={` max-w-4xl mt-5 rounded-xl border border-[#8F8F8F] mx-auto px-4 py-3 ${
              isOpen === index &&
              "bg-gradient-to-br from-[#2B2B2B] to-[#3E3E3E] relative"
            }`}
          >
            {isOpen === index && (
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
            )}
            <div className="flex justify-between items-center z-10 relative">
              <h1
                className={` font-medium leading-[1.2] capitalize ${
                  isOpen === index
                    ? "text-white text-[18px]"
                    : "text-[16px] text-[#8F8F8F]"
                }`}
              >
                {f.title}
              </h1>
              {isOpen === index ? (
                <MinusIcon className="text-white" />
              ) : (
                <PlusIcon className="text-[#8F8F8F]" />
              )}
            </div>
            {isOpen === index && (
              <p className="mt-2 relative z-10 text-white/80 text-[16px] font-normal">
                {f.content}
              </p>
            )}
          </div>
        ))}
      </div>
      <NewFooter />
    </div>
  );
};

export default AboutPage;
