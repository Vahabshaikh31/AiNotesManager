"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Register from "@/components/registerUser/Register";
import OTPVerification from "@/components/registerUser/otpInput";
import PasswordMatch from "@/components/registerUser/PasswordValid";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "" });

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleChildData = (data) => {
    setUserData((prev) => ({ ...prev, ...data })); // ✅ Ensure previous state is retained
  };

  return (
    <>
      {step === 1 && (
        <Register handleChildData={handleChildData} setStep={setStep} />
      )}
      {step === 2 && (
        <OTPVerification email={userData.email} setStep={setStep} />
      )}
      {step === 3 && <PasswordMatch email={userData.email} setStep={setStep} />}
    </>
  );
};

export default RegisterPage;
