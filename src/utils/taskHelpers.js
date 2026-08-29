export function isOverdue(task) {
  if (!task.dueDate || task.status === "DONE") return false;
  const today = new Date().toISOString().split("T")[0];
  return task.dueDate < today;
}

export function getSummary(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "TO DO").length,
    doing: tasks.filter((t) => t.status === "DOING").length,
    done: tasks.filter((t) => t.status === "DONE").length,
    overdue: tasks.filter(isOverdue).length,
  };
}

/** Data for Status Pie / Doughnut chart */
export function getStatusData(tasks) {
  const counts = {
    "TO DO": 0,
    DOING: 0,
    DONE: 0,
  };

  tasks.forEach((t) => {
    if (counts[t.status] !== undefined) counts[t.status]++;
  });

  return [
    { name: "TO DO", value: counts["TO DO"], color: "#fff1D0" },
    { name: "DOING", value: counts.DOING, color: "#f2eeff" },
    { name: "DONE", value: counts.DONE, color: "#b7c9b0" },
  ].filter((d) => d.value > 0);
}

/** Data for Category Bar chart */
export function getCategoryData(tasks) {
  const map = {};

  tasks.forEach((t) => {
    const cat = t.category?.trim() || "Uncategorized";
    map[cat] = (map[cat] || 0) + 1;
  });

  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Completion Performance
 * Early  = completeDate < dueDate
 * On Time = completeDate === dueDate
 * Late   = completeDate > dueDate
 * Only DONE tasks that have both dates are counted
 */
export function getPerformanceData(tasks) {
  const result = { early: 0, onTime: 0, late: 0 };

  tasks
    .filter((t) => t.status === "DONE" && t.completeDate && t.dueDate)
    .forEach((t) => {
      if (t.completeDate < t.dueDate) result.early++;
      else if (t.completeDate === t.dueDate) result.onTime++;
      else result.late++;
    });

  return [
    { name: "Early", value: result.early, color: "#b7c686" },
    { name: "On Time", value: result.onTime, color: "#b94f6f" },
    { name: "Late", value: result.late, color: "#ff8c66" },
  ];
}