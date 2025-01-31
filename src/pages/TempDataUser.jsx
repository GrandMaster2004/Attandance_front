import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSendEmailMutation } from "../services/userAuthApi";
import { getToken } from "../services/LocalStorageService";
import {
  useGetLoggedUserQuery,
  useIsEmailMutation,
} from "../services/userAuthApi";
import { toast } from "react-hot-toast";
import "./TempDataUser.css";
import icon_rotation3 from "../assets/icon_rotation3.svg";
import girl_rocket from "../assets/girl_rocket.svg";
import Other3 from "../assets/other3.svg";
import Other8 from "../assets/other8.svg";

const TempDataUser = () => {
  // consume
  const [code, setCode] = useState({});
  const randomNum = () => {
    return new Promise((resolve) => {
      let code1 = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      setCode(code1);
      resolve(code1);
    });
  };
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [sendemail, { isLoading }] = useSendEmailMutation();
  const [isEmail] = useIsEmailMutation();
  console.log(data);

  const [formData, setFormData] = useState({
    otp: "",
    email: "",
    dob: "",
    year: "",
    branch: "",
    phone: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  // myfuntion;
  useEffect(() => {
    if (data && isSuccess) {
      setFormData({
        email: data.email,
      });
    }
  }, [data, isSuccess]);

  const [time, setTime] = useState("00:00");

  // Function to start the timer
  const [otp1, setotp] = useState(true);

  const startOTPTimer = async () => {
    let timer = 120,
      minutes,
      seconds;
    setotp(false);
    const interval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Update the state instead of using console.log
      setTime(minutes + ":" + seconds);

      if (--timer < 0) {
        setotp(true);
        randomNum();
        clearInterval(interval);
        console.log("Timer ended!");
      }
    }, 1000);
    const code1 = await randomNum();
    const actualData = {
      otp: code1,
      email: formData.email,
    };

    const resp = await sendemail({ actualData, access_token });
    if (resp.error) {
      setServerError(resp.error.data.errors);
      toast.error("Some Error Occure during OTP send");
    } else {
      toast.success("OTP send successfully Valid only for 2 min");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Extract data from the form
    const data = new FormData(e.currentTarget);
    const actualData = {
      dob: data.get("dob"),
      branch: data.get("branch"),
      number: data.get("phone"),
      year: data.get("year"),
      is_email: true,
    };
    const code1 = Number(data.get("otp"));

    if (code1 === code) {
      const res = await isEmail({ actualData, access_token });
      if (res.error) {
        toast.error("Some Error Occure during Verification");
        setServerMsg({});
        setServerError(res.error.data.errors);
      } else {
        toast.success("Verified successfully");
        window.location.reload();
      }
    } else {
      toast.error("OTP NOT MATCH.");
      setServerError("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="main">
      <div className="main_left">
        <span className="spot_left "></span>
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full gap-y-4 mt-6 relative"
        >
          <label className="w-full">
            <input
              type="text"
              required
              value={formData.otp}
              onChange={changeHandler}
              placeholder="Enter otp "
              name="otp"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
            />

            <span className=" text-rose-950 font-bold">
              {server_error.non_field_errors
                ? server_error.non_field_errors
                : ""}
            </span>
          </label>
          <label className="w-full">
            <input
              type="number"
              maxLength={10}
              required
              name="phone"
              onChange={changeHandler}
              placeholder="Enter Your Phone"
              value={formData.phone}
              className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
            />
            <span className="text-rose-950 font-bold">
              {server_error.number ? server_error.number : ""}
            </span>
          </label>
          <label className="w-full">
            <input
              type="text"
              required
              name="branch"
              onChange={changeHandler}
              placeholder="Enter Your Branch"
              value={formData.branch}
              className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
            />
            <span className=" text-rose-950 font-bold">
              {server_error.branch ? server_error.branch : ""}
            </span>
          </label>
          <label className="w-full">
            <input
              type="date"
              required
              name="dob"
              onChange={changeHandler}
              placeholder="Enter DOB"
              value={formData.dob}
              className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
            />
            <span className=" text-rose-950 font-bold">
              {server_error.dob ? server_error.dob : ""}
            </span>
          </label>
          <label className="w-full">
            <i className="fas fa-lock"></i>
            <input
              type="number"
              required
              name="year"
              onChange={changeHandler}
              placeholder="Enter Your Year"
              value={formData.year}
              className="input-box bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] text-black"
            />
            <span className=" text-rose-950 font-bold">
              {server_error.year ? server_error.year : ""}
            </span>
          </label>
          <button
            className="w-full bg-green-500 rounded-[0.5rem]  p-[12px] cursor-pointer"
            onClick={submitHandler}
          >
            Validate
          </button>
          {otp1 ? (
            <button
              className="w-full bg-blue-500 rounded-[0.5rem]  p-[12px] cursor-pointer"
              onClick={startOTPTimer}
            >
              Send OTP
            </button>
          ) : (
            <div>
              <h2 className="w-full bg-blue-500 rounded-[0.5rem]  p-[12px]">
                Timer: {time}
              </h2>
            </div>
          )}
        </form>
      </div>
      <div className="main_right">
        <span className="right_left"></span>
        <div className="circle_outer circle_outer1">
          <span className="rotation">
            <img src={icon_rotation3} className="rocket" alt="img" />
          </span>
          <span className="rotation">
            <img src={icon_rotation3} className="rocket1" alt="img" />
          </span>
        </div>
        <div className="icon_shadow">
          <img src={Other3} alt="img" className="icon_box" />
        </div>
        <div className="icon_shadow1">
          <img src={Other8} alt="img" className="icon_box" />
        </div>
        <div className="circle_inner">
          <div className="send_otp">
            <img src={girl_rocket} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempDataUser;
