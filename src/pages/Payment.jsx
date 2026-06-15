import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import axios from "axios";

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

      useEffect(() => {

        fetchRides();

      }, []);

    const acceptedRides =
      rides.filter(
        (ride) =>
          ride.status ===
          "accepted"
      );

    const totalEarnings =
      acceptedRides.reduce(

        (total, ride) =>

          total +
          (ride.ride?.fare || 0),

        0
      );

    const totalRides =
      acceptedRides.length;

    const currentRide =
      acceptedRides.length > 0
        ? acceptedRides[0]
        : null;

    const distance =
      Number(
        currentRide?.ride?.distance
      ) || 0;

    const mileage = 30;

    const petrolPrice = 105;

    const riderProfit = 15;

    const fuelNeeded =
      distance / mileage;

    const fuelCost =
      fuelNeeded * petrolPrice;

    const passengerAmount =
      Math.round(
        fuelCost + riderProfit
      );

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
          <div className="bg-white rounded-[26px] border p-8 shadow-sm">

            <h2 className="text-xl font-bold mb-5 text-center">
              Payment Information
            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                <p className="text-gray-500 mb-2">
                  Distance
                </p>    

                <h3 className="text-xl font-bold text-[#6366f1]">
                  {distance} km
                </h3>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                <p className="text-gray-500 mb-2">
                  Mileage
                </p>  

                <h3 className="text-xl font-bold text-[#6366f1]">
                  {mileage} km/L
                </h3>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                <p className="text-gray-500 mb-2">
                  Fuel Cost
                </p>

                <h3 className="text-xl font-bold text-[#6366f1]">
                  ₹{fuelCost.toFixed(0)}
                </h3>
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                <p className="text-gray-500 mb-2">
                  Rider Profit
                </p>

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

          </div>

                

           

          </div>

        </div>

     

      {/* Footer */}
      <Footer />

    </div>
  );
}