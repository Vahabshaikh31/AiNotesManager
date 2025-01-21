import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/apiService"; // Ensure this matches the correct API endpoint
import { useNavigate } from "react-router-dom";

const GoogleLogin = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        setLoading(true); // Start loading
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token, image };
        localStorage.setItem("user-info", JSON.stringify(obj));
        setLoading(false); // Stop loading
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
      setLoading(false); // Stop loading on error
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
