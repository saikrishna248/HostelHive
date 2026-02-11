import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
import { GoogleLogin } from "@react-oauth/google";
//Redux 1
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 2000);
  };
  //Redux 2
  const dispatch = useDispatch();

  const HandleLogin = async (e) => {
    //  debugger;
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44393/api/Auth/login",
        {
          email: email,
          password: password,
        },
      );
      // alert(response.data);
      // debugger;
      showToast(response.data.message, "success");

      //Before Redux local storage is uesd to Store token and user info in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      //Redux 3
      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user }),
      );
      setTimeout(() => navigate("/Dashboard"), 1500);
    } catch (error) {
      if (error.response) {
        showToast(error.response.data, "error"); // show backend error message
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      debugger;
      const idToken = credentialResponse.credential;

      const response = await axios.post(
        "https://localhost:44393/api/Auth/google-login",
        { token: idToken },
      );

      showToast("Google login successful", "success");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user }),
      );

      setTimeout(() => navigate("/Dashboard"), 1500);
    } catch (error) {
      showToast("Google login failed", "error");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Login
          </h2>

          <form onSubmit={HandleLogin}>
            {toast.show && <Toast message={toast.message} type={toast.type} />}

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-500 mb-2">OR</p>
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  showToast("Google Login Failed", "error");
                }}
              />
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/Register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
