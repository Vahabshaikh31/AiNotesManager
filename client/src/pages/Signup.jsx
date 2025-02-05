import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import OtpLogin from "../components/OtpLogin";
import GoogleLogin from "../components/GoogleLogin";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);
  const handlereg = () => navigate("/login");

  return (
    <div className="login-container">
      <div className="login-form">
        <Typography className="login-title">Login</Typography>
        <OtpLogin />
        <GoogleLogin />
        <div className="signup-footer">
          <Typography variant="body2">
            <button onClick={handlereg}> have an account? Login</button>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Signup;
