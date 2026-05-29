import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";

import {
  FiDownload,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";

const monthlyData = [
  { month: "Jan", rides: 1240, amount: "₹32,400", width: "60%" },
  { month: "Feb", rides: 1450, amount: "₹38,900", width: "70%" },
  { month: "Mar", rides: 1680, amount: "₹45,600", width: "80%" },
  { month: "Apr", rides: 1520, amount: "₹42,100", width: "75%" },
  { month: "May", rides: 1820, amount: "₹48,700", width: "85%" },
  { month: "Jun", rides: 1950, amount: "₹52,300", width: "90%" },
];

const topRiders = [
  {
    rank: "#1",
    name: "Ananya Reddy",
    college: "Kristu Jayanti University",
    rides: 234,
    earnings: "₹5,670",
  },

  {
    rank: "#2",
    name: "Priya Sharma",
    college: "Kristu Jayanti University",
    rides: 145,
    earnings: "₹3,240",
  },

  {
    rank: "#3",
    name: "Rahul Verma",
    college: "Kristu Jayanti University",
    rides: 89,
    earnings: "₹2,180",
  },
];

export default function AdminEarnings() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminHeader />

      <DashboardTabs active="earnings" />

      <div className="px-7 py-6">
        {/* Top */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b]">
            Platform Earnings
          </h1>

          <button className="bg-[#6366f1] text-white px-7 py-3 rounded-2xl flex items-center gap-3 font-semibold">
            <FiDownload />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white border rounded-[32px] p-5">
            <div className="w-16 h-16 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#6366f1] text-xl mb-6">
              <FiDollarSign />
            </div>

            <p className="text-gray-500 text-[14px]">
              Total Revenue
            </p>

            <h2 className="text-3xl font-bold text-[#1e293b] mt-3">
              ₹2,60,000
            </h2>
          </div>

          {/* Card 2 */}
          <div className="bg-white border rounded-[32px] p-5">
            <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16a34a] text-xl mb-6">
              <FiTrendingUp />
            </div>

            <p className="text-gray-500 text-[14px]">
              Average per Ride
            </p>

            <h2 className="text-3xl font-bold text-[#1e293b] mt-3">
              ₹28
            </h2>
          </div>

          {/* Card 3 */}
          <div className="bg-white border rounded-[32px] p-5">
            <div className="w-16 h-16 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563eb] text-xl mb-6">
              <FiBarChart2 />
            </div>

            <p className="text-gray-500 text-[14px]">
              Total Rides
            </p>

            <h2 className="text-3xl font-bold text-[#1e293b] mt-3">
              9,660
            </h2>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white border rounded-[32px] p-5 mb-8">
          <h2 className="text-xl font-bold text-[#1e293b] mb-8">
            Monthly Earnings Trend
          </h2>

          <div className="space-y-8">
            {monthlyData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-3">
                  <p className="font-semibold text-[14px]">
                    {item.month}
                  </p>

                  <div className="flex gap-5">
                    <p className="text-gray-500">
                      {item.rides} rides
                    </p>

                    <p className="font-bold text-[#6366f1]">
                      {item.amount}
                    </p>
                  </div>
                </div>

                <div className="w-full h-4 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7c6cf2] rounded-full"
                    style={{ width: item.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Riders */}
        <div className="bg-white border rounded-[32px] p-5">
          <h2 className="text-xl font-bold text-[#1e293b] mb-8">
            Top Earning Riders
          </h2>

          <div className="space-y-5">
            {topRiders.map((rider, index) => (
              <div
                key={index}
                className="bg-[#f8fafc] rounded-2xl px-7 py-3 flex justify-between items-center"
              >
                <div className="flex items-center gap-5">
                  {/* Rank */}
                  <div className="w-14 h-14 rounded-full bg-[#7c6cf2] text-white flex items-center justify-center font-bold text-[14px]">
                    {rider.rank}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-bold text-xl text-[#1e293b]">
                      {rider.name}
                    </h3>

                    <p className="text-gray-500">
                      {rider.college} • {rider.rides} rides
                    </p>
                  </div>
                </div>

                {/* Earnings */}
                <p className="text-xl font-bold text-[#6366f1]">
                  {rider.earnings}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}