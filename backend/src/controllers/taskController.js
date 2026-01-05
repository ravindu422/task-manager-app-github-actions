import Task from '../models/Task.js';

// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const { completed } = req.query;

        const filter = {};
        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }

        const tasks = await Task.findAll(filter);

        res.json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks',
            error: error.message,
        });
    }
};


// Get task by ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.json({
            success: true,
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching task',
            error: error.message,
        });        
    }
};

// Create task
export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title, description,
        });

        res.status(201).json({
            success: true,
            data: task,
        })
    } catch (error) {
        if (error.message.includes('required') || error.message.includes('exceed')) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating task',
            error: error.message,
        });
    }
};


// Update task
export const updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const task = await Task.update(req.params.id, {
            title,
            description,
            completed,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.json({
            success: true,
            data: task,
        });
    } catch (error) {
        if (error.message.includes('required') || error.message.includes('exceed')) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating task',
            error: error.message,
        });
    }
};


// Delete task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.delete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.json({
            success: true,
            message: 'Task deleted successfully',
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting task',
            error: error.message,
        });
    }
};