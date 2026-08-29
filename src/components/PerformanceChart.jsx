import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getPerformanceData } from "../utils/taskHelpers";

export default function PerformanceChart({ tasks }) {
  const data = getPerformanceData(tasks);
  const hasData = data.some((d) => d.value > 0);

  return (
    <div className="chart-card chart-card-wide">
      <div className="chart-header">
        <h3>Completion Performance</h3>
        <span className="chart-badge">Early · On Time · Late</span>
      </div>

      <p className="chart-desc">
        Compares <strong>completeDate</strong> vs <strong>dueDate</strong> for
        DONE tasks only.
      </p>

      {!hasData ? (
        <div className="chart-empty">
          Move tasks to DONE (with both dates) to see performance
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.15)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#a5b4fc", fontSize: 13 }}
              axisLine={{ stroke: "#4c1d95" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#a5b4fc", fontSize: 12 }}
              axisLine={{ stroke: "#4c1d95" }}
            />
            <Tooltip
              contentStyle={{
                background: "#1e1b4b",
                border: "1px solid #4c1d95",
                borderRadius: "12px",
                color: "#e0e7ff",
              }}
              cursor={{ fill: "rgba(139,92,246,0.08)" }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={70}>
              {data.map((entry, index) => (
                <Cell key={`perf-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}