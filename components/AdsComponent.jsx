"use client";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdsComponent = ({ content, productIndex, rotate = false }) => {
  const router = useRouter();
  return (
    <div className='w-screen bg-gradient-to-br py-5 from-gray-50 via-indigo-50 to-purple-50 overflow-hidden'>
      <div
        className={`w-full py-5 flex flex-col ${
          rotate ? "xl:flex-row-reverse" : "xl:flex-row"
        } items-center justify-center px-6 md:px-24 gap-20`}
      >
        <div className='w-full xl:w-1/2 flex justify-center relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className='relative w-[70%] mx-auto aspect-square overflow-hidden backdrop-blur-xl p-6'
          >
            <div className='absolute inset-0 flex justify-center items-center'>
              <Image
                src='/svg/rings.svg'
                fill
                className='object-cover opacity-40 animate-spin-slow'
                alt='Decorative rings'
              />
            </div>
            <Image
              src={`/images/ads-content${productIndex + 1}.png`}
              fill
              className='object-cover pointer-events-none'
              alt='A holistic approach to parenting'
            />
          </motion.div>
        </div>

        <div className='w-full xl:w-1/2 space-y-6'>
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className='text-5xl md:text-7xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-rose-700 drop-shadow-lg'
          >
            {content.title} - {content.price}
            <p className='text-xl md:text-2xl font-medium block text-gray-800'>
              ({content.sub})
            </p>
          </motion.h1>

          <motion.p
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-medium'
          >
            {content.desc}
          </motion.p>

          <motion.h2
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className='text-xl md:text-2xl font-bold text-indigo-700 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'
          >
            Features:
          </motion.h2>

          <ul className='space-y-4'>
            {content.points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className='flex items-center gap-4 text-lg text-gray-800'
              >
                <FaCheckCircle className='text-green-500 text-2xl drop-shadow-md animate-pulse' />
                <span className='flex-1 font-semibold'>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <motion.h2
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className='text-xl text-center my-5 md:text-2xl font-bold text-indigo-700 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'
      >
        Holistic Parenting Guidance
      </motion.h2>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-6 md:px-24 pb-10 relative'>
        {content.details.map((d, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className='relative p-6 bg-gradient-to-br from-white to-indigo-50 backdrop-blur-xl shadow-2xl rounded-2xl border-l-4 border-indigo-600 overflow-hidden group'
          >
            <div className='absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:bg-indigo-500/20 transition-colors duration-100'></div>
            <div className='flex items-center gap-3'>
              <div className='relative w-10 aspect-square'>
                <Image
                  src={`/icons/${d.image}`}
                  fill
                  alt={d.title}
                  className='object-cover pointer-events-none'
                />
              </div>
              <h3 className='text-xl flex-1 font-semibold text-indigo-700 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'>
                {d.title}
              </h3>
            </div>
            <p className='text-gray-600 mt-3 leading-relaxed font-medium'>
              {d.desc}
            </p>
            <div className='absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'></div>
          </motion.div>
        ))}
      </div>

      <div className='flex gap-5 justify-center items-center'>
        <button
          className='w-max px-8 py-2 bg-gradient-to-r cursor-pointer mb-2 from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1'
          onClick={() => {
            router.push(
              `/child-details?product=true&productIndex=${productIndex}`
            );
          }}
        >
          Buy Now
        </button>
        <button
          className='w-max px-8 py-2 border border-indigo-500 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r mb-2 from-indigo-500 to-purple-500 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1'
          onClick={() => {
            router.push(`/products`);
          }}
        >
          See Details
        </button>
      </div>

      {content.title != "Ultimate Growth Plan" && (
        <div className='relative w-full h-32 overflow-hidden'>
          <motion.svg
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewBox='0 0 1440 120'
            preserveAspectRatio='none'
            className='w-full h-full absolute bottom-0'
          >
            <defs>
              <linearGradient
                id='waveGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <stop
                  offset='0%'
                  style={{ stopColor: "#4f46e5", stopOpacity: 1 }}
                />
                <stop
                  offset='50%'
                  style={{ stopColor: "#7c3aed", stopOpacity: 1 }}
                />
                <stop
                  offset='100%'
                  style={{ stopColor: "#db2777", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d='M0,60 C360,120 1080,0 1440,60 L1440,120 H0 Z'
              fill='url(#waveGradient)'
              className='animate-wave'
            />
          </motion.svg>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='absolute top-1/2 left-1/4 w-12 h-12 bg-indigo-400/20 rounded-full blur-md animate-float'
          ></motion.div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='absolute top-1/3 right-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-md animate-float-slow'
          ></motion.div>
        </div>
      )}
      {content.title == "Ultimate Growth Plan" && (
        <div className='w-full h-10'></div>
      )}
    </div>
  );
};

export default AdsComponent;
