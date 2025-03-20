"use client";
import { BiMenuAltRight } from "react-icons/bi";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { links } from "@/constant/constant";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const pathName = usePathname();
  const logoImage = [
    [
      <IoLogoInstagram size={40} className='text-black hover:text-accent' />,
      "https://www.instagram.com/the_astro_kids/",
    ],
    [
      <IoLogoFacebook size={40} className='text-black hover:text-accent' />,
      "https://www.facebook.com/profile.php?id=61568876184036",
    ],
    [
      <IoLogoLinkedin size={40} className='text-black hover:text-accent' />,
      "https://www.linkedin.com/company/astrokids/",
    ],
  ];

  const scrollToSection = (id) => {
    if (id == "blogs" || id == "products") {
      route.push(`/${id}`);
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      setIsOpen(false);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className='flex justify-center items-center'
        onClick={() => setIsOpen(true)}
      >
        <BiMenuAltRight className='text-[32px] text-accent' />
      </SheetTrigger>
      <SheetContent className='flex flex-col items-center justify-between'>
        <SheetTitle></SheetTitle>
        <div className='w-[120px] aspect-video xl:w-[50px] xl:h-[50px]'>
          <Link href='/'>
            <Image
              alt='logo'
              src='/images/logo.png'
              width={120}
              height={120}
              quality={100}
              priority
              className='object-cover pointer-events-none'
            />
          </Link>
        </div>
        <nav className='flex flex-col gap-8 justify-center items-center'>
          {pathName == "/ads-page" ? (
            links.map((l, index) => (
              <button
                onClick={() => scrollToSection(l.path)}
                key={index}
                className={`uppercase ${
                  pathName === l.path && "text-accent"
                } font-medium hover:text-accent transition-all`}
              >
                {l.name}
              </button>
            ))
          ) : (
            <>
              <button
                onClick={() => {
                  route.push("/");
                }}
                className={`uppercase ${
                  pathName === "/" && "text-accent"
                } font-medium hover:text-accent transition-all`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  route.push("/products");
                }}
                className={`uppercase ${
                  pathName === "/" && "text-accent"
                } font-medium hover:text-accent transition-all`}
              >
                Products
              </button>
            </>
          )}
        </nav>
        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='text-black'>Follow Us</p>
          <div className='w-full flex justify-center gap-3 items-center'>
            {logoImage.map((logo, index) => (
              <Link href={logo[1]} key={index} className='p-3 cursor-pointer'>
                {logo[0]}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
