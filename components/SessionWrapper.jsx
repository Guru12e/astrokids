"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer />
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  );
}
