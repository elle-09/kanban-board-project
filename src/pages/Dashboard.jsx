import { useTasks } from "../context/TaskContext";
import SummaryCard from "../components/SummaryCard";
import StatusChart from "../components/StatusChart";
import CategoryChart from "../components/CategoryChart";
import PerformanceChart from "../components/PerformanceChart";
import { getSummary } from "../utils/taskHelpers";

export default function Dashboard() {
  const { tasks } = useTasks();
  const summary = getSummary(tasks);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Analytics</h2>
          
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard
          label="Total Tasks"
          value={summary.total}
          icon="🌌"
          accent="blue"
        />
        <SummaryCard
          label="To Do"
          value={summary.todo}
          icon="📝"
          accent="slate"
        />
        <SummaryCard
          label="Doing"
          value={summary.doing}
          icon="⚡"
          accent="amber"
        />
        <SummaryCard
          label="Done"
          value={summary.done}
          icon="✨"
          accent="emerald"
        />
        <SummaryCard
          label="Overdue"
          value={summary.overdue}
          icon="🔥"
          accent="rose"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        <StatusChart tasks={tasks} />
        <CategoryChart tasks={tasks} />
      </div>

      {/* Charts Row 2 – Performance */}
      <div className="charts-row single">
        <PerformanceChart tasks={tasks} />
      </div>
    </div>
  );
}