import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            🛵
          </div>

          <h1 className="text-2xl font-bold">
            <span className="text-indigo-500">
              Chalo
            </span>

            <span className="text-pink-500">
              Ride
            </span>
          </h1>

        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-700">

          <Link to="/" className="text-indigo-500 border-b-2 border-pink-400 pb-1">
            Home
          </Link>

          <Link to="/find-ride">
            Find Ride
          </Link>

          <Link to="/offer-ride">
            Offer Ride
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/legal">Legal</Link>

        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4">

          <Link to="/login">
            <button className="font-medium">
              Login
            </button>
          </Link>

          <Link to="/signup">

            <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 duration-300">
              Sign Up
            </button>

          </Link>

        </div>

      </div>

    </nav>
  );
}