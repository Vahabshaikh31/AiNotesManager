import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = Cookies.get("user-info");
    const token = data ? JSON.parse(data)?.token : null;

    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/dashboard", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
