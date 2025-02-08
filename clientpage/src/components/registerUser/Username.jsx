"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon

export const Username = () => {
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
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-lightBg dark:bg-darkBg transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-lightCard dark:bg-darkCard shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-lightText dark:text-darkText">
          Sign In
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
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
          </div>{" "}
          <div className="mb-4">
            <label
              className="block text-lightText dark:text-darkText"
              htmlFor="password"
            >
              Re-Password
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Username;
