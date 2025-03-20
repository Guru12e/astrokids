"use client";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import locationData from "@/constant/processed_places.json";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const SampleReport = () => {
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const router = useRouter();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || number.trim() === "") {
      toast.error("Please fill all the fields", {
        position: "top-right",
      });
      return;
    }

    setloading(true);
    const checkRes = await fetch("/api/sampleReport", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        number: number,
      }),
    });

    const link = document.createElement("a");
    link.href = "/pdf/Tharani - babyReport.pdf";
    link.download = "Sample Report.pdf";
    link.click();
    setloading(false);
    router.push("/");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='w-screen min-h-screen flex justify-center p-5 bg-gradient-to-br from-purple-100 via-pink-100 to-red-100'>
      <div className='w-full xl:w-[60%]'>
        <div className='w-full flex flex-col justify-between items-center'>
          <div className='w-full flex justify-center items-center mb-4'>
            <Link className='cursor-pointer' href='/'>
              <ArrowLeftIcon
                size={25}
                className='hover:scale-110 transition-transform'
              />
            </Link>
            <div className='w-full flex justify-center'>
              <div className='w-[120px] h-[70px] xl:w-[150px] xl:aspect-video outline-none'>
                <Link href='/'>
                  <Image
                    alt='logo'
                    src={`/images/logo.png`}
                    width={200}
                    height={40}
                    quality={100}
                    priority
                    className='object-cover pointer-events-none'
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className='p-6 rounded-lg bg-gradient-to-r mb-7 from-purple-500 via-pink-500 to-red-500 shadow-xl text-center'>
            <h1 className='text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-lg'>
              Be The Super Parent Your Child Deserves
            </h1>
          </div>

          <form
            onSubmit={handleSumbit}
            className='w-full flex flex-col bg-white p-6 shadow-md rounded-lg'
          >
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div className='w-full'>
                <label className='block text-purple-600 font-semibold mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  value={email}
                  placeholder="Parent's Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full p-2 border text-black placeholder:text-black bg-white outline-none border-gray-300 rounded'
                  required
                />
              </div>
              <div className='w-full'>
                <label className='block text-purple-600 font-semibold mb-1'>
                  Phone Number
                </label>
                <input
                  placeholder='Phone Number'
                  type='text'
                  value={number}
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => setNumber(e.target.value)}
                  className='w-full p-2 border text-gray-700 bg-white placeholder:text-black outline-none border-gray-300 rounded focus:ring focus:ring-purple-300 transition-all'
                  required
                />
              </div>
            </div>
            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 mt-4 w-full cursor-pointer border rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-red-500 transition-all'
            >
              Download Sample Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SampleReport;
