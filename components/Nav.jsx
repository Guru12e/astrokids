"use client";
import { links } from "@/constant/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathName = usePathname();
  return (
    <nav className='flex gap-8'>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={link.name}
            className={`uppercase ${
              pathName === link.path && "text-accent border-b-2 border-white"
            } font-medium hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
