export default function RecentAlerts() {
  return (
    <div className="bg-white border rounded-3xl p-6">
      <h2 className="text-3xl font-bold mb-6">
        Recent Alerts
      </h2>

      <div className="space-y-4">
        <div className="bg-[#fff1f2] border border-red-100 rounded-2xl p-5">
          <h3 className="font-bold text-red-500">
            High Priority Complaint
          </h3>

          <p className="text-red-400">
            Safety concern reported by Ankit Kumar
          </p>

          <p className="text-red-400 mt-2">
            5 minutes ago
          </p>
        </div>

        <div className="bg-[#fffbeb] border border-yellow-100 rounded-2xl p-5">
          <h3 className="font-bold text-yellow-600">
            Verification Pending
          </h3>

          <p className="text-yellow-500">
            34 students waiting for approval
          </p>

          <p className="text-yellow-500 mt-2">
            2 hours ago
          </p>
        </div>

        <div className="bg-[#eff6ff] border border-blue-100 rounded-2xl p-5">
          <h3 className="font-bold text-blue-600">
            System Update
          </h3>

          <p className="text-blue-500">
            New features deployed successfully
          </p>

          <p className="text-blue-500 mt-2">
            1 day ago
          </p>
        </div>
      </div>
    </div>
  );
}