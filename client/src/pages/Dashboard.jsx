import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Logger from "../utils/logger";
import { userAPI } from "../api/apiService";

const Dashboard = () => {
  const navigate = useNavigate();
  Logger.info("Dashboard page loaded...");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem("user-info"));

  const userInfo = async () => {
    try {
      const response = await userAPI.get("/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      Logger.error("Error fetching user info", error);
      setError("An error occurred while fetching user info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("No token found, please log in again.");
      setLoading(false);
      navigate("/login");
      return;
    }
    userInfo();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user-info"); // Correctly remove the token
    navigate("/login"); // Redirect to login page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>; // Display any errors

  return (
    <>
      <ResponsiveAppBar picture={user?.picture} />
      <h1>Welcome {user?.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
