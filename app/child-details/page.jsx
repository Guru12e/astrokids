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
import Loader from "@/components/Loader";
import Script from "next/script";

const NewChildDetails = () => {
  const [loading, setLoading] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [adminOtp, setAdminOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [latLon, setLatLon] = useState({ lat: 0, lon: 0 });
  const router = useRouter();
  const edit = useSearchParams().get("fieldEdit") || false;
  const paymentEdit = useSearchParams().get("paymentEdit") || false;
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
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const stateInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const [api, setApi] = useState(null);
  const orderIndex = useSearchParams().get("productIndex") || 0;
  const product = useSearchParams().get("product") || false;
  const [currentIndex, setCurrentIndex] = useState(orderIndex);

  const createOrder = async () => {
    setLoading(true);

    if (emailVerified) {
      if (
        !name.trim() ||
        !dob.trim() ||
        !time.trim() ||
        !gender.trim() ||
        !number.trim()
      ) {
        toast.error("Please fill all fields", { position: "top-right" });
        setLoading(false);
        return;
      }
      if (!place.trim()) {
        toast.error("Select Place From the Dropdown", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }
      setEditLoading(true);
      if (paymentEdit) {
        const res = await fetch("/api/updateChild", {
          method: "POST",
          body: JSON.stringify({
            email: parentEmail,
            name,
            dob,
            time,
            place,
            gender,
            number,
            orderId,
          }),
        });
        if (res.status === 200) {
          toast.success("Child Details Updated", { position: "top-right" });
          router.push("/");
        } else {
          toast.error("Error Updating Child Details", {
            position: "top-right",
          });
        }
      } else {
        const res = await fetch("/api/checkChildDetails", {
          method: "POST",
          body: JSON.stringify({
            email: parentEmail,
            name,
            dob,
            time,
            place,
            gender,
            number,
          }),
        });
        if (res.status === 200) {
          localStorage.setItem(
            "childDetails",
            JSON.stringify({
              name,
              dob,
              time,
              place,
              gender,
              number,
              lat: latLon.lat,
              lon: latLon.lon,
            })
          );
          let res;

          res = await fetch("/api/createOrder", {
            method: "POST",
            body: JSON.stringify({
              amount: parseInt(pricing[currentIndex].price) * 100,
              currency: "INR",
            }),
          });

          const dataId = await res.json();

          const paymentData = {
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: dataId.id,

            handler: async function (response) {
              setLoading(true);
              const res = await fetch("/api/verifyOrder", {
                method: "POST",
                body: JSON.stringify({
                  orderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });

              const res1 = await fetch("/api/addChildDetails", {
                method: "POST",
                body: JSON.stringify({
                  email: parentEmail,
                  name: name,
                  dob: dob,
                  time: time,
                  place: place,
                  gender: gender,
                  number: number,
                  lat: latLon.lat,
                  lon: latLon.lon,
                  orderId: dataId.id,
                  plan: pricing[currentIndex].title,
                }),
              });

              if (res1.status === 200) {
                localStorage.removeItem("childDetails");
                toast.success("Payment Success Check Mail For Updates", {
                  position: "top-right",
                  autoClose: 3000,
                });
                router.replace("/");
              }
            },

            prefill: {
              name: name,
              email: parentEmail,
              contact: number,
            },
          };

          const payment = new window.Razorpay(paymentData);

          setLoading(false);
          payment.open();
        } else {
          toast.error("Child Details with this Name is Already found", {
            position: "top-right",
          });
        }
      }
      setEditLoading(false);
    } else {
      toast.error("Please Verify Email", { position: "top-right" });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!api) return;

    const initialIndex = parseInt(orderIndex, 10);
    if (
      !isNaN(initialIndex) &&
      initialIndex >= 0 &&
      initialIndex < pricing.length
    ) {
      setCurrentIndex(initialIndex);
      api.scrollTo(initialIndex);
    }
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleFocus = (e) => {
    e.target.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const handleChange = (value, index) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (edit || paymentEdit) return;
    const india = Object.keys(locationData).filter((country) =>
      country.toLowerCase().includes("India".toLowerCase())
    );
    if (india.length > 0) {
      setSelectedCountry(india[1]);
      setCountryInput(india[1]);
      setFilteredCountries([]);
    }
  }, [edit, paymentEdit]);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setParentEmail(localStorage.getItem("email"));
      setEmailVerified(true);
    }
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (selectedState && cityInputRef.current) {
      cityInputRef.current.focus();
    }
  }, [selectedState]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (paymentEdit) {
        setEmailVerified(true);
        setLoading(true);
        const res = await fetch("/api/getUser", {
          method: "POST",
          body: JSON.stringify({ orderId }),
        });
        setLoading(false);
        if (res.status === 200) {
          const data = await res.json();
          setParentEmail(data.email);
          setName(data.childDetails.name);
          setDob(data.childDetails.dob);
          setTime(data.childDetails.time);
          setPlace(data.childDetails.place);
          setGender(data.childDetails.gender);
          setNumber(data.childDetails.number);
          setSelectedCountry(data.childDetails.place.split(",")[2].trim());
          setSelectedState(data.childDetails.place.split(",")[1].trim());
          setSelectedCity(data.childDetails.place.split(",")[0].trim());
          setCountryInput(data.childDetails.place.split(",")[2]);
          setStateInput(data.childDetails.place.split(",")[1]);
          setCityInput(data.childDetails.place.split(",")[0]);
        } else if (res.status === 400) {
          const data = await res.json();
          toast.error(data.message, { position: "top-right" });
          router.push("/");
        }
      }
    };
    fetchDetails();
  }, [paymentEdit, router]);

  useEffect(() => {
    if (edit) {
      const childDetails = JSON.parse(localStorage.getItem("childDetails"));
      setEmailVerified(true);
      setName(childDetails.name);
      setDob(childDetails.dob);
      setTime(childDetails.time);
      setPlace(childDetails.place);
      setGender(childDetails.gender);
      setNumber(childDetails.number);
      setSelectedCountry(childDetails.place.split(",")[2].trim());
      setSelectedState(childDetails.place.split(",")[1].trim());
      setSelectedCity(childDetails.place.split(",")[0].trim());
      setCountryInput(childDetails.place.split(",")[2]);
      setStateInput(childDetails.place.split(",")[1]);
      setCityInput(childDetails.place.split(",")[0]);
    }
  }, [edit]);

  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!parentEmail) {
      toast.error("Enter email", { position: "top-right" });
      setLoading(false);
      return;
    }
    if (!parentEmail.includes("@")) {
      toast.error("Enter valid email", { position: "top-right" });
      setLoading(false);
      return;
    }
    if (
      !name.trim() ||
      !dob.trim() ||
      !time.trim() ||
      !gender.trim() ||
      !number.trim()
    ) {
      toast.error("Fill all details", { position: "top-right" });
      setLoading(false);
      return;
    }
    if (!place.trim()) {
      toast.error("Select Place From the Dropdown", { position: "top-right" });
      setLoading(false);
      return;
    }

    const checkRes = await fetch("/api/checkChildDetails", {
      method: "POST",
      body: JSON.stringify({
        email: parentEmail,
        name,
        dob,
        time,
        place,
        gender,
        number,
      }),
    });

    if (checkRes.status === 200) {
      const res = await fetch("/api/otpVerify", {
        method: "POST",
        body: JSON.stringify({ email: parentEmail }),
      });
      if (res.status === 200) {
        setOtpSend(true);
        const data = await res.json();
        setAdminOtp(data.message);
        setResendTimer(30);
      } else {
        toast.error("Check Email", { position: "top-right" });
      }
    }
    setLoading(false);
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setOtpVerifyLoading(true);

    const userOtp = otp.join("");
    const res = await fetch("/api/confirm-otp", {
      method: "POST",
      body: JSON.stringify({
        encryptedOtp: adminOtp,
        otp: userOtp,
      }),
    });

    if (res.status === 200) {
      localStorage.setItem("email", parentEmail);
      setEmailVerified(true);
      localStorage.setItem(
        "childDetails",
        JSON.stringify({
          name,
          dob,
          time,
          place,
          gender,
          number,
          lat: latLon.lat,
          lon: latLon.lon,
        })
      );
      setOtpVerifyLoading(false);
      if (product) {
        router.push(`/confirm-order?product=true&productIndex=${orderIndex}`);
      } else {
        router.push("/confirm-order");
      }
      toast.success("Email Verified", { position: "top-right" });
    } else {
      setOtpVerifyLoading(false);
      setEmailVerified(false);
      toast.error("Invalid OTP", { position: "top-right" });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-screen min-h-screen flex flex-col items-center justify-center md:flex-row md:justify-between">
            <div className="w-full md:w-2/3 min-h-screen flex-col gap-4 bg-gradient-to-b from-[#2DB787]/20 to-[#FFEB3B]/20 p-5 md:p-8 flex items-start justify-center">
              <ArrowLeft
                className="w-9 h-9 p-2 text-black bg-white rounded-full cursor-pointer"
                onClick={() => router.back()}
              />
              <div className="flex-1 w-[90%] mx-auto flex flex-col gap-4 justify-center">
                <h1 className="text-[24px] font-bold leading-[1.2]">
                  Join our community of 10,000+ super parents
                </h1>
                {otpSend ? (
                  <div className="w-full flex flex-col gap-4">
                    <h1 className="text-xl text-center text-gray-700">
                      Check Mail For OTP
                    </h1>
                    <div
                      className="flex gap-1 items-center cursor-pointer hover:underline self-center"
                      onClick={() => setOtpSend(false)}
                    >
                      <p className="text-sm">Edit Details</p>
                      <Pencil size={15} />
                    </div>
                    <form
                      onSubmit={handleOtpVerify}
                      className="w-full flex flex-col gap-4"
                    >
                      <div className="flex w-full gap-2 justify-center">
                        {[...Array(4)].map((_, index) => (
                          <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            id="otp"
                            value={otp[index]}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center border rounded-lg text-2xl text-gray-700 bg-white outline-none border-gray-300 focus:ring focus:ring-purple-300 transition-all"
                            maxLength="1"
                            required
                          />
                        ))}
                      </div>
                      <button
                        type="submit"
                        disabled={otpVerifyLoading}
                        className="px-4 w-max mx-auto py-2 font-bold rounded-lg flex justify-center items-center gap-2 new-gradient hover:brightness-110 transition-all capitalize"
                      >
                        {otpVerifyLoading ? "Loading..." : "Verify OTP"}
                        <ArrowRight size={20} />
                      </button>
                      <div className="self-center">
                        <button
                          onClick={(e) => {
                            setResendTimer(30);
                            setAdminOtp("");
                            handleEmail(e);
                          }}
                          disabled={resendTimer > 0}
                          className={`p-2 text-sm w-max mx-auto font-bold rounded ${
                            resendTimer > 0
                              ? "bg-gray-300 text-gray-500"
                              : "bg-pink-500 text-white hover:bg-pink-600"
                          }`}
                        >
                          {resendTimer > 0
                            ? `Resend OTP in ${resendTimer}s`
                            : "Resend OTP"}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <form
                    id="child-details"
                    ref={formRef}
                    onSubmit={
                      paymentEdit
                        ? handleSubmit
                        : !emailVerified
                        ? handleEmail
                        : createOrder
                    }
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
                          id="otp"
                          type="number"
                          step={0}
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
                    {!paymentEdit &&
                      (emailVerified ? (
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
                                (Report will be shared on your Email)
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
                      ))}
                    <Script
                      type="text/javascript"
                      src="https://checkout.razorpay.com/v1/checkout.js"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 w-full mx-auto py-2 font-bold rounded-lg flex justify-center items-center gap-2 new-gradient hover:brightness-110 transition-all capitalize mt-5"
                    >
                      {loading
                        ? "Loading..."
                        : paymentEdit
                        ? "Update Details"
                        : emailVerified
                        ? "Proceed to Pay"
                        : "Validate"}
                      <ArrowRight size={20} />
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3 mt-5 md:mt-0 h-full flex justify-center items-center">
              <div className="w-[70%]">
                <h1 className="text-[#111729] font-semibold text-[24px] leading-[1.2]">
                  Your Order
                </h1>
                <div className="bg-[#2DB787] rounded-xl mt-4 pb-1">
                  <Carousel
                    opts={{ align: "start", loop: true }}
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
                    <p className="text-[16px] text-[#111729] font-normal">
                      200.00
                    </p>
                  </div>
                </div>
                <div className="bg-[#E3E8EF] w-full h-[1px]"></div>
                <div className="flex w-full mt-4 justify-between">
                  <h1 className="text-[16px] font-bold text-[#111729]">
                    Total
                  </h1>
                  <p className="text-[16px] text-[#111729] font-semibold">
                    {parseInt(pricing[currentIndex].price)}.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewChildDetails;
