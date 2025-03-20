import ReportDetails from "@/components/ReportDetails";
import ReportFeature from "@/components/ReportFeature";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {
  return (
    <section className='h-full w-screen bg-white'>
      <div className='h-full bg-primary'>
        <div className='flex flex-col-reverse justify-center xl:flex-row items-center xl:pt-8 xl:pb-24 xl:ml-8 font-semibold'>
          <div className='flex-1 mt-8 xl:mt-0 z-[100] flex flex-col justify-center items-center'>
            <h1 className='text-center text-[32px] xl:text-left tracking-wider leading-[1.3] xl:text-[46px] px-6'>
              Reveal Key Insights About Your{" "}
              <span className='text-accent'>Baby's</span> Health and Development
            </h1>
            <p className='text-md xl:text-start font-light text-lg mt-2 px-6 text-center'>
              Discover your child's unique strengths, health insights,and
              optimal future paths through Vedic Astrology
            </p>
            <Button className='uppercase xl:ml-6 mt-5 xl:self-start mb-8'>
              Buy
            </Button>
          </div>
          <div className='flex-1 w-full h-full relative mt-8 xl:mt-0'>
            <div className='w-[400px] h-[400px] xl:w-[650px] md:w-[400px] md:h-[400px] xl:h-[650px]'>
              <Image
                src={"/images/hero.png"}
                alt='hero'
                priority
                fill
                className='object-cover'
                quality={100}
              />
              <div className='absolute w-screen h-[100px] xl:-left-[50%] z-60 -bottom-5 xl:bottom-10'>
                <Image
                  src={"/images/heroBg.png"}
                  alt='heroBG'
                  priority
                  fill
                  className='object-contain'
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-primary w-screen h-[300px] xl:h-[250px] relative z-50 flex items-center justify-center flex-col xl:flex-row'>
        <div className='xl:w-[500px] xl:h-[500px] z-50 w-[300px] h-[300px] md:w-[400px] md:h-[400px] border-none'>
          <Image
            src={"/images/book.png"}
            width={500}
            height={500}
            priority
            quality={100}
            className='object-contain z-30'
          />
        </div>
        <div className='z-30'>
          <h1 className='flex-1 w-full px-2 xl:px-5 py-2 text-2xl md:text-3xl text-center xl:text-left xl:text-[48px] tracking-widest leading-[1.2]'>
            Specialist Baby's Horoscope Report
          </h1>
        </div>
      </div>

      <ReportFeature />
    </section>
  );
};

export default Home;
