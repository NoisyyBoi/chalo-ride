import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-10">

      <div className="max-w-7xl mx-auto px-7 grid md:grid-cols-4 gap-16">

        {/* BRAND */}
        <div>

          <div className="flex items-center gap-1 mb-6">

            <div className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
            ">
              <img
                src={Logo}
                alt="ChaloRide"
                className="w-11 h-11 object-contain translate-y-1"
              />
            </div>

            <h2 className="text-xl font-bold leading-none">
              ChaloRide
            </h2>

          </div>

          <p className="
            mt-6
            text-slate-400
            leading-8
          ">

            Student-focused ride sharing platform built for
            smarter, safer, and affordable campus travel.

          </p>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h3 className="text-xl font-bold">
            Quick Links
          </h3>

          <div className="
            mt-6
            flex
            flex-col
            gap-4
            text-slate-400
          ">

            <Link
              to="/"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              Home
            </Link>

            <Link
              to="/find-ride"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              Find Ride
            </Link>

            <Link
              to="/offer-ride"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              Offer Ride
            </Link>

            <Link
              to="/about"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              About
            </Link>

          </div>

        </div>

        {/* SUPPORT */}
        <div>

          <h3 className="text-xl font-bold">
            Support
          </h3>

          <div className="
            mt-6
            flex
            flex-col
            gap-4
            text-slate-400
          ">

            <Link
              to="/safety"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              Safety Guidelines
            </Link>

            <Link
              to="/contact"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              Contact
            </Link>

          </div>

        </div>

        {/* LEGAL */}
        <div>

          <h3 className="text-xl font-bold">
            Legal
          </h3>

          <div className="
            mt-6
            flex
            flex-col
            gap-4
            text-slate-400
          ">

            {/* TERMS */}
            <Link
              to="/legal"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              Terms of Service
            </Link>

            {/* PRIVACY */}
            <Link
              to="/legal"
              className="
                hover:text-white
                duration-300
                hover:translate-x-1
              "
            >
              Privacy Policy
            </Link>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="
        border-t
        border-slate-800
        mt-20
        pt-8
        text-center
        text-slate-500
      ">

        © 2026 ChaloRide. All rights reserved.

      </div>

    </footer>
  );
}