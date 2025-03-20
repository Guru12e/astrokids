"use client";
import { links } from "@/constant/constant";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = ({ color = false }) => {
  const route = useRouter();
  const pathName = usePathname();
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

  const scrollToSection = (id) => {
    if (id == "blogs" || id == "products") {
      route.push(`/${id}`);
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

  return (
    <nav className='flex gap-6 items-center justify-center w-full h-full'>
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
              pathName === "/" && "text-accent text-lg"
            } ${
              color && (isScrolled ? "text-black" : "text-white")
            } font-medium hover:text-accent transition-all`}
          >
            Home
          </button>
          <button
            onClick={() => {
              route.push("/products");
            }}
            className={`uppercase ${
              pathName === "/" && "text-accent text-lg"
            } ${
              color && (isScrolled ? "text-black" : "text-white")
            } font-medium hover:text-accent transition-all`}
          >
            Products
          </button>
        </>
      )}
    </nav>
  );
};

export default Nav;
