import SummaryCard from "../components/SummaryCard";
import { getSummary } from "../../../my-dashboard-part/src/utils/taskHelpers";

const dummyTasks = [
  { id: 1, status: "TODO", dueDate: "2026-08-01" },
  { id: 2, status: "DOING", dueDate: "2026-09-01" },
  { id: 3, status: "DONE", dueDate: "2026-08-10" },
];

export default function Dashboard() {
  const summary = getSummary(dummyTasks);

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      <SummaryCard label="Total" value={summary.total} />
      <SummaryCard label="To Do" value={summary.todo} />
      <SummaryCard label="Doing" value={summary.doing} />
      <SummaryCard label="Done" value={summary.done} />
      <SummaryCard label="Overdue" value={summary.overdue} />
    </div>
  );
}