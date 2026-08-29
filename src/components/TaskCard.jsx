import { useTasks } from "../context/TaskContext";
import people from "../data/people";

function TaskCard({task,onEdit}){

    const{deleteTask, updateTask} = useTasks();

    const handleDelete = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (confirmed) {
            deleteTask(task.id);
        }
    };

    const handleMove = (e) => {
        const newStatus = e.target.value;
        const updates = { status: newStatus };
        updates.completeDate = newStatus === "DONE"
            ? new Date().toISOString().split("T")[0]
            : null;
        updateTask(task.id, updates);
    };

    const person = people.find(
        (person) => person.ID === Number(task.responsiblePerson)
    );

    return (
        <div className="task-card">

            <h3>{task.title}</h3>

            <p>
                <strong>Description:</strong>{" "}
                {task.description}
            </p>

            <p>
                <strong>Category:</strong>{" "}
                {task.category}
            </p>

            <p>
                <strong>Responsible:</strong>{" "}
                {person?.Name || "Not assigned"}
            </p>

            <p>
                <strong>Start:</strong>{" "}
                {task.startDate}
            </p>

            <p>
                <strong>Due:</strong>{" "}
                {task.dueDate}
            </p>

            {task.status === "DONE" && task.completeDate && (
                <p>
                    <strong>Completed:</strong>{" "}
                    {task.completeDate}
                </p>
            )}

            <div className="task-actions">

                <select value={task.status} onChange={handleMove}>
                    <option value="TO DO">TO DO</option>
                    <option value="DOING">DOING</option>
                    <option value="DONE">DONE</option>
                </select>

                <button onClick={() => onEdit(task)}>
                    Edit
                </button>

                <button onClick={handleDelete}>
                    Delete
                </button>

            </div>

        </div>
    );
}
export default TaskCard;