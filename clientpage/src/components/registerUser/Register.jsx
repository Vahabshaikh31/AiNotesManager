"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GoogleLogin from "../googleLogin/GoogleLogin";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { otpApi } from "@/utils/api";

export default function Register({ handleChildData, setStep }) {
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  // Redirect logged-in users to the dashboard
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await otpApi.post("/send", { email });

      if (response?.data?.message === "User already exists") {
        alert(response.data.message);
        router.push("/login");
        return;
      }

      // Call handleChildData only if the user does not exist
      handleChildData({ email });
      setStep(2);
    } catch (err) {
      console.log("Error while sending OTP:", err.message);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // Prevent rendering if user is already authenticated
  if (user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-lightCard dark:bg-darkCard shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-lightText dark:text-darkText">
          Sign Up
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-lightText dark:text-darkText"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-lightInputBg dark:bg-darkInputBg text-lightText dark:text-darkText border-lightInputBorder dark:border-darkInputBorder focus:outline-none focus:ring-2 focus:ring-lightInputFocus dark:focus:ring-darkInputFocus"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-lightPrimary hover:bg-lightSecondary dark:bg-darkPrimary dark:hover:bg-darkSecondary text-white rounded-lg transition"
          >
            Continue
          </button>
        </form>

        {/* Google Login */}
        <GoogleLogin />

        {/* Login Link */}
        <p className="mt-4 text-center text-lightText dark:text-darkText">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-lightPrimary dark:text-darkPrimary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
