"use client";

import Header from "@/components/Header";
import NewFooter from "@/components/NewFooter"; // Added to match AboutPage
import {
  atma_names,
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react"; // Added for popup close button
import { useRouter } from "next/navigation";

const PanchangDisplay = () => {
  const [panchangData, setPanchangData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState(null);
  const [content, setContent] = useState(null);
  const [constitution, setConstitution] = useState(null);
  const [constitutionType, setConstitutionType] = useState(null);
  const [activeTab, setActiveTab] = useState("strength");
  const [isTrueSelfOpen, setIsTrueSelfOpen] = useState(false); // State for True Self popup

  const setDisplayContent = () => {
    if (userDetails && panchangData) {
      const ninthHouseLord =
        zodiac_lord[
          ((zodiac.indexOf(panchangData.planets[0].sign) + 9) % 12) - 1
        ];
      const isthadevathaLord = panchangData.planets.filter(
        (planet) => planet.Name === ninthHouseLord
      )[0].nakshatra_lord;
      const nakshatrasOrder =
        nakshatras.splice(
          nakshatras.indexOf(panchangData.planets[2].nakshatra)
        ) +
        nakshatras.splice(
          0,
          nakshatras.indexOf(panchangData.planets[2].nakshatra)
        );
      const favourableNakshatra = [];
      nakshatrasOrder.split(",").forEach((nakshatra, index) => {
        if (index % 9 === 1) favourableNakshatra.push(nakshatra);
      });
      const luckyNumber = nakshatraNumber[panchangData.planets[2].nakshatra];
      const fiveHouseLord =
        zodiac_lord[
          ((zodiac.indexOf(panchangData.planets[0].sign) + 5) % 12) - 1
        ];
      const atma = panchangData.planets.filter(
        (planet) => planet.order === 1
      )[0].Name;

      setContent({
        name: userDetails.name,
        dob: userDetails.dob,
        time: userDetails.time,
        place: userDetails.place,
        nakshatra: panchangData.panchang.nakshatra,
        rasi: panchangData.planets[2].sign,
        lagna: `${panchangData.planets[0].sign} , ${panchangData.planets[0].zodiac_lord}`,
        tithi: panchangData.panchang.thithi,
        nithyaYogam: panchangData.panchang.yoga,
        karanam: panchangData.panchang.karanam,
        weekDay: panchangData.panchang.week_day,
        AtmaKaragam: `${atma} , ${atma_names[atma]}`,
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
    const storedData = JSON.parse(localStorage.getItem("freeReport"));
    const childDetails = JSON.parse(localStorage.getItem("childDetails"));
    if (storedData && childDetails) {
      setPanchangData(storedData);
      setUserDetails(childDetails);
      setName(childDetails.name.split(" ")[0]);
    }
  }, []);

  useEffect(() => {
    setDisplayContent();
  }, [userDetails, panchangData]);

  if (!panchangData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B1F3B]">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl animate-pulse">
          <p className="text-xl font-semibold text-[#2DB787]">
            Loading Your Cosmic Profile...
          </p>
        </div>
      </div>
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

  const router = useRouter();

  return (
    <>
      <Header />
      <div className="w-screen min-h-screen bg-white py-16 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-2/3 space-y-12">
            <section className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-1000">
              <h1 className="text-[40px] font-bold text-center leading-[1.2] text-[#2DB787]">
                {name}'s Celestial Journey 🌟
              </h1>
              <p className="text-[16px] text-[#6F6C90] mt-4 text-center leading-[1.2]">
                The Precious Child Born on the auspicious day{" "}
                <span className="font-bold text-[#FFEB3B]">
                  {formatDob(userDetails.dob)}
                </span>{" "}
                at{" "}
                <span className="font-bold text-[#FFEB3B]">
                  {formatTime(userDetails.time)}
                </span>
                , in{" "}
                <span className="font-bold text-[#FFEB3B]">
                  {userDetails.place}
                </span>
                .
              </p>
            </section>

            <section className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-[24px] font-bold text-[#2DB787] mb-6 text-center">
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
                    <h3 className="text-[18px] font-semibold text-[#2DB787] mb-3">
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
                    <p className="text-[16px] font-medium text-[#6F6C90]">
                      {item.sign}
                    </p>
                  </div>
                ))}
              </div>
              <button
                className="px-4 py-2 mt-5 mx-auto font-medium rounded-lg flex justify-center items-center gap-2 border border-[#2DB787] text-[#2DB787] hover:bg-[#2DB787] hover:text-white transition-all duration-300"
                onClick={() => setIsTrueSelfOpen(true)}
              >
                Explore True Self
              </button>
            </section>

            {isTrueSelfOpen && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 w-[95%] md:w-[60%] max-h-[80vh] overflow-y-auto relative shadow-2xl border border-gray-100">
                  <div className="sticky top-0 flex justify-end">
                    <button
                      className="text-[#6F6C90] hover:text-[#2DB787] transition-colors duration-200"
                      onClick={() => setIsTrueSelfOpen(false)}
                    >
                      <X size={28} className="p-1 bg-gray-100 rounded-full" />
                    </button>
                  </div>
                  <h2 className="text-[28px] font-bold text-[#2DB787] mb-6 text-center">
                    {name}'s True Self 🌟
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
                        <h3 className="text-[18px] font-semibold text-[#2DB787] mb-3">
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
                        <p className="text-[16px] font-medium text-[#6F6C90]">
                          {item.sign}
                        </p>
                        <div className="mt-4">
                          <h4 className="text-[16px] font-semibold text-[#2DB787] mb-2">
                            {name}'s {item.heading}
                          </h4>
                          <p className="text-[14px] text-[#8F8F8F]">
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
              <h2 className="text-[24px] font-bold text-[#2DB787] mb-6 text-center">
                Astrological Insights
              </h2>
              {content && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(content).map(([key, value], index) => (
                    <div
                      key={index}
                      className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <span className="font-semibold text-[#2DB787] capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>{" "}
                      <span className="text-[#6F6C90]">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {constitution && (
              <section className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-[24px] font-bold text-[#2DB787] mb-6 text-center">
                  {name}'s Body is Dominated By {constitutionType} Nature
                </h2>
                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                  {["strength", "weakness", "remedie"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setActiveTab("remedie" === tab ? "remedy" : tab)
                      }
                      className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-md ${
                        (activeTab === "remedy" && tab === "remedie") ||
                        activeTab === tab
                          ? "bg-[#2DB787] shadow-lg"
                          : "bg-[#6F6C90] hover:bg-[#2DB787]"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}s
                    </button>
                  ))}
                </div>
                <div className="space-y-6">
                  {activeTab === "strength" && (
                    <>
                      <h3 className="text-[20px] font-semibold text-[#2DB787] mb-4 text-center">
                        {name}'s Biggest Strengths
                      </h3>
                      {constitution.strength.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <h4 className="text-[16px] font-semibold text-[#2DB787]">
                            {item.title
                              .replaceAll("child", name.toLowerCase())
                              .replaceAll("Child", name)}
                          </h4>
                          <p className="text-[#6F6C90] mt-1">
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
                      <h3 className="text-[20px] font-semibold text-[#2DB787] mb-4 text-center">
                        ⚖️ Areas to Balance
                      </h3>
                      {constitution.weakness.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <h4 className="text-[16px] font-semibold text-[#2DB787]">
                            {item.title
                              .replaceAll("child", name.toLowerCase())
                              .replaceAll("Child", name)}
                          </h4>
                          <p className="text-[#6F6C90] mt-1">
                            {item.con
                              .replaceAll("child", name.toLowerCase())
                              .replaceAll("Child", name)}
                          </p>
                        </div>
                      ))}
                      <p className="text-[#8F8F8F] italic mt-4">
                        {constitution.weaknessNote
                          .replaceAll("child", name.toLowerCase())
                          .replaceAll("Child", name)}
                      </p>
                    </>
                  )}
                  {activeTab === "remedy" && (
                    <>
                      <h3 className="text-[20px] font-semibold text-[#2DB787] mb-4 text-center">
                        {constitution.remedyTitle
                          .replaceAll("child", name.toLowerCase())
                          .replaceAll("Child", name)}
                      </h3>
                      {constitution.remedy.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#EBEFF0] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <h4 className="text-[16px] font-semibold text-[#2DB787]">
                            {item.title
                              .replaceAll("child", name.toLowerCase())
                              .replaceAll("Child", name)}
                          </h4>
                          <p className="text-[#6F6C90] mt-1">
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

            <section className="bg-gradient-to-br from-[#2DB787] to-[#FFEB3B] text-white rounded-3xl shadow-2xl p-8 mt-12 hover:shadow-3xl transition-all duration-1000">
              <h2 className="text-[24px] font-bold text-center mb-4">
                Unlock <span className="text-white">{name}</span>’s Full
                Potential ✨
              </h2>
              <p className="text-[16px] text-center leading-[1.2] mb-6">
                Discover <span className="font-semibold">{name}</span>’s hidden
                talents, emotional needs, and growth pathways — be the best mom
                or dad your child deserves 💛
              </p>
              <p className="text-[18px] text-center font-semibold mb-6">
                👉 Get Your Personalized Plan Today and Transform{" "}
                <span className="text-white">{name}</span>’s Future!
              </p>
              <div className="flex justify-center">
                <Link href="/plans">
                  <button className="bg-white text-[#2DB787] px-8 py-3 rounded-lg font-semibold text-[16px] hover:bg-[#FFEB3B] hover:scale-105 transition-all duration-300 shadow-md">
                    Explore Astro Kids Plans
                  </button>
                </Link>
              </div>
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
                  className="p-0.5 w-full rounded-3xl hover:shadow-2xl hover:-translate-y-5 bg-gradient-to-br from-[#2DB787] to-[#FFEB3B] transition-all duration-1000"
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
                      className="w-full bg-[#2DB787] text-white py-3 rounded-lg cursor-pointer hover:bg-[#239670] transition-all duration-300"
                      onClick={() =>
                        router.push(
                          `/child-details?product=true&productIndex=${
                            index + 1
                          }`
                        )
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <NewFooter />
    </>
  );
};

export default PanchangDisplay;
