"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function RedirectPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    signIn("google", { callbackUrl });
  }, [callbackUrl]);

  return <p>Redirecting to Google sign-in…</p>;
}
