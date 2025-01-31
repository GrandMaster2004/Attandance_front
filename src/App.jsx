import { setUserInfo, unsetUserInfo } from "./features/userSlice";
import { unSetUserToken } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { getToken, removeToken } from "./services/LocalStorageService";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import User_profile from "./pages/User_profile.jsx";
import Template from "./components/Template.jsx";
import Sign_login from "./pages/Sign_login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const loggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !loggedIn &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/"
    ) {
      if (loggedIn) {
        dispatch(
          unsetUserInfo({
            roll: "",
            name: "",
            branch: "",
            year: "",
            email: "",
            number: "",
          })
        );
        dispatch(unSetUserToken({ access_token: null }));
        removeToken();
        localStorage.removeItem("loggedIn");
      }
      navigate("/login");
    }
    if (
      loggedIn &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/")
    ) {
      navigate("/user_profile");
    }
  }, [loggedIn, navigate]);

  return (
    <div className=" ">
      {loggedIn ? <Navbar /> : null}
      <Routes>
        <Route path="/login" element={<Sign_login />} />
        <Route path="/" element={<Sign_login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user_profile" element={<User_profile />} />
          <Route path="/showData" element={<Template />} />
        </Route>
        {/* Redirect logged-in users from incorrect routes to /user_profile */}
        <Route
          path="*"
          element={
            loggedIn ? (
              <Navigate to="/user_profile" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
