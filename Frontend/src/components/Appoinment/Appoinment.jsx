import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";
import Footer from "../common/Footer/Footer";
import axios from "axios";
import { checkrole } from "../Utility/authUtils";
import { useNavigate } from "react-router-dom";

const Appoinment = (props) => {
  const { getHandle } = props;

  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const handelCross = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/dr/appointment/delete",
        {
          params: {
            drToken: localStorage.getItem("token"),
            patientId: props.pateintId,
          },
        }
      );
      setIsDeleted(true);
      setAccepted(true);
      getHandle();
    } catch (err) {
      console.error(err.message);
    }
  };

  const withdrawRequest = async () => {
    const response = await axios.delete(
      "http://localhost:3000/user/dr/id/delete",
      {
        params: {
          drToken: localStorage.getItem("token"),
          patientId: props.pateintId,
        },
      }
    );
    getHandle();
  };
console.log(props);
  const handelDone = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/dr/req/acceptstatus",
        {
          drToken: localStorage.getItem("token"),
          userId: props.pateintId,
          reqAccepted: true,
          time: props.details.time,
          date: props.details.date
        }
      );
      setAccepted(true);
      setIsDeleted(true);
      getHandle();
    }
    catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log(checkrole("patient"));
    if (checkrole("patient")) {
      localStorage.clear();
      navigate("/");
    }
  }, []);
  console.log(props)
  return (
    <>
      <ul className="flex w-full justify-between">
        <div className="flex">
          <div className="p-2 my-auto">
            <img src="images\1.jpg" alt="" className="w-12"></img>
          </div>
          <div className="p-2 my-2">
            <p className="font-semibold text-xl flex">
              {props.Patientname}{props.years !== "" ? `${(props.years)}` : " "}
              <i className="text-2xl p-1 mx-2">{props.gender}</i>
            </p>
            <p className="text-md text-gray-500">
              Requested for a {props.session} minutes - live appointment
            </p>
            <p>
              Time : {props.details.time ?? " - "}
            </p>
            <p>
              Date : {props.details.date ?? " - "}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          {!props.accepted ? (
            <>
              {/* <li
                className="p-2 my-auto m-2 text-2xl hover:shadow-lg hover:bg-red-300 rounded-lg"
                onClick={() => {
                  handelCross();
                  withdrawRequest();
                }}
              >
                <RxCross2 />
              </li> */}
              <li
                className="p-2 my-auto m-2 text-2xl hover:shadow-lg hover:bg-green-300 rounded-lg"
                onClick={handelDone}
              >
                <MdOutlineDone />
              </li>
            </>
          ) : (
            <button
              className="p-2 my-auto h-10 font-semibold rounded-lg bg-gray-300"
              onClick={() => {
                handelCross()
                withdrawRequest()
              }}
            >
              CheckUp Done
            </button>
          )}
        </div>
      </ul>
    </>
  );
};

export default Appoinment;
