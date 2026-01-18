import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { logout } from "../Redux/authSlice";
import { useDispatch } from "react-redux";

function Logout() {
  debugger;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Remove token and user info from localStorage   
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");


    dispatch(logout());   // 🔥 clears Redux + localStorage
    // Redirect to Login
    navigate("/Login");
  }, [dispatch,navigate]);

  return null; // nothing to display
}

export default Logout;
