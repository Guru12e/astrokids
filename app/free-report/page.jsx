"use client";

import Header from "@/components/Header";
import { lagnaIdentity, moonIdentity, sunIdentity } from "@/constant/constant";
import Image from "next/image";
import { useEffect, useState } from "react";

const PanchangDisplay = () => {
  const [panchangData, setPanchangData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("freeReport"));
    const childDetails = JSON.parse(localStorage.getItem("childDetails"));
    if (storedData && childDetails) {
      setUserDetails(childDetails);
      setPanchangData(storedData);
      setName(childDetails.name.split(" ")[0]);
    }
    setDisplayContent();
  }, []);

  const setDisplayContent = () => {
    setContent({
      name: panchangData.name,
      dob: panchangData.dob,
      time: panchangData.time,
      place: panchangData.place,
      nakshatra: panchangData.panchang.nakshatra,
      rasi: panchangData.panchang.sign,
      lagna: `${panchangData.plants[0].sign} , ${panchangData.planets[0].zodiacLord}`,
      tithi: panchangData.panchang.tithi,
      nithyaYogam: panchangData.panchang.yoga,
      karanam: panchangData.panchang.karanam,
      weekDay: panchangData.panchang.week,
    });
  };

  //   Atma Karagam, Lord : Venus,Goddess Lakshmi
  // Ishta Devata : Lord Hanuman
  // Benefic Stars : Krittika, Uttara Phalguni, Uttara Ashadha,
  // Benefic Number : 2,6
  // Life Stone : Diamond
  // Benefictical Stone : Blue Sapphire
  // Lucky Stone : Emerald

  if (!panchangData) {
    return (
      <div className="text-center p-4 text-gray-500">
        No Panchang data available
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

  content.return(
    <>
      <Header />
      <div className="w-screen flex flex-col md:flex-row mt-16 gap-5">
        <div className="w-full md:w-2/3">
          <h1>
            The Precious Child Born on the auspicious day{" "}
            {userDetails.dob.split("-")[2]}{" "}
            {months[parseInt(userDetails.dob.split("-")[1]) - 1]}{" "}
            {userDetails.dob.split("-")[0]} at{" "}
            {parseInt(userDetails.time.split(":")[0]) > 12
              ? `${parseInt(userDetails.time.split(":")[0]) - 12}:${
                  userDetails.time.split(":")[1]
                } PM`
              : `${parseInt(userDetails.time.split(":")[0])} : ${
                  userDetails.time.split(":")[1]
                } AM`}
            . Place of birth is {userDetails.place}.
          </h1>
          <h1>{name}'s True Self</h1>
          <h2>
            Let's take a look at the three most influential and important sign
            for {name}!
          </h2>
          <p>As per {name}'s kundli,</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
              <h1>Ascendant</h1>
              <div className="w-[60%] mx-auto aspect-square relative">
                <Image
                  src={`/images/new/${panchangData.planets[0].sign}.png`}
                  alt="Ascendant"
                  fill
                />
              </div>
              <p>{panchangData.planets[0].sign}</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
              <h1>Moon</h1>
              <div className="w-[60%] mx-auto aspect-square relative">
                <Image
                  src={`/images/new/${panchangData.planets[2].sign}.png`}
                  alt="Ascendant"
                  fill
                />
              </div>
              <p>{panchangData.planets[2].sign}</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
              <h1>Sun</h1>
              <div className="w-[60%] mx-auto aspect-square relative">
                <Image
                  src={`/images/new/${panchangData.planets[1].sign}.png`}
                  alt="Ascendant"
                  fill
                />
              </div>
              <p>{panchangData.planets[1].sign}</p>
            </div>
          </div>
          <div>
            <h1>{name}'s Personality</h1>
            <p>
              {lagnaIdentity[panchangData.planets[0].sign]
                .replaceAll("child", name.toLowerCase())
                .replaceAll("Child", name)}
            </p>
          </div>
          <div>
            <h1>{name}'s Emotions</h1>
            <p>
              {moonIdentity[panchangData.planets[2].sign]
                .replaceAll("child", name.toLowerCase())
                .replaceAll("Child", name)}
            </p>
          </div>
          <div>
            <h1>{name}'s Core Identity</h1>
            <p>
              {sunIdentity[panchangData.planets[1].sign]
                .replaceAll("child", name.toLowerCase())
                .replaceAll("Child", name)}
            </p>
          </div>
          <div>
            {Object.keys(content).map((key, index) => (
              <div key={index} className="flex flex-col mt-4">
                <h1>
                  {key} : {content[key]}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3"></div>
      </div>
    </>
  );
};

export default PanchangDisplay;
