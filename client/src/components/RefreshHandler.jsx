import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logger from "../utils/logger";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("user-info");

      Logger.info("Refresh handler data", token);

      if (token) {
        setIsAuthenticated(true);
        if (location.pathname === "/" || location.pathname === "/login") {
          navigate("/dashboard", { replace: false });
        }
      } else {
        setIsAuthenticated(false); // Explicitly set authentication to false if no token
      }
    } catch (error) {
      Logger.error("Error parsing user-info from localStorage", error);
      setIsAuthenticated(false);
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
