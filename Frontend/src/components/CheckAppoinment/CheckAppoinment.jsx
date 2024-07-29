import React, { useState, useEffect } from "react";
import Appoinment from "../Appoinment/Appoinment";
import Navbar from "../common/Navbar2.0/Navbar2.0";
import Footer from "../common/Footer/Footer";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import axios from "axios";

const CheckAppoinment = () => {
  const [appointmentData, setAppointmentData] = useState([]);

  const getAppoinment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dr/appointment/details",
        {
          params: {
            drToken: localStorage.getItem("token"),
          },
        }
      );
      setAppointmentData(response.data.Found_data.appointmentDetails);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getAppoinment();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-4 mt-10 mb-20">
        <h1 className="font-bold text-4xl mx-3 my-4 py-4">
          Appoinment Request
        </h1>

        <div className="m-3">
          <h1 className="font-semibold text-2xl ">Pending Appoinments</h1>
          <div>
            {appointmentData.map((appointment, index) => {
              if (appointment.reqAccepted === false) {
                return (
                  <Appoinment
                    key={index}
                    Patientname={appointment.userDetails.fullName}
                    years={appointment.userDetails.age}
                    gender={
                      appointment.userDetails.gender === "male" ? (
                        <IoMdMale />
                      ) : (
                        <IoMdFemale />
                      )
                    }
                    session={45}
                    pateintId={appointment.userId}
                    accepted={false}
                    getHandle ={getAppoinment}
                    details={appointment.userDetails}
                  />
                );
              }
              return null; // Always include a return statement
            })}
          </div>
        </div>
        <div className="m-3">
          <h1 className="font-semibold text-2xl ">Accepted Appoinments</h1>
          <div>
            {appointmentData?.map((appointment, index) => {
              if (appointment.reqAccepted === true) {
                return (
                  <Appoinment
                    key={index}
                    Patientname={appointment.userDetails.fullName}
                    years={appointment.userDetails.age}
                    gender={  
                      appointment.userDetails.gender === "male" ? (
                        <IoMdMale />
                      ) : (
                        <IoMdFemale />
                      )
                    }
                    session={45}
                    pateintId={appointment.userId}
                    accepted={true}
                    details={appointment.userDetails}
                  />
                );
              }
              return null; // Always include a return statement
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckAppoinment;
