import express from "express";

import {
  addReview,
  getReviews,
} from "../controllers/reviewController.js";

const router =
  express.Router();

// Add Review
router.post(
  "/",
  addReview
);

// Get All Reviews
router.get(
  "/",
  getReviews
);

export default router;