import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import API from "../api";

import {
  useEffect,
  useState,
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  FiNavigation,
  FiPhone,
  FiMessageCircle,
  FiShield,
  FiX,
} from "react-icons/fi";

export default function ActiveRide() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [activeRides, setActiveRides] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const currentRide =
    activeRides.find(
      (ride) =>
        ride.status === "accepted"
    );

  const fetchActiveRides =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.get(
            `http://localhost:5000/api/requests/driver/${user?._id}`
          );

        setActiveRides(
          res.data
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load active rides."
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    if (user?._id) {

      fetchActiveRides();

    }

  }, []);

  const openGoogleMaps = () => {

    const location =
      currentRide?.ride?.from;

    if (!location) {

      alert(
        "Pickup location unavailable."
      );

      return;

    }

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
      "_blank"
    );

  };

  const callPassenger = () => {

    const phone =
      currentRide?.rider?.phone;

    if (!phone) {

      alert(
        "Passenger phone number unavailable."
      );

      return;

    }

    window.location.href =
      `tel:${phone}`;

  };

  const sendMessage = () => {

    const phone =
      currentRide?.rider?.phone;

    if (!phone) {

      alert(
        "Passenger phone number unavailable."
      );

      return;

    }

    window.location.href =
      `sms:${phone}`;

  };

  const startRide = () => {

    const confirmRide =
      window.confirm(
        "Start this ride?"
      );

    if (!confirmRide) return;

    alert(
      "Ride Started Successfully"
    );

  };

  const cancelRide = () => {

    const confirmCancel =
      window.confirm(
        "Cancel this ride?"
      );

    if (!confirmCancel) return;

    alert(
      "Ride Cancelled"
    );

  };

  const endRide = async (rideId) => {

    try {

      console.log("Ride ID:", rideId);

      const res = await API.put(
        `/rides/end/${rideId}`
      );

      console.log("Response:", res.data);

      alert("Ride ended");

      fetchActiveRides();

    } catch (error) {

      console.log("ERROR:", error);

      console.log(
        "SERVER:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

  };  

  if (!user) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">

          <div className="bg-white p-10 rounded-3xl shadow">

            <h2 className="text-xl font-bold text-slate-700">
              Login Required
            </h2>

            <p className="text-slate-500 mt-3">
              Please login to view active rides.
            </p>

          </div>

        </div>

        <Footer />
      </>

    );

  }

  if (loading) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">

          <h2 className="text-xl font-bold text-slate-600">
            Loading Active Ride...
          </h2>

        </div>

        <Footer />
      </>

    );

  }

  if (!currentRide) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">

          <div className="bg-white p-10 rounded-3xl shadow">

            <h2 className="text-xl font-bold text-slate-700">
              No Active Ride
            </h2>

            <p className="text-slate-500 mt-3">
              You currently have no accepted rides.
            </p>

          </div>

        </div>

        <Footer />
      </>

    );

  }

  return (

    <div className="bg-[#f5f7fb] min-h-screen pt-1">

      <Navbar />

      <div className="max-w-7xl mx-auto px-7 pt-3 pb-12">

        {/* Heading */}
        <div className="mb-12">

          <h1 className="text-xl font-bold text-[#1e293b] mb-3">
            Active Ride
          </h1>

          <p className="text-gray-500 text-[14px]]">
            Navigate to pickup location and complete the ride
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* MAP CARD */}
            <div className="bg-white rounded-[32px] border overflow-hidden shadow-sm">

              <div className="p-8 border-b">

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#6366f1] text-xl">

                    <FiNavigation />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-[#1e293b]">
                      Navigate to Pickup
                    </h2>

                    <p className="text-gray-500 text-[14px]">

                      {currentRide?.ride?.from}
                      {" → "}
                      {currentRide?.ride?.to}

                    </p>

                  </div>

                </div>

              </div>

              <div className="h-[500px] w-full">

                <MapContainer
                  center={[12.9716, 77.5946]}
                  zoom={13}
                  style={{
                    height: "500px",
                    width: "100%",
                    zIndex: 1,
                  }}
                >

                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker
                    position={[12.9716, 77.5946]}
                  >

                    <Popup>
                      Pickup Location
                    </Popup>

                  </Marker>

                </MapContainer>

              </div>

              <div className="p-8">

                <button
                  onClick={openGoogleMaps}
                  className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-5 rounded-2xl text-xl font-semibold"
                >
                  Open in Google Maps
                </button>

              </div>

            </div>

            {/* ROUTE DETAILS */}
            <div className="bg-white rounded-[32px] border p-8 shadow-sm">

              <h2 className="text-xl font-bold text-[#1e293b] mb-8">
                Route Details
              </h2>

              <div className="space-y-8">

                <div>

                  <p className="text-gray-400 text-[14px] mb-2">
                    Start
                  </p>

                  <h3 className="text-[16px] font-semibold text-[#1e293b]">
                    Your Current Location
                  </h3>

                </div>

                <div>

                  <p className="text-gray-400 text-[14px] mb-2">
                    Pickup Passenger
                  </p>

                  <h3 className="text-[14px] font-semibold text-[#1e293b]">
                    {currentRide?.ride?.from}
                    {" → "}
                    {currentRide?.ride?.to}
                  </h3>

                  <p className="text-gray-500 text-[12px] mt-2">
                    Expected: {currentRide?.ride?.time || "N/A"}
                  </p>

                </div>

                <div>

                  <p className="text-gray-400 text-[14px] mb-2">
                    Ride Fare
                  </p>

                  <h3 className="text-xl font-semibold text-[#1e293b]">
                    ₹{currentRide?.ride?.fare || 0}
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            <div className="bg-white rounded-[32px] border p-8 shadow-sm">

              <h2 className="text-xl font-bold text-[#1e293b] mb-8">
                Passenger Details
              </h2>

              <div className="flex flex-col items-center text-center">

                <div className="w-32 h-32 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-xl font-bold mb-5">

                  {currentRide?.rider?.name?.charAt(0) || "P"}

                </div>

                <h3 className="text-xl font-bold text-[#1e293b]">
                  {currentRide?.rider?.name || "Passenger"}
                </h3>

                <p className="text-gray-500 text-[14px] mt-2">

                  {currentRide?.rider?.department || "Department"}
                  {" • "}
                  {currentRide?.rider?.year || "Year"}

                </p>

                <p className="text-[#f59e0b] text-xl mt-4">
                  ★ 4.8 / 5.0
                </p>

              </div>

              <div className="mt-10 space-y-4">

                <button
                  onClick={callPassenger}
                  className="w-full bg-[#eef2ff] text-[#6366f1] py-2 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3"
                >
                  <FiPhone />
                  Call Passenger
                </button>

                <button
                  onClick={sendMessage}
                  className="w-full border py-2 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3"
                >
                  <FiMessageCircle />
                  Send Message
                </button>

              </div>

            </div>

            <div className="bg-white rounded-[32px] border p-8 shadow-sm">

              <h2 className="text-xl font-bold text-[#1e293b] mb-8">
                Ride Actions
              </h2>

              <div className="space-y-4">

                <button
                  onClick={startRide}
                  className="w-full bg-green-500 text-white py-5 rounded-2xl text-xl font-semibold"
                >
                  Start Ride
                </button>

                <button
                  onClick={cancelRide}
                  className="w-full border border-red-300 text-red-500 py-5 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3"
                >
                  <FiX />
                  Cancel Ride
                </button>

                <button
                  onClick={() => {
                    
                    endRide(currentRide?.ride?._id);
                  }}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl"
                >
                  End Ride
                </button>

              </div>

            </div>

            <div className="bg-[#fff7ed] rounded-[32px] border border-orange-200 p-8">

              <div className="flex items-center gap-3 mb-6">

                <FiShield className="text-orange-500 text-xl" />

                <h2 className="text-xl font-bold text-[#1e293b]">
                  Safety Tips
                </h2>

              </div>

              <ul className="space-y-4 text-gray-600 text-[14px]">

                <li>• Verify passenger identity</li>
                <li>• Follow traffic rules</li>
                <li>• Keep emergency contacts ready</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );
}