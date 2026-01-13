import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token
    localStorage.removeItem("authToken");

    // Redirect to Login
    navigate("/Login");
  }, [navigate]);

  return null; // nothing to display
}

export default Logout;
