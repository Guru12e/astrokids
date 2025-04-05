"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ["home", "about", "plans", "resources", "contact"];
  const pathName = usePathname().split("/")[1];
  const router = useRouter();

  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="w-screen fixed top-0 z-[1000] bg-transparent md:bg-[#02030B] px-3 md:px-14 py-4">
      <div className="flex max-md:bg-[#0E0C15] p-2 md:p-0 rounded-xl items-center justify-between w-full">
        <Link href={"/"} className="font-bold text-white text-2xl">
          astrokids<span className="text-xs px-0.5 text-[#5DF2CF]">✦</span>ai
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-center gap-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={`${item === "home" ? "/" : `/${item}`}`}
              className={`${
                pathName === item || (pathName == "" && item == "home")
                  ? "text-[#2DB787]"
                  : "text-white"
              } cursor-pointer border-b-0 hover:border-b-2 capitalize border-[#5DF2CF] font-semibold px-4`}
            >
              {item}
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
                color="#2DB787"
                d="M4 6h16M4 12h16M4 18h16"
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

        <button
          className="hidden md:block px-6 py-1 font-bold rounded-lg new-gradient hover:brightness-110 transition-all"
          onClick={() => router.push("/plans")}
        >
          Get Started
        </button>
      </div>

      <div className="md:hidden">
        {isMobileMenuOpen && (
          <div
            ref={menuRef}
            className="mt-3 rounded-xl w-full bg-[#0E0C15] px-5 py-4 flex flex-col gap-4"
          >
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`/${item == "home" ? "" : item}`}
                className={`${
                  pathName === "" && item === "home"
                    ? "text-[#2DB787]"
                    : pathName === item
                    ? "text-[#2DB787]"
                    : "text-white"
                } cursor-pointer text-[16px] capitalize font-bold text-center py-2`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
