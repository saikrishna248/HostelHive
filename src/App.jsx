
import { Routes, Route } from "react-router-dom";
import Navbar from "./LoginModule/Navbar";
import Login from "./LoginModule/Login";
import Register from "./LoginModule/Register";
import Dashboard from "./LoginModule/Dashboard";
import Ecommerce from "./Dashboard/Ecommerce";

import ProtectedRoute from "./api/ProtectedRoute";
// import "./App.css";

function App() {
  return (
    <>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/Dashboard/Ecommerce" element={<Ecommerce />} />
      </Routes>

    </>
  );
}

export default App;
