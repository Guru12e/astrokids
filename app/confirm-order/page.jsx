"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Cross, Plus, PlusCircle, PlusIcon } from "lucide-react";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import Script from "next/script";
import { pricing } from "@/constant/constant";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

const ConfirmOrder = () => {
  const [data, setData] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
    gender: "",
    number: "",
  });

  const [displayIndex, setDisplayIndex] = useState(0);

  const [email, setEmail] = useState("");

  const [loading, setloading] = useState(false);
  const router = useRouter();
  const product = useSearchParams().get("product");
  const productIndex = useSearchParams().get("productIndex");

  useEffect(() => {
    if (product) {
      setDisplayIndex(parseInt(productIndex));

      document.getElementById("pay").click();
    }
  }, []);

  const createOrder = async () => {
    setloading(true);

    let res;

    if (product) {
      res = await fetch("/api/createOrder", {
        method: "POST",
        body: JSON.stringify({
          amount: parseInt(pricing[parseInt(productIndex)].price) * 100,
          currency: "INR",
        }),
      });
    } else {
      res = await fetch("/api/createOrder", {
        method: "POST",
        body: JSON.stringify({
          amount: parseInt(pricing[displayIndex].price) * 100,
          currency: "INR",
        }),
      });
    }

    const dataId = await res.json();

    const paymentData = {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: dataId.id,

      handler: async function (response) {
        setloading(true);
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
            email: email,
            name: data.name,
            dob: data.dob,
            time: data.time,
            place: data.place,
            gender: data.gender,
            number: data.number,
            lat: data.lat,
            lon: data.lon,
            orderId: dataId.id,
            plan: pricing[displayIndex].title,
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
        name: data.name,
        email: email,
        contact: data.number,
      },
    };

    const payment = new window.Razorpay(paymentData);

    setloading(false);
    payment.open();
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("childDetails"));
    const storedEmail = localStorage.getItem("email");

    if (!storedData || !storedEmail) {
      router.push("/child-details");
    } else {
      const data = {
        name: storedData.name,
        dob: storedData.dob,
        time: storedData.time,
        place: storedData.place,
        gender: storedData.gender,
        number: storedData.number,
        lat: storedData.lat,
        lon: storedData.lon,
      };
      setData(data);
      setEmail(storedEmail);
    }
  }, [router]);

  const ageOption = [
    "Parents seeking foundational astrology insights.",
    "Parents who want to understand and nurture their child’s overall well-being.",
    "Parents focused on academic, personal, and career growth.",
    "Parents seeking the most detailed guidance for growth and success.",
  ];

  return loading ? (
    <Loader />
  ) : (
    data && (
      <div className='w-screen h-full overflow-x-hidden overflow-y-hidden relative'>
        <div className='w-screen h-full overflow-hidden absolute left-0 top-0 z-[-50]'>
          <Image
            src='/images/Aries.png'
            alt='Aries'
            width={100}
            height={100}
            className='absolute top-[2%] -left-[10%] opacity-0 animate-pulse'
          />
          <Image
            src='/images/Taurus.png'
            alt='Taurus'
            width={120}
            height={120}
            className='absolute top-[18%] -right-[10%] opacity-0 animate-pulse'
          />
          <Image
            src='/images/Gemini.png'
            alt='Gemini'
            width={110}
            height={110}
            className='absolute top-[26%] -left-[5%] transform rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Cancer.png'
            alt='Cancer'
            width={130}
            height={130}
            className='absolute top-[34%] -right-[5%] transform -rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Leo.png'
            alt='Leo'
            width={120}
            height={120}
            className='absolute top-[42%] -left-[8%] transform rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Virgo.png'
            alt='Virgo'
            width={100}
            height={100}
            className='absolute top-[48%] -right-[5%] transform -rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Libra.png'
            alt='Libra'
            width={140}
            height={140}
            className='absolute top-[56%] -left-[10%] transform rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Scorpio.png'
            alt='Scorpio'
            width={110}
            height={110}
            className='absolute top-[64%] -right-[5%] transform -rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Sagittarius.png'
            alt='Sagittarius'
            width={130}
            height={130}
            className='absolute top-[72%] -left-[10%] transform rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Capricorn.png'
            alt='Capricorn'
            width={120}
            height={120}
            className='absolute top-[80%] -right-[5%] transform -rotate-12 opacity-0 animate-pulse'
          />
          <Image
            src='/images/Aquarius.png'
            alt='Aquarius'
            width={100}
            height={100}
            className='absolute top-[88%] -left-[5%] opacity-0 animate-pulse'
          />
          <Image
            src='/images/Pisces.png'
            alt='Pisces'
            width={120}
            height={120}
            className='absolute top-[92%] -right-[5%] opacity-0 animate-pulse'
          />
        </div>
        <div className='w-full z-[100] flex flex-col items-center pt-16 pb-24'>
          <h1 className='text-3xl font-extrabold px-5 text-gray-800 mb-16 tracking-tight'>
            Choose Your Report
          </h1>

          <div
            className='w-full h-max px-4 md:px-10 grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 mb-20
        '
          >
            {pricing.map((p, index) => (
              <div
                key={index}
                className='relative bg-white shadow-2xl rounded-3xl p-4 md:p-6 cursor-pointer transform transition-all ease-linear duration-300 hover:shadow-2xl hover:-translate-y-2'
                onClick={() => setDisplayIndex(index)}
              >
                <h3 className='text-xl font-bold text-black z-20'>{p.title}</h3>
                <p className='text-lg font-bold text-gray-900 z-20 mt-4'>
                  ₹{p.price}
                </p>
                <div className='relative md:absolute mt-5 md:mt-0 bottom-2 right-2 transform z-20'>
                  <button className='bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transform transition-all hover:bg-blue-700 animate-pulse hover:scale-105'>
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            {pricing[displayIndex].title}
          </h1>

          <h1 className='text-lg font-bold text-center px-4 text-gray-800 mb-4'>
            Perfect for:{" "}
            <span className='font-normal'>{ageOption[displayIndex]}</span>
          </h1>

          <div className='w-full md:hidden px-3 md:px-6 pb-10'>
            <div className='bg-white bg-opacity-75 rounded-lg shadow-lg p-4 md:p-6 mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                What You’ll Get
              </h2>
              {pricing[3].what.map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center justify-start gap-2 mb-4 text-black'
                >
                  <p className='flex-1'>
                    <span className='font-bold'>{feature.title}:</span>{" "}
                    {feature.content}
                  </p>
                  {index < pricing[displayIndex].what.length ? (
                    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-green-400'>
                      <Check size={20} className='text-black' />
                    </div>
                  ) : (
                    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-red-400'>
                      <IoMdClose size={20} className='text-black' />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='hidden md:block w-full px-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-5'>
              {pricing.map((p, outerIndex) => (
                <div
                  key={outerIndex}
                  className='relative shadow-lg rounded-2xl p-6 transition-all md:hover:-translate-y-2 hover:shadow-xl'
                >
                  {p.what.map((feature, index) => (
                    <div key={index}>
                      {outerIndex > 0 && index == 0 && (
                        <div>
                          <h1 className='text-xl font-semibold text-gray-800 mb-4 w-full text-center'>
                            Every Things in {pricing[index].title} Plan
                          </h1>
                          <PlusIcon
                            size={24}
                            className='mx-auto mb-4 bg-blue-400 rounded-full text-white p-1'
                          />
                        </div>
                      )}
                      <div
                        key={index}
                        className='flex items-center justify-start gap-2 mb-4 text-gray-600'
                      >
                        <p className='flex-1'>
                          <span className='font-bold'>{feature.title}:</span>{" "}
                          {feature.content}
                        </p>
                        <div className='w-6 h-6 flex items-center justify-center rounded-full bg-green-200'>
                          <Check size={20} className='text-gray-800' />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className='px-10 py-4 w-full rounded-t-3xl flex bg-white justify-between items-center shadow-xl fixed bottom-0 left-0 z-20'>
            <Script
              type='text/javascript'
              src='https://checkout.razorpay.com/v1/checkout.js'
            />
            <h2 className='text-2xl flex-1 font-semibold text-gray-800 md:text-center'>
              Price: ₹{pricing[displayIndex].price}
            </h2>
            <button
              id='pay'
              className='w-full flex-1 bg-blue-600 text-white text-lg font-semibold py-3 rounded-full shadow-lg transform transition-all hover:bg-blue-700 hover:scale-105'
              onClick={createOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmOrder;
