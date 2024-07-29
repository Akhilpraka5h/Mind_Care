import React, { useState, useEffect } from "react";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../common/Footer/Footer";
import NavBar from "../common/Navbar/Navbar";
import Breadcrumbs from "../common/Breadcrumbs/Breadcrumbs";
import SearchForm from "../common/SearchForm/SearchForm";
import DoctorsAdminCard from "./DoctorsAdminCard";
import "./doctorManage.css";
import axios from "axios";
import { checkrole } from "../Utility/authUtils";
import { useNavigate } from "react-router-dom";

const DoctorManage = () => {
    const [doctorsAcceptedStatus, setDoctorsAcceptedStatus] = useState(false);
    const [allDoctors, setAllDoctors] = useState([]);
    const [doctorsIds, setDoctorsIds] = useState([]);
    const navigate = useNavigate();
  
    const getDoctors = async () => {
      const response = await axios.get("http://localhost:3000/doctors/profile");
      setAllDoctors(response.data);
    };
    useEffect(() => {
      getDoctors()
    }, []);
  
    useEffect(() => {
      axios
        .get("http://localhost:3000/user/profile", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const role = res.data.role;
          console.log(role != "admin");
          if (role) {
            if (role != "admin") {
              localStorage.clear()
              navigate("/");
            }
          }
        })
        .catch((e) => {});
    }, []);
  
    return (
      <div className="Doctors_main_container ">
        <div className="Doctors_header_section max-w-7xl mx-auto">
          <NavBar />
          <br />
          <br />
          <br />
          <br />
          {/* <Breadcrumbs ParentBar={"Diagnostic"} ChildBar={"Doctors"} /> */}
          <br />
          
          {/* <SearchForm />  */}
          <br />
          <br />
        </div>
        <div className="Doctors_body_section">
          {allDoctors.map((doctor, index) => (
            <DoctorsAdminCard
              key={index}
              doctorsName={doctor.firstName ?? " " + " " + doctor.lastName ?? " "}
              doctorsImage={doctor.profilePic ?? " "}
              doctorsEmail={doctor.email ?? " "}
              number={doctor.phone ?? " "}
              specialization={doctor.specialization ?? " "}
              address={doctor.address ?? " "}
              about={doctor.about ?? " "}
              drId={doctor._id ?? " "}
              reqStatus={doctorsIds.includes(doctor._id)}
              getDoctors={getDoctors}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  };
export default DoctorManage
