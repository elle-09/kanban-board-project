import { useTasks } from "../context/TaskContext";
import people from "../data/people";

function TaskCard({task,onEdit}){

    const{deleteTask} = useTasks();

    const handleDelete = () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (confirmed) {
            deleteTask(task.id);
        }
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

            <div className="task-actions">

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