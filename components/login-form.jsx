"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import MultiStepForm from "./ui/multi-step-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function LoginForm({ className, ...props }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const HandleLogin = async () => {
    setIsSubmitting(true);
    const res = await fetch("/api/vendorLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("vendor", JSON.stringify(data.vendor));
      router.push("/ecommerce/vendor");
    } else if (res.status === 404) {
      toast.error("Vendor does not exist. Please sign up.", {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (res.status === 401) {
      toast.error("Invalid credentials. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setIsSubmitting(false);
  };
  return isLogin ? (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                disabled={isSubmitting}
                onClick={HandleLogin}
                type="submit"
                className="w-full"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center flex gap-1 justify-center items-center text-sm">
              Don&apos;t have an account?{" "}
              <div
                onClick={() => setIsLogin(false)}
                href="#"
                className="underline cursor-pointer underline-offset-4"
              >
                Sign up
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : (
    <MultiStepForm className="mx-auto" setIsLogin={setIsLogin} />
  );
}
