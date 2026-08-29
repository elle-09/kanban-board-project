import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { useTasks } from "../context/TaskContext";
import { dashboardData } from "../utils/dashboardUtils";


// Colors for TO DO, DOING and DONE
const statusColors = [
  "Indigo",
  "Amber",
  "#Green"
];


// Colors for Early, On Time and Late
const performanceColors = [
  "#Green",
  "#Blue",
  "#Red"
];


// A reusable container for each chart
function ChartCard({ title, children }) {
  return (
    <article className="chart-card">
      <h3>{title}</h3>

      <div className="chart">
        {children}
      </div>
    </article>
  );
}


function DashboardCharts() {
  // Get the current Kanban tasks from TaskContext
  const { tasks } = useTasks();

  // Convert the task array into chart data
  const data = dashboardData(tasks);

  return (
    <section className="chart-grid">

      {/* =====================================
          1. TASK STATUS DOUGHNUT CHART
      ====================================== */}

      <ChartCard title="Tasks by Status">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data.status}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.status.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={statusColors[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>


      {/* =====================================
          2. TASK CATEGORY BAR CHART
      ====================================== */}

      <ChartCard title="Tasks by Category">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data.categories}
            margin={{
              top: 10,
              right: 20,
              left: -15,
              bottom: 20
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              interval={0}
            />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="tasks"
              name="Number of Tasks"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>


      {/* =====================================
          3. COMPLETION PERFORMANCE CHART
      ====================================== */}

      <ChartCard title="Completion Performance">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data.performance}
            margin={{
              top: 10,
              right: 20,
              left: -15,
              bottom: 10
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="tasks"
              name="Completed Tasks"
              radius={[6, 6, 0, 0]}
            >
              {data.performance.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={performanceColors[index]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

    </section>
  );
}

export default DashboardCharts;