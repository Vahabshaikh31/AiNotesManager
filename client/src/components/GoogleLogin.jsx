import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import Logger from "../utils/logger";

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  Logger.info(`Login page loaded...`);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        setLoading(true); // Start loading
        const result = await googleAuth(authResult.code);
        console.log(result.data);
        const token = result.data.token;
        Logger.info("Google Login successful...", token);
        localStorage.setItem("user-info", JSON.stringify(token));
        setLoading(false);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={googleLogin}
        disabled={loading}
        className={`w-full sm:w-auto py-2 px-4 rounded-lg border border-gray-300 shadow-md 
          ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} 
          text-white font-semibold transition duration-200 ease-in-out 
          disabled:cursor-not-allowed disabled:bg-gray-300`}
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};

export default GoogleLogin;
