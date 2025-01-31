import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginUserMutation } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserToken } from "../features/authSlice";
import { getToken, storeToken } from "../services/LocalStorageService";
import { toast } from "react-hot-toast";
import "../pages/Login.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginState } from "../features/loginButtonSlice";
import log from "../assets/log.svg";
import register from "../assets/register.svg";
import "./Sign_login.css";

import { useRegisterUserMutation } from "../services/userAuthApi";

const Sign_login = () => {
  const [isClassAdded, setIsClassAdded] = useState(false);
  const handleAddClass = () => {
    setIsClassAdded(true);
  };
  const handleRemoveClass = () => {
    setIsClassAdded(false);
  };

  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [formDatalogin, setFormDatalogin] = useState({
    roll: "",
    password: "",
  });

  const [showPasswordlogin, setShowPasswordlogin] = useState(false);
  function changeHandlerlogin(event) {
    setFormDatalogin((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      roll_no: data.get("roll"),
      password: data.get("password"),
    };
    console.log(actualData);

    const res = await loginUser(actualData);
    if (res.error) {
      toast.success(
        "Some Error Occure During Login please logout then try again"
      );
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      toast.success("Logged in");
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }));
      dispatch(toggleLoginState(true));
      localStorage.setItem("loggedIn", true);
      navigate("/user_profile");
    }
  };
  // login end

  //   signup
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [formDatasign, setformDatasign] = useState({
    firstName: "",
    roll: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPasswordsign, setShowPasswordsign] = useState(false);
  const [showConfirmPasswordsign, setShowConfirmPasswordsign] = useState(false);

  function changeHandler(event) {
    setformDatasign((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      roll_no: data.get("roll"),
      email: data.get("email"),
      student_name: data.get("firstName"),
      password: data.get("password"),
      password2: data.get("confirmPassword"),
    };
    const res = await registerUser(actualData);

    if (res.error) {
      toast.error("Some Error Occure during SignUp SuccessFully");
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setformDatasign({
        firstName: "",
        roll: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("You SignUp SuccessFully");
      // toast.success("Logged in");
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }));
      dispatch(toggleLoginState(true));
      localStorage.setItem("loggedIn", true);
      navigate("/user_profile");
    }
  };
  return (
    <div>
      <div className={`container1 ${isClassAdded ? "sign-up-mode" : ""}`}>
        <div className="forms-container1">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={loginHandler}>
              <h2 className="title ">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  required
                  value={formDatalogin.roll}
                  onChange={changeHandlerlogin}
                  placeholder="Enter roll id"
                  name="roll"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showPasswordlogin ? "text" : "password"}
                  required
                  value={formDatalogin.password}
                  onChange={changeHandlerlogin}
                  placeholder="Enter Password"
                  name="password"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
                />
                <span
                  className="text-black absolute right-3 bottom-20"
                  onClick={() => setShowPasswordlogin((prev) => !prev)}
                >
                  {showPasswordlogin ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
              <span className=" text-rose-950 font-bold">
                {server_error.non_field_errors
                  ? server_error.non_field_errors
                  : ""}
              </span>
              <input type="submit" value="Login" className="btn solid" />
            </form>

            <form onSubmit={handleSubmit} className="sign-up-form">
              <h2 className="title text-white">Registration</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  required
                  name="firstName"
                  onChange={changeHandler}
                  placeholder="Enter First Name"
                  value={formDatasign.firstName}
                  className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
                />
                <span className=" text-rose-950 font-bold">
                  {server_error.student_name ? server_error.student_name : ""}
                </span>
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  maxLength={10}
                  type="text"
                  required
                  name="roll"
                  onChange={changeHandler}
                  placeholder="Enter Your Roll"
                  value={formDatasign.roll}
                  className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
                />
                <span className=" text-rose-950 font-bold">
                  {server_error.roll_no ? server_error.roll_no : ""}
                </span>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="email"
                  required
                  name="email"
                  onChange={changeHandler}
                  placeholder="Enter Your Email"
                  value={formDatasign.email}
                  className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
                />
                <span className=" text-rose-950 font-bold">
                  {server_error.email ? server_error.email : ""}
                </span>
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showPasswordsign ? "text" : "password"}
                  required
                  value={formDatasign.password}
                  onChange={changeHandler}
                  placeholder="Enter Password"
                  name="password"
                  className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
                />
                <span
                  className="icon"
                  onClick={() => setShowPasswordsign((prev) => !prev)}
                >
                  {showPasswordsign ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
                <span className=" text-rose-950 font-bold">
                  {server_error.password ? server_error.password : ""}
                </span>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showConfirmPasswordsign ? "text" : "password"}
                  required
                  value={formDatasign.confirmPassword}
                  onChange={changeHandler}
                  placeholder="Enter Password"
                  name="confirmPassword"
                  className="input-box flex bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
                />
                <span
                  className="icon"
                  onClick={() => setShowConfirmPasswordsign((prev) => !prev)}
                >
                  {showConfirmPasswordsign ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
                <span className=" text-rose-950 font-bold">
                  {server_error.password2 ? server_error.password2 : ""}
                </span>
              </div>
              <span className=" text-rose-950 font-bold">
                {server_error.non_field_errors
                  ? server_error.non_field_errors
                  : ""}
              </span>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container1">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleAddClass}
              >
                Sign up
              </button>
            </div>
            <img src={log} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleRemoveClass}
              >
                Sign in
              </button>
            </div>
            <img src={register} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_login;
