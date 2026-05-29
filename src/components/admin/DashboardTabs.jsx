import {
  FiGrid,
  FiShield,
  FiUsers,
  FiAlertTriangle,
  FiBarChart,
} from "react-icons/fi";

import { Link } from "react-router-dom";

export default function DashboardTabs({ active }) {
  return (
    <div className="px-7 py-6">
      <div className="bg-white rounded-3xl shadow-sm border flex justify-between px-3 py-3">

        <Link
          to="/admin"
          className={`px-10 py-2 rounded-2xl flex items-center gap-3 font-semibold ${
            active === "overview"
              ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
              : "text-gray-500"
          }`}
        >
          <FiGrid />
          Overview
        </Link>

        <Link
          to="/admin/verifications"
          className={`px-10 py-2 rounded-2xl flex items-center gap-3 font-semibold ${
            active === "verifications"
              ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
              : "text-gray-500"
          }`}
        >
          <FiShield />
          Verifications
        </Link>

        <Link
          to="/admin/riders"
          className={`px-10 py-2 rounded-2xl flex items-center gap-3 font-semibold ${
            active === "riders"
              ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
              : "text-gray-500"
          }`}
        >
          <FiUsers />
          Riders
          </Link>

        <Link
          to="/admin/complaints"
          className={`px-10 py-2 rounded-2xl flex items-center gap-3 font-semibold ${
            active === "complaints"
              ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
              : "text-gray-500"
          }`}
        >
          <FiAlertTriangle />
          Complaints
        </Link>

        <Link
          to="/admin/earnings"
          className={`px-10 py-2 rounded-2xl flex items-center gap-3 font-semibold ${
            active === "earnings"
              ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
              : "text-gray-500"
          }`}
        >
          <FiBarChart />
          Earnings
        </Link>
      </div>
    </div>
  );
} 