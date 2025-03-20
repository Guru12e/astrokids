"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NewNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    "new-home",
    "new-about",
    "new-plans",
    "new-blogs",
    "new-contact",
  ];
  const pathName = usePathname().split("/")[1];

  return (
    <div className="w-screen fixed z-[1000] bg-[#02030B] flex px-5 md:px-14 py-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-white text-2xl">
          astrokids<span className="text-xs px-0.5 text-[#5DF2CF]">✦</span>ai
        </h1>

        <div className="hidden md:flex flex-1 items-center justify-center gap-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`/${item}`}
              className={`${
                pathName === item ? "text-[#2DB787]" : "text-white"
              } cursor-pointer border-b-0 hover:border-b-2 capitalize border-[#5DF2CF] font-semibold px-4`}
            >
              {item.split("-")[1]}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <button className="hidden md:block px-6 py-1 font-bold rounded-lg new-gradient hover:brightness-110 transition-all">
          Get Started
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#02030B] px-5 py-4 flex flex-col gap-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`/${item}`}
              className={`${
                pathName === item ? "text-[#2DB787]" : "text-white"
              } cursor-pointer capitalize font-semibold py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.split("-")[1]}
            </Link>
          ))}
          <button className="w-full px-6 py-1 font-bold rounded-lg new-gradient hover:brightness-110 transition-all mt-2">
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default NewNavBar;
