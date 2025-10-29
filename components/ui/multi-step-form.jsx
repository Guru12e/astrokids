"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MultiStepForm({ className, setIsLogin }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Tell us about yourself",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "John",
          validation: {
            required: "First name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          },
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Doe",
          validation: {
            required: "Last name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          },
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
          validation: {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          },
        },
      ],
    },
    {
      id: "address",
      title: "Address Information",
      description: "Where do you live?",
      fields: [
        {
          name: "address",
          label: "Address",
          type: "text",
          placeholder: "123 Main St",
          validation: {
            required: "Address is required",
            minLength: { value: 5, message: "Minimum 5 characters" },
          },
        },
        {
          name: "city",
          label: "City",
          type: "text",
          placeholder: "New York",
          validation: {
            required: "City is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          },
        },
        {
          name: "zipCode",
          label: "Zip Code",
          type: "text",
          placeholder: "10001",
          validation: {
            required: "Zip code is required",
            minLength: { value: 5, message: "Minimum 5 characters" },
          },
        },
      ],
    },
    {
      id: "account",
      title: "Account Setup",
      description: "Create your account",
      fields: [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          validation: {
            required: "Username is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          },
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "••••••••",
          validation: {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message: "Must include uppercase & number",
            },
          },
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "••••••••",
          validation: {
            required: "Please confirm password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          },
        },
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formData,
    mode: "onChange",
  });

  const progress = ((step + 1) / steps.length) * 100;

  const handleNextStep = async (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    if (step < steps.length - 1) {
      setStep(step + 1);
      reset(updatedData);
    } else {
      setIsSubmitting(true);
      const res = await fetch("/api/addVendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (res.status === 201) {
        const data = await res.json();
        localStorage.setItem("vendor", JSON.stringify(data));
        router.push("/ecommerce/vendor");
      } else if (res.status === 409) {
        toast.error("Vendor already exists. Please login.", {
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
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setIsLogin(true);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div
      className={cn("bg-card/40 w-full rounded-lg p-6 shadow-lg", className)}
    >
      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">
            Step {step + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mb-8 flex justify-between">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center justify-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                  ? "bg-primary text-primary-foreground ring-primary/30 ring-2"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className="mt-1 hidden text-center text-xs sm:block">
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold">{steps[step].title}</h2>
            <p className="text-muted-foreground text-sm">
              {steps[step].description}
            </p>
          </div>

          <form onSubmit={handleSubmit(handleNextStep)} className="space-y-4">
            {steps[step].fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, field.validation)}
                  className={cn(errors[field.name] && "border-destructive")}
                />
                {errors[field.name] && (
                  <p className="text-destructive text-sm">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />{" "}
                {step === 0 ? "Back to Login" : "Previous"}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {step === steps.length - 1 ? (
                  isSubmitting ? (
                    "Submitting..."
                  ) : (
                    "Submit"
                  )
                ) : (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
