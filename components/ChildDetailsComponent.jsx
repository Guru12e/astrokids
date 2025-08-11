"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

const NewChildDetails = ({ session }) => {
  const [loading, setLoading] = useState(false);
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
  const locationInputRef = useRef(null);
  const formRef = useRef(null);
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedIndex = localStorage.getItem("orderIndex");
    if (savedIndex) {
      setCurrentIndex(Number(savedIndex));
    }
  });

  const paymentFunction = async () => {
    try {
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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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
              email: session.user.email,
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
          email: session.user.email,
          contact: number,
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    if (paymentEdit) {
      const res = await fetch("/api/updateChild", {
        method: "POST",
        body: JSON.stringify({
          email: session.user.email,
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

      await fetch("/api/checkChildDetails", {
        method: "POST",
        body: JSON.stringify({
          email: session.user.email,
          name,
          dob,
          time,
          place,
          gender,
          number,
        }),
      });

      if (currentIndex != 0) {
        paymentFunction();
      } else {
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
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!api) return;

    const initialIndex = parseInt(currentIndex, 10);
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

  useEffect(() => {
    if (locationInputRef.current.focus) {
      locationInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [locationInputRef]);

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

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (paymentEdit) {
      setLoading(true);
      const fetchDetails = async () => {
        const res = await fetch("/api/getUser", {
          method: "POST",
          body: JSON.stringify({ orderId }),
        });
        setLoading(false);
        if (res.status === 200) {
          const data = await res.json();
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
      };
      fetchDetails();
    }
  }, [paymentEdit, router]);

  useEffect(() => {
    if (edit) {
      const childDetails = JSON.parse(localStorage.getItem("childDetails"));
      setName(childDetails.name);
      setDob(childDetails.dob);
      setTime(childDetails.time);
      setPlace(childDetails.place);
      setGender(childDetails.gender);
      setNumber(childDetails.number);
      setLocationInput(childDetails.place);
    }
  }, [edit]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="p-5 md:absolute">
            <ArrowLeft
              className="w-9 h-9 p-2 text-black bg-white rounded-full cursor-pointer"
              onClick={() => router.back()}
            />
          </div>
          <div className="w-screen min-h-screen flex flex-col-reverse items-center justify-center md:flex-row md:justify-between">
            <div className="w-full py-5 md:w-2/3 min-h-screen bg-gradient-to-b from-[#2DB787]/20 to-[#FFEB3B]/20 p-5 md:p-8 flex flex-col items-end justify-end">
              <div className="flex-1 w-[90%] mx-auto flex flex-col justify-center gap-4">
                <h1 className="mt-0 md:mt-5 text-[24px] font-bold leading-[1.2]">
                  Join our community of 10,000+ super parents
                </h1>
                <form
                  id="child-details"
                  ref={formRef}
                  onSubmit={createOrder}
                  className="w-full flex flex-col"
                >
                  <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="w-full">
                      <label className="block text-[14px] font-normal mb-1">
                        Child Name
                      </label>
                      <input
                        type="text"
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
                        id="phone"
                        type="number"
                        step={0}
                        value={number}
                        minLength={10}
                        maxLength={10}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full p-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all"
                        required
                      />
                    </div>
                  </div>
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
                      : currentIndex == 0
                      ? "Unlock Free Report"
                      : "Proceed to Pay"}
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-auto md:mt-0 flex justify-center items-center">
              <div className="w-[70%]">
                <h1 className="text-[rgb(17,23,41)] font-semibold text-[24px] leading-[1.2]">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewChildDetails;
