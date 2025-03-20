"use client";

import { useEffect, useState } from "react";

const Loader = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    setX(window.scrollX);
    setY(window.scrollY);
  }, []);

  return (
    <div
      className='w-screen h-screen absolute z-[1500] bg-gradient-to-br from-gray-900 to-black text-white flex justify-center items-center'
      style={{ top: y, left: x }}
    >
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='flex space-x-2'>
          <div className='w-4 h-4 bg-white rounded-full animate-pulse'></div>
          <div className='w-4 h-4 bg-white rounded-full animate-pulse delay-200'></div>
          <div className='w-4 h-4 bg-white rounded-full animate-pulse delay-400'></div>
        </div>
        <h1 className='text-xl font-light tracking-wider'>Please wait...</h1>
      </div>
    </div>
  );
};

export default Loader;
