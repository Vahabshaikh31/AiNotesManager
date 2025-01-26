import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import RefrshHandler from "./components/RefreshHandler";
import NotFound from "./pages/NotFound";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useThemeStore from "./store/useThemeStore"; // Correctly import the Zustand store
import OtpLogin from "./components/OtpLogin";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { darkMode } = useThemeStore(); // Access the darkMode state from Zustand

  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="88805531313-qi6ucpfi9ha4acucih0kt4e78miu0ine.apps.googleusercontent.com">
      <OtpLogin />
    </GoogleOAuthProvider>
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Set the theme based on darkMode
    },
  });

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<GoogleWrapper />} />
          <Route path="/register" element={<GoogleWrapper />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
