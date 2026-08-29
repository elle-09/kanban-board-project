import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function KanbanBoard({ onEdit }) {

    const { tasks } = useTasks();

    const columns = [
        "TO DO",
        "DOING",
        "DONE"
    ];

    return (
        <div className="kanban-board">

            {columns.map((column) => {

                const columnTasks = tasks.filter(
                    (task) => task.status === column
                );

                return (
                    <div
                        className="kanban-column"
                        key={column}
                    >

                        <h2>{column}</h2>

                        <div className="task-list">

                            {columnTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={onEdit}
                                />
                            ))}

                        </div>

                    </div>
                );
            })}

        </div>
    );

}
export default KanbanBoard;