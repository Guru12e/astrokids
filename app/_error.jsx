"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error caught by error.tsx:", error);
  }, [error]);

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
        500 - Something Went Supernova
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-md">
        Our systems hit a cosmic glitch. <br />
        We’re working to restore balance to the galaxy.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300"
        >
          Try Again
        </button>
        <Link href="/">
          <span className="bg-transparent border border-white text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition-all duration-300">
            Home
          </span>
        </Link>
      </div>
    </div>
  );
}
