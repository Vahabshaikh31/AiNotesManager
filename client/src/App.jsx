import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./pages/GoogleLogin";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import RefrshHandler from "./components/RefreshHandler";
import NotFound from "./pages/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="88805531313-qi6ucpfi9ha4acucih0kt4e78miu0ine.apps.googleusercontent.com">
      <GoogleLogin></GoogleLogin>
    </GoogleOAuthProvider>
  );
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<GoogleWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
