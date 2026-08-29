import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { getStatusData } from "../utils/taskHelpers";

export default function StatusChart({ tasks }) {
  const data = getStatusData(tasks);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Task Status</h3>
        <span className="chart-badge">Distribution</span>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty">No tasks yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#1e1b4b",
                border: "1px solid #4c1d95",
                borderRadius: "12px",
                color: "#e0e7ff",
              }}
              itemStyle={{ color: "#e0e7ff" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span style={{ color: "#c7d2fe", fontSize: 13 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}