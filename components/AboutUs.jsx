import { answers, parentingQuestion, questions } from "@/constant/constant";
import Image from "next/image";
import { IoMdSunny } from "react-icons/io";

const AboutUs = () => {
  return (
    <section
      className='relative w-screen flex flex-col px-5 xl:px-0 items-center pt-5 pb-10 bg-gradient-to-b from-[#FED7C3] to-[#FFE9D0] overflow-hidden'
      id='howWeDo'
    >
      <div className='relative px-3 '>
        <div className='w-full flex flex-col items-start'>
          <div className='w-full md:w-[20%] mx-auto py-5 flex justify-between items-center mb-2 relative'>
            <div className='border-4 rounded-full p-3 w-[80px] aspect-square bg-white border-accent shadow-md overflow-hidden relative'>
              <Image
                alt='Munivar'
                src={"/images/about0.png"}
                fill
                className='object-contain'
              />
            </div>
            <Image
              alt='Plus'
              src={"/images/plus.png"}
              width={20}
              height={20}
              className='object-contain'
            />
            <div className='border-4 rounded-full p-3 w-[80px] aspect-square bg-white border-accent shadow-md overflow-hidden relative'>
              <Image
                alt='Advance'
                src={"/images/about1.png"}
                fill
                className='object-contain'
              />
            </div>
            <Image
              alt='equals'
              src={"/images/equals.png"}
              width={20}
              height={20}
              className='object-contain'
            />
            <div className='border-4 rounded-full w-[80px] aspect-square bg-white border-accent shadow-md overflow-hidden relative'>
              <Image
                alt='Happy Parent'
                src={"/images/about2.jpeg"}
                fill
                className='object-fill'
              />
            </div>
          </div>

          <div className='w-full px-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
            {answers.map((answer, index) => (
              <div key={index} className='w-full h-full'>
                <div
                  className={`flex gap-4 items-start text-gray-700 mt-4 p-4 rounded-lg ${
                    index % 2 === 0 ? "bg-[#FFF5F0]" : "bg-[#FFE9D0]"
                  }`}
                >
                  <IoMdSunny size={24} className='text-[#EF8A6F]' />
                  <p className='font-semibold text-lg xl:text-xl'>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
