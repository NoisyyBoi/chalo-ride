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
  FiSearch,
  FiFilter,
  FiMapPin,
  FiStar,
} from "react-icons/fi";

export default function AdminRiders() {

  const [rides, setRides] =
    useState([]);

  // FETCH RIDES
  const fetchRides =
    async () => {

      try {

        const res =
          await API.get(
            "/rides"
          );

        setRides(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRides();

  }, []);

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      {/* TOP NAVBAR */}
      <div className="bg-white border-b">

        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] flex items-center justify-center text-white text-2xl shadow-lg">

              🛵

            </div>

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

      </div>

      {/* DASHBOARD HEADER */}
      <div className="bg-white border-b">

        <div className="max-w-[1400px] mx-auto px-8 py-8 flex items-center justify-between">

          {/* LEFT */}
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

            <button className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-gray-500 text-xl font-semibold">

              <FiShield />

              Verifications

            </button>

          </Link>

          <Link
            to="/admin/riders"
            className="flex-1"
          >

            <button className="w-full py-5 rounded-2xl bg-[#7c7df6] text-white flex items-center justify-center gap-3 text-xl font-semibold shadow-lg">

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
        <div className="flex items-center justify-between mb-8">

          <h1 className="text-5xl font-bold text-[#1e293b]">

            Active Riders

          </h1>

          <div className="flex gap-4">

            {/* SEARCH */}
            <div className="bg-white border rounded-2xl px-5 py-4 flex items-center gap-3 w-[320px]">

              <FiSearch className="text-gray-400 text-xl" />

              <input
                type="text"
                placeholder="Search riders..."
                className="outline-none w-full bg-transparent"
              />

            </div>

            {/* FILTER */}
            <button className="bg-white border px-6 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold">

              <FiFilter />

              Filter

            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[36px] border overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-7 gap-4 px-10 py-6 bg-[#f8fafc] font-bold text-[#1e293b] text-lg">

            <p>Rider</p>

            <p>Route</p>

            <p>Vehicle</p>

            <p>Fare</p>

            <p>Location</p>

            <p>Status</p>

            <p>Actions</p>

          </div>

          {/* ROWS */}
          {rides.map((ride) => (

            <div
              key={ride._id}
              className="grid grid-cols-7 gap-4 px-10 py-8 border-t items-center"
            >

              {/* RIDER */}
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6366f1] font-bold text-2xl">

                  {
                    ride.driver?.name
                      ?.charAt(0)
                  }

                </div>

                <div>

                  <h2 className="font-bold text-lg text-[#1e293b]">

                    {
                      ride.driver?.name
                    }

                  </h2>

                  <p className="text-gray-500 text-sm">

                    {
                      ride.driver?.email
                    }

                  </p>

                </div>

              </div>

              {/* ROUTE */}
              <div>

                <p className="font-semibold">

                  {ride.from}

                </p>

                <p className="text-gray-500">

                  ↓

                </p>

                <p className="font-semibold">

                  {ride.to}

                </p>

              </div>

              {/* VEHICLE */}
              <div>

                <p className="font-semibold">

                  {ride.vehicle}

                </p>

                <p className="text-gray-500 text-sm">

                  Seats:
                  {" "}
                  {ride.seats}

                </p>

              </div>

              {/* FARE */}
              <div>

                <p className="text-[#6366f1] font-bold text-xl">

                  ₹{ride.fare}

                </p>

              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2 text-gray-600">

                <FiMapPin />

                {ride.from}

              </div>

              {/* STATUS */}
              <div>

                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">

                  Active

                </span>

              </div>

              {/* ACTION */}
              <div>

              <Link
                to={`/admin/riders/${ride._id}`}
              >

                <button className="bg-[#eef2ff] text-[#6366f1] px-5 py-3 rounded-2xl font-semibold">

                  View Details

                </button>

              </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}