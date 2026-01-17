import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from './Toast';

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 2000);
  };

  const HandleRegister = async (e) => {
 //   debugger;
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44393/api/Auth/Register",
        {
          email: email,
          password: password,
          fullName: fullName,
          confirmPassword: confirmPassword
        }
      );
      //  alert(response.data);
      showToast(response.data, "success");
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      if (error.response) {
        //alert(error.response.data); // show backend error message
        showToast(error.response.data, "error");
      }

    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
            Create Account
          </h2>

          <form onSubmit={HandleRegister}>
            {toast.show && <Toast message={toast.message} type={toast.type} />}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}

            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

    </>
  )
}

export default Register