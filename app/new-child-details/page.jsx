"use client";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import locationData from "@/constant/processed_places.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { pricing } from "@/constant/constant";
import { toast } from "react-toastify";

const NewChildDetails = () => {
  const [loading, setloading] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [adminOtp, setAdminOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [latLon, setLatLon] = useState({ lat: 0, lon: 0 });
  const router = useRouter();
  const orderId = useSearchParams().get("orderId");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [noCity, setNoCity] = useState(false);
  const [countryInput, setCountryInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const stateInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;

    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleFocus = (e) => {
    e.target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const handleCountryInputChange = (e) => {
    setFilteredStates([]);
    setFilteredCities([]);
    const value = e.target.value;
    setCountryInput(value);
    if (value) {
      setFilteredCountries(
        Object.keys(locationData).filter((country) =>
          country.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredCountries([]);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryInput(country);
    setFilteredCountries([]);
    setStateInput("");
    setCityInput("");
    setFilteredCities([]);
    setSelectedState("");
    setSelectedCity("");
    stateInputRef.current?.focus();
  };

  const handleStateInputChange = (e) => {
    setFilteredCities([]);
    const value = e.target.value;
    setStateInput(value);
    if (value) {
      setFilteredStates(
        Object.keys(locationData[selectedCountry]).filter((state) =>
          state.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredStates([]);
    }
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setStateInput(state);
    setFilteredStates([]);
    setCityInput("");
    setFilteredCities(
      locationData[selectedCountry][state].map((city) => city.name)
    );
    const data = locationData[selectedCountry][state];
    if (data.length === 0) {
      setNoCity(true);
      setPlace(`${state} , ${selectedCountry}`);
    } else {
      setNoCity(false);
    }
    setSelectedCity("");
    cityInputRef.current?.focus();
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCityInput(value);
    if (value) {
      setFilteredCities(
        locationData[selectedCountry][selectedState]
          .map((city) => city.name)
          .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setFilteredCities([]);
    }
  };

  useEffect(() => {
    if (selectedState && cityInputRef.current) {
      cityInputRef.current.focus();
    }
  }, [selectedState]);

  useEffect(() => {
    const india = Object.keys(locationData).filter((country) =>
      country.toLowerCase().includes("India".toLowerCase())
    );

    if (india.length > 0) {
      setSelectedCountry(india[1]);
      setCountryInput(india[1]);
      setFilteredCountries([]);
    }
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCityInput(city);
    setPlace(`${city}, ${selectedState} , ${selectedCountry}`);
    const selected = locationData[selectedCountry][selectedState].find(
      (c) => c.name === city
    );

    setLatLon({ lat: selected.lat, lon: selected.lon });
    setFilteredCities([]);
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setParentEmail(localStorage.getItem("email"));
      setEmailVerified(true);
    }
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setloading(true);

    if (emailVerified) {
      if (
        !name.trim() ||
        !dob.trim() ||
        !time.trim() ||
        !gender.trim() ||
        !number.trim()
      ) {
        toast.error("Please fill all fields", {
          position: "top-right",
        });
        setloading(false);
        return;
      }
      if (!place.trim()) {
        toast.error("Select Place From the Dropdown", {
          position: "top-right",
        });
        setloading(false);
        return;
      } else {
      }
    } else {
      toast.error("Please Verify Email", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div className="w-full md:w-2/3 min-h-screen flex-col gap-4 bg-gradient-to-b from-[#2DB787]/20 to-[#FFEB3B]/20 p-5 md:p-8 flex items-start justify-center">
        <ArrowLeft className="w-9 h-9 p-2 text-black bg-white rounded-full" />
        <div className="flex-1 w-[90%] mx-auto flex flex-col gap-4 justify-center">
          <h1 className="text-[24px] font-bold leading-[1.2]">
            Join our community of 10,000+ super parents
          </h1>
          <form
            id="child-details"
            ref={formRef}
            onSubmit={handleSumbit}
            className="w-full flex flex-col"
          >
            <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="w-full">
                <label className="block text-[14px] font-normal mb-1">
                  Child Name
                </label>
                <input
                  type="text"
                  onFocus={handleFocus}
                  value={name}
                  placeholder="Child's Name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border text-gray-700 bg-white outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all placeholder:text-black"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-[14px] font-normal mb-1">
                  Child Date of Birth
                </label>
                <input
                  type="date"
                  onFocus={handleFocus}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full p-2 border text-gray-700 bg-white outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                  required
                />
              </div>
            </div>
            <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="w-full">
                <label className="block text-[14px] font-normal mb-1">
                  Child Birth Time
                </label>
                <input
                  type="time"
                  value={time}
                  onFocus={handleFocus}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 border text-gray-700 bg-white outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                  required
                />
              </div>
              <div className="w-full relative">
                <label className="block text-[14px] font-normal mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={countryInput}
                  onFocus={handleFocus}
                  placeholder="Type First Two letters"
                  onChange={handleCountryInputChange}
                  required
                  className="w-full p-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                />
                {filteredCountries.length > 0 && (
                  <ul className="absolute z-10 w-full bg-gray-200 border-gray-300 rounded shadow-md max-h-60 overflow-auto">
                    {filteredCountries.map((country, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-purple-500 hover:text-white"
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {selectedCountry && (
                <div className="relative">
                  <label className="block text-[14px] font-normal mb-1">
                    State
                  </label>
                  <input
                    ref={stateInputRef}
                    type="text"
                    required
                    onFocus={handleFocus}
                    value={stateInput}
                    placeholder="Type First Two letter"
                    onChange={handleStateInputChange}
                    className="w-full p-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                  />
                  {filteredStates.length > 0 && (
                    <ul className="absolute z-10 w-full bg-gray-200 border-gray-300 rounded shadow-md max-h-60 overflow-auto">
                      {filteredStates.map((state, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-purple-500 hover:text-white"
                          onClick={() => handleStateSelect(state)}
                        >
                          {state}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {selectedState && !noCity && (
                <div className="relative">
                  <label className="block text-[14px] font-normal mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    onFocus={handleFocus}
                    ref={cityInputRef}
                    value={cityInput}
                    required
                    placeholder="Type First Two letter"
                    onChange={handleCityInputChange}
                    className="w-full p-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                  />
                  {filteredCities.length > 0 && (
                    <ul className="absolute z-10 w-full bg-gray-200 border-gray-300 rounded shadow-md max-h-60 overflow-auto">
                      {filteredCities.map((city, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-purple-500 hover:text-white"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="w-full">
                <label className="block text-[14px] font-normal mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onFocus={handleFocus}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full py-3 px-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-[14px] font-normal mb-1">
                  Phone Number
                </label>
                <input
                  placeholder="Phone Number"
                  type="number"
                  value={number}
                  onFocus={handleFocus}
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full p-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                  required
                />
              </div>
            </div>
            {emailVerified ? (
              <div className="w-full mt-2 mb-4 flex gap-2 items-center border border-black rounded-lg p-2">
                <div className="flex-1 w-[80%] text-ellipsis overflow-hidden whitespace-nowrap">
                  {parentEmail}
                </div>
                <Pencil
                  size={15}
                  className="cursor-pointer flex-shrink-0"
                  onClick={() => {
                    setEmailVerified(false);
                    localStorage.removeItem("email");
                  }}
                />
              </div>
            ) : (
              <div className="w-full mt-2 grid grid-cols-1 mb-4">
                <div className="w-full">
                  <label className="block text-[14px] font-normal mb-1">
                    Parent Email{" "}
                    <span className="text-[#9396A3]">
                      (Report will be shared on your whatsApp)
                    </span>
                  </label>
                  <input
                    type="text"
                    onFocus={handleFocus}
                    value={parentEmail}
                    placeholder="Enter Email Manually"
                    autoComplete="new-email"
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full p-2 border text-black placeholder:text-black bg-white outline-none border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
            )}
            <button className="px-4 w-full mx-auto py-2 font-bold rounded-lg flex justify-center items-center gap-2 new-gradient hover:brightness-110 transition-all capitalize mt-5">
              Proceed to pay
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/3 mt-5 md:mt-0 h-full flex justify-center items-center">
        <div className="w-[70%]">
          <h1 className="text-[#111729] font-semibold text-[24px] leading[1.2]">
            Your Order
          </h1>
          <div className="bg-[#2DB787] rounded-xl mt-4 pb-1">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setApi}
            >
              <CarouselContent>
                {pricing.map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="w-[120px] aspect-[9/16] mx-auto relative">
                      <Image
                        src={`/images/book-cover${index}.png`}
                        alt={`book-cover`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="translate-x-[80%]" />
              <CarouselNext className="-translate-x-[80%]" />
            </Carousel>
            <div className="flex justify-center my-2 space-x-2">
              {pricing.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => handleSlideChange(index)}
                />
              ))}
            </div>
          </div>
          <h1 className="text-[16px] font-bold leading-[1.2] text-[#111729] my-5">
            {pricing[currentIndex].title}
          </h1>
          <div className="bg-[#E3E8EF] w-full h-[1px]"></div>
          <div className="my-5 flex flex-col gap-3">
            <div className="flex w-full justify-between">
              <h1 className="text-[16px] font-normal text-[#677489]">
                Subtotal
              </h1>
              <p className="text-[16px] text-[#111729] font-normal">
                {parseInt(pricing[currentIndex].price) + 200}.00
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h1 className="text-[16px] font-normal text-[#677489]">
                Discount (30%)
              </h1>
              <p className="text-[16px] text-[#111729] font-normal">200.00</p>
            </div>
          </div>
          <div className="bg-[#E3E8EF] w-full h-[1px]"></div>
          <div className="flex w-full mt-4 justify-between">
            <h1 className="text-[16px] font-bold text-[#111729]">Total</h1>
            <p className="text-[16px] text-[#111729] font-semibold">
              {parseInt(pricing[currentIndex].price) + 200}.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  +20;
};

export default NewChildDetails;
