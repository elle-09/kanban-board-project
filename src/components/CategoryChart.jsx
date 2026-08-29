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
import { getCategoryData } from "../utils/taskHelpers";

const BAR_COLORS = [
  "#ffd6e0",
  "#ffc1cc",
  "#a3b18a",
  "#e8d5c4",
  "#7ec8e3",
  "#e6e6fa",
  "#f7f7f7",
  "#cde7cd",
];

export default function CategoryChart({ tasks }) {
  const data = getCategoryData(tasks);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Tasks by Category</h3>
        <span className="chart-badge">Breakdown</span>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty">No categories yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.15)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#a5b4fc", fontSize: 12 }}
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
                border: "1px solidrgb(194, 162, 242)",
                borderRadius: "12px",
                color: "#e0e7ff",
              }}
              cursor={{ fill: "rgba(139,92,246,0.08)" }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {data.map((_, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}