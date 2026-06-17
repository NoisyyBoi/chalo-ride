import express from "express";
import Ride from "../models/Ride.js";
import Request from "../models/Request.js";

import {
  createRide,
  getRides,
  getSingleRide,
  getDriverRides,
} from "../controllers/rideController.js";

const router =
  express.Router();

router.post(
  "/",
  createRide
);

router.get(
  "/",
  getRides
);

router.get(
  "/user/:id",
  async (req, res) => {

    try {

      const rides =
        await Ride.find({

          driver:
            req.params.id,

        }).sort({

          createdAt: -1,

        });

      res.json(rides);

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  }
);

router.get(
  "/:id",
  getSingleRide
);

router.get(
  "/driver/:driverId",
  getDriverRides
);

// ---------------- End ----------------------

router.put(
  "/end/:id",
  async (req, res) => {

    try {

      const ride =
        await Ride.findById(
          req.params.id
        );

      if (!ride) {

        return res.status(404).json({
          message: "Ride not found",
        });

      }

      ride.status = "completed";

      await ride.save();

      await Request.updateMany(
        {
          ride: ride._id,
          status: "accepted",
        },
        {
          status: "completed",
        }
      );

      res.json({
        message:
          "Ride ended successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);

export default router;