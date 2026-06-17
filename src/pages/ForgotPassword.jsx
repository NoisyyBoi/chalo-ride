import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!email) {

        toast.error(
          "Please enter your email"
        );

        return;

      }

      try {

        setLoading(true);

        const res =
          await axios.post(

            "http://localhost:5000/api/auth/forgot-password",

            {
              email,
            }

          );

        toast.success(
          res.data.message ||
          "Password reset email sent"
        );

        setEmail("");

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Failed to send reset email"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      min-h-screen
      bg-[#f6f7fb]
      flex
      items-center
      justify-center
      px-4
    "
    >

      <div
        className="
        bg-white
        rounded-[32px]
        shadow-lg
        border
        p-8
        w-full
        max-w-md
      "
      >

        <div className="text-center mb-8">

          <h1
            className="
            text-3xl
            font-bold
            text-[#1e293b]
          "
          >
            Forgot Password
          </h1>

          <p
            className="
            text-gray-500
            mt-3
          "
          >
            Enter your registered email
            to receive a password reset link.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label
              className="
              block
              mb-2
              font-semibold
            "
            >
              Email Address
            </label>

            <input

              type="email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              placeholder="Enter email"

              className="
                w-full
                border
                rounded-xl
                p-4
                outline-none
                focus:border-indigo-500
              "

            />

          </div>

          <button

            type="submit"

            disabled={loading}

            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-purple-500
              text-white
              font-bold
            "

          >

            {
              loading
                ? "Sending..."
                : "Send Reset Link"
            }

          </button>

        </form>

        <div className="text-center mt-6">

          <Link

            to="/login"

            className="
              text-indigo-500
              font-semibold
              hover:underline
            "

          >

            Back to Login

          </Link>

        </div>

      </div>

    </div>

  );

}