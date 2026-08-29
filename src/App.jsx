import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import TaskModal from "./components/TaskModal";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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

        <button onClick={handleAddTask}>+ Add Task</button>
      </div>

      <KanbanBoard onEdit={handleEditTask} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTask={editingTask}
      />
    </div>
  );
}

export default App;
