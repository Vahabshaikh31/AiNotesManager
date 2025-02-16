"use client";

import { otpApi } from "@/utils/api";
import { useState, useRef, useEffect } from "react";

export default function OTPVerification({ email, setStep }) {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  console.log(email);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d$/.test(value)) return; // Allow only single digit (0-9)

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = ""; // Clear the current input
      } else if (index > 0) {
        newOtp[index - 1] = ""; // Clear previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").trim().slice(0, 4);
    if (!/^\d{4}$/.test(text)) return;

    setOtp(text.split(""));
    inputRefs.current[3]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const enteredOtp = otp.join(""); // Use correct OTP variable
      console.log(enteredOtp, email);

      const response = await otpApi.post("/verify", { email, otp: enteredOtp });

      if (response) {
        setStep(3);
      }
    } catch (error) {
      console.log("OTP verification failed:", error);
    }
  };

  return (
    <div className="max-w-md max-h-[100vh] mx-auto text-center bg-white dark:bg-darkCard px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 4-digit verification code sent to your phone number.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          ))}
        </div>

        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
        </div>
      </form>

      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{" "}
        <a
          className="font-medium text-indigo-500 hover:text-indigo-600"
          href="#"
        >
          Resend
        </a>
      </div>
    </div>
  );
}
