"use client";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityWrapper() {
  useEffect(() => {
    Clarity.init("twnbfuotyc");
  }, []);

  return null;
}
