import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../services/LocalStorageService";
import { toast } from "react-hot-toast";
import "./Att_by_stud.css";

import { useEffect, useState } from "react";

import {
  useSuperUserDatanextMutation,
  useSuperUserDataMutation,
} from "../services/userAuthApi";
import Template from "../components/Template";
import { saveObjects } from "../features/useDataSlice";
import "./Att_by_prof.css";

const Att_by_prof = (props) => {
  const [server_error, setServerError] = useState({});
  const [allData, setAllData] = useState({});
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [superUserDatanext, { isLoading }] = useSuperUserDatanextMutation();
  const [superUserData] = useSuperUserDataMutation();

  const [formData, setFormData] = useState({
    roll_no: "",
    student_name: "",
    email: "",
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

  const user = useSelector((state) => state.user);
  let code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  useEffect(() => {
    if (user) {
      setFormData({
        roll_no: user.roll,
        student_name: user.name,
        branch: user.branch,
        year: user.year,
        email: user.email,
        number: user.number,
        otp: code,
      });
    }
  }, [user]);
  const roll = user.roll;

  const location = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);

            resolve({ latitude, longitude });
          },
          (error) => {
            showDetails.textContent = error.message;
            console.log(error.message);
          },
          {
            enableHighAccuracy: true, // This option makes the location more accurate
            timeout: 5000, // Set a timeout period (in milliseconds)
            maximumAge: 0, // Disable cache to always get fresh location
          }
        );
      }
    });
  };
 
  const submitHandler_form = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = new FormData(e.currentTarget);
    const { latitude, longitude } = await location();
    const firstData = {
      otp: code,
      email: data.get("email"),
      latitude: latitude,
      longitude: longitude,
    };

    const res = await superUserData({ firstData, access_token });
    const secondData = {
      roll_no: roll,
      student_name: data.get("student_name"),
      branch: data.get("branch"),
      year: data.get("year"),
      email: data.get("email"),
      otp: code,
      section: data.get("sec"),
      subCode: data.get("subCode"),
    };
    console.log("THis is first data");

    if (res.error) {
      // setServerMsg({})
      setServerError(res.error.data.errors);
      toast.error("data save not success fully in");
    }
    console.log("first data success fully");
    if (res.data) {
      toast.success("data save success fully in");
      setFormData({
        roll_no: user.roll,
        student_name: user.name,
        branch: user.branch,
        year: user.year,
        email: user.email,
        number: user.number,
        otp: code,
      });
      setTimeout(async function () {
        console.log("This message is displayed after 2 seconds.");

        const resp = await superUserDatanext({ secondData, access_token });
        console.log(resp.data.getdata);

        // console.log(resp.data.getdata);
        setAllData(resp.data.getdata);
        if (resp.error) {
          setServerError(resp.error.data.errors);
          console.log("some thing error");
        } else {
          console.log(secondData);
          dispatch(saveObjects(allData));
          setCheck(true);
        }
      }, 60000);
    }
  };

  return (
    <div className="prof_main">
      <div className="title text-center">Take Today Attendance</div>
      <div className="max-w-lg container_form ">
        <form onSubmit={submitHandler_form}>
          <input
            type="text"
            name="roll_no"
            value={formData.roll_no}
            hidden
            readOnly
          />
          <input type="text" name="email" value={formData.email} hidden />

          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            hidden
          />
          <input type="text" name="number" value={formData.number} hidden />

          <div className="user-details">
            <div className="input-box">
              <span className="details">Subject Code</span>
              <input
                type="text"
                required
                value={formData.subCode}
                onChange={changeHandler}
                placeholder="Enter your subject code"
                name="subCode"
                id="subCode"
              />
             
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
              <span className=" text-rose-950 font-bold">
                {server_error.section ? server_error.section : ""}
              </span>
            </div>
            <div className="input-box">
              <span className="details">Year</span>

              <input
                required
                value={formData.year}
                onChange={changeHandler}
                type="text"
                placeholder="Enter your subject code"
                name="year"
                id="year"
              />
              <span className=" text-rose-950 font-bold">
                {server_error.section ? server_error.section : ""}
              </span>
            </div>

            <div className="input-box">
              <span className="details">Branch</span>
              <input
                type="text"
                required
                value={formData.branch}
                onChange={changeHandler}
                placeholder="Enter branch"
                name="branch"
              />

              <span className=" text-rose-950 font-bold">
                {server_error.branch ? server_error.branch : ""}
              </span>
              <span className=" text-rose-950 font-bold">
                {server_error.non_field_errors
                  ? server_error.non_field_errors
                  : ""}
              </span>
            </div>
          </div>

          <div className="button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div>
        {check ? (
          <Template allData={allData} email={user.email} branch={formData.branch} setcheck={setCheck} />
        ) : (
          "  "
        )}
      </div>
    </div>
  );
};

export default Att_by_prof;
