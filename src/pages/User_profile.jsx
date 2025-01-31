import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authSlice, setUserToken } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import { toast } from "react-hot-toast";
import "./Att_by_stud.css";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";

import Att_by_stud from "../components/Att_by_stud";
import Att_by_prof from "../components/Att_by_prof";
import TempDataUser from "./TempDataUser";

const User_profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  // useEffect(() => {
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  // }, [navigate]);

  const isSuper = data?.is_superuser;
  const verify = data?.is_email;
  // console.log(data);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          roll: data.roll_no,
          name: data.student_name,
          branch: data.branch,
          year: data.year,
          email: data.email,
          number: data.number,
        })
      );
    }
  }, [data, isSuccess, navigate]);
  const title = "Hello from Parent!";
  const title1 = "Hello from Parent!";
  return (
    <div>
      {verify ? (
        isSuper ? (
          <Att_by_prof message={title} />
        ) : (
          <Att_by_stud message={title1} />
        )
      ) : (
        <TempDataUser />
      )}
    </div>
  );
};

export default User_profile;
