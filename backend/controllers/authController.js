import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.js";
import transporter from "../config/email.js";

// ================= SIGNUP =================
export const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      department,
      year,
    } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({

        name,
        email,
        password: hashedPassword,
        department,
        year,

        role: "student",

        isVerified: false,

        studentIdProof:
          req.file?.filename,

      });

    res.status(201).json({

      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      year: user.year,
      role: user.role,
      isVerified: user.isVerified,
      studentIdProof:
        user.studentIdProof,

      token:
        generateToken(
          user._id
        ),

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= LOGIN =================
export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (
      user &&
      await bcrypt.compare(
        password,
        user.password
      )
    ) {

      if (!user.isVerified) {

        return res.status(403).json({
          message:
            "Account pending admin verification",
        });

      }

      return res.json({

        _id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        year: user.year,
        role: user.role,
        isVerified: user.isVerified,

        token:
          generateToken(
            user._id
          ),

      });

    }

    return res.status(401).json({
      message:
        "Invalid email or password",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ================= FORGOT PASSWORD =================
export const forgotPassword =
  async (req, res) => {

    try {

      console.log(
        "Forgot Password API Hit"
      );

      const user =
        await User.findOne({
          email: req.body.email,
        });

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });

      }

      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000;

      await user.save();

      const resetUrl =
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          user.email,

        subject:
          "ChaloRide Password Reset",

        html: `
          <h2>Password Reset Request</h2>

          <p>
            Click the link below:
          </p>

          <a href="${resetUrl}">
            Reset Password
          </a>

          <p>
            Link expires in 15 minutes.
          </p>
        `,

      });

      res.json({
        message:
          "Password reset email sent",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// ================= RESET PASSWORD =================
export const resetPassword =
  async (req, res) => {

    try {

      const user =
        await User.findOne({

          resetPasswordToken:
            req.params.token,

          resetPasswordExpire: {
            $gt: Date.now(),
          },

        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid or expired token",
        });

      }

      const salt =
        await bcrypt.genSalt(10);

      user.password =
        await bcrypt.hash(
          req.body.password,
          salt
        );

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save();

      res.json({
        message:
          "Password reset successful",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// ================= UPDATE PROFILE =================
export const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });

      }

      user.bio =
        req.body.bio ||
        user.bio;

      user.vehicle =
        req.body.vehicle ||
        user.vehicle;

      user.preferredRoute =
        req.body.preferredRoute ||
        user.preferredRoute;

      user.availability =
        req.body.availability ||
        user.availability;

      const updatedUser =
        await user.save();

      res.json(
        updatedUser
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// ================= JWT TOKEN =================
const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "30d",
    }

  );

};