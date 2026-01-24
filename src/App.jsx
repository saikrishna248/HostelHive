import { Routes, Route } from "react-router-dom";
import Navbar from "./LoginModule/Navbar";
import Login from "./LoginModule/Login";
import Register from "./LoginModule/Register";
import Dashboard from "./LoginModule/Dashboard";
import Ecommerce from "./Dashboard/Ecommerce";
import GettingData from "./Dashboard/GettingData";

import ProtectedRoute from "./api/ProtectedRoute";
import HighChart from "./Dashboard/HighChart";
// import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard/HighChart"
          element={
            <ProtectedRoute>
              <HighChart />
            </ProtectedRoute>
          }
        />

        <Route path="/Dashboard/GettingData" element={<GettingData />} />
      </Routes>
    </>
  );
}

export default App;
