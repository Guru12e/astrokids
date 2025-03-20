import { motion } from "framer-motion";

const AdsContent = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className='relative bg-gradient-to-r mt-5 px-5 md:px-10 py-10 md:py-16 from-indigo-700 via-purple-700 to-rose-700 overflow-hidden'
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
    >
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-40 h-40 bg-rose-400 rounded-full blur-3xl animate-pulse delay-700'></div>
      </div>

      <motion.h1
        className='relative text-2xl md:text-4xl lg:text-5xl capitalize font-extrabold text-white text-center leading-tight z-10'
        variants={textVariants}
      >
        <span className='block mt-2'>
          Discover personalized astrology insights to nurture your child’s
          cosmic potential.
        </span>
        <span className='block mt-3 text-2xl md:text-3xl font-semibold text-indigo-200'>
          Select a plan crafted just for your parenting journey!
        </span>
      </motion.h1>
    </motion.div>
  );
};

export default AdsContent;
