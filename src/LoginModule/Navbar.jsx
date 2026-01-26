import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Toast from './Toast';
import { useState } from "react";
import GettingData from "../Dashboard/GettingData"; 
import ExcelUpload from "../Dashboard/ExcelUpload";


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import HighChart from "../Dashboard/HighChart";


function Navbar() {
     // debugger;
  const { pathname } = useLocation("");
  const navigate = useNavigate();


  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 2000);
  };
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //const isLoggedIn = !!localStorage.getItem("token"); // or your auth check

  const handleLogout = () => {
   
    dispatch(logout()); // 🔥 clears Redux + localStorage
    showToast("Successfully logged out", "success");
    navigate("/");
  };

  return (
    <>

      {toast.show && <Toast message={toast.message} type={toast.type} />}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <div className="space-x-6">
          {!isAuthenticated && (
            <>
              <Link
                to="/"
                className={`transition-colors duration-200 font-medium ${pathname === "/"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                Login
              </Link>
              <Link
                to="/Register"
                className={`transition-colors duration-200 font-medium ${pathname === "/Register"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                Register
              </Link>
              <Link
                to="/Dashboard/GettingData"
                className={`transition-colors duration-200 font-medium ${pathname === "./Dashboard/GettingData"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                Ecommerce
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
            <Link
              to="/Dashboard"
              className={`transition-colors duration-200 font-medium ${pathname === "/Dashboard"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
                }`}
            >
              Dashboard
            </Link>
             <Link
              to="/Dashboard/HighChart"
              className={`transition-colors duration-200 font-medium ${pathname === "/Dashboard/HighChart"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
                }`}
            >
              HighCharts
            </Link>
            <Link
              to="/Dashboard/ExcelUpload"
              className={`transition-colors duration-200 font-medium ${pathname === "/Dashboard/ExcelUpload"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
                }`}
            >
              Excel Upload
            </Link>
            </>
          )}
        </div>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition-colors duration-200"
          >
            Logout
          </button>
        )}

      </nav>
    </>
  );
}
export default Navbar;
