"use client";

import { SignUpForm } from "@/components/signup-form/signup-form";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function SignupPage() {
  const searchParams = useSearchParams();
  const role = searchParams?.get("role") || "customer";
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(true);

  const handleCloseSignUpForm = () => {
    setIsSignUpFormOpen(false);
  };

  return (
    <div className="grid min-h-[80vh] lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login.jpg"
          alt="Image"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale rounded-lg"
          priority
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {isSignUpFormOpen && (
              <SignUpForm role={role} onCloseSignUpForm={handleCloseSignUpForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;