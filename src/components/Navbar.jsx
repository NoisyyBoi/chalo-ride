import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Navbar() {

  let user = null;

  try {

    const storedUser =
      localStorage.getItem("user");

    if (

      storedUser &&
      storedUser !== "undefined"
    ) {

      user =
        JSON.parse(storedUser);

    }
    

  } catch (error) {

    console.log(
      "Invalid user data"
    );   

  }

  const navClass = ({ isActive }) =>
      isActive
        ? "text-indigo-500 border-b-2 border-pink-400 pb-1"
        : "text-slate-700 hover:text-indigo-500 transition-all duration-300 hover:-translate-y-0.5";

  return (
    
    <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-[9999]">

      <div className="max-w-7xl mx-auto px-7 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link 
          to="/"
          className="flex items-center gap-2"
        >

          <img
            src={Logo}
            alt="ChaloRide"
            className="w-12 h-12 object-contain mt-4"
          />

          <h1 className="text-xl font-extrabold leading-none">
            <span className="text-indigo-500">
              Chalo
            </span>

            <span className="text-pink-500">
              Ride
            </span>
          </h1>

        </Link>

        {/* LINKS */}
        
        <div className="hidden md:flex items-center gap-6 text-base font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `
              relative
              pb-1
              transition-all
              duration-300
              ${
                isActive
                  ? "text-indigo-500 border-b-2 border-pink-400"
                  : "text-slate-700 hover:text-indigo-500"
              }
            `
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/find-ride"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 border-b-2 border-pink-400 pb-1"
                : "text-slate-700"
            }
          >
            Find Ride
          </NavLink>

          <NavLink
            to="/offer-ride"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 border-b-2 border-pink-400 pb-1"
                : "text-slate-700"
            }
          >
            Offer Ride
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 border-b-2 border-pink-400 pb-1"
                : "text-slate-700"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/legal"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 border-b-2 border-pink-400 pb-1"
                : "text-slate-700"
            }
          >
            Legal
          </NavLink>

        </div>

        {/* BUTTONS */}
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8">

          {user ? (

            <>
    
              {/* REQUESTS */}
              <Link
                to="/requests"
              >

                <button className="font-medium text-slate-700 hover:text-indigo-500">

                  Requests

                </button>

              </Link>

              {/* ACTIVE RIDES */}
              <Link
                to="/activeride"
              >

                <button className="font-medium text-slate-700 hover:text-indigo-500">

                  Active Ride

                </button>

              </Link>


              {/* PAYMENTS */}
              <Link
                to="/payment"
              >

                <button className="font-medium text-slate-700 hover:text-indigo-500">

                  Payments

                </button>

              </Link>

              {/* PROFILE ICON */}
              <Link
                to="/profile"
              >

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-[14px] cursor-pointer hover:scale-105 duration-300">

                  {
                    user.name
                      ?.charAt(0)
                      ?.toUpperCase()
                  }

                </div>

              </Link>

            </>

          ) : (

            <>

              <Link to="/login">

                <button className="font-medium">

                  Login

                </button>

              </Link>

              <Link to="/signup">

                <button className="bg-indigo-500 text-white px-7 py-5 rounded-xl font-medium hover:scale-105 duration-300">

                  Sign Up

                </button>

              </Link>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}