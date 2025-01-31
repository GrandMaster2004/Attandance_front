import React, { useState } from "react";

const Card = ({
  student_name,
  roll_no,
  year,
  branch,
  section,
  subCode,
  isPresent,
  check,
}) => {
  const [ispresent, setIspresent] = useState(isPresent);

  const handleClick = () => {
    check(roll_no);
    setIspresent(!ispresent);
  };

  return (
    <div className="card flex my-4">
      <input
        type="text"
        value={student_name}
        className="bg-richblack-800 rounded-[0.5rem] mx-1 text-richblack-5 w-full p-[12px] text-black"
      />
      <input
        maxLength={10}
        type="text"
        required
        value={roll_no}
        className="input-box bg-richblack-800 rounded-[0.5rem] mx-1 text-richblack-5 w-full p-[12px] text-black"
      />

      <input
        type="text"
        required
        name="branch"
        value={branch}
        className="input-box bg-richblack-800 mx-1 rounded-[0.5rem] text-richblack-5 w-1/3 p-[12px] text-black"
      />

      <input
        type="number"
        required
        name="year"
        value={year}
        className="input-box bg-richblack-800 mx-1 rounded-[0.5rem] text-richblack-5 w-1/6 p-[12px] text-black"
      />

      <input
        type="text"
        value={section}
        name="section"
        className="input-box flex bg-richblack-800 mx-1 rounded-[0.5rem] text-richblack-5 w-1/5 p-[12px] text-black"
      />
      <input
        value={subCode}
        name="subCode"
        className="input-box flex bg-richblack-800 mx-1 rounded-[0.5rem] text-richblack-5 w-1/3 p-[12px] text-black"
      />
      <input
        type="checkbox"
        checked={ispresent}
        onChange={handleClick}
        name="isPresent"
        className="input-box flex bg-richblack-800 mx-1 rounded-[0.5rem] text-richblack-5 w-1/2 p-[12px] text-black"
      />
    </div>
  );
};

export default Card;
