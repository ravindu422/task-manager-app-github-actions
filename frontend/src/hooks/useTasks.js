import { useEffect } from "react";
import { useState } from "react"
import taskService from "../services/taskService";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchTasks = async (completed = null) => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskService.getAllTasks(completed);
            setTasks(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (taskData) => {
        setError(null);
        try {
            const newTask = await taskService.createTask(taskData);
            setTasks([...tasks, newTask]);
            return newTask;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const updateTask = async (id, taskData) => {
        setError(null);
        try {
            const updatedTask = await taskService.updatTask(id, taskData);
            setTasks(tasks.map(task => tasks.id === id ? updatedTask : task));
            return updateTask;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteTask = async (id) => {
        setError(null);
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    const toggleTaskComplete = async (task) => {
        return updateTask(task.id, { ...task, completed: !task.completed });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        tasks, 
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskComplete
    };
};