"use client";

import {
  lagnaIdentity,
  moonIdentity,
  nakshatraIdentity,
  sunIdentity,
} from "@/constant/constant";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function FlipCards({ panchangData, name }) {
  const items = [
    {
      title: "Ascendant (Lagna)",
      sign: panchangData.planets[0].sign,
      heading: "Defines life direction, personality, and appearance.",
      identity: lagnaIdentity[panchangData.planets[0].sign],
    },
    {
      title: "Moon (Rasi)",
      sign: panchangData.planets[2].sign,
      heading: "Governs emotions, feelings, and moods, reactions.",
      identity: moonIdentity[panchangData.planets[2].sign],
    },
    {
      title: "Sun (Identity)",
      sign: panchangData.planets[1].sign,
      heading: "Represents core identity, purpose, and vitality.",
      identity: sunIdentity[panchangData.planets[1].sign],
    },
    {
      title: "Nakshatra",
      sign: panchangData.panchang.nakshatra,
      heading: "Reveals Inner instincts, Life Path, and spiritual drive.",
      identity: nakshatraIdentity[panchangData.panchang.nakshatra],
    },
  ];

  const cardRefs = useRef([]);

  useEffect(() => {
    if (window.innerWidth > 768) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.classList.add("flipped");
          } else {
            target.classList.remove("flipped");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-40% 0px -80% 0px",
      }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          ref={(el) => (cardRefs.current[idx] = el)}
          className="flip-card cursor-pointer"
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3 className="text-[18px] font-semibold text-[#6F8BEF] mb-3">
                {item.title}
              </h3>

              <div className="relative w-36 h-36 mx-auto mb-4">
                <Image
                  src={
                    item.title === "Nakshatra"
                      ? `/images/new/nakshatra/${panchangData.panchang.nakshatra_number}.jpg`
                      : `/images/new/${item.sign}.png`
                  }
                  alt={item.title}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>

              <p className="text-[16px] capitalize font-medium text-[#6F6C90]">
                {item.sign}
              </p>
            </div>

            <div className="flip-card-back flex flex-col justify-between bg-white h-full">
              <p className="text-xl font-bold text-center capitalize leading-[1.2]">
                {item.title}: {item.sign}
              </p>
              <p className="text-xl font-semibold text-center capitalize leading-[1.2] opacity-90">
                {item.heading}
              </p>
              {item.identity ? (
                <p className="text-base font-medium text-center italic">
                  “
                  {item.identity
                    .replaceAll("child", name)
                    .replaceAll("Child", name)}
                  ”
                </p>
              ) : (
                <p className="text-sm">No identity content available</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
