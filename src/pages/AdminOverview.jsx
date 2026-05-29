import AdminHeader from "../components/admin/AdminHeader";
import DashboardTabs from "../components/admin/DashboardTabs";
import StatCard from "../components/admin/StatCard";
import QuickActions from "../components/admin/QuickActions";
import RecentAlerts from "../components/admin/RecentAlerts";

import {
  FiUsers,
  FiActivity,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";

export default function AdminOverview() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <AdminHeader />
      <DashboardTabs active="overview" />

      <div className="p-5">
        {/* Cards */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            icon={<FiUsers />}
            title="Total Riders"
            value="1247"
            growth="+12% from last month"
            iconBg="bg-[#ede9fe]"
            iconColor="text-[#6366f1]"
          />

          <StatCard
            icon={<FiActivity />}
            title="Active Rides"
            value="89"
            growth="+8% from yesterday"
            iconBg="bg-[#dcfce7]"
            iconColor="text-[#16a34a]"
          />

          <StatCard
            icon={<FiShield />}
            title="Pending Verifications"
            value="34"
            growth="Needs attention"
            iconBg="bg-[#fef3c7]"
            iconColor="text-[#f59e0b]"
          />

          <StatCard
            icon={<FiDollarSign />}
            title="Total Earnings"
            value="₹45,680"
            growth="+15% from last month"
            iconBg="bg-[#c7d2fe]"
            iconColor="text-white"
            purple
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <QuickActions />
          <RecentAlerts />
        </div>
      </div>
    </div>
  );
}