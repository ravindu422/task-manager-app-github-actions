function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow p-4 mb-3 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-start flex-1">
                    <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task)}
                        className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {task.description}
                            </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(task.id)}
                    aria-label="Delete task"
                    className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TaskItem;