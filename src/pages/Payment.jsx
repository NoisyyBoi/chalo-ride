import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


import axios from "axios";
import toast from "react-hot-toast";

import {
  useEffect,
  useState,
} from "react";

export default function Payment() {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    const [rides, setRides] =
      useState([]);

      const [rating, setRating] =
  useState(0);

const [comment, setComment] =
  useState("");

  const [submitting, setSubmitting] =
  useState(false);

    console.log("ALL REQUESTS:", rides);

    const completedRides =
      rides.filter(
        (ride) =>
          ride.status === "completed"
      );

    console.log(
      "COMPLETED RIDES:",
      completedRides
    );

    const fetchRides =
      async () => {

        try {

          const res =
            await axios.get(

              `http://localhost:5000/api/requests/driver/${user._id}`

            );

          setRides(
            res.data
          );

        } catch (error) {

          console.log(error);

        }

      };

      const submitReview =
  async () => {

    try {

      setSubmitting(true);

      await axios.post(

        "http://localhost:5000/api/reviews",

        {

          reviewer:
            user?.name ||

            "Anonymous",

          rating,

          comment,

        }

      );

      toast.success(
  "⭐ Review submitted successfully!",
  {
    duration: 4000,
  }
);
      setRating(0);

      setSubmitting(false);

      setComment("");

    } catch (error) {

      console.log(error);

  toast.error(
  "Failed to submit review"
);

    }

  };

      useEffect(() => {

        fetchRides();

      }, []);

    const totalEarnings =
      completedRides.reduce(
        (total, ride) =>
          total +
          (ride.ride?.fare || 0),
        0 
      );

    const totalRides =
      completedRides.length;

    const activeRides =
      rides.filter(
        ride => ride.status === "accepted"
      );

    console.log("ACTIVE RIDES:", activeRides);

    const currentRide =
      activeRides.length > 0
        ? activeRides[0]
        : null;

    const distance =
      Number(
        currentRide?.ride?.distance
      ) || 0;

    const mileage = 
      currentRide?.ride?.mileage || 0;

    const petrolPrice = 105

    const fuelNeeded =
      distance / mileage;

    const passengerAmount =
      currentRide?.ride?.fare || 0;

    const riderProfit = 15;

    const fuelCost =
      passengerAmount - riderProfit;


  return (
    <div className="bg-[#f6f7fb] min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <div className="max-w-7xl mx-auto px-7 py-1">

        {/* Heading */}
        <div className="max-w-[1150px] mx-auto px-8 mb-10 text-center">

          <div className="text-7xl mb-6">
            🛵
          </div>

          <h1 className="text-xl font-bold text-[#1e293b]">
            Ride Completed!
          </h1>

          <p className="text-gray-500 text-[14px] mt-4">
            Fuel contribution calculated successfully
          </p>

        </div>



        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* Trip Summary */}
            <div className="bg-white rounded-[36px] border p-8 shadow-sm">

              <h2 className="text-xl font-bold text-center mb-10">
                Trip Summary
              </h2>

              <div className="grid grid-cols-3 gap-8">

                {/* Distance */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                  <h3 className="text-xl font-bold text-[#6366f1]">
                    {totalRides}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Total Rides
                  </p>

                </div>

                {/* Mileage */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                  <h3 className="text-xl font-bold text-[#6366f1]">
                    ₹{totalEarnings}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Total Earnings
                  </p>

                </div>

                {/* Rider Profit */}
                <div className="bg-[#f8fafc] rounded-3xl p-8 text-center">

                    <h3 className="text-xl font-bold text-[#6366f1]">
                        ₹{
                          totalRides > 0
                            ? (
                              totalEarnings /
                              totalRides
                              ).toFixed(0)
                            : 0
                          }
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Average Fare
                    </p>

                </div>

                {/* Notice */}
                <div className="
                  col-span-3
                  bg-yellow-50
                  border
                  border-yellow-200
                  rounded-3xl
                  p-8
                  mt-4
                ">

                <p className="text-yellow-700 text-sm leading-7">
                  Payments are handled personally between riders and passengers using UPI or cash. ChaloRide does not process payments.
                </p>

              </div>

              </div>

            </div> 

          </div>
                  

          {/* RIGHT SIDE */}
          {currentRide ? (

            <div className="bg-white rounded-[26px] border p-8 shadow-sm">

              <h2 className="text-xl font-bold mb-5 text-center">
                Payment Information
              </h2>

              <div className="grid grid-cols-2 gap-6">

                <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                <p className="text-gray-500 mb-2">Distance</p>
                <h3 className="text-xl font-bold text-[#6366f1]">
                  {distance} km
                </h3>
                </div>

                <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                  <p className="text-gray-500 mb-2">Mileage</p>
                  <h3 className="text-xl font-bold text-[#6366f1]">
                    {mileage} km/L
                  </h3>
                </div>

                <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                  <p className="text-gray-500 mb-2">Fuel Cost</p>
                  <h3 className="text-xl font-bold text-[#6366f1]">
                    ₹{fuelCost.toFixed(0)}
                  </h3>
                </div>

                <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                  <p className="text-gray-500 mb-2">Rider Profit</p>
                  <h3 className="text-xl font-bold text-green-600">
                    ₹{riderProfit}
                  </h3>
                </div>

              </div>

              <div className="mt-4 border-t pt-6 text-center">

                <p className="text-gray-500 text-lg">
                  Passenger Contribution
                </p>

                <h2 className="text-xl font-bold text-[#6366f1] mt-3">
                  ₹{passengerAmount.toFixed(0)}
                </h2>

              </div>

              {/* KEEP ALL YOUR EXISTING PAYMENT INFO CODE HERE */}

            </div>

          ) : (

            <div className="bg-white rounded-[26px] border p-8 shadow-sm flex items-center justify-center">

              <div className="text-center">

                <h2 className="text-xl font-bold text-[#1e293b]">
                  No Active Ride
                </h2>

                <p className="text-gray-500 mt-3">
                  Complete a ride to view payment details.
                </p>

              </div>

            </div>

          )}

          </div>

        </div>

      {/* REVIEW SECTION */}

      <div className="
        max-w-4xl
        mx-auto
        mt-10
        px-7
      ">

        <div className="
          bg-white
          rounded-[30px]
          border
          p-8
          shadow-sm
        ">

          <h2 className="
            text-xl
            font-bold
            text-center
            mb-6
          ">
            Leave a Review
          </h2>

          <div className="
            flex
            justify-center
            gap-3
            text-4xl
            mb-6
          ">

            {[1,2,3,4,5].map((star)=>(

              <button
                key={star}
                onClick={() =>
                  setRating(star)
                }
              >

                {star <= rating
                  ? "⭐"
                  : "☆"}

              </button>

            ))}

          </div>

          <textarea

            value={comment}

            onChange={(e)=>
              setComment(
                e.target.value
              )
            }

            placeholder="Share your ride experience..."

            className="
              w-full
              border
              rounded-xl
              p-4
              h-[120px]
              resize-none
            "

          />

          <button

            onClick={submitReview}

            className="
              w-full
              mt-5
              py-4
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-purple-500
              text-white
              font-bold
            "

          >

            Submit Review

          </button>

        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}