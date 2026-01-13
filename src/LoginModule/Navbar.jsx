import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation("");
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("authToken"); // or your auth check
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Successfully logged out");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <div className="space-x-6">
          {!isLoggedIn && (
            <>
              <Link
                to="/"
                className={`transition-colors duration-200 font-medium ${
                  pathname === "/"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Login
              </Link>
              <Link
                to="/Register"
                className={`transition-colors duration-200 font-medium ${
                  pathname === "/Register"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Register
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link
              to="/Dashboard"
              className={`transition-colors duration-200 font-medium ${
                pathname === "/Dashboard"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>
         {isLoggedIn && (
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
