"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import GoogleLogin from "@/components/googleLogin/GoogleLogin";
import { useRouter } from "next/navigation";
import { otpApi } from "@/utils/api";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for handling errors
  const [loading, setLoading] = useState(false); // State for handling loading
  const { user, login } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submitting
    setLoading(true); // Start loading

    try {
      const response = await otpApi.post("/login", formData);
      if (response?.data?.token) {
        login(response.data.token);
        router.push("/dashboard");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-lightCard dark:bg-darkCard shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-lightText dark:text-darkText">
          Welcome back
        </h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

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
            disabled={loading}
            className="w-full py-2 mt-4 bg-lightPrimary hover:bg-lightSecondary dark:bg-darkPrimary dark:hover:bg-darkSecondary text-white rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login Button */}
        <GoogleLogin />

        {/* Signup Link */}
        <p className="mt-4 text-center text-lightText dark:text-darkText">
          {`Don't`} have an account?
          <Link
            href="/signin"
            className="text-lightPrimary dark:text-darkPrimary hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
