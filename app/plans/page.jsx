"use client";
import Header from "@/components/Header";
import NewFooter from "@/components/NewFooter";
import { ArrowUpRight, Check, MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(-1);
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

  const [showMore, setShowMore] = useState(false);

  const faq = [
    {
      title: "How does Astro Kids create a child’s astrology report?",
      content:
        "Astro Kids uses your child’s birth details—date, time, and place—to generate a personalized Vedic astrology chart. This helps decode your child’s personality, emotions, learning style, strengths, and growth path.",
    },
    {
      title: "When will I receive the report after purchase?",
      content:
        "You will receive your child’s personalized astrology report within 12 to 24 hours of placing your order. The report will be sent to your email.",
    },
    {
      title: "Is this suitable for children of all age groups?",
      content:
        "Yes. Whether your child is an infant, toddler, school-age, or teenager, the insights are tailored to support their specific developmental stage and emotional needs.",
    },
    {
      title: "Do I need astrology knowledge to understand the report?",
      content:
        "Not at all. The report is written in clear, easy-to-understand language for modern parents. No astrology background is required—just a desire to connect more deeply with your child.",
    },
    {
      title: "How is healing incorporated into the report?",
      content:
        "Each report integrates personalized healing techniques like affirmations, yoga-inspired practices, and mindful parenting tools aligned with your child’s birth chart to nurture their emotional and energetic balance.",
    },
    {
      title: "Can I order reports for more than one child?",
      content:
        "Absolutely. Each child’s report is uniquely crafted. Just submit the birth details individually to receive personalized insights for each child.",
    },
    {
      title: "Does Astro Kids offer continuing parenting guidance?",
      content:
        "Yes! With select packages, you can receive ongoing daily or weekly WhatsApp affirmations and mindful parenting tips, aligned with your child’s evolving astrological phases.",
    },
    {
      title: "Is the Astro Kids report scientifically validated?",
      content:
        "Astro Kids is based on the Vedic astrology system, a centuries-old wisdom tradition. While it is not a science in the modern sense, it provides time-tested insights for parenting with intuition, empathy, and awareness.",
    },
  ];

  return (
    <div>
      <Header />
      <div className="w-screen h-[70vh] md:h-screen relative">
        <div
          className="w-screen h-[70vh] md:h-screen overflow-hidden relative"
          id="choose-your-plan"
        >
          <Image
            src={`/images/new/plans-hero.png`}
            fill
            className="object-cover"
            alt="Hero image"
          />
          <div className="w-screen h-[70vh] md:h-screen absolute top-0 left-0 bg-[#1B1F3B]/60"></div>
        </div>
        <div className="absolute top-0 text-white w-screen h-[70vh] md:h-screen flex flex-col gap-3 justify-center pb-4 items-center">
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
                <ul className="flex flex-col gap-5">
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
                <button
                  className="px-4 mx-auto py-2 font-medium rounded-lg flex justify-center items-center gap-2 border border-[#2DB787] text-[#2DB787] transition-all hover:bg-[#2DB787] hover:text-white"
                  onClick={() => setDetailsOpen(detailsOpen === ind ? -1 : ind)}
                >
                  {detailsOpen === ind ? "Hide Details" : "See Details"}
                  {detailsOpen === ind ? (
                    <MinusIcon size={20} />
                  ) : (
                    <PlusIcon size={20} />
                  )}
                </button>

                {ind === 2 && (
                  <p className="absolute px-3 rounded-b-xl top-0 w-max font-medium translate-x-[50%] right-[50%] new-gradient text-white text-[12px]">
                    Most Loved by Parents ✨
                  </p>
                )}
                {ind === 1 && (
                  <p className="absolute px-3 rounded-b-xl top-0 w-max font-medium translate-x-[50%] right-[50%] new-gradient text-white text-[12px]">
                    Popular ✨
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {detailsOpen !== -1 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-[95%] md:w-[60%] max-w-3xl max-h-[80vh] overflow-y-auto relative shadow-2xl border border-gray-100">
            <div className="sticky flex justify-end top-0">
              <button
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200 z-20"
                onClick={() => setDetailsOpen(-1)}
              >
                <X size={28} className="p-1 bg-gray-100 rounded-full" />
              </button>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-[28px] md:text-[32px] font-bold leading-tight text-gray-800">
                {newPricing[detailsOpen].title}
              </h2>
              <p className="text-[16px] text-gray-500 mt-1">
                Comprehensive Details & Features
              </p>
            </div>

            <div className="space-y-6">
              {newPricing.slice(0, detailsOpen + 1).map((plan, planIndex) => (
                <div key={planIndex}>
                  {planIndex > 0 && (
                    <div className="text-sm text-gray-500 italic mb-4">
                      Includes everything from {newPricing[planIndex - 1].title}
                    </div>
                  )}
                  {plan.what.map((i, index) => (
                    <div
                      key={index}
                      className="group relative flex items-start gap-3 py-2 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#2DB787] mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-[18px] font-semibold text-[#2DB787] leading-tight group-hover:text-[#239670] transition-colors duration-200">
                          {i.title}
                        </p>
                        <p className="text-[15px] text-gray-600 mt-1 leading-relaxed">
                          {i.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 sticky bg-white bottom-0">
              <button
                className="w-full px-6 py-3 bg-gradient-to-r from-[#2DB787] to-[#239670] text-white font-semibold rounded-lg hover:from-[#239670] hover:to-[#1D7A5A] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                onClick={() => {
                  router.push(
                    `/child-details?product=true&productIndex=${detailsOpen}`
                  );
                }}
              >
                Get Started with this Plan
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-5 md:p-16 w-full" id="faq">
        <div className="w-full h-5"></div>
        <h1 className="text-[40px] font-bold leading-[1.2] text-center capitalize">
          Frequently Asked Questions
        </h1>
        <h1 className="text-[24px] mt-5 mb-8 font-medium leading-[1.2] text-[#8F8F8F] text-center capitalize">
          Find questions and answers related to the plans
        </h1>
        {faq.slice(0, showMore ? 3 : faq.length).map((f, index) => (
          <div
            key={index}
            onClick={() => {
              setIsOpen(index);
            }}
            className={`max-w-4xl mt-5 rounded-xl border border-[#8F8F8F] mx-auto px-4 py-3 ${
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
                className={`font-medium leading-[1.2] capitalize ${
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
        <div className="flex justify-center mt-5">
          <button
            className="text-[#2DB787] border border-[#2DB787] px-3 py-2 rounded-2xl font-semibold"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show More" : "Show Less"}
          </button>
        </div>
      </div>

      <NewFooter />
    </div>
  );
};

export default AboutPage;
