import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();
const defaultCategories = ["Development","Design","Testing"];

function TaskProvider({children}){
    // =========================
    // Categories
    // =========================
    const [categories, setCategories] = useState(() => {
        const savedCategories =
            localStorage.getItem("categories");

        return savedCategories
            ? JSON.parse(savedCategories)
            : defaultCategories;
    });

    // save categories to local storage
    useEffect(() => {
        localStorage.setItem(
            "categories",
            JSON.stringify(categories)
        );
    }, [categories]);

    // =========================
    // Tasks
    // =========================
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks
            ? JSON.parse(savedTasks)
            : [];
    });

    // save tasks to local storage
    useEffect(() => {
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );
    }, [tasks]);

    // =========================
    // Task Functions
    // =========================

    // add task
    const addTask = (task) => {
        const newTask = {
            ...task,
            id: Date.now(),
            status: "TO DO",
            completeDate: null
        };

        setTasks((prevTasks) => [
            ...prevTasks,
            newTask
        ]);
    };

    // update task
    const updateTask = (id, updatedData) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, ...updatedData }
                    : task
            )
        );
    };

    // delete task
    const deleteTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.filter(
                (task) => task.id !== id
            )
        );
    };

    // =========================
    // Category Functions
    // =========================

    // add category
    const addCategory = (category) => {
        const trimmedCategory = category.trim();

        if (!trimmedCategory) {
            return;
        }

        if (categories.includes(trimmedCategory)) {
            return;
        }

        setCategories((prevCategories) => [
            ...prevCategories,
            trimmedCategory
        ]);
    };

    // =========================
    // Context Provider
    // =========================

    return (
        <TaskContext.Provider 
        value={{
            tasks,
            categories,
            addTask,
            updateTask,
            deleteTask,
            addCategory
        }}>
            {children}
        </TaskContext.Provider>
    );
}
export {TaskProvider};

export function useTasks(){
    return useContext(TaskContext);
}