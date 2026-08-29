export default function SummaryCard({ label, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}