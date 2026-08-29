export function isOverdue(task) {
  const today = new Date().toISOString().split("T")[0];
  return task.dueDate < today && task.status !== "DONE";
}

export function getSummary(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "TO DO").length,
    doing: tasks.filter(t => t.status === "DOING").length,
    done: tasks.filter(t => t.status === "DONE").length,
    overdue: tasks.filter(isOverdue).length,
  };
}