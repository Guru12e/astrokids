"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen new-gradient text-white px-6 text-center">
      <Image
        src="/images/logo3.png"
        alt="Astrokids.ai Logo"
        width={120}
        height={120}
        className="mb-6 animate-pulse"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        404 - Lost in Space
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-md">
        The page you're looking for has floated into a black hole. <br />
        Let’s return you to safer space.
      </p>
      <Link href="/">
        <span className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300">
          Back to Earth
        </span>
      </Link>
    </div>
  );
}
