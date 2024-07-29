import React from 'react'
import Expertise from '../Expertise/Expertise'
import Footer from '../common/Footer/Footer'
import HeroSection from '../HeroSection/HeroSection'
import NavBar from '../common/Navbar/Navbar'
import CTA from "../CTA/CTA"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Diagnostic = () => {
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/profile", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const role = res.data.role;
        console.log(role != "patient");
        if (role) {
          if (role != "Patient") {
            localStorage.clear()
            navigate("/");
          }
        }
      })
      .catch((e) => {});
  }, []);
  return (
    <div className='bg-white'>
      
      <NavBar />
      <HeroSection />
      <div className='max-w-screen-xl mx-auto'>

      {/* Our Expertise */}
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold'>Our Expertise</h1>
      </div>
      
      {/* <div className='flex justify-center'>
         <Expertise /><Expertise />
        </div>
        <div className='flex justify-center'>
         <Expertise /> <Expertise />
        </div> */}

        <Link to="/diagnosTest"><CTA /></Link>

        
      </div>
      <Footer />
      
    </div>
  )
}

export default Diagnostic