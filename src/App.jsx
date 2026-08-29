import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import TaskModal from "./components/TaskModal";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [page, setPage] = useState("kanban");

  // Open modal for creating a new task
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Kanban Board</h1>

        <nav>
          <button onClick={() => setPage("kanban")}>Kanban Board</button>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
        </nav>

        {page === "kanban" && (
          <button onClick={handleAddTask}>+ Add Task</button>
        )}
      </div>

      {page === "kanban" ? (
        <>
          <KanbanBoard onEdit={handleEditTask} />
          <TaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            editingTask={editingTask}
          />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;