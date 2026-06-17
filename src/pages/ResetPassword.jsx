import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {

        return toast.error(
          "Passwords do not match"
        );

      }

      try {

        const res =
          await axios.post(

            `http://localhost:5000/api/auth/reset-password/${token}`,

            {
              password,
            }

          );

        toast.success(
          res.data.message
        );

        navigate("/login");

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Password reset failed"

        );

      }

    };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#f6f7fb]
    ">

      <form

        onSubmit={handleSubmit}

        className="
          bg-white
          p-8
          rounded-2xl
          shadow-md
          w-[400px]
        "

      >

        <h1 className="
          text-2xl
          font-bold
          mb-6
        ">
          Reset Password
        </h1>

        <input

          type="password"

          placeholder="New Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "

          required

        />

        <input

          type="password"

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }

          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "

          required

        />

        <button

          type="submit"

          className="
            w-full
            bg-indigo-500
            text-white
            p-3
            rounded-lg
          "

        >

          Reset Password

        </button>

      </form>

    </div>

  );

}