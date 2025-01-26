import { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleLogin from "../components/GoogleLogin";
import OtpLogin from "../components/OtpLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // On component mount, load the theme state from localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.body.classList.add("dark-mode"); // Add dark mode class to body if dark mode is enabled
    } else {
      document.body.classList.remove("dark-mode"); // Otherwise, remove it
    }
  }, []);

  // Toggle Dark/Light theme
  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode); // Persist the theme in localStorage
    if (newDarkMode) {
      document.body.classList.add("dark-mode"); // Add dark mode class to body
    } else {
      document.body.classList.remove("dark-mode"); // Remove dark mode class from body
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login");
  };

  const handleGithubLogin = () => {
    // Implement GitHub login logic here
    console.log("GitHub login");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Typography className="login-title">Login</Typography>
        <OtpLogin  />
        {/* <Button
          variant="contained"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          className="login-button login-google"
        >
          <GoogleLogin />
        </Button> */}

        {/* GitHub Login Button */}
        {/* <Button
          variant="contained"
          fullWidth
          startIcon={<GitHubIcon />}
          onClick={handleGithubLogin}
          className="login-button login-github"
        >
          Login with GitHub
        </Button> */}

        <div className="signup-footer">
          <Typography variant="body2">
            Don't have an account? <a href="/signup">Sign Up</a>
          </Typography>
        </div>

        {/* Dark Mode Toggle */}
        {/* <Button
          variant="outlined"
          fullWidth
          onClick={handleThemeToggle}
          className="theme-toggle-button"
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button> */}
      </div>
    </div>
  );
};

export default Login;
