import { useState } from "react";
import { otpAPI } from "../api/apiService";
import { useLocation, useNavigate } from "react-router-dom";
import logger from "../utils/logger"; // Logger for debugging

const useApiRequest = (url) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const makeRequest = async (data) => {
    setLoading(true);
    try {
      const response = await otpAPI.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setLoading(false);
        return response.data;
      } else {
        setLoading(false);
        const errorMsg = response.data?.message || "Request failed";
        setError(errorMsg);
        logger.error(`API request failed: ${errorMsg}`);
        throw new Error(errorMsg);
      }
    } catch (err) {
      setLoading(false);
      let errorMessage = "An error occurred";
      if (err.response) {
        // Handle server errors (e.g., 5xx)
        errorMessage = err.response.data?.message || "Server error occurred";
      } else if (err.request) {
        // Handle network errors or no response from the server
        errorMessage = "Network error or no response from the server";
      } else if (err.message) {
        // Handle other errors (e.g., timeout)
        errorMessage = err.message;
      }

      setError(errorMessage);
      logger.error(`API request failed: ${errorMessage}`);
      return null;
    }
  };

  return { makeRequest, error, loading };
};

export default function MagicLinkAlertSignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const {
    makeRequest: sendOtpRequest,
    error: sendOtpError,
    loading: sendOtpLoading,
  } = useApiRequest("/send");
  const {
    makeRequest: verifyOtpRequest,
    error: verifyOtpError,
    loading: verifyOtpLoading,
  } = useApiRequest("/verify");
  const {
    makeRequest: loginRequest,
    error: loginError,
    loading: loginLoading,
  } = useApiRequest("/login");
  const {
    makeRequest: registerRequest,
    error: registerError,
    loading: registerLoading,
  } = useApiRequest("/register");

  const handleSendOtp = async () => {
    try {
      const response = await sendOtpRequest({ email });
      if (response && response.message === "User already exists") {
        setEmail(response.email);
        navigate("/login");
        return;
      }
      if (response) setStep(2);
    } catch (err) {
      logger.error("Error while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtpRequest({ email, otp });
      logger.info("OTP verified successfully!");
      if (response) setStep(3);
    } catch (err) {
      logger.error("Error while verifying OTP");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginRequest({ email, password });
      const token = response?.token;
      if (token) {
        localStorage.setItem("user-info", JSON.stringify(token));
        navigate("/dashboard");
      } else if (response?.message === "User not found") {
        setEmail(response.email);
        navigate("/register");
      }
    } catch (err) {
      logger.error("Error during login");
    }
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await registerRequest({ email, name, password });
      const token = response?.token;
      if (token) {
        localStorage.setItem("user-info", JSON.stringify(token));
        navigate("/dashboard");
      }
    } catch (err) {
      logger.error("Error during registration");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {location.pathname === "/login" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">Login Using Email</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-500 text-white rounded-lg"
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
          {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        </div>
      )}

      {location.pathname !== "/signup" && (
        <>
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-xl font-bold mb-4">Enter Your Email</h1>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <button
                onClick={handleSendOtp}
                className="w-full p-2 bg-blue-500 text-white rounded-lg"
                disabled={sendOtpLoading}
              >
                {sendOtpLoading ? "Sending OTP..." : "Send OTP"}
              </button>
              {sendOtpError && (
                <p className="text-red-500 mt-2">{sendOtpError}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-xl font-bold mb-4">Enter the OTP</h1>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full p-2 bg-blue-500 text-white rounded-lg"
                disabled={verifyOtpLoading}
              >
                {verifyOtpLoading ? "Verifying OTP..." : "Verify OTP"}
              </button>
              {verifyOtpError && (
                <p className="text-red-500 mt-2">{verifyOtpError}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-xl font-bold mb-4">Complete Your Profile</h1>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                contentEditable={false}
                className="w-full p-2 mb-4 border rounded-lg bg-gray-100"
                disabled
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <button
                onClick={handleSubmitDetails}
                className="w-full p-2 bg-blue-500 text-white rounded-lg"
                disabled={registerLoading}
              >
                {registerLoading ? "Registering..." : "Submit"}
              </button>
              {registerError && (
                <p className="text-red-500 mt-2">{registerError}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
