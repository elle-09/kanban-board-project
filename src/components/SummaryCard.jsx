export default function SummaryCard({ label, value, icon, color }) {
  return (
    <div className={`rounded-xl shadow-md p-5 flex items-center gap-4 border-l-4 ${color} bg-white`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  );
}