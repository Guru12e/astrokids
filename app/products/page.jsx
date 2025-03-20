"use client";
import { PlusIcon } from "lucide-react";
import { pricing } from "@/constant/constant";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Products = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const router = useRouter();

  const ageOption = [
    "Foundational astrology insights for new parents.",
    "Nurture your child’s cosmic well-being with deeper insights.",
    "Academic, personal, and celestial growth for young minds.",
    "The ultimate roadmap for astrological success!",
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 overflow-x-hidden relative">
      <Header nav={true} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col px-6 items-center pt-24 pb-16 text-center z-10"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-rose-700 drop-shadow-lg tracking-wide">
          Unlock Your Child’s Cosmic Destiny
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl leading-relaxed">
          Discover personalized astrology reports crafted to illuminate your
          child’s stellar journey.
        </p>
      </motion.div>
      <div className="w-full mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
        {pricing.map((p, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500" />

            <div className="relative z-10 text-center">
              <div className="w-28 h-28 mx-auto mb-4 relative rounded-lg overflow-hidden shadow-md">
                <Image
                  src={`/images/book-cover${index}.png`}
                  alt={p.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">{p.title}</h2>
              <p className="text-2xl font-bold text-indigo-600 mt-2">
                ₹{p.price}
              </p>
              <p className="text-sm text-gray-500 mt-2">{ageOption[index]}</p>

              <div className="flex gap-3 mt-6 justify-center">
                <button
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:from-indigo-700 hover:to-purple-700 transition-transform transform hover:scale-105"
                  onClick={() => {
                    setDisplayIndex(index);
                    document.getElementById("productsDetails")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  See Details
                </button>
                <button
                  className="px-5 py-2.5 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-medium shadow-sm hover:bg-indigo-50 transition-transform transform hover:scale-105"
                  onClick={() =>
                    router.push(
                      `/child-details?product=true&productIndex=${index}`
                    )
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        id="productsDetails"
        className="w-full max-w-5xl mx-auto px-6 pb-20 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-rose-700 drop-shadow-lg text-center mb-10"
        >
          What’s Inside {pricing[displayIndex].title}?
        </motion.h2>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="max-w-2xl mx-auto space-y-6">
            {pricing[displayIndex].what.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <PlusIcon className="w-6 h-6 text-indigo-600" />
                <p className="text-gray-700">
                  <span className="font-semibold text-indigo-700">
                    {feature.title}:
                  </span>{" "}
                  {feature.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
