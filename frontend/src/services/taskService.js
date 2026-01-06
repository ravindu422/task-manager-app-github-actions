import axios from 'axios'

const API_URL = '/api/tasks';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const taskService = {
    getAllTasks: async (completed = null) => {
        const params = completed !== null ? { completed } : {};
        const response = await api.get('/', { params });
        return response.data.data;
    },

    getTaskById: async (id) => {
        const response = await api.get(`/${id}`);
        return response.data.data;
    },

    createTask: async (taskData) => {
        const response = await api.post('/', taskData);
        return response.data.data;
    },

    updateTask: async (id, taskData) => {
        const response = await api.delete(`${id}`, taskData);
        return response.data;
    },

    deleteTask: async (id) => {
        const response = await api.delete(`/${id}`); 
        return response.data;
    }
};

export default taskService;