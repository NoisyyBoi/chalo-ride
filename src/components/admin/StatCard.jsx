export default function StatCard({
  icon,
  title,
  value,
  growth,
  iconBg,
  iconColor,
  purple,
}) {
  return (
    <div
      className={`rounded-3xl border p-7 ${
        purple
          ? "bg-[#b8b5ff] text-white"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

        <span className="text-xl">↗</span>
      </div>

      <div className="mt-8">
        <p className={`${purple ? "text-white" : "text-gray-500"}`}>
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">{value}</h2>

        <p className="mt-3 text-base">{growth}</p>
      </div>
    </div>
  );
}