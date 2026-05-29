import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import {
  FiFilter,
  FiEye,
  FiCheck,
  FiUserX,
} from "react-icons/fi";

const complaints = [
  {
    title: "Late Arrival",
    reportedBy: "Priya Sharma",
    against: "Rahul Verma",
    description:
      "Driver was 30 minutes late without prior notice",
    date: "25 May 2026",
  },

  {
    title: "Safety Concern",
    reportedBy: "Ankit Kumar",
    against: "Pooja Reddy",
    description:
      "Reckless driving and overspeeding on campus",
    date: "26 May 2026",
  },

  {
    title: "Payment Issue",
    reportedBy: "Neha Gupta",
    against: "Vikram Shah",
    description:
      "Charged more than agreed amount",
    date: "24 May 2026",
  },
];

export default function AdminComplaints() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminHeader />

      <DashboardTabs active="complaints" />

      <div className="px-8 py-6">
        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-[#1e293b]">
            Complaints Management
          </h1>

          <button className="bg-white border rounded-2xl px-6 py-3 flex items-center gap-2 font-semibold">
            <FiFilter />
            Filter by Priority
          </button>
        </div>

        {/* Complaint Cards */}
        <div className="space-y-6">
          {complaints.map((complaint, index) => (
            <div
              key={index}
              className="bg-white border rounded-[32px] p-8 flex justify-between gap-10"
            >
              {/* Left */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#1e293b] mb-6">
                  {complaint.title}
                </h2>

                {/* Users */}
                <div className="grid grid-cols-2 gap-10 mb-6">
                  <div>
                    <p className="text-gray-500 mb-1">
                      Reported By:
                    </p>

                    <p className="font-bold text-[#1e293b]">
                      {complaint.reportedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 mb-1">
                      Against:
                    </p>

                    <p className="font-bold text-[#1e293b]">
                      {complaint.against}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-[#f8fafc] rounded-2xl p-5">
                  <p className="text-gray-500 mb-2">
                    Description:
                  </p>

                  <p className="text-[#1e293b]">
                    {complaint.description}
                  </p>
                </div>

                <p className="text-gray-400 mt-5">
                  Filed on {complaint.date}
                </p>
              </div>

              {/* Right Buttons */}
              <div className="flex flex-col gap-4 min-w-[220px]">
                <button className="bg-[#8b5cf6] text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg">
                  <FiEye />
                  Investigate
                </button>

                <button className="bg-[#dcfce7] text-[#16a34a] px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg">
                  <FiCheck />
                  Resolve
                </button>

                <button className="bg-[#fee2e2] text-[#dc2626] px-6 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg">
                  <FiUserX />
                  Suspend User
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}