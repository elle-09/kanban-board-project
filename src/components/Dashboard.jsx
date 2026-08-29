import SummaryCards from "./SummaryCard";
import DashboardCharts from "./Dashboardcharts";

function Dashboard() {
  return (
    <main className="page">
      <div className="page-title">
        <div>
          <h2>Dashboard</h2>

          <p>
            Live results calculated from the Kanban tasks.
          </p>
        </div>
      </div>

      {/* Person B: five summary cards */}
      <SummaryCards />

      {/* Person C: three dashboard charts */}
      <DashboardCharts />
    </main>
  );
}

export default Dashboard;