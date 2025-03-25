"use client";
import { companyDetails, links } from "@/constant/constant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io";

const Footer = ({ isTrue = false }) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const scrollToSection = (id) => {
    if (id == "blogs" || id == "products") {
      router.push(`/${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const contactContent = [
    "Contact Us",
    "support@astrokids.ai",
    "+91 95978 67340",
  ];

  const logoImage = [
    [
      <IoLogoInstagram size={40} className="text-black hover:text-accent" />,
      "https://www.instagram.com/the_astro_kids/",
    ],
    [
      <IoLogoFacebook size={40} className="text-black hover:text-accent" />,
      "https://www.facebook.com/profile.php?id=61568876184036",
    ],
    [
      <IoLogoLinkedin size={40} className="text-black hover:text-accent" />,
      "https://www.linkedin.com/company/astrokids/",
    ],
  ];

  useEffect(() => {
    const updateRadius = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    updateRadius();

    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);
  return (
    <div className="py-6 bg-[#FFE9D0]">
      <div className="flex-col flex xl:flex-row h-max w-full items-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div>
            <div className="w-[120px] h-[80px] xl:w-[150px] xl:aspect-video outline-none">
              <Link href="/">
                <Image
                  alt="logo"
                  src={`/images/logo.png`}
                  width={200}
                  height={40}
                  quality={100}
                  className="object-cover pointer-events-none"
                />
              </Link>
            </div>
          </div>
          <ul className="text-black text-center flex flex-wrap justify-center xl:flex-col gap-4 xl:gap-2">
            {contactContent.map((content, index) => (
              <li key={index} className="hover:text-accent cursor-pointer">
                {content}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <ul className=" text-center flex justify-center  flex-wrap xl:flex-col gap-4 xl:gap-2 text-black">
            {links.map((content, index) =>
              isTrue ? (
                (content.name === "Home" || content.name === "Products") && (
                  <button
                    onClick={() => scrollToSection(content.path)}
                    key={index}
                    className="hover:text-accent cursor-pointer"
                  >
                    {content.name}
                  </button>
                )
              ) : (
                <button
                  onClick={() => scrollToSection(content.path)}
                  key={index}
                  className="hover:text-accent cursor-pointer"
                >
                  {content.name}
                </button>
              )
            )}
          </ul>
        </div>
        <div className="flex-1">
          <ul className="text-black text-center flex justify-center flex-wrap xl:flex-col gap-x-4 xl:gap-2">
            {companyDetails.map((content, index) => (
              <li
                key={index}
                className="hover:text-accent cursor-pointer"
                onClick={() =>
                  router.push(`/details?content=${content.toLowerCase()}`)
                }
              >
                {content}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-2">
          <p className="text-black">Follow Us</p>
          <div className="w-full flex justify-center gap-3 items-center">
            {logoImage.map((logo, index) => (
              <Link href={logo[1]} key={index} className="p-3 cursor-pointer">
                {logo[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
