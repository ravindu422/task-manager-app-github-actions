import { useState } from "react";

function TaskForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit({ title, description });
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2"> 
                    Title *
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description (optional)"
                    rows= "3"
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-blue-600 text-white- py-2 px-4 rounded-md- hover:bg-blue-700 transition-colors"
            >
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;