import express from "express";

import {
  registerUser,
  loginUser,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/signup",
  upload.single("studentIdProof"),
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.put(
  "/profile/:id",
  updateProfile
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);


export default router;