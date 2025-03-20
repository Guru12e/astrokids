"use client";
import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`py-4 xl:py-6 fixed top-0 left-0 z-[1000] w-screen transition-all duration-300 ${
        isScrolled
          ? "bg-[#F5D5E0] text-black shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className='w-[100vw] flex justify-between items-center px-10'>
        <div className='flex-1'>
          <div className='w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] outline-none'>
            <Link href='/'>
              <Image
                src={`${isScrolled ? "/images/logo2.png" : "/images/logo.png"}`}
                width={50}
                height={50}
                quality={100}
                priority
                className='object-cover'
              />
            </Link>
          </div>
        </div>
        <div className='flex-2 hidden xl:flex items-center gap-8'>
          <Nav />
          <Button>Get Started</Button>
        </div>
        <div className='xl:hidden'>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
