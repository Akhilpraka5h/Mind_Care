import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const DoctorsCard = (prompt) => {
  const timeOptions = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("")

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [about, setAbout] = useState('');
  const [request, setRequest] = useState(false);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
console.log(prompt.appr);
  const showAlert = () => {
    Swal.fire({
      title: 'Appointment Request Submitted!',
      text: "Your request is in review. We'll notify you of the outcome soon.",
      icon: 'success',
      // confirmButtonText: 'Ok',
      confirmButton: false,
      showCloseButton: true, // Display close icon
      timer: 5000, // Auto close after 5 seconds (time in milliseconds)
      timerProgressBar: true, // Display progress bar during auto close
    });
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/profile`, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });

        setFullName(`${response.data.firstName ?? " "} ${response.data.lastName ?? " "}`);
        setEmail(response.data.email ?? " ");
        setAge(response.data.age ?? " ");
        setGender(response.data.gender ?? " ");
        setImageUrl(response.data.profilePic || 'images/1.jpg'); // Update with actual profilePic or a default image
        setAbout(response.data.about ?? " ");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // const fetchReqStatus = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:3000/user/profile`, {
    //       headers: {
    //         'x-auth-token': localStorage.getItem('token'),
    //       },
    //     });

    //     setRequest(response.data.reqStatus);

    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }

    // fetchReqStatus();
  }, []);



  const handelAppointmentClick = async () => {
    if (!selectedDate || !selectedTime) {
      alert("please selected date and time")
    }
    else {

      const userData = {
        fullName,
        email,
        age,
        gender,
        imageUrl,
        about,
        date: selectedDate,
        time: selectedTime
      }
      const response = await axios.post('http://localhost:3000/dr/req/save',
        {
          drId: prompt.drId,
          userDetails: userData,
          patientId: localStorage.getItem('token'),
        }
      );
      if (response.status === 200) {
        showAlert();
        setRequest(true);
        try {
          const response = await axios.put('http://localhost:3000/user/dr/id/save',
            {
              drId: prompt.drId,
              patientId: localStorage.getItem('token'),
            }
          );
        } catch (error) {
          console.error('Error saving drId:', error);
        }
      }
    }


  }

  const withdrawRequest = async () => {

    const response = await axios.delete('http://localhost:3000/user/dr/id/delete',
      {

        params: {
          drId: prompt.drId,
          patientId: localStorage.getItem('token'),
        }

      }
    );

    if (response.status === 200) {
      setRequest(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row font-sans p-5 bg-white mb-10 rounded-lg mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
      <div className="flex-none md:w-48 mb-4 md:mb-0 md:mr-4">
        {prompt.profilePic ? <img src={prompt.profilePic} alt="" className="inset-0 w-full h-full object-cover rounded-lg" loading="lazy" /> : <img src="images\man1.avif" alt="" className="inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />}
        {/* <img src="images\man1.avif" alt="" className="inset-0 w-full h-full object-cover rounded-lg" loading="lazy" /> */}
      </div>

      <form className="flex-auto p-4">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            Dr. {prompt.doctorsName}
          </h1>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {prompt.specialization}
          </div>
        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div className="space-x-2 flex text-sm">
            <p>{prompt.about}</p>
          </div>
        </div>
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-sm font-medium">
          <button className="w-full sm:w-auto h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
            New Client Available
          </button>
          <button className="w-full sm:w-auto h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
            Online Therapy Available
          </button>
          <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div> */}
      </form>
      <div className="border-2 p-6">
        <p>{prompt.address}</p>
        <p>+91 {prompt.number}</p>
        <p>{prompt.doctorsEmail}</p>

        <div className="justify-center mt-4">
          {prompt?.appr?.appointmentDetails[0]?.reqAccepted ? 
          <>
          <p>
          Date : {prompt?.appr?.appointmentDetails[0]?.userDetails.date}
          </p>
          <br />
          <p>
          Time :{prompt?.appr?.appointmentDetails[0]?.userDetails.time}
          </p>
                      <button className="p-2 font-semibold rounded-md bg-grey-500 text-black-100">Approved</button>

          </>
          :request || prompt.reqStatus ?
            <button className="w-full p-2 font-semibold rounded-md bg-grey-500 text-black-100">Waiting for Approve...</button>
            : !prompt.reqStatus ?
              <>
                <input type='date' onChange={(e) => setSelectedDate(e.target.value)} />
                <select
                  id="time"
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e)}
                >
                  <option value="">Select a time</option>
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <button className="p-2 font-semibold rounded-md bg-black text-white" onClick={handelAppointmentClick} type="submit">
                  Book Appointment
                </button>
              </>
              : null}
          {/* <button className="w-full p-2 font-semibold rounded-md bg-black text-white" onClick={handelAppointmentClick} type="submit">
            Book Appointment
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorsCard;
