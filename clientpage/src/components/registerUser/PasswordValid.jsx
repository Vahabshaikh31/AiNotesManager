"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { otpApi } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function PasswordMatch({ email }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await otpApi.post("/register", { password, email });
      const token = response?.data?.token;

      if (token) {
        login(token);
        router.push("/dashboard");
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg">
      <div className="w-full max-w-md p-6 bg-lightBg dark:bg-darkCard shadow-xl rounded-2xl border dark:border-gray-800">
        <h2 className="text-2xl font-bold text-lightText dark:text-darkText text-center mb-4">
          Set Your Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Password Field */}
          <div className="relative mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-lightInputBg dark:bg-darkInputBg text-lightText dark:text-darkText border-lightInputBorder dark:border-darkInputBorder focus:outline-none focus:ring-2 focus:ring-lightInputFocus dark:focus:ring-darkInputFocus"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-lightText dark:text-darkText hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative mb-4">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-lightInputBg dark:bg-darkInputBg text-lightText dark:text-darkText border-lightInputBorder dark:border-darkInputBorder focus:outline-none focus:ring-2 focus:ring-lightInputFocus dark:focus:ring-darkInputFocus"
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-lightText dark:text-darkText hover:text-gray-200"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-lightPrimary hover:bg-lightSecondary dark:bg-darkPrimary dark:hover:bg-darkSecondary text-white rounded-lg transition"
          >
            Register & Login
          </button>
        </form>
      </div>
    </div>
  );
}
