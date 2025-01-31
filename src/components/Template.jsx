import React, { useState } from "react";
import Card from "./Card";
import { getToken } from "../services/LocalStorageService";
import { useSendDataMutation } from "../services/userAuthApi";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
const Template = ({ allData, email, setCheck, branch }) => {
  const [data, setAllData] = useState(allData); // Initialize state directly with allData
  const { access_token } = getToken();
  const [sendData, { isLoading }] = useSendDataMutation();
  // const branch = branch;
  const submitHandlersend = async (e) => {
    e.preventDefault();

    const sec = allData[0].section;
    const year = allData[0].year;

    const actualData = {
      students: data,
      email: email,
      section: sec,
      year: year,
      branch: branch,
    };

    const res = await sendData({ actualData, access_token });
    if (res.error) {
      toast.error("data save not success fully in");
    } else {
      toast.success("data save success fully in");
      // console.log(data);
      setAllData(null);
      window.location.reload();
    }
  };

  const check = (roll_no) => {
    const newTours = data.map((one) => {
      if (one.roll_no === roll_no) {
        return { ...one, isPresent: !one.isPresent };
      }
      return one;
    });
    setAllData(newTours);
  };
  return (
    <div className="main_temp">
      <h1>Here Are All Student Names</h1>
      {data && data.length > 0 ? (
        data.map((dataItem, id) => (
          <Card key={id} {...dataItem} check={check} />
        ))
      ) : (
        <p className="text-lime-50">No students available</p>
      )}
      <button type="submit" className="btn1" onClick={submitHandlersend}>
        Submit
      </button>
    </div>
  );
};

export default Template;
