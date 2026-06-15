import { FiBell } from "react-icons/fi";
import { useEffect, useState }
from "react";

import Logo from "../../assets/logo.png";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

export default function AdminHeader() {

  const [notificationCount, setNotificationCount] =
    useState(0);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchNotifications();

  }, []);


  const fetchNotifications =
    async () => {

      try {

        // COMPLAINTS
        const complaintsRes =
          await axios.get(
            "http://localhost:5000/api/complaints"
          );

        const complaints =
          complaintsRes.data;

        const pendingComplaints =
          complaints.filter(
            (complaint) =>
              complaint.status !==
              "resolved"
          );


        // USERS
        const usersRes =
          await axios.get(
            "http://localhost:5000/api/admin/users"
          );

        const users =
          usersRes.data;

        const pendingVerifications =
          users.filter(
            (user) =>
              !user.isVerified
          );


        // TOTAL
        setNotificationCount(

          pendingComplaints.length +

          pendingVerifications.length

        );

      } catch (error) {

        console.log(error);

      }

    };


  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");

  };


  return (

    <div className="bg-white border-b">

      {/* TOP */}
      <div className="flex justify-between items-center px-8 py-4">

        <div className="flex items-center gap-1">

          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="ChaloRide"
              className="w-11 h-11 object-contain mt-4"
            />

            <h1 className="text-xl font-bold">
              <span className="text-indigo-500">
                Chalo
              </span>

              <span className="text-pink-500">
                Ride
              </span>
            </h1>
          </div>

        </div>

      </div>


      {/* BOTTOM */}
      <div className="relative pt-10 pb-6">

        {/* CENTER TITLE */}
        <div className="text-center -mt-14">
          <h1 className="text-2xl font-bold text-[#1e293b]">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            ChaloRide Management Portal
          </p>
        </div>


         {/* Right Side */}
        <div className="absolute right-2 -top-4 flex flex-col items-center gap-1">

          <button
            className="
              bg-red-50
              border
              border-red-200
              text-red-500
              px-5
              py-2
              rounded-xl
              font-semibold
            "
          >
            Logout
          </button>

          <button
            className="
              w-10  
              h-10
              rounded-xl
              border
              bg-white
              flex
              items-center
              justify-center
            "
          >
            <FiBell />
          </button>

        </div>

        </div>

      </div>

    

  );

}