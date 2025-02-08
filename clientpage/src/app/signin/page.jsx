"use client";
import React, { useState } from "react";
import Register from "@/components/registerUser/Register";
import OTPVerification from "@/components/registerUser/otpInput";
import PasswordMatch from "@/components/registerUser/PasswordValid";

const page = () => {
  const [step, setstep] = useState(1);
  return (
    <>
      {step === 1 && <Register setstep={setstep} />}
      {step === 2 && <OTPVerification setstep={setstep} />}
      {step === 3 && <PasswordMatch setstep={setstep} />}
    </>
  );
};

export default page;
