import { FiBell } from "react-icons/fi";

export default function AdminHeader() {
  return (
    <div className="bg-white border-b">
      {/* Top */}
      <div className="flex justify-between items-center px-7 py-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

          <h1 className="text-xl font-bold text-[#7c3aed]">
            ChaloRide
          </h1>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center px-7 py-6">
        <div>
          <h2 className="text-3xl font-bold text-[#1e293b]">
            Admin Dashboard
          </h2>

          <p className="text-gray-500 mt-2 text-[14px]">
            ChaloRide Management Portal
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 bg-gray-100 px-7 py-3 rounded-xl">
            <FiBell />
            12 New
          </button>

          <button className="border px-7 py-3 rounded-xl font-semibold">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}