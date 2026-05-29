import {
  FiShield,
  FiAlertTriangle,
  FiDownload,
  FiChevronRight,
} from "react-icons/fi";

export default function QuickActions() {
  return (
    <div className="bg-white border rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-[#eef0ff] px-7 py-3 rounded-2xl">
          <div className="flex items-center gap-3 text-[#6366f1] font-semibold">
            <FiShield />
            Review Pending Verifications
          </div>

          <FiChevronRight />
        </div>

        <div className="flex justify-between items-center bg-[#fff1f2] px-7 py-3 rounded-2xl">
          <div className="flex items-center gap-3 text-red-500 font-semibold">
            <FiAlertTriangle />
            Handle Active Complaints
          </div>

          <FiChevronRight />
        </div>

        <div className="flex justify-between items-center bg-[#f8fafc] px-7 py-3 rounded-2xl">
          <div className="flex items-center gap-3 font-semibold">
            <FiDownload />
            Download Monthly Report
          </div>

          <FiChevronRight />
        </div>
      </div>
    </div>
  );
}