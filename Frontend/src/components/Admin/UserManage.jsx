import React, { useState, useEffect } from "react";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../common/Footer/Footer";
import NavBar from "../common/Navbar/Navbar";


import "./doctorManage.css";
import axios from "axios";
import { checkrole } from "../Utility/authUtils";
import { useNavigate } from "react-router-dom";
import UserAdminCard from "./UserAdminCard";

const UserManage = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const navigate = useNavigate();
  
    const getUsers = async () => {
      const response = await axios.get("http://localhost:3000/user/patientDetails");
      setAllUsers(response.data);
    };
    useEffect(() => {
      getUsers()
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
          {allUsers.map((user, index) => (
            <UserAdminCard
              key={index}
              userName={user.firstName ?? " " + " " + user.lastName ?? " "}
              userImage={user.profilePic ?? " "}
              userEmail={user.email ?? " "}
              // userNumber={user.phone ?? " "}
              // specialization={user.specialization ?? " "}
              userAddress={user.address ?? " "}
              userAbout={user.about ?? " "}
              urId={user._id ?? " "}
              reqStatus={userIds.includes(user._id)}
              getUsers={getUsers}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  };
export default UserManage
