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
  const [locationInput, setLocationInput] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const locationInputRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const [api, setApi] = useState(null);
  const orderIndex = useSearchParams().get("productIndex") || 0;
  const product = useSearchParams().get("product") || false;
  const [currentIndex, setCurrentIndex] = useState(orderIndex);

  const paymentFunction = async () => {
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
          router.push(
            `/payment-success?orderIndex=${currentIndex}&orderId=${dataId.id}`
          );
        } else {
          toast.error("Error. Try Again", {
            position: "top-right",
            autoClose: 3000,
          });
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
  };

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

          if (currentIndex != 0) {
            paymentFunction();
          } else {
            router.push("/free-report");
          }
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

  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    if (value.length >= 2) {
      const indiaData = locationData["India"];
      const locations = [];
      Object.keys(indiaData).forEach((state) => {
        indiaData[state].forEach((city) => {
          const fullLocation = `${city.name}, ${state}, India`;
          if (fullLocation.toLowerCase().includes(value.toLowerCase())) {
            locations.push({ ...city, state, fullLocation });
          }
        });
      });
      setFilteredLocations(locations);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationSelect = (location) => {
    const fullLocation = `${location.name}, ${location.state}, India`;
    setLocationInput(fullLocation);
    setPlace(fullLocation);
    setLatLon({ lat: location.lat, lon: location.lon });
    setFilteredLocations([]);
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
          setLocationInput(data.childDetails.place);
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
      setLocationInput(childDetails.place);
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

    if (
      checkRes.status === 200 ||
      (currentIndex === 0 && checkRes.status == 400)
    ) {
      if (currentIndex === 0) {
        await fetch("https://report-api-0fic.onrender.com/freeReport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dob: `${dob} ${time}:00`,
            location: place.split(",")[0],
            lat: parseFloat(latLon.lat),
            lon: parseFloat(latLon.lon),
            gender: gender,
            name: name,
          }),
        })
          .then((response) => response.json())
          .then((data) =>
            localStorage.setItem("freeReport", JSON.stringify(data))
          )
          .catch((error) => console.error("Error:", error));

        router.push("/free-report");
      } else {
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
    } else if (checkRes.status === 400) {
      toast.error("Child Details already exists!");
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
        userOtp,
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
      toast.success("Email Verified", { position: "top-right" });
      if (currentIndex != 0) {
        paymentFunction();
      } else {
        router.push("/free-report");
      }
    } else {
      setOtpVerifyLoading(false);
      setEmailVerified(false);
      toast.error("Invalid OTP", { position: "top-right" });
    }
  };

  const handleSubmit = async () => {
    setEditLoading(true);
    const res = await fetch("/api/updateChild", {
      method: "POST",
      body: JSON.stringify({
        email: parentEmail,
        name: name,
        dob: dob,
        time: time,
        place: place,
        gender: gender,
        number: number,
        orderId: orderId,
      }),
    });

    if (res.status == 200) {
      toast.success("Child Details Updated", {
        position: "top-right",
      });
      router.push("/");
    } else {
      toast.error("Error Updating Child Details", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {!otpSend && (
            <div className="p-5 md:absolute">
              <ArrowLeft
                className="w-9 h-9 p-2 text-black bg-white rounded-full cursor-pointer"
                onClick={() => router.back()}
              />
            </div>
          )}
          <div
            className={`w-screen min-h-screen flex flex-col-reverse items-center justify-center ${
              otpSend ? "md:flex-row-reverse" : "md:flex-row"
            } md:justify-between`}
          >
            <div
              className={`w-full py-5 ${
                otpSend ? "md:w-1/2" : "md:w-2/3 min-h-screen"
              } flex-col gap-4 ${
                otpSend
                  ? ""
                  : "bg-gradient-to-b from-[#2DB787]/20 to-[#FFEB3B]/20 p-5 md:p-8 flex items-end justify-end"
              }`}
            >
              <div className="flex-1 w-[90%] mx-auto flex flex-col justify-center gap-4">
                {otpSend ? (
                  <h1 className="font-extrabold text-center text-black text-4xl">
                    astrokids
                    <span className="text-xs px-0.5 text-[#5DF2CF]">✦</span>ai
                  </h1>
                ) : (
                  <h1 className="mt-0 md:mt-5 text-[24px] font-bold leading-[1.2]">
                    Join our community of 10,000+ super parents
                  </h1>
                )}
                {otpSend ? (
                  <div className="w-full flex flex-col gap-4">
                    <h1 className="text-[24px] leading-[1.1] text-center text-[#02030B] font-bold">
                      Enter OTP
                    </h1>
                    <p className="text-[18px] leading-[1.2] text-center text-[#475467] font-normal">
                      We have sent a OTP to your email
                    </p>

                    <form
                      onSubmit={handleOtpVerify}
                      autoComplete="off"
                      className="w-full flex flex-col gap-4"
                    >
                      <div className="flex w-[80%] mx-auto justify-center items-center">
                        {[...Array(4)].map((_, index) => (
                          <div
                            key={index}
                            className={`grid ${
                              index === 3 ? "grid-cols-1" : "grid-cols-2"
                            } place-items-center`}
                          >
                            <input
                              ref={(el) => (inputsRef.current[index] = el)}
                              type="number"
                              id="otp"
                              value={otp[index]}
                              onChange={(e) =>
                                handleChange(e.target.value, index)
                              }
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              className="w-full h-12 text-center border rounded-lg text-2xl text-gray-700 bg-white outline-none border-gray-300 focus:ring focus:ring-purple-300 transition-all"
                              maxLength="1"
                              required
                            />
                            {index !== 3 && (
                              <div className="w-8 rounded-xl h-1 bg-[#98A2B3]"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        disabled={otpVerifyLoading}
                        className="px-4 py-2 font-bold rounded-lg flex justify-center items-center gap-2 new-gradient hover:brightness-110 transition-all capitalize"
                      >
                        {otpVerifyLoading ? "Loading..." : "Verify"}
                      </button>
                      <div className="self-center">
                        Didn’t receive code?
                        <button
                          onClick={(e) => {
                            setResendTimer(30);
                            setAdminOtp("");
                            handleEmail(e);
                          }}
                          disabled={resendTimer > 0}
                          className={`pl-1 text-[18px] w-max mx-auto font-bold rounded ${
                            resendTimer > 0
                              ? "text-black"
                              : "text-[#2DB787] underline"
                          }`}
                        >
                          {resendTimer > 0 ? `${resendTimer}s` : "Resend OTP"}
                        </button>
                        <div
                          className="flex gap-1 justify-center mt-4 items-center cursor-pointer hover:underline self-center"
                          onClick={() => setOtpSend(false)}
                        >
                          <p className="text-sm">Edit Details</p>
                          <Pencil size={15} />
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <form
                    id="child-details"
                    autoComplete="off"
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
                          Location
                        </label>
                        <input
                          type="text"
                          value={locationInput}
                          onFocus={handleFocus}
                          placeholder="Birth Location"
                          onChange={handleLocationInputChange}
                          ref={locationInputRef}
                          required
                          className="w-full p-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                        />
                        {filteredLocations.length > 0 && (
                          <ul className="absolute z-10 w-full bg-gray-200 border-gray-300 rounded shadow-md max-h-60 overflow-auto">
                            {filteredLocations.map((location, index) => (
                              <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-purple-500 hover:text-white"
                                onClick={() => handleLocationSelect(location)}
                              >
                                {location.fullLocation}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
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
                        ? currentIndex == 0
                          ? "Unlock Free Report"
                          : "Proceed to Pay"
                        : currentIndex == 0
                        ? "Unlock Free Report"
                        : "Validate"}
                      <ArrowRight size={20} />
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div
              className={`${
                otpSend
                  ? "w-full md:w-1/2 aspect-square md:h-screen"
                  : "w-full md:w-1/3 aspect-auto"
              } md:mt-0 flex justify-center items-center`}
            >
              {otpSend ? (
                <div className="relative w-full h-full">
                  <Image
                    src={"/images/new/otp.png"}
                    fill
                    alt="otp-screen"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-[70%]">
                  <h1 className="text-[rgb(17,23,41)]  font-semibold text-[24px] leading-[1.2]">
                    Your Order
                  </h1>
                  <div className="bg-[#2DB787] rounded-xl mt-4 pb-1">
                    <Carousel
                      opts={{ align: "start", loop: true }}
                      setApi={setApi}
                    >
                      <CarouselContent>
                        {pricing.map((_, index) => (
                          <CarouselItem
                            key={index}
                            className="w-full h-full relative"
                          >
                            <div className="w-[120px] aspect-[9/16] mx-auto relative">
                              <Image
                                src={`/images/book-cover${index}.png`}
                                alt={`book-cover`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            {index == 0 && (
                              <p
                                className={`absolute ${
                                  currentIndex == index ? "block" : "hidden"
                                } px-3 rounded-bl-xl rounded-tr-xl top-0 w-max font-medium right-0 new-gradient text-white text-[12px]`}
                              >
                                Free
                              </p>
                            )}
                            {index == 1 && (
                              <p
                                className={`absolute ${
                                  currentIndex == index ? "block" : "hidden"
                                } px-3 rounded-bl-xl rounded-tr-xl top-0 w-max font-medium right-0 new-gradient text-white text-[12px]`}
                              >
                                Popular
                              </p>
                            )}
                            {index == 2 && (
                              <p
                                className={`absolute ${
                                  currentIndex == index ? "block" : "hidden"
                                } px-3 rounded-bl-xl rounded-tr-xl top-0 w-max font-medium right-0 new-gradient text-white text-[12px]`}
                              >
                                Parents' Choice
                              </p>
                            )}
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
                        ₹{parseInt(pricing[currentIndex].price) + 200}.00
                      </p>
                    </div>
                    <div className="flex w-full justify-between">
                      <h1 className="text-[16px] font-normal text-[#677489]">
                        Flat Discount
                      </h1>
                      <p className="text-[16px] text-red-400 font-normal">
                        -₹{currentIndex === 0 ? "399.00" : "200.00"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#E3E8EF] w-full h-[1px]"></div>
                  <div className="flex w-full mt-4 justify-between">
                    <h1 className="text-[16px] font-bold text-[#111729]">
                      Total
                    </h1>
                    <p className="text-[16px] text-[#111729] font-semibold">
                      {currentIndex === 0
                        ? "Free"
                        : `₹${parseInt(pricing[currentIndex].price)}.00`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewChildDetails;
