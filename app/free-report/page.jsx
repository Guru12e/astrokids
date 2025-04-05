"use client";

import Header from "@/components/Header";
import {
  atma_names,
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

const PanchangDisplay = () => {
  const [panchangData, setPanchangData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState(null);
  const [content, setContent] = useState(null);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg animate-pulse">
          <p className="text-xl font-semibold text-indigo-600">
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

  return (
    <>
      <Header />
      <div className="w-screen min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 py-16 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="w-full md:w-2/3 space-y-12">
            {/* Birth Details */}
            <section className="bg-white rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4">
                {name}'s Celestial Journey
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Born under the stars on{" "}
                <span className="font-bold text-indigo-600">
                  {formatDob(userDetails.dob)}
                </span>{" "}
                at{" "}
                <span className="font-bold text-indigo-600">
                  {formatTime(userDetails.time)}
                </span>
                , in{" "}
                <span className="font-bold text-indigo-600">
                  {userDetails.place}
                </span>
                .
              </p>
            </section>

            {/* True Self */}
            <section className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-indigo-700 mb-6">
                Cosmic Triad: {name}'s Core Essence
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Ascendant", sign: panchangData.planets[0].sign },
                  { title: "Moon", sign: panchangData.planets[2].sign },
                  { title: "Sun", sign: panchangData.planets[1].sign },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-indigo-600 mb-3">
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
                    <p className="text-lg font-medium text-gray-800">
                      {item.sign}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Personality Traits */}
            <section className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-indigo-700 mb-6">
                {name}'s Cosmic Personality
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Personality (Ascendant)",
                    text: lagnaIdentity[panchangData.planets[0].sign],
                  },
                  {
                    title: "Emotions (Moon)",
                    text: moonIdentity[panchangData.planets[2].sign],
                  },
                  {
                    title: "Core Identity (Sun)",
                    text: sunIdentity[panchangData.planets[1].sign],
                  },
                ].map((trait, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-indigo-500 pl-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {trait.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {trait.text
                        .replaceAll("child", name.toLowerCase())
                        .replaceAll("Child", name)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Astrological Details */}
            <section className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-indigo-700 mb-6">
                Astrological Insights
              </h2>
              {content && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(content).map(([key, value], index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <span className="font-semibold text-indigo-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>{" "}
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-1/3">
            <div className="sticky top-20 space-y-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
                Unlock More Insights
              </h2>
              {pricing.slice(1, 4).map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <Image
                      src={`/images/book-cover${index + 1}.png`}
                      fill
                      className="object-contain drop-shadow-lg"
                      alt={item.title}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-indigo-700 text-center mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {item.content}
                  </p>
                  <p className="text-2xl font-bold text-purple-600 text-center mb-4">
                    ₹{item.price}
                  </p>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default PanchangDisplay;
