import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import API from "../api";
import L from "leaflet";
import { toast } from "react-toastify";

import {
  useEffect,
  useState,
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import {
  FiNavigation,
  FiPhone,
  FiMessageCircle,
  FiShield,
  FiX,
} from "react-icons/fi";


import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

function Routing({ start, end }) {
  const map = useMap();

  useEffect(() => {
    if (!start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,

      lineOptions: {
        styles: [
          {
            color: "#6366f1",
            weight: 5,
          },
        ],  
      },

      createMarker: () => null,

    }).addTo(map);

    // Hide directions panel
    const container =
      routingControl.getContainer();

    if (container) {
      container.style.display = "none";
    }

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);
    
  return null;
}

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

        console.log(res.data);

      } catch (error) {

        console.log(error);

        toast.error(
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

    const pickupLat =
      currentRide?.ride?.pickupLat;

    const pickupLng =
      currentRide?.ride?.pickupLng;

    const destinationLat =
      currentRide?.ride?.destinationLat;

    const destinationLng =
      currentRide?.ride?.destinationLng;

    console.log({
      pickupLat,
      pickupLng,
      destinationLat,
      destinationLng,
    });

    if (
      !pickupLat ||
      !pickupLng ||
      !destinationLat ||
      !destinationLng
    ) {

      toast.error("Route unavailable");

      return;
    }

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${pickupPosition[0]},${pickupPosition[1]}` +
      `&destination=${destinationPosition[0]},${destinationPosition[1]}` +
      `&travelmode=driving`;

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${pickupPosition[0]},${pickupPosition[1]}&destination=${destinationPosition[0]},${destinationPosition[1]}&travelmode=driving`,
      "_blank"
    );

    console.log("Current Ride:", currentRide);
    console.log("Ride:", currentRide?.ride);

    console.log("pickupLat:", currentRide?.ride?.pickupLat);
    console.log("pickupLng:", currentRide?.ride?.pickupLng);
    console.log("destinationLat:", currentRide?.ride?.destinationLat);
    console.log("destinationLng:", currentRide?.ride?.destinationLng);

  };

  const callPassenger = () => {

    const phone =
      currentRide?.rider?.phone;

    if (!phone) {

      toast.error(
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

      toast.error(
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

    toast.success(
      "Ride Started Successfully"
    );

  };

  const cancelRide = () => {

    const confirmCancel =
      window.confirm(
        "Cancel this ride?"
      );

    if (!confirmCancel) return;

    toast.error(
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

      toast.success("Ride ended");

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

  const pickupPosition =
    currentRide?.ride?.pickupLat &&
    currentRide?.ride?.pickupLng
      ? [
          currentRide.ride.pickupLat,
          currentRide.ride.pickupLng,
        ] 
      : null;

  const destinationPosition =
    currentRide?.ride?.destinationLat &&
    currentRide?.ride?.destinationLng
      ? [
          currentRide.ride.destinationLat,
          currentRide.ride.destinationLng,
        ]
      : null;

  console.log("Current Ride:", currentRide);
  console.log("Ride Data:", currentRide?.ride);

  console.log(
    "pickupLat:",
    currentRide?.ride?.pickupLat
  );

  console.log(
    "pickupLng:",
    currentRide?.ride?.pickupLng
  );

  console.log(
    "destinationLat:",
    currentRide?.ride?.destinationLat
  );

  console.log(
    "destinationLng:",
    currentRide?.ride?.destinationLng
  );

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
                      Ride Route
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

                {pickupPosition && destinationPosition ? (

                  <MapContainer
                    center={pickupPosition}
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

                    <Routing
                      start={pickupPosition}
                      end={destinationPosition}
                    />

                    <Marker position={pickupPosition}>
                      <Popup>Pickup Location</Popup>
                    </Marker>

                    <Marker position={destinationPosition}>
                      <Popup>Destination</Popup>
                    </Marker>

                    <Polyline
                      positions={[
                        pickupPosition,
                        destinationPosition,
                      ]}
                    />

                  </MapContainer>

                ) : (

                  <div className="h-[500px] flex items-center justify-center">
                    Loading Map...
                  </div>

                )}

              </div>

              <div className="p-8">

                <button
                  onClick={openGoogleMaps}
                  className="
                    w-full
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-500
                    text-white
                    py-5
                    rounded-xl
                    font-semibold
                    "
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

                <div className="w-32 h-32 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-4xl font-bold mb-5">

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