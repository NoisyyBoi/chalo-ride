import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import API from "../api";

import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiTruck,
  FiDollarSign,
} from "react-icons/fi";

export default function RiderDetails() {

  const { id } =
    useParams();

  const [ride, setRide] =
    useState(null);

  const fetchRide =
    async () => {

      try {

        const res =
          await API.get(
            `/rides/${id}`
          );

        setRide(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchRide();

  }, []);

  if (!ride) {

    return (
      <div className="p-10 text-3xl">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-10">

      <div className="bg-white rounded-[40px] p-10 border">

        {/* TOP */}
        <div className="flex items-center gap-6 mb-10">

          <div className="w-24 h-24 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#6366f1] text-5xl font-bold">

            {
              ride.driver?.name
                ?.charAt(0)
            }

          </div>

          <div>

            <h1 className="text-5xl font-bold text-[#1e293b]">

              {
                ride.driver?.name
              }

            </h1>

            <p className="text-gray-500 text-xl mt-2">

              {
                ride.driver?.email
              }

            </p>

          </div>

        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-8">

          <div className="bg-[#f8fafc] rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-5">

              <FiMapPin className="text-3xl text-[#6366f1]" />

              <h2 className="text-3xl font-bold">

                Route

              </h2>

            </div>

            <p className="text-xl mb-3">

              <span className="font-bold">

                From:

              </span>

              {" "}
              {ride.from}

            </p>

            <p className="text-xl">

              <span className="font-bold">

                To:

              </span>

              {" "}
              {ride.to}

            </p>

          </div>

          <div className="bg-[#f8fafc] rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-5">

              <FiTruck className="text-3xl text-[#6366f1]" />

              <h2 className="text-3xl font-bold">

                Vehicle

              </h2>

            </div>

            <p className="text-xl">

              {ride.vehicle}

            </p>

          </div>

          <div className="bg-[#f8fafc] rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-5">

              <FiClock className="text-3xl text-[#6366f1]" />

              <h2 className="text-3xl font-bold">

                Time

              </h2>

            </div>

            <p className="text-xl">

              {ride.time}

            </p>

          </div>

          <div className="bg-[#f8fafc] rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-5">

              <FiUsers className="text-3xl text-[#6366f1]" />

              <h2 className="text-3xl font-bold">

                Seats

              </h2>

            </div>

            <p className="text-xl">

              {ride.seats}

            </p>

          </div>

          <div className="bg-[#f8fafc] rounded-3xl p-8 col-span-2">

            <div className="flex items-center gap-4 mb-5">

              <FiDollarSign className="text-3xl text-[#6366f1]" />

              <h2 className="text-3xl font-bold">

                Fare

              </h2>

            </div>

            <p className="text-5xl font-bold text-[#6366f1]">

              ₹{ride.fare}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}