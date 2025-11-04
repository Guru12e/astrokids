"use client";

import Header from "@/components/Header";
import NewFooter from "@/components/NewFooter";
import {
  bodyConsitutions,
  constitutionRatio,
  ista_devatas,
  lagnaIdentity,
  moonIdentity,
  nakshatraNumber,
  nakshatras,
  planetGemstone,
  pricing,
  sunIdentity,
  zodiac,
  zodiac_lord,
} from "@/constant/constant";
import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { set } from "mongoose";

const Loader = ({ steps, progress, currentStep }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 bg-opacity-90 z-50">
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl shadow-2xl animate-fadeIn">
        <div className="relative w-48 h-48 mb-8">
          <div className="absolute inset-0 bg-blue-200 rounded-full animate-pulse opacity-25"></div>
          <video
            src="/videos/loader.mp4"
            loop
            autoPlay
            muted
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute -inset-2 bg-blue-400 rounded-full opacity-10 animate-ping"></div>
        </div>

        <p className="text-xl text-gray-700 font-semibold mb-6 animate-slideUp">
          {steps[currentStep]}
          <span className="inline-block ml-2 animate-bounce">.</span>
          <span className="inline-block animate-bounce delay-100">.</span>
          <span className="inline-block animate-bounce delay-200">.</span>
        </p>

        <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-shimmer"></div>
          </div>
          <div className="absolute inset-0 shadow-inner rounded-full"></div>
        </div>

        <span className="mt-4 text-sm text-gray-500 font-medium animate-fadeIn">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

const PanchangDisplay = () => {
  const [panchangData, setPanchangData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState(null);
  const [content, setContent] = useState(null);
  const [constitution, setConstitution] = useState(null);
  const [constitutionType, setConstitutionType] = useState(null);
  const [activeTab, setActiveTab] = useState("strength");
  const [isTrueSelfOpen, setIsTrueSelfOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const steps = [
    "Fetching planet positions",
    "Calculating houses",
    "Analyzing aspects",
    "Generating report",
  ];

  const setDisplayContent = (userDetails, panchangData) => {
    if (userDetails && panchangData) {
      const ninthHouseLord =
        zodiac_lord[
          ((zodiac.indexOf(panchangData.planets[0].sign) + 9) % 12) - 1
        ];
      const isthadevathaLord = panchangData.planets.filter(
        (planet) => planet.Name === ninthHouseLord
      )[0].nakshatra_lord;

      let start = panchangData.panchang.nakshatra_number;
      const favourableNakshatra = [];

      const luckyNumber =
        nakshatraNumber[panchangData.planets[2].nakshatra.split(" ").join("")];
      [0, 1, 2].forEach((_) => {
        favourableNakshatra.push(nakshatras[start % 27]);
        start += 9;
      });
      const fiveHouseLord =
        zodiac_lord[
          ((zodiac.indexOf(panchangData.planets[0].sign) + 5) % 12) - 1
        ];

      setContent({
        name: userDetails.name,
        dob: userDetails.dob,
        time: userDetails.time,
        place: userDetails.place,
        nakshatra: panchangData.panchang.nakshatra,
        rasi: panchangData.planets[2].sign,
        lagna: `${panchangData.planets[0].sign} , ${panchangData.planets[0].zodiac_lord}`,
        tithi: panchangData.panchang.tithi,
        nithyaYogam: panchangData.panchang.yoga,
        karanam: panchangData.panchang.karana,
        weekDay: panchangData.panchang.week_day,
        ishtaDevatha: ista_devatas[isthadevathaLord],
        favourableNakshatra: favourableNakshatra.join(", "),
        luckyNumber: luckyNumber.join(", "),
        lifeStone: planetGemstone[panchangData.planets[0].zodiac_lord],
        beneficialStone: planetGemstone[fiveHouseLord],
        luckyStone: planetGemstone[ninthHouseLord],
      });

      const moon = panchangData.planets[2];
      const lagna = panchangData.planets[0];
      const data = {
        Pitta:
          ((constitutionRatio[moon.zodiac_lord]["Pitta"] +
            constitutionRatio[lagna.zodiac_lord]["Pitta"]) /
            200) *
          100,
        Kapha:
          ((constitutionRatio[moon.zodiac_lord]["Kapha"] +
            constitutionRatio[lagna.zodiac_lord]["Kapha"]) /
            200) *
          100,
        Vatta:
          ((constitutionRatio[moon.zodiac_lord]["Vata"] +
            constitutionRatio[lagna.zodiac_lord]["Vata"]) /
            200) *
          100,
      };

      let max = "";
      let maxValue = 0;
      Object.entries(data).forEach(([key, value]) => {
        if (value > maxValue) {
          max = key;
          maxValue = value;
        }
      });
      setConstitutionType(max);
      setConstitution(bodyConsitutions[max]);
    }
  };

  useEffect(() => {
    const fetchPanchang = async () => {
      const childDetails = JSON.parse(localStorage.getItem("childDetails"));
      setUserDetails(childDetails);
      setCurrentStep(1);
      setProgress((prev) => Math.min(prev + 100 / steps.length, 100));
      if (childDetails) {
        try {
          const response = await fetch("api/freeReport", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: `${childDetails.dob} ${childDetails.time}:00`,
              lat: parseFloat(childDetails.lat),
              lon: parseFloat(childDetails.lon),
            }),
          });

          if (response.ok) {
            const data = await response.json();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setPanchangData(data);
            setCurrentStep(2);
            setProgress((prev) => Math.min(prev + 100 / steps.length, 100));

            setName(childDetails.name.split(" ")[0]);
            setDisplayContent(childDetails, data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCurrentStep(3);
            setProgress((prev) => Math.min(prev + 100 / steps.length, 100));
            setLoading(false);
          }
        } catch (error) {
          toast.error("Failed to fetch panchang data. Please try again.");
          console.error("Error fetching panchang data:", error);
        }
      }
    };

    fetchPanchang();
  }, []);

  if (loading) {
    return (
      <Loader steps={steps} progress={progress} currentStep={currentStep} />
    );
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hourNum = parseInt(hours);
    return hourNum > 12
      ? `${hourNum - 12}:${minutes} PM`
      : `${hourNum}:${minutes} AM`;
  };

  const formatDob = (dob) => {
    const [year, month, day] = dob.split("-");
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  const bgs = ["bg-green-400", "bg-red-400", "bg-yellow-400"];

  return (
    <>
      <Header />
      {content && (
        <div className="w-screen min-h-screen bg-white py-16 px-5 md:px-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-2/3 space-y-12">
              <section className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-1000">
                <h1 className="text-[40px] font-bold text-center leading-[1.2] text-[#6F8BEF]">
                  {name}'s Celestial Journey
                </h1>
                <p className="text-[16px] text-black mt-4 text-center leading-[1.2]">
                  The Precious Child Born on the auspicious day{" "}
                  <span>{userDetails.dob && formatDob(userDetails.dob)}</span>{" "}
                  at{" "}
                  <span>
                    {userDetails.time && formatTime(userDetails.time)}
                  </span>
                  , in <span>{userDetails.place}</span>.
                </p>
              </section>

              <section className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-[24px] font-bold text-[#6F8BEF] mb-6 text-center">
                  {name}'s True Self
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Ascendant (Lagna)",
                      sign: panchangData.planets[0].sign,
                      heading: "Personality",
                      identity: lagnaIdentity[panchangData.planets[0].sign],
                    },
                    {
                      title: "Moon (Rasi)",
                      sign: panchangData.planets[2].sign,
                      heading: "Emotions",
                      identity: moonIdentity[panchangData.planets[2].sign],
                    },
                    {
                      title: "Sun (Atma)",
                      sign: panchangData.planets[1].sign,
                      heading: "Core Identity",
                      identity: sunIdentity[panchangData.planets[1].sign],
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    >
                      <h3 className="text-[18px] font-semibold text-[#6F8BEF] mb-3">
                        {item.title}
                      </h3>
                      <div className="relative w-36 h-36 mx-auto mb-4">
                        <Image
                          src={`/images/new/${item.sign}.png`}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-[16px] capitalize font-medium text-[#6F6C90]">
                        {item.sign}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  className="px-4 py-2 mt-5 mx-auto font-medium rounded-lg flex justify-center items-center gap-2 border border-[#6F8BEF] text-[#6F8BEF] hover:bg-[#6F8BEF] hover:text-white transition-all duration-300"
                  onClick={() => setIsTrueSelfOpen(true)}
                >
                  Explore True Self
                </button>
              </section>

              {isTrueSelfOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl p-8 w-[95%] md:w-[60%] max-h-[80vh] overflow-y-auto relative shadow-2xl border border-gray-100">
                    <div className="sticky top-0 flex justify-end z-10">
                      <button
                        className="text-[#6F6C90] hover:text-[#6F8BEF] transition-colors duration-200"
                        onClick={() => setIsTrueSelfOpen(false)}
                      >
                        <X size={28} className="p-1 bg-gray-100 rounded-full" />
                      </button>
                    </div>
                    <h2 className="text-[28px] font-bold text-[#6F8BEF] mb-6 text-center">
                      {name}'s True Self 🌟
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-5">
                      {[
                        {
                          title: "Ascendant (Lagna)",
                          sign: panchangData.planets[0].sign,
                          heading: "Personality",
                          identity: lagnaIdentity[panchangData.planets[0].sign],
                        },
                        {
                          title: "Moon (Rasi)",
                          sign: panchangData.planets[2].sign,
                          heading: "Emotions",
                          identity: moonIdentity[panchangData.planets[2].sign],
                        },
                        {
                          title: "Sun (Identity)",
                          sign: panchangData.planets[1].sign,
                          heading: "Core Identity",
                          identity: sunIdentity[panchangData.planets[1].sign],
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                          <h3 className="text-[18px] font-semibold text-[#6F8BEF] mb-3">
                            {item.title}
                          </h3>
                          <div className="relative w-36 h-36 mx-auto mb-4">
                            <Image
                              src={`/images/new/${item.sign}.png`}
                              alt={item.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-[16px] capitalize font-medium text-[#6F6C90]">
                            {item.sign}
                          </p>
                          <div className="mt-4">
                            <h4 className="text-[16px] font-semibold text-[#6F8BEF] mb-2">
                              {name}'s {item.heading}
                            </h4>
                            <p className="text-[14px] capitalize text-[#8F8F8F]">
                              {item.identity
                                .replaceAll("child", name.toLowerCase())
                                .replaceAll("Child", name)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <section className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-[24px] font-bold text-[#6F8BEF] mb-6 text-center">
                  Astrological Insights
                </h2>
                {content && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(content).map(([key, value], index) => (
                      <div
                        key={index}
                        className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <span className="font-semibold text-[#6F8BEF] capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>{" "}
                        <span className="text-black">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {constitution && (
                <section className="bg-white rounded-3xl shadow-2xl p-8">
                  <div className="relative w-[50%] md:w-[20%] aspect-video mx-auto mb-4">
                    <Image
                      src={`/images/new/${constitutionType}.png`}
                      alt={constitutionType}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-[24px] font-bold leading-[1.2] text-[#6F8BEF] mb-6 text-center">
                    {name}'s Body is Dominated By {constitutionType} Nature
                  </h2>
                  <div className="flex flex-wrap gap-4 mb-6 justify-center">
                    {["strength", "weakness", "remedie"].map((tab, index) => (
                      <button
                        key={tab}
                        onClick={() =>
                          setActiveTab("remedie" === tab ? "remedy" : tab)
                        }
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md ${
                          (activeTab === "remedy" && tab === "remedie") ||
                          activeTab === tab
                            ? `${bgs[index]} shadow-lg text-black`
                            : "bg-[#6F6C90] hover:bg-[#6F8BEF] text-white"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}s
                      </button>
                    ))}
                  </div>
                  <div className="space-y-6">
                    {activeTab === "strength" && (
                      <>
                        <h3 className="text-[20px] font-semibold text-green-400 mb-4 text-center">
                          {name}'s Biggest Strengths
                        </h3>
                        {constitution.strength.map((item, index) => (
                          <div
                            key={index}
                            className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            <h4 className="text-[16px] font-semibold capitalize text-green-400">
                              {item.title
                                .replaceAll("child", name.toLowerCase())
                                .replaceAll("Child", name)}
                            </h4>
                            <p className="text-[#6F6C90] capitalize mt-1">
                              {item.con
                                .replaceAll("child", name.toLowerCase())
                                .replaceAll("Child", name)}
                            </p>
                          </div>
                        ))}
                        <p className="text-[#8F8F8F] italic mt-4">
                          {constitution.strengthNote
                            .replaceAll("child", name.toLowerCase())
                            .replaceAll("Child", name)}
                        </p>
                      </>
                    )}
                    {activeTab === "weakness" && (
                      <>
                        <h3 className="text-[20px] font-semibold text-red-400 mb-4 text-center">
                          ⚖️ Areas to Balance
                        </h3>
                        {constitution.weakness.map((item, index) => (
                          <div
                            key={index}
                            className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            <h4 className="text-[16px] font-semibold capitalize text-red-400">
                              {item.title
                                .replaceAll("child", name.toLowerCase())
                                .replaceAll("Child", name)}
                            </h4>
                            <p className="text-[#6F6C90] capitalize mt-1">
                              {item.con
                                .replaceAll("child", name.toLowerCase())
                                .replaceAll("Child", name)}
                            </p>
                          </div>
                        ))}
                        <p className="text-[#8F8F8F] italic capitalize mt-4">
                          {constitution.weaknessNote
                            .replaceAll("child", name.toLowerCase())
                            .replaceAll("Child", name)}
                        </p>
                      </>
                    )}
                    {activeTab === "remedy" && (
                      <>
                        <h3 className="text-[20px] font-semibold capitalize text-yellow-800 mb-4 text-center">
                          {constitution.remedyTitle
                            .replaceAll("child", name.toLowerCase())
                            .replaceAll("Child", name)}
                        </h3>
                        {constitution.remedy.map((item, index) => (
                          <div
                            key={index}
                            className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            <h4 className="text-[16px] font-semibold capitalize text-yellow-800">
                              {item.title
                                .replaceAll("child", name.toLowerCase())
                                .replaceAll("Child", name)}
                            </h4>
                            <p className="text-[#6F6C90] mt-1 capitalize">
                              {item.con
                                .replaceAll("child", name.toLowerCase())
                                .replaceAll("Child", name)}
                            </p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </section>
              )}

              <section className="new-gradient text-white rounded-3xl shadow-2xl p-8 mt-12 hover:shadow-3xl transition-all duration-1000">
                <p className="text-[26px] capitalize font-semibold text-center leading-[1.2] mb-6">
                  be the best mom and dad your child deserves 💛
                </p>
                <p className="text-[20px] text-center capitalize font-semibold">
                  Discover 20+ surprising insights about your{" "}
                  <span className="text-white">{name}</span> that can make your
                  parenting easier, smoother, and more fulfilling.
                </p>
              </section>
            </div>

            <aside className="w-full md:w-1/3">
              <div className="sticky top-20 space-y-8">
                <h2 className="text-[24px] font-bold text-[#2DB787] mb-6 text-center">
                  Unlock More Insights
                </h2>
                {pricing.slice(1, 4).map((item, index) => (
                  <div
                    key={index}
                    className="p-0.5 w-full rounded-3xl relative hover:shadow-2xl hover:-translate-y-5 bg-gradient-to-br from-[#2DB787] to-[#FFEB3B] transition-all duration-1000"
                  >
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                      <div className="relative w-48 h-48 mx-auto mb-4">
                        <Image
                          src={`/images/book-cover${index + 1}.png`}
                          fill
                          className="object-contain drop-shadow-lg"
                          alt={item.title}
                        />
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#2DB787] text-center mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#6F6C90] text-center mb-4">
                        {item.content}
                      </p>
                      <p className="text-[20px] font-bold text-[#2DB787] text-center mb-4">
                        ₹{item.price}
                      </p>
                      <button
                        className="w-full bg-[#2DB787] text-white py-3 rounded-lg cursor-pointer transition-all duration-300"
                        onClick={() => {
                          localStorage.setItem("orderIndex", index + 1);
                          router.push(`/child-details`);
                        }}
                      >
                        Buy Now
                      </button>
                    </div>

                    {index === 1 && (
                      <p className="absolute px-3 rounded-tr-xl rounded-bl-xl top-0 w-max font-medium right-0 new-gradient text-white text-[16px]">
                        Most Loved by Parents ✨
                      </p>
                    )}
                    {index === 0 && (
                      <p className="absolute px-3 rounded-tr-xl rounded-bl-xl top-0 w-max font-medium right-0 new-gradient text-white text-[16px]">
                        Popular ✨
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      )}
      <NewFooter />
    </>
  );
};

export default PanchangDisplay;
