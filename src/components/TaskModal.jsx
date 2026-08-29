import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import people from "../data/people";

function TaskModal({ isOpen, onClose, editingTask }) {
  const { categories, addTask, updateTask, addCategory } = useTasks();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    dueDate: "",
    responsiblePerson: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  // load task data when editing
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        category: editingTask.category || "",
        startDate: editingTask.startDate || "",
        dueDate: editingTask.dueDate || "",
        responsiblePerson: editingTask.responsiblePerson || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        startDate: "",
        dueDate: "",
        responsiblePerson: "",
      });
    }
  }, [editingTask, isOpen]);

  // handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new category
  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) {
      return;
    }

    addCategory(trimmedCategory);

    setFormData((prev) => ({
      ...prev,
      category: trimmedCategory,
    }));

    setNewCategory("");
    setShowCategoryInput(false);
  };

  // submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!formData.category) {
      alert("Please select a category.");
      return;
    }

    if (!formData.startDate) {
      alert("Please select a start date.");
      return;
    }

    if (!formData.dueDate) {
      alert("Please select a due date.");
      return;
    }

    if (!formData.responsiblePerson) {
      alert("Please select a responsible person.");
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }

    onClose();
  };
  
  // don't display modal when closed
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => setShowCategoryInput(!showCategoryInput)}
          >
            + Add New Category
          </button>

          {showCategoryInput && (
            <div className="new-category">
              <input
                type="text"
                placeholder="New category"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
              />

              <button type="button" onClick={handleAddCategory}>
                Add
              </button>
            </div>
          )}

          <label>
            Start Date
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Due Date
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Responsible Person
            <select
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={handleChange}
            >
              <option value="">Select responsible person</option>

              {people.map((person) => (
                <option key={person.ID} value={person.ID}>
                  {person.Name}
                </option>
              ))}
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              {editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
