import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/apiService"; // Ensure this matches the correct API endpoint
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
    <div className="App">
      <button onClick={googleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>
  );
};

export default GoogleLogin;
