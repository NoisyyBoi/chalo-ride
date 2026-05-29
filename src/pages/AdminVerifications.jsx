import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";

import {
  FiGrid,
  FiShield,
  FiUsers,
  FiAlertTriangle,
  FiBarChart2,
  FiBell,
  FiFilter,
  FiDownload,
  FiMail,
  FiBookOpen,
  FiCalendar,
} from "react-icons/fi";

export default function AdminVerifications() {

  const [users, setUsers] =
    useState([]);

  const [previewImage, setPreviewImage] =
    useState(null);

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const res =
        await API.get(
          "/admin/users"
        );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // VERIFY USER
  const verifyUser = async (id) => {

    try {

      await API.put(
        `/admin/verify/${id}`
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      {/* HEADER */}
      <div className="bg-white border-b">

        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] flex items-center justify-center text-white text-2xl shadow-lg">

              🛵

            </div>

            <div>

              <h1 className="text-4xl font-bold">

                <span className="text-[#6366f1]">

                  Chalo

                </span>

                <span className="text-[#ec4899]">

                  Ride

                </span>

              </h1>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            <div className="bg-[#f8fafc] px-5 py-3 rounded-2xl flex items-center gap-3 text-lg">

              <FiBell />

              12 New

            </div>

            <button className="border px-6 py-3 rounded-2xl font-semibold">

              Exit Admin

            </button>

          </div>

        </div>

      </div>

      {/* TITLE */}
      <div className="bg-white border-b">

        <div className="max-w-[1400px] mx-auto px-8 py-8">

          <div className="flex items-center gap-5">

            <FiGrid className="text-5xl text-[#6366f1]" />

            <div>

              <h1 className="text-5xl font-bold text-[#1e293b]">

                Admin Dashboard

              </h1>

              <p className="text-gray-500 text-xl">

                ChaloRide Management Portal

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}
      <div className="max-w-[1400px] mx-auto px-8 pt-8">

        <div className="bg-white rounded-[32px] border p-4 flex justify-between">

          <Link
            to="/admin"
            className="flex-1"
          >

            <button className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-gray-500 text-xl font-semibold">

              <FiGrid />

              Overview

            </button>

          </Link>

          <Link
            to="/admin/verifications"
            className="flex-1"
          >

            <button className="w-full py-5 rounded-2xl bg-[#7c7df6] text-white flex items-center justify-center gap-3 text-xl font-semibold shadow-lg">

              <FiShield />

              Verifications

            </button>

          </Link>

          <Link
            to="/admin/riders"
            className="flex-1"
          >

            <button className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-gray-500 text-xl font-semibold">

              <FiUsers />

              Riders

            </button>

          </Link>

          <Link
            to="/admin/complaints"
            className="flex-1"
          >

            <button className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-gray-500 text-xl font-semibold">

              <FiAlertTriangle />

              Complaints

            </button>

          </Link>

          <Link
            to="/admin/earnings"
            className="flex-1"
          >

            <button className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-gray-500 text-xl font-semibold">

              <FiBarChart2 />

              Earnings  

            </button>

          </Link>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-[1400px] mx-auto px-8 py-10">

        {/* TOP */}
        <div className="flex items-center justify-between mb-10">

          <h1 className="text-5xl font-bold text-[#1e293b]">

            Student Verifications

          </h1>

          <div className="flex gap-4">

            <button className="bg-white border px-6 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold">

              <FiFilter />

              Filter

            </button>

            <button className="bg-[#7c7df6] text-white px-6 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold">

              <FiDownload />

              Export

            </button>

          </div>

        </div>

        {/* USER CARDS */}
        <div className="space-y-8">

          {users.map((user) => (

            <div
              key={user._id}
              className="bg-white rounded-[40px] border border-gray-200 p-8 flex items-center justify-between"
            >

              {/* LEFT */}
              <div className="flex items-start gap-8 flex-1">

                {/* AVATAR */}
                <div className="w-24 h-24 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6366f1] text-5xl font-bold">

                  {user.name.charAt(0)}

                </div>

                {/* INFO */}
                <div>

                  <div className="flex items-center gap-5 mb-4">

                    <h2 className="text-4xl font-bold text-[#1e293b]">

                      {user.name}

                    </h2>

                    {!user.isVerified && (

                      <span className="bg-[#fef3c7] text-[#d97706] px-5 py-2 rounded-full text-base font-semibold">

                        Pending Review

                      </span>

                    )}

                  </div>

                  <div className="space-y-4 text-[#475569] text-xl">

                    <p className="flex items-center gap-3">

                      <FiMail />

                      {user.email}

                    </p>

                    <p className="flex items-center gap-3">

                      <FiBookOpen />

                      {user.department}

                    </p>

                    <p className="flex items-center gap-3">

                      <FiCalendar />

                      {user.year}

                    </p>

                  </div>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-10">

                {/* IMAGE */}
                <div className="text-center">

                  <p className="text-gray-500 text-lg mb-4">

                    Student ID Proof

                  </p>

                  <div
                    onClick={() =>
                      setPreviewImage(
                        `http://localhost:5000/uploads/${user.studentIdProof}`
                      )
                    }
                    className="w-36 h-36 rounded-[32px] overflow-hidden bg-[#f8fafc] border cursor-pointer"
                  >

                    {user.studentIdProof ? (

                      <img
                        src={`http://localhost:5000/uploads/${user.studentIdProof}`}
                        alt="ID"
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-gray-400">

                        No Image

                      </div>

                    )}

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="flex flex-col gap-5">

                  {user.isVerified ? (

                    <button className="bg-green-100 text-green-600 px-10 py-5 rounded-2xl text-2xl font-bold w-56">

                      Verified

                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        verifyUser(user._id)
                      }
                      className="bg-[#4ade80] hover:bg-[#22c55e] text-white px-10 py-5 rounded-2xl text-2xl font-bold w-56"
                    >

                      ✓ Approve

                    </button>

                  )}

                  <button className="border border-red-300 text-red-500 px-10 py-5 rounded-2xl text-2xl font-bold w-56">

                    ✕ Reject

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* IMAGE PREVIEW */}
      {previewImage && (

        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">

          <div className="relative">

            <button
              onClick={() =>
                setPreviewImage(null)
              }
              className="absolute -top-5 -right-5 bg-white w-14 h-14 rounded-full text-3xl font-bold shadow-lg"
            >

              ×

            </button>

            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      )}

    </div>

  );

}