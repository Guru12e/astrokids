"use client";
import { CiMenuBurger } from "react-icons/ci";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { links } from "@/constant/constant";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger className='flex justify-center items-center'>
        <CiMenuBurger className='text-[32px] text-accent' />
      </SheetTrigger>
      <SheetContent className='flex flex-col items-center'>
        <div className='w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] mt-32 mb-24'>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              width={50}
              height={50}
              quality={100}
              priority
              className='object-cover'
            />
          </Link>
        </div>
        <nav className='flex flex-col gap-8 justify-center items-center'>
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={link.name}
                className={`uppercase ${
                  pathName === link.path &&
                  "text-accent border-b-2 border-white"
                } hover:text-accent transition-all text-xl `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
