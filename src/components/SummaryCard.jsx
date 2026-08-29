export default function SummaryCard({ label, value, icon, accent = "blue" }) {
  return (
    <div className={`summary-card summary-card--${accent}`}>
      <div className="summary-icon">{icon}</div>
      <div className="summary-content">
        <p className="summary-value">{value}</p>
        <p className="summary-label">{label}</p>
      </div>
    </div>
  );
}