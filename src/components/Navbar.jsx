import React, { useContext, useState } from "react";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import { unSetUserToken } from "../features/authSlice";
// import { useDispatch } from "react-redux";
import { getToken, removeToken } from "../services/LocalStorageService";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginState } from "../features/loginButtonSlice";
export default function Navbar() {
  // const isLoggedIn = useSelector((state) => state.loginButton.isLoggedIn);
  const isLoggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
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
    toast.success("Logout");
    localStorage.removeItem("loggedIn");
    navigate("/");

    // dispatch(toggleLoginState(false));
  };
  const signUppage = () => {
    navigate("/signup");
  };
  const logInpage = () => {
    navigate("/");
  };
  // let isLoggedIn =
  return (
    <>
      <div className="flex list-none justify-around pt-4 pb-3 bg-slate-900 text-white absolute  w-[100%] top-0">
        <li className="text-3xl font-bold">Attendance</li>
        <div className="flex">
          {isLoggedIn ? (
            <button
              className="text-2xl bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <div>
              <button
                className="text-2xl mx-2 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 cursor-pointer"
                onClick={signUppage}
              >
                SignUp
              </button>
              <button
                className="text-2xl mx-2 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 cursor-pointer"
                onClick={logInpage}
              >
                Login
              </button>
            </div>
          )}
          {/* <li className="text-3xl ml-2 pt-2">
          <MdOutlineSentimentVerySatisfied />
        </li> */}
        </div>
      </div>
    </>
  );
}
