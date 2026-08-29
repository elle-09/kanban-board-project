import { useTasks } from "../context/TaskContext";
import SummaryCard from "../components/SummaryCard";
import { getSummary } from "../utils/taskHelpers";

export default function Dashboard() {
  const { tasks } = useTasks();
  const summary = getSummary(tasks);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h2>
      <p className="text-gray-500 mb-6">Overview of all your tasks</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCard
          label="Total Tasks"
          value={summary.total}
          icon="📋"
          color="border-blue-500"
        />
        <SummaryCard
          label="To Do"
          value={summary.todo}
          icon="🗒️"
          color="border-gray-400"
        />
        <SummaryCard
          label="Doing"
          value={summary.doing}
          icon="⚙️"
          color="border-yellow-500"
        />
        <SummaryCard
          label="Done"
          value={summary.done}
          icon="✅"
          color="border-green-500"
        />
        <SummaryCard
          label="Overdue"
          value={summary.overdue}
          icon="⏰"
          color="border-red-500"
        />
      </div>
    </div>
  );
}