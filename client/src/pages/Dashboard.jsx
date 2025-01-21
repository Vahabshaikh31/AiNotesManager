import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import useUserStore from "../store/useUserStore";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { userInfo, logout, setUserInfo } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      const data = Cookies.get("user-info");
      if (data) {
        const userData = JSON.parse(data);
        setUserInfo(userData); // Set user info from cookie if it exists
      } else {
        navigate("/login");
      }
    }
  }, [userInfo, navigate, setUserInfo]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!userInfo) return <p>Loading...</p>; // Optional: Show a loading state

  return (
    <>
      <ResponsiveAppBar />
      <h1>Welcome {userInfo?.name}</h1>
      <h3>{userInfo?.email}</h3>
      <img src={userInfo?.image} alt={userInfo?.name} />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
