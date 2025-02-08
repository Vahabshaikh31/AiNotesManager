"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert(`Logged in with ${formData.email}`);
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
    alert("Google Login Clicked!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-lightCard dark:bg-darkCard shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-lightText dark:text-darkText">
          Welcome back
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
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-lightInputBg dark:bg-darkInputBg text-lightText dark:text-darkText border-lightInputBorder dark:border-darkInputBorder focus:outline-none focus:ring-2 focus:ring-lightInputFocus dark:focus:ring-darkInputFocus"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              className="block text-lightText dark:text-darkText"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-lightInputBg dark:bg-darkInputBg text-lightText dark:text-darkText border-lightInputBorder dark:border-darkInputBorder focus:outline-none focus:ring-2 focus:ring-lightInputFocus dark:focus:ring-darkInputFocus"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-lightPrimary hover:bg-lightSecondary dark:bg-darkPrimary dark:hover:bg-darkSecondary text-white rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2 mt-4 bg-lightInputBg dark:bg-darkInputBg border border-lightInputBorder dark:border-darkInputBorder rounded-lg text-lightText dark:text-darkText hover:bg-lightCard dark:hover:bg-darkCard transition"
        >
          <FcGoogle className="text-2xl" />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="mt-4 text-center text-lightText dark:text-darkText">
          {`Don't`} have an account?
          <Link
            href="/signin"
            className="text-lightPrimary dark:text-darkPrimary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
