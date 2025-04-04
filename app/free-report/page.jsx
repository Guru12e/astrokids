"use client";

import { useEffect, useState } from "react";

export default function PanchangDisplay() {
  const [panchangData, setPanchangData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("freeReport");
    if (storedData) {
      setPanchangData(JSON.parse(storedData));
    }
  }, []);

  if (!panchangData) {
    return (
      <div className="text-center p-4 text-gray-500">
        No Panchang data available
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Panchang Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <p>
            <span className="font-semibold">Ganam:</span>{" "}
            {panchangData.panchang.ganam}
          </p>
          <p>
            <span className="font-semibold">Karanam:</span>{" "}
            {panchangData.panchang.karanam} (
            {panchangData.panchang.karanam_number})
          </p>
          <p>
            <span className="font-semibold">Nakshatra:</span>{" "}
            {panchangData.panchang.nakshatra} (
            {panchangData.panchang.nakshatra_number})
          </p>
          <p>
            <span className="font-semibold">Paksha:</span>{" "}
            {panchangData.panchang.paksha}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <p>
            <span className="font-semibold">Sunrise:</span>{" "}
            {panchangData.panchang.sunrise}
          </p>
          <p>
            <span className="font-semibold">Sunset:</span>{" "}
            {panchangData.panchang.sunset}
          </p>
          <p>
            <span className="font-semibold">Thithi:</span>{" "}
            {panchangData.panchang.thithi} (
            {panchangData.panchang.thithi_number})
          </p>
          <p>
            <span className="font-semibold">Weekday:</span>{" "}
            {panchangData.panchang.week_day}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded mb-6">
        <p>
          <span className="font-semibold">Yoga:</span>{" "}
          {panchangData.panchang.yoga} ({panchangData.panchang.yoga_index})
        </p>
        <p>
          <span className="font-semibold">Yoni:</span>{" "}
          {panchangData.panchang.yoni}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Planetary Positions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {panchangData.planets.map((planet, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded border">
              <p>
                <span className="font-semibold">{planet.Name}:</span>
              </p>
              <p>Degree: {planet.full_degree.toFixed(2)}</p>
              <p>Sign: {planet.sign}</p>
              <p>Nakshatra: {planet.nakshatra}</p>
              <p>Retrograde: {planet.isRetro ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
