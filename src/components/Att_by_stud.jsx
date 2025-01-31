import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authSlice, setUserToken } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import { toast } from "react-hot-toast";
import "./Att_by_stud.css";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import { unSetUserToken } from "../features/authSlice";
import { useSaveUserDataMutation } from "../services/userAuthApi";
import { useSelector, useDispatch } from "react-redux";

const Att_by_stud = () => {
  // title = props.title
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveUserData, { isLoading }] = useSaveUserDataMutation();
  const user = useSelector((state) => state.user);
  // console.log(user);

  const [formData, setFormData] = useState({
    roll_no: "",
    student_name: "",
    // email: "",
    branch: "",
    year: "",
    number: "",
    subCode: "",
    sec: "",
    otp: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const { access_token } = getToken();
  // Store User Data in Local State

  useEffect(() => {
    if (user) {
      setFormData({
        roll_no: user.roll,
        student_name: user.name,
        branch: user.branch,
        year: user.year,
        // email: data.email,
        number: user.number,
      });
    }
  }, [user]);

  // location
  const location = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            showDetails.textContent = error.message;
            console.log(error.message);
          }
        );
      }
    });
  };

  const usersubmitHandler = async (e) => {
    e.preventDefault();
    const data1 = new FormData(e.currentTarget);
    const { latitude, longitude } = await location();
    console.log(latitude, longitude);

    const roll = user.roll;
    const name = user.name;
    const actualData = {
      roll_no: roll,
      student_name: name,
      otp: data1.get("otp"),
      branch: data1.get("branch"),
      year: data1.get("year"),
      number: data1.get("number"),
      subCode: data1.get("subCode"),
      section: data1.get("sec"),
      latitude: latitude,
      longitude: longitude,
    };
    const res = await saveUserData({ actualData, access_token });
    console.log(actualData);

    if (res.error) {
      setServerError(res.error.data.errors);
      console.log("error");
    }
    if (res.data) {
      toast.success("data save success fully in");
      setFormData({
        subCode: "",
        sec: "",
        otp: "",
      });
    }
  };

  return (
    <div className="superMain">
      <div className="title1 ">Give Your Today Attendance</div>
      <div className="left">
        <form onSubmit={usersubmitHandler}>
          <input type="text" name="branch" value={formData.branch} hidden />
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            hidden
          />
          <input type="text" name="number" value={formData.number} hidden />
          <input type="text" name="year" value={formData.year} hidden />

          <div className="user-details">
            <div className="input-box">
              <input
                type="text"
                required
                value={formData.subCode}
                onChange={changeHandler}
                placeholder="Enter your subject code"
                name="subCode"
                id="subCode"
              />
              {server_error.subCode ? server_error.subCode : ""}
            </div>
            <div className="input-box">
              <span className="details">Section</span>
             
              <input
                required
                value={formData.sec}
                onChange={changeHandler}
                type="text"
                placeholder="Enter your subject code"
                name="sec"
                id="sec"
              />
              {server_error.sec ? server_error.sec : ""}
            </div>

            <div className="input-box">
              <span className="details">Otp</span>
              <input
                type="text"
                required
                value={formData.otp}
                onChange={changeHandler}
                placeholder="Enter otp"
                name="otp"
                id="otp"
              />
              <span className=" text-rose-950 font-bold">
                {server_error.otp ? server_error.otp : ""}
              </span>
            </div>
            <span className=" text-rose-950 font-bold">
              {server_error.non_field_errors
                ? server_error.non_field_errors
                : ""}
            </span>
            <div className="button">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>

      {/* </div> */}
    </div>
  );
};

export default Att_by_stud;
