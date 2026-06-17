import mongoose from "mongoose";

const rideSchema =
  new mongoose.Schema(
    {
      driver: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      from: {
        type: String,
        required: true,
      },

      to: {
        type: String,
        required: true,
      },

      date: {
        type: String,
      },

      time: {
        type: String,
      },

      vehicle: {
        type: String,
      },

      mileage: {
        type: Number,
        default: 0,
      },

      seats: {
        type: Number,
        default: 1,
      },

      fare: {
        type: Number,
        default: 0,
      },

      distance: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        default: "available",
      },

      repeatType: {
        type: String,
        default: "once",
      },

      isAvailableToday: {
        type: Boolean,
        default: true,
      },

      unavailableDate: {
        type: String,
        default: "",
      },

      pickupLat: {
        type: Number,
      },

      pickupLng: {
        type: Number,
      },  

      destinationLat: {
        type: Number,
      },

      destinationLng: {
        type: Number,
      },

    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Ride",
  rideSchema
);